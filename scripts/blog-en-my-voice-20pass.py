#!/usr/bin/env python3
"""
20-pass English voice audit for blogs/:
  - First-person club reviewer (Ireland / Singapore / China, ~div 4 / mid-club)
  - Strip channel/lab/third-party framing (TiGe XLab, BadmintonCN repost disclaimers, etc.)
  - Fix grammar artifacts from prior bulk rewrites
  - Passes 1-15 apply; 16-20 verify only

Does NOT modify Chinese content.
"""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOGS = ROOT / "blogs"
REPORT = ROOT / "scripts" / "blog-en-my-voice-20pass-report.json"
MARKER = "## English Translation"

VOICE: list[tuple[str, str]] = [
    # --- Channel / lab / repost framing ---
    (
        r"This Carbonsonic MAX review marks TiGe XLab’s first shuttle feature and Victor’s third-generation synthetic flagship\. "
        r"Rather than repeating industry history covered elsewhere, the focus here is personal experience with the Carbonsonic line, "
        r"measured weight data, structural upgrades, on-court feel, and where synthetics are heading\.",
        "I have been using Victor’s Carbonsonic synthetics on and off for years across club nights in Singapore, China, and Ireland. "
        "Carbonsonic MAX is Victor’s third-generation synthetic flagship — the first one that made me seriously rethink what stays in my shuttle bag.",
    ),
    (
        r"This Carbonsonic MAX review marks TiGe XLab's first shuttle feature and Victor's third-generation synthetic flagship\. "
        r"Rather than repeating industry history covered elsewhere, the focus here is personal experience with the Carbonsonic line, "
        r"measured weight data, structural upgrades, on-court feel, and where synthetics are heading\.",
        "I have been using Victor’s Carbonsonic synthetics on and off for years across club nights in Singapore, China, and Ireland. "
        "Carbonsonic MAX is Victor’s third-generation synthetic flagship — the first one that made me seriously rethink what stays in my shuttle bag.",
    ),
    (r"^Disclaimer: Original article from BadmintonCN[^\n]*\n+", "", re.M),
    (r"^Disclaimer: Original article from BadmintonCN[^\n]*\.?\s*", "", re.M),
    (r"please retain source and author when reposting\.?\s*", "", re.I),
    (r"Please retain source and author when reposting\.?\s*", "", re.I),
    (r"\bTiGe XLab(?:’s|'s)\b", "my"),
    (r"\bTiGe XLab\b", "I"),
    (r"\bTiGe\b", "I"),
    (r"\bXLab\b", ""),
    # --- Third-person intros → first person ---
    (r"\bThis review covers the Li-Ning Bladex series\b", "I spent time with the Li-Ning Bladex series"),
    (r"\bThis review covers the Kawasaki Master series\b", "I tested the Kawasaki Master series"),
    (r"\bThis review covers\b", "I tested"),
    (r"\bThis article consolidates\b", "I pulled together notes on"),
    (r"\bThis article compares\b", "I compared"),
    (r"\bThis article\b", "This write-up"),
    (r"\bBelow is a consolidated\b", "Here is my consolidated"),
    (r"\bBelow is my\b", "Here is my"),
    (r"\bWe tested\b", "I tested"),
    (r"\bOur verdict\b", "My verdict"),
    # --- BadmintonCN / crowd-test framing ---
    (
        r"Honoured to be picked for BadmintonCN(?:’s|'s) first Crowd Test cohort\.[^\n]+\n+",
        "",
    ),
    (
        r"Honored to be picked for BadmintonCN(?:’s|'s) first Crowd Test cohort\.[^\n]+\n+",
        "",
    ),
    (r"\bBadmintonCN(?:’s|'s) crowd-test programme\b", "a forum trial batch"),
    (r"\bBadmintonCN crowd test\b", "forum trial"),
    (r"\bmid 3\+ on BadmintonCN\b", "Zhongyu level 3+"),
    (r"\b~mid 3\+ club level\b", "Zhongyu level 3+"),
    (r"\bon BadmintonCN\b", "in forum discussion"),
    # --- Biography alignment (keep generic) ---
    (
        r"\bwhile I went from park high-schooler to seasoned club player\b",
        "while synthetics improved and club play got more regular",
    ),
    (r"\bAt university,\b", "Years ago,"),
    (r"\bWhen I was living in China,\b", "Years ago,"),
    (r"\bplaying circle\b", "club group"),
    # --- Grammar fixes from prior bulk replace ---
    (r"\bFor I who\b", "If you"),
    (r"\bsmashes surprised I\b", "smashes surprised me"),
    (r"\bSurprised it skips\b", "I was surprised it skips"),
    (r"\bmy Greek foot \(long second toe\)\b", "my forefoot"),
    (r"\bfriendly to Egyptian, Roman and Greek foot types alike\b", "friendly to a wide range of foot shapes"),
    (r"\bEgyptian, Roman and Greek foot types\b", "different foot shapes"),
    (r"\bin I[’'] view\b", "in my view"),
    (r"\bI coming from\b", "Coming from"),
    (r"\bI made it their primary shoe\b", "I made it my primary shoe"),
    (r"\bMultiple I praise\b", "I praise"),
    (r"\bdisappointed I seeking\b", "I was disappointed seeking"),
    (r"\bthe I went from\b", "I went from"),
    (r"\bfor I who\b", "for players who"),
    (r"\bfor I\b", "for me"),
    (r"\bto I\b", "to me"),
    (r"\bfrom I\b", "from me"),
    (r"\bwith I\b", "with me"),
    (r"\bthe I\b", "I"),
    (r"\bI I invited\b", "players I invited"),
    # --- Remove meta merge language ---
    (r"^\*This article consolidates[^*]+\*\s*\n+", "", re.M),
    (r"\bWording below merges those perspectives into one narrative[^\n]*\n+", "", re.I),
    (r"\bwhere my view shifted over time I note it below\.?\s*", "", re.I),
    # --- Tone: channel feature → personal ---
    (r"\bthe focus here is personal experience\b", "what follows is my own experience"),
    (r"\bRather than repeating industry history covered elsewhere,\s*", ""),
    (r"\bconsensus is clear:\b", "my take is clear:"),
    (r"\bBroad consensus:\b", "My read:"),
    (r"\bBroad recommendation\b", "My recommendation"),
    (r"\bcaught him\b", "caught me"),
    (r"\bPioneer Experience Officer\b", "club trial batch"),
    # --- Wrong persona: university student tester ---
    (
        r"As a veteran member of the university badminton team, I train four times and compete once every week without fail\. "
        r"After nearly four years of playing, I'm considered a recognised amateur expert in the circle\.[^\n]+\n+",
        "As a division 4 club player splitting time between Ireland, Singapore, and China, ",
    ),
    (r"\buniversity badminton team\b", "club group"),
    (r"\brecognised amateur expert in the circle\b", "division 4 club player"),
    (r"\bstudent outfit\b", "everyday kit"),
    (r"\bfrom class to the hall\b", "to the hall"),
    (r"\bcampus competition\b", "club matches"),
    (r"\bschool synthetic courts\b", "indoor synthetic courts"),
    (r"\boff campus\b", "outdoors"),
]

