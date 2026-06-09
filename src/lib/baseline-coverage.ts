export type BaselineE2eCoverage = {
  minE2eGuards?: number;
};

export type BaselineCoverageIssue = {
  id: string;
  message: string;
};

export function evaluateBaselineE2eCoverage(
  coverage: BaselineE2eCoverage | undefined,
  queries: { e2e?: boolean }[],
  guardLabel: string
): BaselineCoverageIssue | null {
  if (coverage?.minE2eGuards == null) return null;

  const e2eCount = queries.filter((q) => q.e2e).length;
  if (e2eCount < coverage.minE2eGuards) {
    return {
      id: "coverage",
      message: `${guardLabel} e2e guards ${e2eCount} below minE2eGuards ${coverage.minE2eGuards}`,
    };
  }

  return null;
}
