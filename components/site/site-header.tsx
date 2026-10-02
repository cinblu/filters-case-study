import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import { COMPONENT_SITE, PORTFOLIO_URL } from "@/lib/links";
import AnimatedButton from "@/components/ui/animated-button";

/** A slim bar: back to the portfolio on the left, the component on the right. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-14 w-full items-center gap-4 px-4 sm:px-6">
        <a
          href={PORTFOLIO_URL}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm whitespace-nowrap text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Back to portfolio
        </a>
        <div className="ml-auto">
          <AnimatedButton as="a" href={COMPONENT_SITE} className="h-8 border-input px-3 text-sm whitespace-nowrap">
            Explore the component
            <ArrowUpRightIcon aria-hidden className="ml-1.5 size-3.5" />
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
}
