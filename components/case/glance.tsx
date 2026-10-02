"use client";

import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

/** A big icon beside a label and a line. It plays on a loop, and holds still for people who
 *  ask for reduced motion. */
export function Glance({
  label,
  labelClassName,
  icon,
  children,
}: {
  label: string;
  labelClassName?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <AnimateIcon animate={!reduce} loop loopDelay={1200} asChild>
      <div className="flex items-start gap-5 bg-(--surface-raised) p-6">
        <span aria-hidden className="shrink-0 [&_svg]:size-14">
          {icon}
        </span>
        <div className="flex flex-col gap-2">
          <p className={cn("text-xs font-medium tracking-wide uppercase", labelClassName)}>{label}</p>
          <p className="text-sm text-pretty">{children}</p>
        </div>
      </div>
    </AnimateIcon>
  );
}
