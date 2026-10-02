import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BotIcon,
  CheckCircle2Icon,
  KeyboardIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ARTICLE_URL, COMPONENT_SITE, PORTFOLIO_URL, REPO_URL } from "@/lib/links";
import { cn } from "@/lib/utils";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { BadgeCheck } from "@/components/animate-ui/icons/badge-check";
import { MessageSquareWarning } from "@/components/animate-ui/icons/message-square-warning";
import AnimatedButton from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import { CodeBlock } from "@/components/site/code-block";
import {
  AddRemove,
  DetailCard,
  FrozenOrder,
  OneClickDates,
  SortStaysVisible,
  TwoTiers,
} from "@/components/site/details";
import { Frame } from "@/components/site/frame";
import { CommandPill } from "@/components/site/install-tabs";
import { PageShell } from "@/components/site/page-shell";
import { ToolbarPreview } from "@/components/site/toolbar-preview";
import { BeforeAfter, sketches } from "@/components/site/why-sketches";

import { DemoClient } from "@/components/case/demo-client";
import { Glance } from "@/components/case/glance";

export const metadata: Metadata = {
  title: "Crafting a modular filtering framework · Case study",
  description:
    "One filter pattern for four data-heavy products, now an open-source component that people and AI agents install with one command.",
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "impact", label: "Impact" },
  { id: "context", label: "Context" },
  { id: "problems", label: "What went wrong" },
  { id: "principles", label: "Principles" },
  { id: "craft", label: "The craft" },
  { id: "system", label: "Component system" },
  { id: "outcome", label: "Outcome" },
];

const PROBLEMS: { title: string; body: string; sketch: keyof typeof sketches }[] = [
  {
    title: "Filters hid behind a button",
    body: "You saw a count, not the filters. Checking meant reopening the menu.",
    sketch: "hiddenFilters",
  },
  {
    title: "Sorting vanished on wide tables",
    body: "Once the sorted column scrolled away, the order was a mystery.",
    sketch: "invisibleSort",
  },
  {
    title: "Every filter weighed the same",
    body: "Key filters were buried among ones almost nobody used.",
    sketch: "equalWeight",
  },
  {
    title: "Controls competed with the data",
    body: "Title, search and filters each took a row before the data began.",
    sketch: "competingForSpace",
  },
];

const AGENT_SETUP = `
// components.json: add the registry once
"registries": {
  "@filters": "https://filter-components-nu.vercel.app/r/{name}.json"
}

// then, by hand or through an AI agent with the shadcn MCP server
npx shadcn@latest add @filters/filter-bar
`;

