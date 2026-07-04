#!/usr/bin/env python3
"""
Import blogs/*.md English sections into src/data/blog-articles.json (Option B).
Preserves existing blogSlugs / URLs. Strips URLs, images, Chinese. 20-pass QA.
"""

from __future__ import annotations

import json
import os
import re
import textwrap
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_blogs_raw = os.environ.get("BLOGS_DIR", "").strip()
BLOGS = Path(_blogs_raw) if _blogs_raw else ROOT / "blogs"
if not BLOGS.is_absolute():
    BLOGS = ROOT / BLOGS
LEGACY_TS = ROOT / "scripts/archive/blog.legacy.ts"
SLUG_MAP = ROOT / "scripts/blog-slug-source-map.json"
REVIEW_MAP = ROOT / "src/data/blog-review-product-map.json"
CANONICAL = ROOT / "scripts/blog-translation-canonical-names.json"
GLOSSARY_PAGE = ROOT / "src/app/guides/glossary/page.tsx"
OUT_JSON = ROOT / "src/data/blog-articles.json"
REPORT = ROOT / "scripts/blog-import-option-b-report.json"

MARKER = "## English Translation"
PASSES = 20

# Original site editorials — keep legacy TS bodies, not forum sources
LEGACY_ONLY = {
    "racket-balance-vs-swing-speed",
    "how-to-read-badminton-reviews",
    "beginner-racket-mistakes",
    "badminton-string-selector",
    "badminton-shoe-fit-stability",
    "badminton-bag-loadout",
    "used-racket-depreciation",
    "badminton-equipment-for-kids",
    "badminton-glossary-terms-every-player-should-know",
    "yonex-grip-sizes-explained",
    "how-to-choose-a-badminton-racket",
}

# Keep legacy editorial bodies when markdown would duplicate another live slug.
LEGACY_PREFERRED = {
    "victor-drivex-12-vs-astrox-88d-pro",
    "li-ning-thunder-100-gen-2-vs-gen-1",
}

TITLE_OVERRIDES = {
    "yonex-nanoflare-1000z-review": "Yonex Nanoflare 1000 Z review: speed flagship with real control",
    "yonex-nanoflare-1000z-play-review": "Nanoflare 1000 Z vs 1000 Play: speed flagship vs entry tier",
    "rsl-no4-plus-shuttle-review": "RSL No.4 Plus shuttle: mixed-feather upgrade that misses",
    "li-ning-halbertec-7000-review": "Li-Ning Halbertec 7000 review: balanced control with a stiff edge",
    "li-ning-halbertec-flagship-lineup-review": "Li-Ning Halbertec 5000–9000 lineup: where control peaks",
    "yonex-nanoflare-800-pro-vs-nf700": "Nanoflare 800 Pro vs Nanoflare 700: speed upgrade or lost sweetness?",
    "yonex-aerosensa-50-shuttle-review": "Yonex Aerosensa 50 shuttle: premium flight half a step beyond AS-40",
    "yonex-comfort-z3-shoes-review": "Yonex Power Cushion Comfort Z3: cushion-first match shoe",
    "li-ning-halbertec-8000-vs-9000-vs-9000-power": "Li-Ning Halbertec 8000 vs 9000 vs 9000 Power: which one fits your game",
    "victor-yu-12-racket-review": "Victor DriveX 12 review: control players finally have a Victor flagship",
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "Yonex Astrox 100ZZ VA vs Kurenai: not an Anders Antonsen racket",
    "li-ning-okay-1-shuttle-review": "Li-Ning OKAY 1 review: Li-Ning's first synthetic feather shuttle",
    "victor-c90-ii-shoes-review": "Victor C90 II review: wide last, heavy stability, flagship cushion",
    "li-ning-bladex-800-speed-review": "Li-Ning Bladex 800 Speed review: tight M46X speed twin",
    "li-ning-bladex-800-power-review": "Li-Ning Bladex 800 Power review: the lubricated attack twin",
    "li-ning-aeronaut-8000d-review": "Li-Ning Aeronaut 8000D review: the overlooked windstorm hammer",
    "kumpoo-kh-g815-dragon-claw-shoes-review": "Kumpoo KH-G815 Dragon Claw review: ventilated speed flagship",
    "kumpoo-silver-blade-shoes-review": "Kumpoo Silver Blade review: dial lock, maximum ventilation",
    "mizuno-carbo-pro-823-review": "Mizuno Carbo Pro 823 review: the stick in the naughty-kid happy meal",
}