FORBIDDEN = [
    (r"\bTiGe XLab\b", "channel/lab attribution"),
    (r"\bTiGe\b", "channel name"),
    (r"Disclaimer: Original article", "repost disclaimer"),
    (r"please retain source", "repost disclaimer"),
    (r"\bThis review marks\b", "channel-style intro"),
    (r"\btesters?\b", "third-person tester"),
    (r"\breviewers?\b", "third-person reviewer"),
    (r"\bFor I\b", "broken grammar"),
    (r"\bsurprised I\b(?![a-z])", "broken grammar"),
    (r"\bmy Greek foot\b", "body/foot stat"),
    (r"\bcaught him\b", "third-person slip"),
    (r"\bThe author year-round\b", "channel author"),
    (r"\bauthor year-round\b", "channel author"),
    (r"\bPioneer Experience Officer\b", "promo event"),
    (r"\buniversity badminton team\b", "wrong persona"),
    (r"\bamateur expert in the circle\b", "wrong persona"),
    (r"\bstudent outfit\b", "wrong persona"),
    (r"\bfrom class to the hall\b", "wrong persona"),
    (r"\bcampus competition\b", "wrong persona"),
    (r"\bAfter Tiger\b", "channel author"),
    (r"\bDisclaimer:\b", "channel disclaimer"),
    (r"\bconsolidates \d+ independent", "merge disclaimer"),
    (r"\bI I\b", "broken grammar"),
    (r"[\u4e00-\u9fff]", "CJK in English"),
    (r"https?://", "URL in English"),
]


