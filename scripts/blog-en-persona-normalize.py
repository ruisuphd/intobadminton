#!/usr/bin/env python3
"""
Normalize English blog sections to a single first-person reviewer voice.
Does NOT add body stats — use blog-en-strip-body-stats.py to remove those.
Does NOT modify Chinese content.
"""

from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_blogs_raw = os.environ.get("BLOGS_DIR", "").strip()
BLOGS = Path(_blogs_raw) if _blogs_raw else ROOT / "blogs"
if not BLOGS.is_absolute():
    BLOGS = ROOT / BLOGS
MARKER = "## English Translation"

# Ordered replacements (English section only)
REPLACEMENTS: list[tuple[str, str]] = [
    # --- remove other author names ---
    (
        r"Hello everyone from the Lin Dan and Lee Chong Wei fan club—I am Baicai, an Arcsaber 10 lover\.",
        "Hello from one Arcsaber 10 obsessive.",
    ),
    # --- third-person tester language → first person ---
    (r"\bacross multiple reviewers\b", "in my own long-term testing"),
    (r"\bmany testers\b", "I"),
    (r"\bMany testers\b", "I"),
    (r"\bseveral testers\b", "I"),
    (r"\bSeveral testers\b", "I"),
    (r"\bsome testers\b", "I"),
    (r"\bSome testers\b", "I"),
    (r"\bone long-term tester\b", "my test pair"),
    (r"\bOne tester\b", "I"),
    (r"\bone tester\b", "I"),
    (r"\bAnother tester\b", "I also"),
    (r"\banother tester\b", "I also"),
    (r"\bmultiple testers\b", "I"),
    (r"\bmost reviewers\b", "I"),
    (r"\bMost reviewers\b", "I"),
    (r"\bmultiple reviewers\b", "I"),
    (r"\bone reviewer\b", "I"),
    (r"\bOne reviewer\b", "I"),
    (r"\banother reviewer\b", "I also"),
    (r"\bAnother reviewer\b", "I also"),
    (r"\bnoted by testers\b", "I noticed"),
    (r"\bfrom multiple testers\b", "from my testing"),
    (r"\btester sensitivity\b", "my sensitivity"),
    (r"\bheavier tester\b", "when I was testing loosely laced"),
    (r"\bOne heavier tester initially\b", "I initially"),
    (r"\bseveral describe\b", "I would describe"),
    (r"\bseveral find\b", "I find"),
    (r"\bsome find\b", "I find"),
    (r"\bsome players\b", "I"),
    (r"\bsome testers note\b", "I notice"),
    # --- external attribution → first person where appropriate ---
    (
        r'Measured data from BadmintonCN user "smallJoeyHe Yunhan"',
        "Cross-section measurements I logged",
    ),
    (
        r'BadmintonCN user "smallJoeyHe Yunhan"',
        "my own frame measurements",
    ),
    (r"\bYuanshi machine data:\b", "Machine data from my testing:"),
    (r"\bOne 4U tester \(while ill with COVID\)\b", "During one rough week on the 4U build"),
    (r"\bnot every tester finds\b", "I did not always find"),
    (r"\bconflicting points are flagged at the end\b", "where my view shifted over time I note it below"),
    (r"\bconflict table\b", "notes"),
    (r"\bsee conflict table\b", "see notes below"),
    (r"\bConflict notes\b", "Notes"),
    # --- merge disclaimers ---
    (
        r"\*This article consolidates \d+ independent reviews of[^*]+\*\s*\n+",
        "",
    ),
]


# Verbs that end up third-person singular after a noun-phrase → "I" swap
# ("one reviewer rates" → "I rates"). Conjugated back to base form.
_THIRD_PERSON_VERBS = (
    "rates|notes|makes|gives|calls|says|sees|puts|thinks|reads|likes|prefers|"
    "recommends|describes|reckons|considers|frames|treats|keeps|wants|feels|"
    "holds|takes|uses|gets|knows|judges|scores|ranks|sums|concludes|argues|"
    "suggests|admits|warns|highlights|measures|weighs|tests|reports|claims|"
    "positions|compares|credits|blames|praises|finds|breaks|leads|pegs|"
    "advises|ends|rounds|mains|plays|pushes|stresses|passes|shows|agrees"
)


def _conjugate_base(verb: str) -> str:
    if verb.endswith(("sses", "shes", "ches", "xes")):
        return verb[:-2]
    return verb[:-1]


# Grammar repairs applied after the noun-phrase swaps above.
POST_FIXES: list[tuple[re.Pattern[str], object]] = [
    (re.compile(rf"\bI ({_THIRD_PERSON_VERBS})\b"), lambda m: f"I {_conjugate_base(m.group(1))}"),
    (re.compile(r"\bI's\b"), "my"),
    (re.compile(r"\bI is\b"), "I am"),
    (re.compile(r"\bI has\b"), "I have"),
    (re.compile(r"\bfrom I\b"), "from me"),
]


def normalize_en(en: str) -> tuple[str, int]:
    n = 0
    for pat, repl in REPLACEMENTS:
        new, c = re.subn(pat, repl, en, flags=re.MULTILINE)
        if c:
            n += c
            en = new
    for cpat, crepl in POST_FIXES:
        new, c = cpat.subn(crepl, en)
        if c:
            n += c
            en = new
    return en, n


def main() -> None:
    total_files = 0
    total_fixes = 0
    changed: list[str] = []
    for path in sorted(BLOGS.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        if MARKER not in text:
            continue
        total_files += 1
        zh, en = text.split(MARKER, 1)
        new_en, fixes = normalize_en(en)
        if fixes:
            path.write_text(zh + MARKER + new_en, encoding="utf-8")
            changed.append(path.name)
            total_fixes += fixes
    print(f"Files with English: {total_files}")
    print(f"Files changed: {len(changed)}")
    print(f"Total replacements: {total_fixes}")
    for c in changed:
        print(f"  {c}")


if __name__ == "__main__":
    main()
