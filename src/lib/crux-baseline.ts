/**
 * Parse and validate owner-maintained CrUX field-data exports.
 *
 * `docs/baselines/crux-template.csv` ships with empty metric cells. CI validates
 * structure always; when any row has LCP/INP/CLS filled, thresholds are enforced.
 */

export const CRUX_CSV_HEADER =
  "url,device,lcp_ms,inp_ms,cls,note" as const;

export const CRUX_CSV_COLUMNS = CRUX_CSV_HEADER.split(",");

/** Google "good" Core Web Vitals (mobile field data). */
export const CRUX_GOOD_THRESHOLDS = {
  lcp_ms: 2500,
  inp_ms: 200,
  cls: 0.1,
} as const;

export type CruxDevice = "mobile" | "desktop";

export type CruxRow = {
  url: string;
  device: CruxDevice;
  lcp_ms: number | null;
  inp_ms: number | null;
  cls: number | null;
  note: string;
};

export type CruxValidationIssue = {
  line: number;
  message: string;
};

export type CruxValidationResult = {
  ok: boolean;
  issues: CruxValidationIssue[];
  /** True when at least one metric cell is populated. */
  hasFieldData: boolean;
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

export function parseCruxCsv(content: string): {
  rows: CruxRow[];
  issues: CruxValidationIssue[];
} {
  const issues: CruxValidationIssue[] = [];
  const lines = content.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  if (lines.length === 0) {
    return { rows: [], issues: [{ line: 0, message: "CSV is empty" }] };
  }

  const header = lines[0].trim();
  if (header !== CRUX_CSV_HEADER) {
    issues.push({
      line: 1,
      message: `expected header "${CRUX_CSV_HEADER}", got "${header}"`,
    });
  }

  const rows: CruxRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i].trim();
    if (!line) continue;

    const cells = parseCsvLine(line);
    if (cells.length !== CRUX_CSV_COLUMNS.length) {
      issues.push({
        line: lineNo,
        message: `expected ${CRUX_CSV_COLUMNS.length} columns, got ${cells.length}`,
      });
      continue;
    }

    const [url, deviceRaw, lcpRaw, inpRaw, clsRaw, note] = cells;
    try {
      const parsed = new URL(url);
      if (!parsed.protocol.startsWith("http")) {
        issues.push({ line: lineNo, message: `invalid url: ${url}` });
      }
    } catch {
      issues.push({ line: lineNo, message: `invalid url: ${url}` });
    }

    const device = deviceRaw as CruxDevice;
    if (device !== "mobile" && device !== "desktop") {
      issues.push({
        line: lineNo,
        message: `device must be mobile or desktop, got "${deviceRaw}"`,
      });
    }

    const lcp_ms = parseMetricCell(lcpRaw);
    const inp_ms = parseMetricCell(inpRaw);
    const cls = parseMetricCell(clsRaw);

    if (Number.isNaN(lcp_ms)) {
      issues.push({ line: lineNo, message: `lcp_ms must be a number: "${lcpRaw}"` });
    }
    if (Number.isNaN(inp_ms)) {
      issues.push({ line: lineNo, message: `inp_ms must be a number: "${inpRaw}"` });
    }
    if (Number.isNaN(cls)) {
      issues.push({ line: lineNo, message: `cls must be a number: "${clsRaw}"` });
    }

    rows.push({
      url,
      device: device as CruxDevice,
      lcp_ms: Number.isNaN(lcp_ms) ? null : lcp_ms,
      inp_ms: Number.isNaN(inp_ms) ? null : inp_ms,
      cls: Number.isNaN(cls) ? null : cls,
      note: note ?? "",
    });
  }

  return { rows, issues };
}

function rowHasMetrics(row: CruxRow): boolean {
  return row.lcp_ms != null || row.inp_ms != null || row.cls != null;
}

function checkThresholds(row: CruxRow, lineNo: number): CruxValidationIssue[] {
  const issues: CruxValidationIssue[] = [];
  if (row.lcp_ms != null && row.lcp_ms > CRUX_GOOD_THRESHOLDS.lcp_ms) {
    issues.push({
      line: lineNo,
      message: `${row.url} (${row.device}) LCP ${row.lcp_ms}ms exceeds good threshold ${CRUX_GOOD_THRESHOLDS.lcp_ms}ms`,
    });
  }
  if (row.inp_ms != null && row.inp_ms > CRUX_GOOD_THRESHOLDS.inp_ms) {
    issues.push({
      line: lineNo,
      message: `${row.url} (${row.device}) INP ${row.inp_ms}ms exceeds good threshold ${CRUX_GOOD_THRESHOLDS.inp_ms}ms`,
    });
  }
  if (row.cls != null && row.cls > CRUX_GOOD_THRESHOLDS.cls) {
    issues.push({
      line: lineNo,
      message: `${row.url} (${row.device}) CLS ${row.cls} exceeds good threshold ${CRUX_GOOD_THRESHOLDS.cls}`,
    });
  }
  return issues;
}

/** Require complete metrics on any row that has at least one metric filled. */
function checkPartialRows(rows: CruxRow[]): CruxValidationIssue[] {
  const issues: CruxValidationIssue[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!rowHasMetrics(row)) continue;
    if (row.lcp_ms == null || row.inp_ms == null || row.cls == null) {
      issues.push({
        line: i + 2,
        message: `${row.url} (${row.device}): fill lcp_ms, inp_ms, and cls together or leave all empty`,
      });
    }
  }
  return issues;
}

export function validateCruxCsv(content: string): CruxValidationResult {
  const { rows, issues: parseIssues } = parseCruxCsv(content);
  const issues = [...parseIssues];

  const hasFieldData = rows.some(rowHasMetrics);
  issues.push(...checkPartialRows(rows));

  if (hasFieldData) {
    for (let i = 0; i < rows.length; i++) {
      if (!rowHasMetrics(rows[i])) continue;
      issues.push(...checkThresholds(rows[i], i + 2));
    }
  }

  const seen = new Set<string>();
  for (let i = 0; i < rows.length; i++) {
    const key = `${rows[i].url}|${rows[i].device}`;
    if (seen.has(key)) {
      issues.push({
        line: i + 2,
        message: `duplicate url+device: ${rows[i].url} (${rows[i].device})`,
      });
    }
    seen.add(key);
  }

  return { ok: issues.length === 0, issues, hasFieldData };
}

export function formatCruxValidationErrors(result: CruxValidationResult): string {
  return result.issues.map((i) => `  line ${i.line}: ${i.message}`).join("\n");
}
