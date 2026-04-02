---
layout: essay.njk
title: "My CLAUDE.md"
status: "Coming soon — with artifacts"
order: 20
---

Every AI coding tool reads a file called CLAUDE.md at the root of your project. It's supposed to be a brief style guide — "use tabs not spaces," that sort of thing. Mine is 207 lines long. I have seven of them across different services, totaling 1,334 lines. They are the institutional knowledge of my entire engineering organization, and my engineering organization is me.

Here's a sample. This is real. It's from the root CLAUDE.md that governs all four business units:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
## Teaching Mode (ALWAYS ON)
Mukund is a 15-year founder running an AI agent team
with no human engineers.
Explain EVERYTHING: what you're doing, why, define terms,
show architecture, discuss trade-offs.
Don't dumb it down. He's smart and learns fast.
Just don't assume DevOps/SRE knowledge.
If he corrects you — learn from it, update CLAUDE.md/MEMORY.md,
never repeat.

## Database Safety (MANDATORY)
- NEVER DROP TABLE, TRUNCATE, or DELETE FROM on production tables
- NEVER create tables without user approval
- The DB has years of irreplaceable data.
  Treat every write as if no backup exists.

## Bottom-Up Analysis Law (ABSOLUTE — enforced by hook)
- NEVER run aggregate queries as your FIRST step
- ALWAYS sample 20+ individual records and read the raw data first
- Classifiers lie. Summary fields are stale.
</pre>

Every rule in this file is a scar. The database safety section exists because an engineer once ran a query that could have wiped a table with years of lead data. The bottom-up analysis law exists because I spent months making decisions based on classifier fields that turned out to be garbage. "Teaching mode" exists because I'm not an engineer by training — I need the AI to explain what it's doing, not just do it.

Beyond the CLAUDE.md files, there are 12 skill documents, 7 command definitions, 5 automated hooks that enforce discipline at the system level, and 119 session memory files that persist context across conversations. This isn't a configuration file. It's a governance architecture for human-AI collaboration.

The hooks are the most interesting part. They run automatically — I can't skip them even if I try:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
SessionStart  → reads deployment state, last session, architecture
PreToolUse    → blocks dangerous bash commands before execution
PreToolUse    → enforces bottom-up analysis before SQL aggregates
PostToolUse   → gates file edits through fresh-eyes review
Stop          → auto-saves session memory + git state on exit
</pre>

Each hook is a postmortem encoded into infrastructure. The pre-bash safeguard exists because of the Twilio incident. The session-end save exists because I kept losing context between sessions. The fresh-eyes gate exists because you stop seeing your own bugs after hour six.

This is what engineering governance looks like when you have no team to govern. You encode the discipline into the system itself.

<p class="coming-soon">Full essay coming soon — will include the complete CLAUDE.md with commentary, the hook source code, and a timeline of how each rule was born from a specific failure.</p>
