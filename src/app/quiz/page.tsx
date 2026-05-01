import type { Metadata } from "next";
import { QuizFunnel } from "./QuizFunnel";

export const metadata: Metadata = {
  title: "Badminton equipment finder — IntoBadminton",
  description: "Answer a few questions to get badminton equipment recommendations.",
  alternates: { canonical: "/quiz/" },
  robots: { index: false, follow: true },
};

export function QuizShell() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <QuizFunnel />
      </div>
    </main>
  );
}

export default function QuizPage() {
  return <QuizShell />;
}
