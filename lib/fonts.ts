import { Archivo, Caveat, Geist } from "next/font/google";

/** Display: headings and the hero name. The width axis runs from regular to expanded (125). */
export const fontDisplay = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Hand-written kicker above section headings ("/ Selected Work"). Accent only, never body copy. */
export const fontScript = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});
