import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
// A soft display serif for the headings.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

const description =
  "Case study by Nahid Noushathu: one filtering pattern for four data-heavy products, now an open-source, agent-ready component system.";

export const metadata: Metadata = {
  title: "Crafting a modular filtering framework · Case study",
  description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : `http://localhost:${process.env.PORT ?? 5005}`),
  ),
  openGraph: { type: "article", title: "Crafting a modular filtering framework for data-heavy products", description },
  twitter: { card: "summary_large_image", title: "Crafting a modular filtering framework for data-heavy products", description },
};

const REVEAL_SCRIPT = `document.documentElement.classList.add("reveal");setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove("reveal")},3000);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Light, shifting to dark with the scroll from "Component system" down (ThemeScroll).
    // suppressHydrationWarning: the script below adds a class before React hydrates.
    <html
      lang="en"
      className={cn("font-sans", geist.variable, geistMono.variable, fraunces.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Turns on the scroll entrances before first paint, so nothing flashes in and out.
            If the page's JavaScript never runs, the content shows again after 3 s. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <TooltipProvider>
          <SiteHeader />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
