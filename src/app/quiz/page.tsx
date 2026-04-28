import { AdSlot } from "@/components/AdSlot";
import { QuizFunnel } from "./QuizFunnel";

export function QuizShell({ locale = "en" }: { locale?: "en" | "zh" }) {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <QuizFunnel locale={locale} />
        <AdSlot id={`${locale}-quiz-inline`} />
      </div>
    </main>
  );
}

export default function QuizPage() {
  return <QuizShell locale="en" />;
}
