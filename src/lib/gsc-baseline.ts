/**
 * Parse and validate owner-maintained Google Search Console performance exports.
 *
 * `docs/baselines/gsc-template.csv` ships with empty metric cells. CI validates
 * structure always; when any row has metrics filled, sanity checks are enforced.
 */

export const GSC_CSV_HEADER =
  "date_range_start,date_range_end,clicks,impressions,ctr,position,note" as const;

export const GSC_CSV_COLUMNS = GSC_CSV_HEADER.split(",");

/** Warn when clicks or impressions drop more than this fraction vs committed baseline. */
export const GSC_REGRESSION_TOLERANCE = 0.1;

export type GscRow = {
  date_range_start: string;
  date_range_end: string;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  position: number | null;
  note: string;
};

export type GscValidationIssue = {
  line: number;
  message: string;
};

export type GscValidationResult = {
  ok: boolean;
  issues: GscValidationIssue[];
  /** True when at least one metric cell is populated. */
  hasFieldData: boolean;
};

export type GscPerformanceSnapshot = {
  date_range_start: string;
  date_range_end: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  note: string;
};

function parseMetricCell(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : NaN;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current);
  return cells.map((c) => c.trim());
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(parsed);
}

function rowHasMetrics(row: GscRow): boolean {
  return (
    row.clicks != null ||
    row.impressions != null ||
    row.ctr != null ||
    row.position != null ||
    row.date_range_start !== "" ||
    row.date_range_end !== ""
  );
}

function normalizeCtr(raw: number): number {
  return raw > 1 ? raw / 100 : raw;
}

export function parseGscCsv(content: string): {
  rows: GscRow[];
  issues: GscValidationIssue[];
} {
  const issues: GscValidationIssue[] = [];
  const lines = content.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  if (lines.length === 0) {
    return { rows: [], issues: [{ line: 0, message: "CSV is empty" }] };
  }

  const header = lines[0].trim();
  if (header !== GSC_CSV_HEADER) {
    issues.push({
      line: 1,
      message: `expected header "${GSC_CSV_HEADER}", got "${header}"`,
    });
  }

  const rows: GscRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i].trim();
    if (!line) continue;

    const cells = parseCsvLine(line);
    if (cells.length !== GSC_CSV_COLUMNS.length) {
      issues.push({
        line: lineNo,
        message: `expected ${GSC_CSV_COLUMNS.length} columns, got ${cells.length}`,
      });
      continue;
    }

    const [
      date_range_start,
      date_range_end,
      clicksRaw,
      impressionsRaw,
      ctrRaw,
      positionRaw,
      note,
    ] = cells;

    const clicks = parseMetricCell(clicksRaw);
    const impressions = parseMetricCell(impressionsRaw);
    const ctr = parseMetricCell(ctrRaw);
    const position = parseMetricCell(positionRaw);

    if (Number.isNaN(clicks)) {
      issues.push({ line: lineNo, message: `clicks must be a number: "${clicksRaw}"` });
    }
    if (Number.isNaN(impressions)) {
      issues.push({
        line: lineNo,
        message: `impressions must be a number: "${impressionsRaw}"`,
      });
    }
    if (Number.isNaN(ctr)) {
      issues.push({ line: lineNo, message: `ctr must be a number: "${ctrRaw}"` });
    }
    if (Number.isNaN(position)) {
      issues.push({
        line: lineNo,
        message: `position must be a number: "${positionRaw}"`,
      });
    }

    rows.push({
      date_range_start: date_range_start ?? "",
      date_range_end: date_range_end ?? "",
      clicks: Number.isNaN(clicks) ? null : clicks,
      impressions: Number.isNaN(impressions) ? null : impressions,
      ctr: Number.isNaN(ctr) ? null : ctr,
      position: Number.isNaN(position) ? null : position,
      note: note ?? "",
    });
  }

  return { rows, issues };
}

function checkPartialRows(rows: GscRow[]): GscValidationIssue[] {
  const issues: GscValidationIssue[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!rowHasMetrics(row)) continue;

    const required = [
      ["date_range_start", row.date_range_start],
      ["date_range_end", row.date_range_end],
      ["clicks", row.clicks],
      ["impressions", row.impressions],
      ["ctr", row.ctr],
      ["position", row.position],
    ] as const;

    const missing = required.filter(([, value]) => value === "" || value == null);
    if (missing.length > 0) {
      issues.push({
        line: i + 2,
        message: `fill ${missing.map(([name]) => name).join(", ")} together or leave all empty`,
      });
    }
  }
  return issues;
}

