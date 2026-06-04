import {
  GuideEngagementFooter,
  GuideReadingChrome,
} from "@/components/GuidePageChrome";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GuideReadingChrome />
      {children}
      <GuideEngagementFooter />
    </>
  );
}