DEK_OVERRIDES = {
    "victor-yu-12-racket-review": "DriveX 12 gets Victor's full control-focused rebuild: alloy carbon, WES 3.0, and a firmer all-court feel.",
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "The Astrox 100ZZ VA and Kurenai comparison, with the old Antonsen naming mistake corrected while keeping the URL for continuity.",
}

# Prepended to the overview when two slugs would otherwise share identical JSON bodies.
SLUG_DISAMBIGUATION: dict[str, str] = {
    "li-ning-axforce-90-new-5u-deep-dive": "This article focuses on the 5U AxForce 90 New weight class — not the broader AxForce 90 vs 80 vs Yonex 88D Pro comparison.",
    "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai": "This URL keeps the legacy Anders Antonsen slug for continuity; the comparison covers VA and Kurenai colourways only.",
    "yonex-astrox-99-pro-gen-1-review": "First-gen Astrox 99 Pro (second Astrox 99-family generation) — includes Sun Orange colourway notes. See gen-2 and gen-3 deep dives for later Pro revisions.",
    "victor-auraspeed-hs-plus-attack-review": "Attack-biased HS Plus tuning — distinct from the neutral deep-dive on the same frame.",
    "rsl-aero-classic-tourney-shuttle-review": "Classic Tourney tier — not the Aero U shuttle review on the sibling URL.",
    "li-ning-halbertec-7000-review": "Original Halbertec 7000 (2023) — not the Halbertec 7000 II refresh review.",
    "li-ning-halbertec-flagship-lineup-review": "Halbertec 5000 through 9000 lineup compare — not the standalone Halbertec 9000 product review.",
    "yonex-nanoflare-800-pro-vs-nf700": "Head-to-head Nanoflare 800 Pro vs Nanoflare 700 — not the multi-model 800 Pro/Tour/Game review.",
    "fz-forza-88d-review": "Forza 88D under the FZ brand line — separate from Victor's FZ 88D Power Purple variant review.",
    "li-ning-bladex-800-speed-vs-halbertec-9000-power": "Head-to-head Bladex 800 Speed vs Halbertec 9000 Power — not the standalone 9000 Power deep dive.",
}

VOICE_FIXES = [
    (r"\bTiGe XLab\b", ""),
    (r"\bTiGe\b(?!\s)", ""),
    (r"\bBadmintonCN\b", "the forum"),
    (r"\bthe author\b", "I"),
    (r"\bthe reviewer\b", "I"),
    (r"\bthe I\b", "I"),
    (r"\btesters?\b", "I"),
    (r"\breviewers?\b", "I"),
    (r"\bFor I\b", "For me"),
    (r"\bWhat makes I more\b", "What makes me more"),
    (r"\bI's specific notes\b", "My specific notes"),
    (r"\bI specifically reports\b", "I specifically report"),
    (r"\bFor me's\b", "For my"),
    (r"\bEven I who\b", "Even I, who"),
    (r"\bsurprised I\b(?![a-z])", "surprised me"),
    (r"\bHalberd\b", "Halbertec"),
    (r"\bThunder 100\b", "AxForce 100"),
    (r"\bAerus III Pro\b", "Saga III Pro"),
    (r"https?://\S+", ""),
    (r"\[([^\]]+)\]\([^)]+\)", r"\1"),
    (r"!\[[^\]]*\]\([^)]+\)", ""),
    (r"[\u4e00-\u9fff]+", ""),
    (r"\(\s*\)", ""),
]


def load_glossary() -> list[tuple[str, str]]:
    src = GLOSSARY_PAGE.read_text(encoding="utf-8")
    return re.findall(r'id:\s*"([^"]+)",\s*term:\s*"([^"]+)"', src)


