"use client";

import { useEffect, useState } from "react";
import { ContinueReading } from "@/components/ContinueReading";
import { HomeRecentShortlists } from "@/components/HomeRecentShortlists";
import type { SiteLocale } from "@/lib/locale";

/**
 * Return-visit strips (last article + recent shortlists). Deferred until after
 * mount so the homepage hero stays within Lighthouse performance budget.
 */
export function HomeReturnVisit({ locale }: { locale: SiteLocale }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      <ContinueReading locale={locale} />
      <HomeRecentShortlists locale={locale} />
    </>
  );
}
