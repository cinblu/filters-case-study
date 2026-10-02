// The case study shows the component with its defaults: manual apply and tooltips on.
// (The component site lets visitors change these; here they're fixed.)

import type { ApplyMode } from "@/components/filter-bar/use-filters";

const SETTINGS = { applyMode: "manual" as ApplyMode, tooltips: true };

export function useSiteSettings() {
  return SETTINGS;
}
