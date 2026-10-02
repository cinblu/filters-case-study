"use client";

// Live pieces for the "Three principles" rows: the two tiers side by side, and a before /
// after toggle that shows the data moving up when the controls share one row.

import { ChevronDownIcon, ChevronRightIcon, SearchIcon, XIcon } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { ASSIGNEES, QUEUES, SOURCES, STATUSES, WORKFLOWS } from "@/lib/demo-data";
import { useSiteSettings } from "@/lib/site-settings";
import { FilterBar } from "@/components/filter-bar/filter-bar";
import { accentScope, chipBase, chipSet, chipUnset } from "@/components/filter-bar/styles";
import type { FilterDefinition, FilterOption } from "@/components/filter-bar/types";
import { useFilters } from "@/components/filter-bar/use-filters";

const slug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
const toOptions = (labels: readonly string[]): FilterOption[] =>
  labels.map((label) => ({ value: slug(label), label }));

// --- 2. Two tiers -------------------------------------------------------------------

const tierDefinitions: FilterDefinition[] = [
  { id: "status", label: "Status", type: "multiSelect", tier: "quick", options: toOptions(STATUSES) },
  { id: "queue", label: "Queue", type: "multiSelect", tier: "quick", options: toOptions(QUEUES) },
  { id: "workflow", label: "Workflow", type: "singleSelect", tier: "more", options: toOptions(WORKFLOWS), searchPlaceholder: "Workflows" },
  { id: "assignee", label: "Assignee", type: "multiSelect", tier: "more", options: toOptions(ASSIGNEES), searchPlaceholder: "Assignees" },
  { id: "source", label: "Source", type: "multiSelect", tier: "more", options: toOptions(SOURCES) },
  { id: "batchId", label: "Batch ID", type: "text", tier: "more", searchPlaceholder: "e.g. 1004" },
];

const MORE = ["Workflow", "Assignee", "Source", "Batch ID", "Document type", "Created by"];

/** Tier one as a live toolbar on the left; tier two as the opened menu on the right. */
export function TierSplit() {
  const { applyMode, tooltips } = useSiteSettings();
  const filters = useFilters({ definitions: tierDefinitions, applyMode });
  const [query, setQuery] = useState("");
  const searchId = useId();
  const shown = MORE.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="grid w-full items-center gap-8 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="flex min-w-0 flex-col gap-3">
        <TierLabel title="Up front" detail="The few a screen depends on" />
        <FilterBar filters={filters} tooltips={tooltips} className="w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <TierLabel title="One search away" detail="Everything else" />
        <div className="overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="border-b p-1.5">
            <label htmlFor={searchId} className="sr-only">
              Search more filters
            </label>
            <div className="flex h-8 items-center gap-2 rounded-md border border-input px-2">
              <SearchIcon aria-hidden className="size-3.5 text-muted-foreground" />
              <input
                id={searchId}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by…"
                className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <ul className="p-1 text-[13px]">
            {shown.map((item) => (
              <li key={item} className="flex items-center justify-between rounded-sm px-2 py-1.5">
                {item}
                <ChevronRightIcon aria-hidden className="size-3.5 text-muted-foreground" />
              </li>
            ))}
            {shown.length === 0 && <li className="px-2 py-1.5 text-muted-foreground">No filters found</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TierLabel({ title, detail }: { title: string; detail: string }) {
  return (
    <p className="flex items-baseline gap-2 text-xs">
      <span className="font-medium tracking-wide uppercase">{title}</span>
      <span className="text-muted-foreground">{detail}</span>
    </p>
  );
}

// --- 3. One row -----------------------------------------------------------------------

const ROWS = [
  ["DOC-1042", "Intake form", "Open", "2h ago"],
  ["DOC-1043", "Vendor contract", "Open", "3h ago"],
  ["DOC-1047", "Claim summary", "Open", "5h ago"],
  ["DOC-1051", "Policy renewal", "Open", "Yesterday"],
  ["DOC-1052", "Audit log", "Open", "Yesterday"],
  ["DOC-1058", "Invoice batch", "Open", "2 days ago"],
  ["DOC-1061", "Onboarding pack", "Open", "3 days ago"],
];

/** A small table that switches between three rows of controls and one. */
export function OneRowToggle() {
  const [after, setAfter] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Layout" className="inline-flex rounded-lg border border-input p-0.5 text-xs">
            {[
              { label: "Before", value: false },
              { label: "After", value: true },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={after === option.value}
                onClick={() => setAfter(option.value)}
                className={cn(
                  "rounded-md px-3 py-1 font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
                  after === option.value && "bg-foreground text-background hover:text-background",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            {after ? "One row of controls. The data starts right away." : "Three rows of controls before the data starts."}
          </p>
        </div>

        <div className="h-80 overflow-hidden rounded-lg border bg-background">
          {after ? (
            <motion.div
              key="after"
              layout
              className="flex flex-wrap items-center gap-1.5 border-b px-4 py-3"
            >
              <span className="mr-1 text-sm font-semibold">Documents</span>
              <FakeSearch className="w-36" />
              <span className={cn(chipBase, chipSet, accentScope, "gap-1.5 px-(--fb-chip-px)")}>
                <XIcon aria-hidden className="size-3.5 text-muted-foreground" />
                Status
                <span className="font-medium text-primary">Open</span>
                <ChevronDownIcon aria-hidden className="-ml-0.5 size-3.5 text-primary" />
              </span>
              <span className={cn(chipBase, chipUnset, "gap-1 px-(--fb-chip-px)")}>+ More Filters</span>
              <span className={cn(chipBase, chipSet, accentScope, "gap-1.5 px-(--fb-chip-px) sm:ml-auto")}>
                Sort: Updated
                <span className="font-medium text-primary">Newest first</span>
              </span>
            </motion.div>
          ) : (
            <motion.div key="before" layout className="flex flex-col gap-2.5 border-b px-4 py-3">
              <span className="text-sm font-semibold">Documents</span>
              <FakeSearch className="w-full" />
              <div className="flex flex-wrap gap-1.5">
                {["Status", "Queue", "Date", "Sort"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex h-7 items-center gap-1 rounded-md border border-input px-2.5 text-xs"
                  >
                    {label}
                    <ChevronDownIcon aria-hidden className="size-3.5 text-muted-foreground" />
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          <motion.table layout="position" className="w-full text-left text-[13px]">
            <thead className="text-muted-foreground">
              <tr className="border-b">
                <th className="px-4 py-2 font-medium">ID</th>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="hidden px-4 py-2 text-right font-medium sm:table-cell">Updated</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([id, name, status, updated]) => (
                <tr key={id} className="border-b last:border-0">
                  <td className="px-4 py-2 font-mono text-xs">{id}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{status}</td>
                  <td className="hidden px-4 py-2 text-right text-muted-foreground sm:table-cell">{updated}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </MotionConfig>
  );
}

function FakeSearch({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-(--fb-chip-h) items-center gap-1.5 rounded-(--fb-chip-radius) border border-input px-2 text-[13px] text-muted-foreground",
        className,
      )}
    >
      <SearchIcon aria-hidden className="size-3.5" />
      Search
    </span>
  );
}
