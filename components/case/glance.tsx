"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

/** A big animated icon beside a label and a line; hovering anywhere on the cell plays it. */
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
  return (
    <AnimateIcon animateOnHover asChild>
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