def load_canonical() -> list[tuple[str, str]]:
    if not CANONICAL.exists():
        return []
    data = json.loads(CANONICAL.read_text(encoding="utf-8"))
    pairs = []
    if isinstance(data, dict):
        for wrong, right in data.items():
            if isinstance(right, str):
                pairs.append((wrong, right))
    return sorted(pairs, key=lambda x: -len(x[0]))


def grab_field(chunk: str, field: str) -> str:
    fm = re.search(rf'{field}:\s*"((?:[^"\\]|\\.)*)"', chunk)
    if not fm:
        return ""
    raw = fm.group(1)
    return raw.replace('\\"', '"').replace("\\n", "\n").replace("\\'", "'")


def parse_legacy_articles() -> dict[str, dict]:
    src = LEGACY_TS.read_text(encoding="utf-8")
    articles: dict[str, dict] = {}
    chunk_re = re.compile(
        r'\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\{\s*slug:\s*"|]\s*,\s*zh:|\]\s*,?\s*\}\s*;)',
    )
    for m in chunk_re.finditer(src):
        chunk = m.group(0)
        slug = m.group(1)
        title = grab_field(chunk, "title")
        dek = grab_field(chunk, "dek")
        updated = re.search(r'updatedAt:\s*"([^"]+)"', chunk)
        updated_at = updated.group(1) if updated else "2026-05-24"
        sections = []
        for sm in re.finditer(
            r'heading:\s*"((?:[^"\\]|\\.)*)"\s*,\s*body:\s*"((?:[^"\\]|\\.)*)"',
            chunk,
        ):
            sections.append(
                {
                    "heading": sm.group(1).replace('\\"', '"').replace("\\n", "\n"),
                    "body": sm.group(2).replace('\\"', '"').replace("\\n", "\n"),
                }
            )
        intro = grab_field(chunk, "intro")
        if intro and not sections:
            sections = [{"heading": "Overview", "body": intro}]
        elif intro and sections:
            sections[0]["body"] = intro + " " + sections[0]["body"]
        verdict = grab_field(chunk, "verdict")
        if not verdict:
            rs = re.search(
                r'reviewSummary:\s*\{[\s\S]*?verdict:\s*"((?:[^"\\]|\\.)*)"',
                chunk,
            )
            if rs:
                verdict = rs.group(1).replace('\\"', '"').replace("\\n", "\n")
        articles[slug] = {
            "title": title,
            "dek": dek,
            "updatedAt": updated_at,
            "verdict": verdict,
            "sections": sections,
        }
    return articles


def extract_english(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    if MARKER not in text:
        return ""
    return text.split(MARKER, 1)[1].strip()


def parse_md_updated_at(path: Path) -> str | None:
    text = path.read_text(encoding="utf-8")
    parts = text.split("---", 2)
    if len(parts) < 2:
        return None
    m = re.search(r'updatedAt:\s*"([^"]+)"', parts[1])
    return m.group(1) if m else None


def strip_markdown_inline(text: str) -> str:
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return text


def clean_prose(text: str) -> str:
    text = strip_markdown_inline(text)
    for pat, repl in VOICE_FIXES:
        text = re.sub(pat, repl, text, flags=re.I)
    for wrong, right in load_canonical():
        text = text.replace(wrong, right)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"  +", " ", text)
    text = re.sub(r" +\n", "\n", text)
    return text.strip()


def normalize_heading(heading: str, body: str) -> tuple[str, str]:
    heading = heading.strip()
    if (
        len(heading) > 72
        or heading.count(".") >= 1
        or heading.startswith("*")
        or re.search(r"\b(I|my|the)\b", heading, re.I)
        and len(heading.split()) > 8
    ):
        merged = f"{heading}\n\n{body}".strip() if body else heading
        return "Overview", merged
    return heading or "Overview", body


def merge_overview_sections(sections: list[dict[str, str]]) -> list[dict[str, str]]:
    overviews: list[str] = []
    rest: list[dict[str, str]] = []
    for sec in sections:
        if sec["heading"].lower() in {"overview", "introduction"}:
            overviews.append(sec["body"])
        else:
            rest.append(sec)
    if not overviews:
        return sections
    return [{"heading": "Overview", "body": "\n\n".join(overviews)}] + rest


