import {
  CompareGuideEngagementFooter,
  CompareGuideReadingChrome,
} from "@/components/CompareGuidePageChrome";

export default function CompareGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CompareGuideReadingChrome />
      {children}
      <CompareGuideEngagementFooter />
    </>
  );
}
