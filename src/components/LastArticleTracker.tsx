"use client";

import { useEffect } from "react";
import { recordLastArticleView } from "@/components/ContinueReading";

export function LastArticleTracker({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  useEffect(() => {
    recordLastArticleView({
      href,
      title,
      viewedAt: new Date().toISOString(),
    });
  }, [href, title]);

  return null;
}
