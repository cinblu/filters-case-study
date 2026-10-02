import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BotIcon,
  FocusIcon,
  KeyboardIcon,
  PackageOpenIcon,
  PaletteIcon,
  Rows3Icon,
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
} from "@/components/site/details";
import { Frame } from "@/components/site/frame";
import { CommandPill } from "@/components/site/install-tabs";
import { PageShell } from "@/components/site/page-shell";
import { ToolbarPreview } from "@/components/site/toolbar-preview";
import { BeforeAfter, sketches } from "@/components/site/why-sketches";

import { DemoClient } from "@/components/case/demo-client";
import { Glance } from "@/components/case/glance";
import { Converge, ImpactRow, SpeedBars, TypedCommand } from "@/components/case/impact";
import { OneRowToggle, TierSplit } from "@/components/case/principles";
import { RevealOnScroll } from "@/components/case/reveal";
import { ThemeScroll } from "@/components/case/theme-scroll";

export const metadata: Metadata = {
  title: "Crafting a modular filtering framework · Case study",
  description:
    "One filter pattern for four data-heavy products, now an open-source component that people and AI agents install with one command.",
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "impact", label: "Impact" },
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
      <ThemeScroll fromId="system" />
      <RevealOnScroll />
      {/* --- Overview --------------------------------------------------------------- */}
      <section id="overview" aria-labelledby="overview-title" className="flex scroll-mt-24 flex-col gap-8">
        <div className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">Case study · Component design · Interactions</p>
          <GooeyTextReveal>
            <h1
              id="overview-title"
              className="max-w-3xl font-(family-name:--font-display) text-[2.5rem] leading-[1.05] font-normal tracking-tight text-balance sm:text-6xl"
            >
              Crafting a modular filtering framework for data&#8209;heavy products
            </h1>
          </GooeyTextReveal>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            One filter pattern for four products. Now an open-source component that people and AI
            agents install with one command.
          </p>
        </div>

        <dl data-reveal className="grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 text-sm sm:grid-cols-4">
          <Meta label="Role">Lead Product Designer</Meta>
          <Meta label="Timeline">2 months, 2025</Meta>
          <Meta label="Team">Product designer, front-end lead, front-end developer</Meta>
          <Meta label="Now">Open source, 2026</Meta>
        </dl>

        <div data-reveal>
          <Frame grid={false} stageClassName="overflow-hidden">
            <DemoClient syncUrl={false} variant="compact" focusToolbar className="h-[24rem]" />
          </Frame>
        </div>

        <div data-reveal className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
          <ExploreButton />
          <Button asChild variant="outline" className="h-10 px-4">
            <a href={REPO_URL}>Source on GitHub</a>
          </Button>
        </div>

        <div
          data-reveal-children
          className="grid grid-cols-1 divide-y overflow-hidden rounded-2xl border bg-(--surface-raised) sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        >
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
        <div data-reveal-children className="grid grid-cols-1 divide-y overflow-hidden rounded-2xl border bg-(--surface-raised)">
          <ImpactRow value={5} suffix="×" title="Faster filtering" visual={<SpeedBars />}>
            People set and changed filters in seconds, not minutes, in design reviews.
          </ImpactRow>
          <ImpactRow value={3} suffix="+" title="Products on one pattern" visual={<Converge />}>
            One system replaced each product&apos;s own filters and cut handoff back-and-forth by
            about 40%.
          </ImpactRow>
          <ImpactRow value={1} title="Command to install" visual={<TypedCommand />}>
            Open source, and added to any shadcn project by people or AI agents in one step.
          </ImpactRow>
        </div>
      </CaseSection>

      {/* --- What went wrong -------------------------------------------------------- */}
      <CaseSection id="problems" title="What went wrong">
        <div data-reveal-children className="flex flex-col gap-3">
          <p className="text-lg font-medium">
            Four products had the same problem in their data tables.
            <br />
            One pattern fixed it for all of them.
          </p>
          <ul className="flex flex-wrap gap-2">
            {["Data archival tool", "Document management system", "CRM", "Micro-video learning platform"].map(
              (product) => (
                <li key={product} className="rounded-full border bg-(--surface-raised) px-3 py-1 text-sm">
                  {product}
                </li>
              ),
            )}
          </ul>
        </div>
        <ol data-reveal-children className="flex flex-col gap-10">
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
        <div data-reveal-children className="flex flex-col gap-4">
          <DetailCard
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
            stageClassName="px-6 py-8"
          >
            <TierSplit />
          </DetailCard>
          <DetailCard
            title="3. The data takes centre stage"
            why="Title, search, filters and sort share one row, so the data starts sooner."
            grid={false}
            stageClassName="items-stretch justify-stretch p-4 sm:p-6"
          >
            <OneRowToggle />
          </DetailCard>
        </div>
      </CaseSection>

      {/* --- Craft ------------------------------------------------------------------ */}
      <CaseSection
        id="craft"
        title="The craft in the details"
        lead="Small decisions make it feel good. Try them."
      >
        <div data-reveal-children className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <div data-reveal-children className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

        <div data-reveal-children className="flex flex-col gap-3">
          <CommandPill className="h-10 max-w-2xl" />
          <CodeBlock title="For AI agents and teams">{AGENT_SETUP}</CodeBlock>
        </div>
      </CaseSection>

      {/* --- Outcome ---------------------------------------------------------------- */}
      <CaseSection id="outcome" title="Outcome">
        {/* Drifting green bubbles behind the close (the page is dark by now). The colours stay
            dark enough that white text and the accent icons keep AA contrast over any bubble. */}
        <div data-reveal className="relative isolate overflow-hidden rounded-2xl border">
          <BubbleBackground
            interactive
            colors={BUBBLE_COLORS}
            className="absolute inset-0 -z-10 bg-linear-to-br from-[oklch(0.2_0.04_170)] to-[oklch(0.14_0.01_200)]"
          />
          <div className="flex flex-col gap-6 p-5 sm:p-10">
            <blockquote className="max-w-3xl font-(family-name:--font-display) text-2xl leading-snug sm:text-3xl font-normal text-pretty text-white">
              Clarity without clutter, and control without complexity. A filter isn&apos;t just a
              tool; it&apos;s the start of a conversation with the data.
            </blockquote>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {OUTCOMES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black/30 ring-1 ring-white/20">
                    <Icon aria-hidden className="size-5 text-(--fb-accent)" />
                  </span>
                  <span className="text-sm text-balance text-white/90">{text}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
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
          data-reveal
          href={PORTFOLIO_URL}
          className="mt-2.5 inline-flex items-center gap-1.5 self-start rounded-sm py-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Back to portfolio
        </a>
      </CaseSection>
    </PageShell>
  );
}

/** Deep greens and teals: every channel under half, so overlapping bubbles darken, never glare. */
const BUBBLE_COLORS = {
  first: "12,92,74",
  second: "8,74,86",
  third: "22,84,52",
  fourth: "6,70,58",
  fifth: "14,96,90",
  sixth: "30,104,82",
};

const OUTCOMES = [
  { icon: Rows3Icon, text: "One source of truth for every data table." },
  { icon: FocusIcon, text: "A calmer interface that keeps the focus on the data." },
  { icon: PackageOpenIcon, text: "Open source, for other teams and their agents." },
];

function ExploreButton() {
  return (
    <AnimatedButton as="a" href={COMPONENT_SITE} className="h-10 gap-1.5 border-input px-5 text-sm">
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
      <div data-reveal-children className="flex flex-col gap-2">
        <h2
          id={`${id}-title`}
          className="font-(family-name:--font-display) text-[2rem] leading-[1.1] font-normal tracking-tight text-balance sm:text-[2.5rem]"
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