def apply_voice(en: str) -> tuple[str, int]:
    n = 0
    for item in VOICE:
        if len(item) == 3:
            pat, repl, flags = item
            flag = flags if isinstance(flags, int) else 0
        else:
            pat, repl = item
            flag = 0
        new, c = re.subn(pat, repl, en, flags=flag)
        if c:
            n += c
            en = new
    en = re.sub(r"\n{3,}", "\n\n", en)
    en = re.sub(r"  +", " ", en)
    return en.strip() + "\n", n


def audit(en: str, fname: str) -> list[str]:
    issues = []
    for pat, msg in FORBIDDEN:
        if re.search(pat, en, re.I):
            issues.append(f"{fname}: {msg}")
    return issues


def split_file(text: str) -> tuple[str, str, bool]:
    if MARKER not in text:
        return text, "", False
    zh, en = text.split(MARKER, 1)
    return zh, en, True


def run_pass(files: list[Path], pass_num: int, fix: bool) -> tuple[int, int, dict[str, list[str]]]:
    fixes = 0
    issue_map: dict[str, list[str]] = {}
    for path in files:
        text = path.read_text(encoding="utf-8")
        zh, en, ok = split_file(text)
        if not ok:
            issue_map[path.name] = ["missing English section"]
            continue
        if fix and pass_num <= 15:
            new_en, n = apply_voice(en)
            if n:
                fixes += n
                path.write_text(
                    zh.rstrip() + "\n\n---\n\n" + MARKER + "\n\n" + new_en,
                    encoding="utf-8",
                )
                en = new_en
        iss = audit(en, path.name)
        if iss:
            issue_map[path.name] = iss
    return fixes, sum(len(v) for v in issue_map.values()), issue_map


def main() -> None:
    files = sorted(BLOGS.glob("*.md"))
    passes = []
    total_fixes = 0
    final_issues: dict[str, list[str]] = {}
    for p in range(1, 21):
        fix = p <= 15
        f, issue_count, issue_map = run_pass(files, p, fix=fix)
        total_fixes += f
        passes.append({"pass": p, "fixes": f, "issues": issue_count})
        if p == 20:
            final_issues = issue_map

    report = {
        "date": str(date.today()),
        "persona": {
            "voice": "first-person",
            "level": "intermediate (~BadmintonCN 4 / Ireland division 4)",
            "clubs": ["Ireland", "Singapore", "China"],
        },
        "files": len(files),
        "passes": passes,
        "total_fixes": total_fixes,
        "final_issue_count": sum(len(v) for v in final_issues.values()),
        "final_issues": final_issues,
    }
    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({k: v for k, v in report.items() if k != "final_issues"}, indent=2))
    if final_issues:
        print("\nRemaining issues (sample):")
        for fn, iss in list(final_issues.items())[:20]:
            print(f"  {fn}: {iss}")


if __name__ == "__main__":
    main()
