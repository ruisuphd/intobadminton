import { AdSlot } from "@/components/AdSlot";
import { QuizFunnel } from "./QuizFunnel";

export function QuizShell() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <QuizFunnel />
        <AdSlot id="quiz-inline" />
      </div>
    </main>
  );
}

export default function QuizPage() {
  return <QuizShell />;
}