def ensure_dek(dek: str, sections: list[dict[str, str]], title: str) -> str:
    dek = dek.strip()
    if len(dek) >= 50:
        return dek
    blob = " ".join(s["body"] for s in sections[:3])
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", blob) if len(s.strip()) > 20]
    candidate = " ".join(sentences[:2])[:220].strip()
    if len(candidate) >= 50:
        return candidate
    return f"{title}. {candidate}".strip()[:240]


def parse_md_table(body: str) -> tuple[str, dict | None]:
    if "|" not in body:
        return body, None

    lines_all = body.split("\n")
    table_lines = [
        line.strip()
        for line in lines_all
        if "|" in line
        and line.strip()
        and not re.match(r"^\|?\s*-+", line.strip())
    ]
    if len(table_lines) < 2:
        return body, None

    rows_raw: list[list[str]] = []
    for line in table_lines:
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if any(cells):
            rows_raw.append(cells)
    if len(rows_raw) < 2 or len(rows_raw[0]) < 2:
        return body, None

    header = rows_raw[0]
    data_rows = []
    for row in rows_raw[1:]:
        if len(row) < len(header):
            continue
        data_rows.append({"label": row[0], "values": row[1:]})
    if not data_rows:
        return body, None

    first_table_idx = next(
        i
        for i, line in enumerate(lines_all)
        if "|" in line and line.strip() and not re.match(r"^\|?\s*-+", line.strip())
    )
    last_table_idx = max(
        i
        for i, line in enumerate(lines_all)
        if "|" in line and line.strip() and not re.match(r"^\|?\s*-+", line.strip())
    )
    intro = "\n".join(lines_all[:first_table_idx]).strip()
    outro = "\n".join(lines_all[last_table_idx + 1 :]).strip()
    summary_parts = [
        intro,
        f"Compared {len(data_rows)} rows across {', '.join(header[1:])}.",
        outro,
    ]
    summary = "\n\n".join(part for part in summary_parts if part)

    comparison = {
        "caption": header[0] or "Comparison",
        "columns": header[1:],
        "rows": data_rows,
    }
    return summary, comparison


def apply_disambiguation(slug: str, sections: list[dict[str, str]]) -> None:
    intro = SLUG_DISAMBIGUATION.get(slug)
    if not intro or not sections:
        return
    if intro in sections[0]["body"]:
        return
    sections[0]["body"] = f"{intro}\n\n{sections[0]['body']}"


def split_sections(en: str) -> tuple[list[dict[str, str]], dict | None]:
    if not en:
        return [], None
    # Markdown headings
    if re.search(r"\n#{1,3}\s+", en):
        parts = re.split(r"\n(?=#{1,3}\s+)", en)
    else:
        # Plain-text headings: short standalone lines between blank lines
        parts = []
        blocks = re.split(r"\n\n+", en.strip())
        i = 0
        while i < len(blocks):
            block = blocks[i].strip()
            if (
                i + 1 < len(blocks)
                and "\n" not in block
                and len(block) <= 72
                and not block.endswith(".")
                and not block.startswith("|")
                and block.lower() not in {"overview", "introduction"}
            ):
                parts.append(block + "\n\n" + blocks[i + 1])
                i += 2
                continue
            parts.append(block)
            i += 1
    sections = []
    comparison: dict | None = None
    for part in parts:
        part = part.strip()
        if not part:
            continue
        lines = part.split("\n")
        if lines[0].startswith("#"):
            heading = re.sub(r"^#+\s*", "", lines[0]).strip()
            body = "\n".join(lines[1:]).strip()
        elif "\n" in part:
            heading = lines[0].strip()
            body = "\n".join(lines[1:]).strip()
        else:
            heading = "Overview"
            body = part
        body = clean_prose(body)
        heading = clean_prose(heading)
        heading, body = normalize_heading(heading, body)
        if not body:
            continue
        if "|" in body:
            parsed_body, table = parse_md_table(body)
            body = parsed_body
            if table and comparison is None:
                comparison = table
        sections.append({"heading": heading or "Overview", "body": body})
    sections = merge_overview_sections(sections)
    merged: list[dict[str, str]] = []
    for sec in sections:
        if (
            merged
            and sec["heading"].lower() in {"overview", "introduction"}
            and merged[-1]["heading"].lower() == sec["heading"].lower()
        ):
            merged[-1]["body"] = merged[-1]["body"] + "\n\n" + sec["body"]
        else:
            merged.append(sec)
    return merged, comparison