export default function CaseStudyPage() {
  return (
    <PageShell sections={SECTIONS}>
      {/* --- Overview --------------------------------------------------------------- */}
      <section id="overview" aria-labelledby="overview-title" className="flex scroll-mt-24 flex-col gap-8">
        <div className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">Case study · Component design · Interactions</p>
          <GooeyTextReveal>
            <h1
              id="overview-title"
              className="max-w-3xl font-(family-name:--font-display) text-5xl leading-[1.05] font-normal tracking-tight text-balance sm:text-6xl"
            >
              Crafting a modular filtering framework for data-heavy products
            </h1>
          </GooeyTextReveal>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            One filter pattern for four products. Now an open-source component that people and AI
            agents install with one command.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 text-sm sm:grid-cols-4">
          <Meta label="Role">Lead Product Designer</Meta>
          <Meta label="Timeline">2 months, 2025</Meta>
          <Meta label="Team">Product designer, front-end lead, front-end developer</Meta>
          <Meta label="Now">Open source, 2026</Meta>
        </dl>

        <Frame grid={false} stageClassName="overflow-hidden">
          <DemoClient syncUrl={false} variant="compact" focusToolbar className="h-[24rem]" />
        </Frame>

        <div className="flex flex-wrap gap-2">
          <ExploreButton />
          <Button asChild variant="outline" className="h-10 px-4">
            <a href={REPO_URL}>Source on GitHub</a>
          </Button>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
          <Glance
            label="Problem"
            labelClassName="text-(--problem)"
            icon={<MessageSquareWarning size={56} className="text-(--problem)" />}
          >
            Filters hid in menus, so people lost track of what was filtered and sorted.
          </Glance>
          <Glance
            label="Outcome"
            labelClassName="text-(--fb-accent)"
            icon={<BadgeCheck size={56} className="text-(--fb-accent)" />}
          >
            One toolbar that keeps every filter and the sort in view, now a tested, installable
            component.
          </Glance>
        </div>
      </section>

      {/* --- Impact ----------------------------------------------------------------- */}
      <CaseSection id="impact" title="Impact">
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border">
          <ImpactCard figure="5×" title="Faster filtering">
            People set and changed filters in seconds, not minutes, in design reviews.
          </ImpactCard>
          <ImpactCard figure="3+" title="Products on one pattern">
            One system replaced each product&apos;s own filters and cut handoff back-and-forth by
            about 40%.
          </ImpactCard>
          <ImpactCard figure="1" title="Command to install">
            Open source, and added to any shadcn project by people or AI agents in one step.
          </ImpactCard>
        </div>
      </CaseSection>

      {/* --- Context ---------------------------------------------------------------- */}
      <CaseSection
        id="context"
        title="Context"
        lead="Four products had the same problem in their data tables. One pattern fixed it for all of them."
      >
        <ul className="flex flex-wrap gap-2">
          {["Data archival tool", "Document management system", "CRM", "Micro-video learning platform"].map(
            (product) => (
              <li key={product} className="rounded-full border bg-(--surface-raised) px-3 py-1 text-sm">
                {product}
              </li>
            ),
          )}
        </ul>
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniCard title="Prototyped in v0 first">
            It showed the micro-interactions a static screen can&apos;t.
          </MiniCard>
          <MiniCard title="Faster buy-in">
            Stakeholders tried it instead of imagining it.
          </MiniCard>
          <MiniCard title="A clearer handoff">
            Developers built from a live reference.
          </MiniCard>
        </div>
      </CaseSection>

      {/* --- What went wrong -------------------------------------------------------- */}
      <CaseSection id="problems" title="What went wrong">
        <ol className="flex flex-col gap-10">
          {PROBLEMS.map((problem, index) => (
            <li key={problem.title} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="flex items-baseline gap-3 text-lg font-medium">
                  <span className="font-(family-name:--font-display) text-2xl text-(--problem-muted) tabular-nums">
                    0{index + 1}
                  </span>
                  {problem.title}
                </h3>
                <p className="max-w-2xl text-sm text-pretty text-muted-foreground">{problem.body}</p>
              </div>
              <BeforeAfter {...sketches[problem.sketch]} />
            </li>
          ))}
        </ol>
      </CaseSection>

      {/* --- Principles ------------------------------------------------------------- */}
      <CaseSection
        id="principles"
        title="Three principles"
        lead="Filtering should feel like a conversation with the data, not a control panel. Each one below is live."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DetailCard
            className="md:col-span-2"
            title="1. Context is always on"
            why="Every filter, and the sort, shows as a chip. Nothing hides in a menu."
            stageClassName="min-h-40 px-6"
          >
            <div className="w-full">
              <ToolbarPreview />
            </div>
          </DetailCard>
          <DetailCard
            title="2. Two tiers, not one list"
            why="Key filters stay up front. The rest wait in a searchable menu."
            stageClassName="min-h-48 justify-start px-5"
          >
            <TwoTiers />
          </DetailCard>
          <DetailCard
            title="3. The data takes centre stage"
            why="Title, search, filters and sort share one row."
            grid={false}
          >
            <div className="w-full max-w-sm">
              <BeforeAfter {...sketches.competingForSpace} />
            </div>
          </DetailCard>
        </div>
      </CaseSection>

      {/* --- Craft ------------------------------------------------------------------ */}
      <CaseSection
        id="craft"
        title="The craft in the details"
        lead="Small decisions make it feel good. Try them."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DetailCard
            title="Rows never jump under your cursor"
            why="Selected options move to the top when the list opens, then stay put."
          >
            <FrozenOrder />
          </DetailCard>
          <DetailCard
            title="Humanised dates, in one click"
            why="“1 week ago”, not a calendar. Presets apply in one click."
          >
            <OneClickDates />
          </DetailCard>
          <DetailCard
            title="Add and remove with one control"
            why="The + becomes the × that removes it."
            stageClassName="min-h-48"
          >
            <AddRemove />
          </DetailCard>
          <DetailCard
            title="Apply, for heavy tables"
            why="Large tables update on Apply, not on every click."
            stageClassName="min-h-48"
          >
            <p className="max-w-56 text-center text-sm text-muted-foreground">
              Editors wait for Apply, except date presets and ×.
            </p>
          </DetailCard>
          <DetailCard
            className="md:col-span-2"
            grid={false}
            title="Sort that doesn't scroll away"
            why="The sort chip keeps the order visible when its column scrolls away."
            stageClassName="items-stretch justify-stretch p-0 overflow-hidden"
          >
            <SortStaysVisible />
          </DetailCard>
        </div>
      </CaseSection>

      {/* --- Component system ------------------------------------------------------- */}
      <CaseSection
        id="system"
        title="Now a component system, for people and agents"
        lead="Written as a spec, tested rule by rule, and installable by people or AI agents."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Feature icon={<TerminalIcon aria-hidden />} title="One command">
            The shadcn CLI copies the source and its styles into your project.
          </Feature>
          <Feature icon={<BotIcon aria-hidden />} title="Agent-ready">
            A named registry and llms.txt let AI agents find and install it.
          </Feature>
          <Feature icon={<KeyboardIcon aria-hidden />} title="Keyboard first">
            Works fully from the keyboard, and respects reduced motion.
          </Feature>
          <Feature icon={<PaletteIcon aria-hidden />} title="Yours to restyle">
            Every size and colour is a CSS variable.
          </Feature>
        </div>

        <div className="flex flex-col gap-3">
          <CommandPill className="h-10 max-w-2xl" />
          <CodeBlock title="For AI agents and teams">{AGENT_SETUP}</CodeBlock>
        </div>
      </CaseSection>

      {/* --- Outcome ---------------------------------------------------------------- */}
      <CaseSection id="outcome" title="Outcome">
        {/* Drifting green bubbles behind the close. The colours stay light enough that the text
            and the accent checks keep AA contrast wherever a bubble passes. */}
        <div className="relative isolate overflow-hidden rounded-2xl border">
          <BubbleBackground
            interactive
            colors={BUBBLE_COLORS}
            className="absolute inset-0 -z-10 bg-linear-to-br from-[oklch(0.97_0.02_165)] to-[oklch(0.99_0.005_200)]"
          />
          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <blockquote className="max-w-3xl font-(family-name:--font-display) text-3xl leading-snug font-normal text-pretty text-foreground">
              Clarity without clutter, and control without complexity. A filter isn&apos;t just a
              tool; it&apos;s the start of a conversation with the data.
            </blockquote>
            <ul className="flex flex-col gap-2 text-sm text-foreground">
              {[
                "One source of truth for every data table.",
                "A calmer interface that keeps the focus on the data.",
                "Open source, for other teams and their agents.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-(--fb-accent)" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <ExploreButton />
              <Button asChild variant="outline" className="h-10 px-4">
                <a href={ARTICLE_URL}>
                  Read the original article
                  <ArrowUpRightIcon aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <a
          href={PORTFOLIO_URL}
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Back to portfolio
        </a>
      </CaseSection>
    </PageShell>
  );
}

/** Pale greens and teals: every channel over half, so overlapping bubbles lighten, never muddy. */
const BUBBLE_COLORS = {
  first: "167,235,205",
  second: "160,228,232",
  third: "190,240,200",
  fourth: "150,225,195",
  fifth: "175,232,225",
  sixth: "140,220,190",
};

function ExploreButton() {
  return (
    <AnimatedButton as="a" href={COMPONENT_SITE} className="h-10 gap-1.5 px-5 text-sm">
      Explore the component
      <ArrowUpRightIcon aria-hidden className="ml-1.5 size-4" />
    </AnimatedButton>
  );
}

function CaseSection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2
          id={`${id}-title`}
          className="font-(family-name:--font-display) text-[2.5rem] leading-[1.1] font-normal tracking-tight text-balance"
        >
          {title}
        </h2>
        {lead && <p className="max-w-2xl text-base text-pretty text-muted-foreground">{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-pretty">{children}</dd>
    </div>
  );
}

function ImpactCard({ figure, title, children }: { figure: string; title: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-6 bg-(--surface-raised) p-6 sm:gap-8">
      <p className="w-20 shrink-0 font-(family-name:--font-display) text-6xl leading-none text-(--fb-accent) sm:w-24">
        {figure}
      </p>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="max-w-xl text-sm text-pretty text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

function MiniCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border bg-(--surface-raised) p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-[13px] text-pretty text-muted-foreground">{children}</p>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border bg-(--surface-raised) p-4">
      <span className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background text-(--fb-accent) [&_svg]:size-4")}>
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-[13px] text-pretty text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
