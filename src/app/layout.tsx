import type { Metadata } from "next";
import {
  Instrument_Sans,
  Newsreader,
  Spline_Sans_Mono,
} from "next/font/google";
import { AppShell } from "@/components/shell/app-shell";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Inquest — Evaluation Survey for Language Models",
    template: "%s · Inquest",
  },
  description:
    "Inquest is a developer-focused LLM evaluation platform: benchmarks, judges, regressions, and model comparisons on one calibrated instrument.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} ${splineSansMono.variable} h-full`}
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
