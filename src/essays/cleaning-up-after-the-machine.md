---
layout: essay.njk
title: "Cleaning Up After the Machine"
order: 33
date: 2026-04-02
---

AI generates slop. I know this because I build with AI every day and I spend a meaningful fraction of my time undoing what it just did.

Slop is the word for it. Not bugs — bugs are specific. Slop is the general degradation that happens when you let an LLM write code for months without supervision. The codebase gets verbose. Functions grow try/except blocks they don't need. Comments appear that restate the line below them. Variable names get longer and more "descriptive" until they're sentences. Error handling shows up for scenarios that can't happen. Type annotations arrive on code that was working fine without them. Docstrings everywhere. Docstrings on docstrings.

The worst part isn't any individual change. The worst part is the accumulation. You don't notice the codebase getting 15% larger until you're grepping for something and there are forty results instead of twelve. Each one is some helper function the AI wrote "just in case" during a session three weeks ago. Nobody called it then. Nobody calls it now. But it's there, and it's in the search results, and it's in the context window, and now the AI sees it and thinks it's important and starts building on top of it.

That's the slop cycle. AI writes unnecessary code. AI reads unnecessary code. AI writes more unnecessary code because it thinks the existing unnecessary code is load-bearing.

I have three systems that fight this. None of them are optional.

## /fresh-eyes — The De-Rationalization Engine

The first is a command called `/fresh-eyes`. Here's the actual implementation:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># .claude/commands/fresh-eyes.md</span>
<span style="color:#e8e4de;">De-rationalization engine.</span>
The person/agent who built the thing cannot
objectively evaluate the thing.

Spawn a sub-agent with ZERO context from
the current conversation to review with cold eyes.

<span style="color:#88cc88;">Step 1:</span> Identify the artifact (code, email, strategy doc)
<span style="color:#88cc88;">Step 2:</span> Select review lens:
  <span style="color:#888;">Code:</span> type mismatches, missing error handling,
        env var conflicts, repeated patterns
  <span style="color:#888;">Email:</span> read as RECIPIENT. Flag defensive tone,
         buried asks, unclear calls to action
  <span style="color:#888;">Strategy:</span> internal contradictions, unstated
             assumptions, sections that say the
             same thing twice

<span style="color:#88cc88;">Step 3:</span> Spawn the reviewer. Give it ONLY the artifact
        and the review lens. Do NOT include conversation
        history. The whole point is cold eyes.

<span style="color:#88cc88;">Step 4:</span> Present findings as table:
  | Location | Issue | Severity | Suggested Fix |

<span style="color:#cc8888;">Rule: Do NOT fabricate issues to seem thorough.
      If it's clean, say "LGTM."</span>
</pre>

The insight behind `/fresh-eyes` is that the AI that wrote the code can't evaluate the code. It's the same problem humans have — you rationalize your own decisions. The AI that spent forty minutes building a feature is psychologically (well, contextually) invested in that feature being correct. It won't catch its own slop because the slop is part of the context it's reasoning from.

So I spawn a separate agent. No shared context. No history of the session. Just the code and a set of review criteria. Cold eyes. It catches things the building agent never would — redundant imports, functions that duplicate standard library calls, error handling for conditions that are structurally impossible.

## The Fresh Eyes Debt Hook

The second system is a hook that runs every time I end a session. Not a reminder. Not a suggestion. A deterministic capture of everything that didn't get reviewed:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;">#!/bin/bash</span>
<span style="color:#666;"># stop-fresh-eyes-check.sh — DETERMINISTIC</span>
<span style="color:#666;"># Not a reminder. CAPTURES what needs review.</span>

UNCOMMITTED=$(git status --porcelain | wc -l | tr -d ' ')
RECENT_COMMITS=$(git log --oneline --since="2 hours ago" | wc -l | tr -d ' ')

<span style="color:#666;"># Only trigger if significant work happened</span>
if [[ $UNCOMMITTED -gt 3 || $RECENT_COMMITS -gt 2 ]]; then
  if [[ ! -f "$MARKER_FILE" ]]; then
    <span style="color:#666;"># Append to review debt log</span>
    {
      echo "## Unreviewed Changes — ${TIMESTAMP}"
      echo "- Uncommitted files: ${UNCOMMITTED}"
      echo "- Recent commits: ${RECENT_COMMITS}"
      echo "### Files needing fresh-eyes review:"
      echo "${CHANGED_FILES}"
      echo "- Status: NOT REVIEWED"
    } >> session_memory/fresh_eyes_debt.md

    echo "FRESH EYES DEBT: ${UNCOMMITTED} dirty files" \
         "+ ${RECENT_COMMITS} commits WITHOUT review." >&2
  fi
fi

exit 0
</pre>

The hook checks: did you end a session with more than 3 uncommitted files or more than 2 commits? And did you run `/fresh-eyes`? If the work happened and the review didn't, it logs the debt to a file. And the pre-session hook at the START of the next session reads that file and shows it to the AI before it can do anything else.

The debt accumulates. You can't ignore it because the machine won't let you start new work until the old work is reviewed. The AI sees "FRESH EYES DEBT: 12 files NOT REVIEWED" and knows its first job is cleanup, not feature building.