def extract_verdict(sections: list[dict[str, str]], dek: str) -> str:
    for key in ("verdict", "summary", "bottom line", "overall", "conclusion"):
        for s in sections:
            if key in s["heading"].lower() and len(s["body"]) > 40:
                return s["body"][:320].rsplit(".", 1)[0] + "." if len(s["body"]) > 320 else s["body"]
    if sections:
        first = sections[0]["body"]
        sentences = re.split(r"(?<=[.!?])\s+", first)
        if sentences:
            return sentences[0][:280]
    return dek[:200] if dek else ""


def attach_glossary(sections: list[dict[str, str]], glossary: list[tuple[str, str]]) -> None:
    full = " ".join(s["body"] for s in sections).lower()
    for sid, term in glossary:
        pat = re.compile(r"\b" + re.escape(term.lower()) + r"\b")
        if len(pat.findall(full)) >= 3:
            sections[0].setdefault("glossaryLinks", [])
            links = sections[0]["glossaryLinks"]
            if not any(l["id"] == sid for l in links):
                links.append({"term": term, "id": sid})


def audit_article(slug: str, article: dict) -> list[str]:
    issues = []
    blob = json.dumps(article).lower()
    if "tige xlab" in blob or "badmintoncn" in blob:
        issues.append("channel attribution remnant")
    if re.search(r"https?://", blob):
        issues.append("URL leaked")
    if re.search(r"[\u4e00-\u9fff]", blob):
        issues.append("CJK in English")
    if re.search(r"\btesters?\b", blob) and "how-to-read-badminton-reviews" not in slug:
        issues.append("third-person voice")
    if re.search(r"\breviewers?\b", blob) and slug != "how-to-read-badminton-reviews":
        issues.append("third-person voice")
    if re.search(r"\bthe author\b", blob):
        issues.append("third-person author")
    if re.search(r"\*\*[^*]+\*\*", blob):
        issues.append("markdown bold leaked")
    if len(article.get("dek", "")) < 50:
        issues.append("dek too short")
    if not article.get("title"):
        issues.append("missing title")
    if not article.get("sections"):
        issues.append("empty sections")
    if not article.get("verdict"):
        issues.append("missing verdict")
    for pat in (r"source-to-buyer", r"fact-check snapshot", r"why this source"):
        if pat in blob:
            issues.append(f"editorial scaffold: {pat}")
    if re.search(r"\bI's specific\b", blob):
        issues.append("persona corruption: I's")
    if re.search(r"\bWhat makes I more\b", blob):
        issues.append("persona corruption: What makes I")
    return [f"{slug}: {i}" for i in issues]


def apply_audit_fixes(article: dict) -> int:
    n = 0
    for key in ("title", "dek", "verdict", "cta"):
        if key in article and isinstance(article[key], str):
            new = clean_prose(article[key])
            if new != article[key]:
                article[key] = new
                n += 1
    for sec in article.get("sections", []):
        for field in ("heading", "body"):
            new = clean_prose(sec.get(field, ""))
            if new != sec.get(field):
                sec[field] = new
                n += 1
    return n


