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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Dark only, like the component site's default.
    <html lang="en" className={cn("font-sans", geist.variable, geistMono.variable, fraunces.variable)}>
      <body className="bg-background text-foreground antialiased">
        <TooltipProvider>
          <SiteHeader />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
