import { AUTHOR, COMPONENT_SITE, PORTFOLIO_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

/** Credits, and the ways back out. */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex flex-col gap-1.5 border-t pt-6 text-xs text-pretty text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground",
        className,
      )}
    >
      <p>
        Designed and built by <a href={AUTHOR.linkedin}>{AUTHOR.name}</a>.
      </p>
      <p>
        <a href={PORTFOLIO_URL}>Portfolio</a> · <a href={COMPONENT_SITE}>The component</a>
      </p>
    </footer>
  );
}
