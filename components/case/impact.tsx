"use client";

// The impact rows: a figure that counts up, the claim, and a small picture of it that plays
// once when the row scrolls into view. With reduced motion everything shows its end state.

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function ImpactRow({
  value,
  suffix = "",
  title,
  children,
  visual,
}: {
  value: number;
  suffix?: string;
  title: string;
  children: ReactNode;
  visual: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = usePrefersReducedMotion();
  const count = useMotionValue(value);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduce) return;
    count.set(0);
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-6 gap-y-5 bg-(--surface-raised) p-6 sm:grid-cols-[6rem_minmax(0,1fr)_16rem] sm:gap-x-8"
    >
      <p className="font-(family-name:--font-display) text-6xl leading-none text-(--fb-accent) tabular-nums">
        <span className="sr-only">{`${value}${suffix}`}</span>
        <motion.span aria-hidden>{rounded}</motion.span>
        <span aria-hidden>{suffix}</span>
      </p>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-pretty text-muted-foreground">{children}</p>
      </div>
      <div className="col-span-2 sm:col-span-1">{visual}</div>
    </div>
  );
}

/** Minutes against seconds, as two bars. */
export function SpeedBars() {
  const reduce = usePrefersReducedMotion();
  const bars = [
    { label: "Before", detail: "minutes", width: "100%", tone: "bg-muted-foreground/60" },
    { label: "After", detail: "seconds", width: "20%", tone: "bg-(--fb-accent)" },
  ];
  return (
    <div aria-hidden className="flex flex-col gap-3 text-xs">
      {bars.map((bar, index) => (
        <div key={bar.label} className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-2">
          <span className="text-muted-foreground">{bar.label}</span>
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-muted" style={{ width: bar.width }}>
              <motion.div
                className={cn("h-full origin-left rounded-full", bar.tone)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={reduce ? { duration: 0 } : { duration: index === 0 ? 1.6 : 0.4, delay: 0.2, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-muted-foreground">{bar.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Four products' filters drawing into one pattern. */
export function Converge() {
  const reduce = usePrefersReducedMotion();
  const products = ["Archive", "Documents", "CRM", "Learning"];
  const ys = [12, 36, 60, 84];
  return (
    <div aria-hidden className="flex items-center gap-1 text-[11px]">
      <ul className="flex flex-col gap-1.5">
        {products.map((product) => (
          <li key={product} className="rounded-full border border-input bg-background px-2 py-0.5">
            {product}
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 60 96" className="h-24 w-12 shrink-0 text-(--fb-accent)" fill="none">
        {ys.map((y, index) => (
          <motion.path
            key={y}
            d={`M0 ${y} C 30 ${y}, 30 48, 60 48`}
            stroke="currentColor"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.15 * index, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <motion.span
        className="rounded-md border border-(--fb-accent) bg-background px-2 py-1 font-medium whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.9 }}
      >
        One pattern
      </motion.span>
    </div>
  );
}

const COMMAND = "npx shadcn add @filters/filter-bar";

/** The install command, typed out. */
export function TypedCommand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = usePrefersReducedMotion();
  const chars = useMotionValue(COMMAND.length);
  const typed = useTransform(chars, (v) => COMMAND.slice(0, Math.round(v)));

  useEffect(() => {
    if (!inView || reduce) return;
    chars.set(0);
    const controls = animate(chars, COMMAND.length, { duration: 1.4, ease: "linear", delay: 0.2 });
    return () => controls.stop();
  }, [inView, reduce, chars]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 rounded-lg border bg-background p-3 font-mono text-[10.5px] leading-relaxed"
    >
      <p className="sr-only">{COMMAND}</p>
      <p aria-hidden className="whitespace-nowrap">
        <span className="text-muted-foreground">$ </span>
        <motion.span>{typed}</motion.span>
        <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-foreground motion-reduce:animate-none" />
      </p>
      <motion.p
        className="text-(--fb-accent)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 0.3, delay: 1.8 }}
      >
        ✓ Added filter-bar
      </motion.p>
    </div>
  );
}