This is how you build discipline into a system that has no willpower. I wrote about the [ego depletion problem](/essays/ego-depletion/) — humans run out of discipline. Hooks don't.

## /audit-claude-md — The Bloat Detector

The third system audits the governance files themselves. The CLAUDE.md files — [1,334 lines across 7 files](/essays/my-claude-md/) — are where every rule lives. And rules accumulate. After seven years, you've got rules that contradict each other, rules that the AI already follows without being told, and rules that applied to an architecture that no longer exists.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># .claude/commands/audit-claude-md.md</span>

<span style="color:#e8e4de;">Step 1: Measure</span>
  - Count lines in root CLAUDE.md. Target: under 100.
  - Count lines in each Workflows/*/CLAUDE.md.
  - Flag any CLAUDE.md over 150 lines as BLOATED.

<span style="color:#e8e4de;">Step 2: Check for Staleness</span>
  For each rule:
  - Is this still accurate?
  - Does Claude already follow this without being told?
    If so, it's wasting tokens.
  - Does it contradict another rule? Flag conflicts.

<span style="color:#e8e4de;">Step 3: Identify Skill Candidates</span>
  Content that:
  - Only applies to specific workflows → move there
  - Is a reference doc → move to .claude/skills/
  - Is a checklist → convert to /command
  - Is a hard safety rule → convert to a hook

<span style="color:#e8e4de;">Step 4: Check Multi-Model Compatibility</span>
  - Is CLAUDE.md readable by Codex, Gemini, other tools?
  - Are env vars documented?
  - Are project paths clear with no prior context?
</pre>

The CLAUDE.md is the most important file in the entire system. It's what every AI reads first. If it's bloated, the AI wastes context window on stale rules. If it's contradictory, the AI gets confused and makes bad decisions. If it's too long, the AI ignores the bottom half — exactly like humans stop reading long documents.

So the audit command measures, checks for staleness, identifies things that should be hooks or skills instead of rules, and reports. The meta loop: the system that governs the AI is itself governed by a system that checks for decay.

## The Bottom-Up Analysis Law

This one isn't about slop in code. It's about slop in analysis. When an AI runs `SELECT stage_name, COUNT(*) FROM client_stage_progression GROUP BY stage_name` — that looks like useful data. Except those `stage_name` values were generated by another LLM session, freeform, months ago. "Engaged" might mean three different things depending on when it was written. The aggregate is confident garbage.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># .claude/skills/bottom-up-analysis.md — ABSOLUTE LAW</span>

<span style="color:#cc8888;">NEVER trust classifiers, summary fields,
or aggregate queries as ground truth.</span>

The Method:
1. Sample 20+ individual records — random, across segments
2. Read the raw data — actual messages, actual events
3. Observe what ACTUALLY happened
4. Build categories from what you see — don't use
   pre-existing labels
5. THEN scale up with aggregates
6. Cross-check: do aggregates match raw observations?
   If not, the aggregates are wrong.

What NOT to do:
<span style="color:#cc8888;">- SELECT stage_name, COUNT(*) GROUP BY stage_name</span>
  (LLM-generated freeform labels, not real stages)
<span style="color:#cc8888;">- Trust client.budget without checking messages</span>
<span style="color:#cc8888;">- Trust any boolean flag without verifying behavior</span>
<span style="color:#cc8888;">- Run aggregates BEFORE sampling individuals</span>

<span style="color:#88cc88;">Classifiers lie. Summary fields are stale.
Raw data wins. Always.</span>
</pre>

This is enforced by a hook. If the AI tries to run an aggregate query before it's read individual records, the hook blocks it. Not a warning. A hard stop. Because I made business decisions on aggregate reports built from garbage classifiers and lost money. That scar became a rule. The rule became a hook. The hook became architecture.

(I wrote about how [every hook traces to a disaster](/essays/scar-tissue/). The bottom-up law traces to a report that said 81% response rate when the actual messages showed the agent was leaking its own prompts. Classifiers marked "agent leaked system prompt" as "Engaged — Response Received." Technically correct. Completely useless.)

## The Meta Problem

Here's the thing I didn't anticipate when I started building with AI. The slop isn't just in the code the AI writes. It's in the governance the AI helps me write. The CLAUDE.md files, the hooks, the skills — all of those were written with AI assistance. Which means they can accumulate the same patterns. Overly verbose rules. Redundant checks. Error handling for scenarios that don't exist in governance documents about error handling for scenarios that don't exist.

It's turtles all the way down. The only way out is periodically stepping back and reading everything with cold eyes. That's what `/audit-claude-md` does at the governance level. That's what `/fresh-eyes` does at the code level. That's what the [three loops](/essays/retro-macro-meta/) do at the operational level.

The retro loop catches specific incidents. The macro loop catches patterns. The meta loop catches decay in the system that catches incidents and patterns. Each layer audits the one below it. None of them are optional. And none of them can be the same agent that built the thing being audited.

That last part matters. I can't stress it enough. The AI that wrote the code cannot review the code. The AI that wrote the rule cannot audit the rule. Fresh context or no context. Cold eyes or no review. There's no middle ground. The slop cycle only breaks when you bring in someone — or something — that has no investment in the existing output.

That's the real cleanup process. Not prettier code. Not more tests. A system that treats its own output as suspect, by default, forever.
