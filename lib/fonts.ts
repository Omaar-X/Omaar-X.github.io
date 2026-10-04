import { Geist, Instrument_Sans, Instrument_Serif } from "next/font/google";

export const fontDisplay = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Editorial accent: hero roles and section statements. */
export const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});
