import { AdSenseScript } from "@/components/AdSenseScript";
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
      <AdSenseScript />
      <CompareGuideReadingChrome />
      {children}
      <CompareGuideEngagementFooter />
    </>
  );
}
