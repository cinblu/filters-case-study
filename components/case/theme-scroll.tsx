"use client";

import { useEffect } from "react";

// --theme-p goes 0 → 1 while the section's top travels from the bottom of the screen to here.
const END = 0.3;
// Text flips inside this slice of --theme-p, where the surfaces are mid-grey.
const INK_FROM = 0.47;
const INK_TO = 0.53;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

/**
 * Shifts the whole page from light to dark as the section with `fromId` scrolls into view,
 * and back as it scrolls out: it's light when the section first appears, dark once its top
 * nears the top third of the screen. The colours are mixed in CSS (`html.theme-scroll` in
 * globals.css); this only sets how far along the mix is. With reduced motion it switches in
 * one step halfway instead.
 */
export function ThemeScroll({ fromId }: { fromId: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const target = document.getElementById(fromId);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const top = target.getBoundingClientRect().top;
      const vh = window.innerHeight;
      let p = clamp((vh - top) / (vh * (1 - END)));
      if (reduce.matches) p = p < 0.5 ? 0 : 1;
      if (Math.abs(p - last) < 0.001) return;
      last = p;
      const q = reduce.matches ? p : smoothstep(INK_FROM, INK_TO, p);
      root.style.setProperty("--theme-p", p.toFixed(4));
      root.style.setProperty("--theme-q", q.toFixed(4));
      // `dark:` utilities and the scrollbar follow the text.
      const dark = q >= 0.5;
      root.classList.toggle("dark", dark);
      root.style.colorScheme = dark ? "dark" : "light";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    root.classList.add("theme-scroll");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      root.classList.remove("theme-scroll", "dark");
      root.style.removeProperty("--theme-p");
      root.style.removeProperty("--theme-q");
      root.style.colorScheme = "";
    };
  }, [fromId]);

  return null;
}
