/**
 * SSR anchor for {@link GuideInPageToc}. Reserves vertical space so the
 * client-portalled ToC does not cause layout shift (Lighthouse CLS).
 */
export function GuideTocSlot() {
  return (
    <div
      id="guide-toc-anchor"
      className="mb-8 min-h-[11rem] empty:min-h-[11rem]"
      aria-hidden
    />
  );
}
