import { AdSenseScript } from "@/components/AdSenseScript";
import {
  GuideEngagementFooter,
  GuideInPageNavigation,
  GuideReadingChrome,
} from "@/components/GuidePageChrome";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdSenseScript />
      <GuideReadingChrome />
      {children}
      <GuideInPageNavigation />
      <GuideEngagementFooter />
    </>
  );
}