def main() -> None:
    if not LEGACY_TS.exists():
        raise SystemExit(f"Missing {LEGACY_TS} — copy src/lib/blog.ts to blog.legacy.ts first")

    slug_map: dict[str, str | None] = json.loads(SLUG_MAP.read_text(encoding="utf-8"))
    for s in LEGACY_ONLY:
        slug_map[s] = None

    slugs = json.loads((ROOT / "scripts/blog-slugs-list.json").read_text(encoding="utf-8"))
    sprint_path = ROOT / "scripts/blog-main-sprint-articles.json"
    sprint_by_slug: dict[str, dict] = {}
    if sprint_path.exists():
        for art in json.loads(sprint_path.read_text(encoding="utf-8")):
            sprint_by_slug[art["slug"]] = art

    legacy = parse_legacy_articles()
    glossary = load_glossary()
    review_map: dict[str, str] = {}
    if REVIEW_MAP.exists():
        review_map = {
            k: v
            for k, v in json.loads(REVIEW_MAP.read_text(encoding="utf-8")).items()
            if isinstance(v, str)
        }
    articles = []
    report = {"date": str(date.today()), "passes": [], "articles": len(slugs)}

    for slug in slugs:
        meta = legacy.get(slug, {})
        sprint_meta = sprint_by_slug.get(slug, {})
        source_file = slug_map.get(slug)
        sections: list[dict] = []
        comparison: dict | None = None
        md_updated: str | None = None
        use_legacy = slug in LEGACY_ONLY or slug in LEGACY_PREFERRED
        if source_file and not use_legacy and (BLOGS / source_file).exists():
            md_path = BLOGS / source_file
            md_updated = parse_md_updated_at(md_path)
            en = extract_english(md_path)
            sections, comparison = split_sections(en)
        if not sections and sprint_meta.get("sections"):
            sections = [
                {"heading": clean_prose(s["heading"]), "body": clean_prose(s["body"])}
                for s in sprint_meta["sections"]
            ]
        if not sections:
            sections = [
                {"heading": s["heading"], "body": clean_prose(s["body"])}
                for s in meta.get("sections", [])
            ]
        title = (
            TITLE_OVERRIDES.get(slug)
            or sprint_meta.get("title")
            or meta.get("title")
            or slug.replace("-", " ").title()
        )
        raw_dek = (
            DEK_OVERRIDES.get(slug)
            or (
                (sections[0]["body"][:160] + "…")
                if md_updated and sections and not DEK_OVERRIDES.get(slug)
                else None
            )
            or sprint_meta.get("dek")
            or meta.get("dek")
            or (sections[0]["body"][:160] + "…" if sections else "")
        )
        dek = ensure_dek(raw_dek, sections, title)
        verdict_from_sections = extract_verdict(sections, dek)
        verdict = (
            verdict_from_sections
            if any("verdict" in s["heading"].lower() for s in sections)
            else sprint_meta.get("verdict")
            or meta.get("verdict")
            or verdict_from_sections
        )
        verdict = clean_prose(verdict)
        apply_disambiguation(slug, sections)
        attach_glossary(sections, glossary)
        article: dict = {
            "slug": slug,
            "updatedAt": md_updated or sprint_meta.get("updatedAt") or meta.get("updatedAt", "2026-05-24"),
            "title": clean_prose(title),
            "dek": clean_prose(dek),
            "verdict": verdict,
            "sections": sections,
            "cta": sprint_meta.get("cta")
            or meta.get("cta")
            or "Not sure which racket or shoe fits your game? Try the finder quiz.",
        }
        if comparison:
            article["comparison"] = comparison
        if review_map.get(slug):
            article["relatedReviewProductId"] = review_map[slug]
        if sprint_meta.get("methodology"):
            article["methodology"] = clean_prose(sprint_meta["methodology"])
        if sprint_meta.get("factChecks"):
            article["factChecks"] = sprint_meta["factChecks"]
        articles.append(article)

    for pass_num in range(1, PASSES + 1):
        fixes = 0
        issues: list[str] = []
        for art in articles:
            fixes += apply_audit_fixes(art)
            issues.extend(audit_article(art["slug"], art))
        report["passes"].append({"pass": pass_num, "fixes": fixes, "issues": len(issues), "samples": issues[:5]})
        if pass_num >= 16 and issues:
            report["passes"][-1]["all_issues"] = issues

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report["final_issue_count"] = report["passes"][-1]["issues"]
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"articles": len(articles), "issues": report["final_issue_count"], "out": str(OUT_JSON)}, indent=2))


if __name__ == "__main__":
    main()
