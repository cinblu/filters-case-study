"use client";

import { useEffect } from "react";

const DURATION = 900;
const STAGGER = 90;
const MAX_DELAY = 450;

/**
 * Progressive entrances: anything marked `data-reveal`, and each child of a
 * `data-reveal-children` container, blurs and rises in as it scrolls into view. Things that
 * arrive together are staggered top to bottom. The hidden state lives in globals.css, under
 * `html.reveal` (set before paint in the layout) and only without reduced motion, so the
 * page is fully visible without JavaScript.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const targets = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ...document.querySelectorAll<HTMLElement>("[data-reveal-children] > *"),
    ];
    const timers: ReturnType<typeof setTimeout>[] = [];

    const show = (el: HTMLElement, delay: number) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.setAttribute("data-revealed", "");
      // Drop the entrance transition afterwards, so the element's own transitions return.
      timers.push(setTimeout(() => el.setAttribute("data-reveal-done", ""), DURATION + delay + 50));
    };

    // Anything already scrolled past (a reload halfway down) appears at once.
    for (const el of targets) {
      if (el.getBoundingClientRect().bottom < 0) {
        el.setAttribute("data-reveal-done", "");
        el.setAttribute("data-revealed", "");
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        entering.forEach((el, index) => {
          observer.unobserve(el);
          show(el, Math.min(index * STAGGER, MAX_DELAY));
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.filter((el) => !el.hasAttribute("data-revealed")).forEach((el) => observer.observe(el));
    (window as Window & { __revealReady?: boolean }).__revealReady = true;

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
