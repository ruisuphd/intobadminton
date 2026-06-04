import { ArticleEngagementFooter } from "@/components/ArticleEngagementFooter";
import { ReadingProgress } from "@/components/ReadingProgress";

/**
 * Reading progress + engagement footer for comparison articles that are not
 * two-product CompareGuidePage layouts (brand family, sport crossover, etc.).
 */
export function CompareConceptChrome({
  contentId,
  url,
  title,
  children,
}: {
  contentId: string;
  url: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 py-16">
      <ReadingProgress />
      {children}
      <div className="layout-band max-w-3xl pb-8">
        <ArticleEngagementFooter contentId={contentId} url={url} title={title} />
      </div>
    </main>
  );
}