function checkRowSanity(row: GscRow, lineNo: number): GscValidationIssue[] {
  const issues: GscValidationIssue[] = [];
  if (!rowHasMetrics(row)) return issues;

  if (!isIsoDate(row.date_range_start)) {
    issues.push({
      line: lineNo,
      message: `date_range_start must be YYYY-MM-DD: "${row.date_range_start}"`,
    });
  }
  if (!isIsoDate(row.date_range_end)) {
    issues.push({
      line: lineNo,
      message: `date_range_end must be YYYY-MM-DD: "${row.date_range_end}"`,
    });
  }

  if (
    isIsoDate(row.date_range_start) &&
    isIsoDate(row.date_range_end) &&
    row.date_range_end < row.date_range_start
  ) {
    issues.push({
      line: lineNo,
      message: `date_range_end must be on or after date_range_start`,
    });
  }

  if (row.clicks != null && (row.clicks < 0 || !Number.isInteger(row.clicks))) {
    issues.push({ line: lineNo, message: `clicks must be a non-negative integer` });
  }
  if (
    row.impressions != null &&
    (row.impressions < 0 || !Number.isInteger(row.impressions))
  ) {
    issues.push({
      line: lineNo,
      message: `impressions must be a non-negative integer`,
    });
  }

  if (row.ctr != null) {
    const ctrNorm = normalizeCtr(row.ctr);
    if (ctrNorm < 0 || ctrNorm > 1) {
      issues.push({
        line: lineNo,
        message: `ctr must be between 0 and 1 (or 0–100 as a percentage)`,
      });
    }
  }

  if (row.position != null && row.position <= 0) {
    issues.push({ line: lineNo, message: `position must be greater than 0` });
  }

  if (
    row.clicks != null &&
    row.impressions != null &&
    row.impressions > 0 &&
    row.ctr != null
  ) {
    const expectedCtr = row.clicks / row.impressions;
    const actualCtr = normalizeCtr(row.ctr);
    if (Math.abs(expectedCtr - actualCtr) > 0.005) {
      issues.push({
        line: lineNo,
        message: `ctr ${row.ctr} does not match clicks/impressions (${expectedCtr.toFixed(4)})`,
      });
    }
  }

  return issues;
}

export function validateGscCsv(content: string): GscValidationResult {
  const { rows, issues: parseIssues } = parseGscCsv(content);
  const issues = [...parseIssues];

  const hasFieldData = rows.some(rowHasMetrics);
  issues.push(...checkPartialRows(rows));

  if (hasFieldData) {
    for (let i = 0; i < rows.length; i++) {
      if (!rowHasMetrics(rows[i])) continue;
      issues.push(...checkRowSanity(rows[i], i + 2));
    }
  }

  return { ok: issues.length === 0, issues, hasFieldData };
}

export function formatGscValidationErrors(result: GscValidationResult): string {
  return result.issues.map((i) => `  line ${i.line}: ${i.message}`).join("\n");
}

export function primaryGscSnapshot(rows: GscRow[]): GscPerformanceSnapshot | null {
  const filled = rows.filter(rowHasMetrics);
  if (filled.length === 0) return null;
  const row = filled[0];
  if (
    row.clicks == null ||
    row.impressions == null ||
    row.ctr == null ||
    row.position == null
  ) {
    return null;
  }
  return {
    date_range_start: row.date_range_start,
    date_range_end: row.date_range_end,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: normalizeCtr(row.ctr),
    position: row.position,
    note: row.note,
  };
}

export type GscRegressionIssue = {
  metric: "clicks" | "impressions";
  baseline: number;
  current: number;
  dropFraction: number;
};

export function compareGscSnapshots(
  baseline: GscPerformanceSnapshot,
  current: GscPerformanceSnapshot,
  tolerance = GSC_REGRESSION_TOLERANCE
): GscRegressionIssue[] {
  const issues: GscRegressionIssue[] = [];
  for (const metric of ["clicks", "impressions"] as const) {
    const base = baseline[metric];
    const cur = current[metric];
    if (base <= 0) continue;
    const drop = (base - cur) / base;
    if (drop > tolerance) {
      issues.push({
        metric,
        baseline: base,
        current: cur,
        dropFraction: drop,
      });
    }
  }
  return issues;
}
