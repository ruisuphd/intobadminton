/**
 * Reserved slot for the client-built guide table of contents. Present in the
 * initial HTML so Lighthouse and readers do not see layout shift when the
 * ToC hydrates into `#guide-toc-anchor`.
 */
export function GuideTocAnchor() {
  return <div id="guide-toc-anchor" className="mb-8 min-h-48" />;
}
