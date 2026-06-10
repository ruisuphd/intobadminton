"use client";

import dynamic from "next/dynamic";
import type { SiteLocale } from "@/lib/locale";

const ContinueReading = dynamic(
  () =>
    import("@/components/ContinueReading").then((m) => m.ContinueReading),
  { ssr: false }
);

/** Defers shortlist + last-read UI so the homepage initial bundle stays lean. */
export function HomeContinueReading({ locale }: { locale: SiteLocale }) {
  return (
    <div data-home-continue-reading="">
      <ContinueReading locale={locale} />
    </div>
  );
}
