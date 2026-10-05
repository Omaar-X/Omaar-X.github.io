import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { fontDisplay, fontSans, fontScript } from "@/lib/fonts";
import { sharedOpenGraph } from "@/lib/metadata";
import { brandColors, ogImage, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    ...sharedOpenGraph,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.background,
  colorScheme: "light",
  viewportFit: "cover",
};

/** Marks the intro loader as seen for the rest of the session, before first paint. */
const introScript = `try{var k="intro-seen";if(sessionStorage.getItem(k))document.documentElement.setAttribute("data-intro-seen","");else sessionStorage.setItem(k,"1")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={cn(fontDisplay.variable, fontSans.variable, fontScript.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
