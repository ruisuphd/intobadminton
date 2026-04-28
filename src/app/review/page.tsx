import type { Metadata } from "next";
import { ReviewForm } from "./ReviewForm";
import type { SiteLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Submit equipment review — IntoBadminton",
  description:
    "Submit a structured badminton equipment review to improve future recommendations.",
};

export function ReviewShell({ locale = "en" }: { locale?: SiteLocale }) {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <p className="text-sm font-medium text-[var(--color-accent)]">
          {locale === "zh" ? "第一方评价" : "First-party review"}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text)]">
          {locale === "zh"
            ? "帮助建立更有用的羽毛球装备数据集。"
            : "Help build the most useful badminton equipment dataset."}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          {locale === "zh"
            ? "Reddit 和论坛数据需要遵守授权和平台条款。你主动提交并同意使用的评价，是未来改进推荐最安全、质量最高的信号。"
            : "Reddit and forum data are permission-gated. Your consented review is the safest, highest-quality signal for future recommendations."}
        </p>
        <ReviewForm />
      </div>
    </main>
  );
}

export default function ReviewPage() {
  return <ReviewShell locale="en" />;
}
