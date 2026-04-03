---
layout: video.njk
title: "Production Pipeline: How to Make These Videos"
series: "Production Notes"
duration: "Reference"
order: 99
date: 2026-04-01
---

<div style="color:#666; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2rem;">Production Reference Document</div>

## The Stack

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Voice:
  Option A: Direct recording (iPhone Voice Memos + Descript for editing)
  Option B: ElevenLabs voice clone (needs 30+ min of source audio)
  Tone: Quiet, reflective, conversational. Not corporate.
  Think Dalio narrating "Principles" — professorial
  but warm. Never rushed. Pauses matter.

Animation:
  Tool: Remotion (React-based, programmatic animation)
  Alt: Motion Canvas (TypeScript, open source)
  Style: Black background, white/cream text, minimal
  color (green for positive, red for warnings).
  The SVGs on agent-ic.co ARE the storyboard frames.

Code on Screen:
  Tool: Carbon (carbon.now.sh) for static screenshots
  Alt: Asciinema for animated terminal recordings
  Theme: Monokai Dark, matching site aesthetic
  Font: JetBrains Mono or Fira Code

Assembly:
  Tool: FFmpeg for programmatic compositing
  Alt: DaVinci Resolve (free) for manual editing
  Output: 1920x1080, H.264, YouTube + LinkedIn optimized
  Subtitles: Auto-generated via Whisper, manually reviewed

Hosting:
  YouTube (primary), LinkedIn (native upload), agent-ic.co (embed)
</pre>

## Recording Tips (For Mukund)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
1. Record in the quietest room you have.
   Closets work. Bathrooms don't (reverb).

2. Hold the phone 6 inches from your mouth,
   slightly to the side (reduces plosives).

3. Read each section once straight through.
   Don't worry about mistakes — we edit.

4. Pause 2 full seconds between sections.
   This gives editing handles.

5. The emphasis marks in the scripts below
   show where to slow down or stress a word:

   *emphasis* = lean into this word
   [PAUSE] = full 1-second silence
   [BEAT] = half-second natural pause

6. Target: conversational, like you're
   explaining to a smart friend over coffee.
   Not presenting. Not performing. Telling.
</pre>

## Voiceover Script: "How the Apartment Locating Machine Works" (6 min)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#e8e4de; overflow-x:auto; margin:2rem 0;">
[SECTION 1: COLD OPEN — 0:00 to 0:20]

Every day, thirty thousand people text us
looking for an apartment. [BEAT]
Every day, *zero* humans answer them.

[PAUSE]

This is how the machine works.


[SECTION 2: THE LEAD ENTERS — 0:20 to 1:30]

A renter in Dallas clicks a listing on a listing site.
That click generates a lead — a name,
a phone number, a city.
Within seconds, it arrives in our system.

But here's the thing most people miss
about apartment locating: [BEAT]
the building the renter clicked on? [BEAT]
That's *almost never* where they end up.

The lead is a signal, not a destination.

We are a leasing company that works with
many property managers.
The renter inquires on one building —
we match them with options across our
*entire* network. Often a better fit
than what they originally clicked on.

This is the business model that nobody in tech
takes seriously. [BEAT]
And that processes thousands of placements
per month.


[SECTION 3: THE QUALIFICATION CHECK — 1:30 to 3:00]

Before we invest in a lead,
we run qualification checks. They run in
seconds. And they decide whether this lead
is ready for a conversation.

Step seven is where the insight is.
The building someone clicked on tells you
*almost nothing* about where they'll live.

But the *conversation* — what they tell you
about their commute, their budget,
their timeline — tells you everything.

The click is a starting point. [BEAT]
The conversation is where matching happens.


[SECTION 4: THE SURVIVORSHIP INSIGHT — 3:00 to 4:00]

David McRaney wrote about survivorship bias —
how we study the bullet holes on returning planes
and miss the ones that didn't come back.

Apartment locating has the same problem.

Every brokerage in America studies their
closed deals. "What worked? What converted?"

But the deals that closed are the *returning*
planes. The insight is in the ones that
*didn't* come back.

Our AI doesn't study conversions.
It studies *drop-offs*.

Where in the conversation did the lead
go silent? What question killed the deal?
What building was presented too late?

Thirty-seven percent of leads in Chicago
were being shown buildings outside their
geographic comfort zone.
The data was right there —
but only if you looked at the *failures*,
not the wins.


[SECTION 5: THE CONVERSATION — 4:00 to 5:00]

The AI agent starts a text conversation.
It's not a chatbot — it's a *leasing agent*.

It asks the right questions to understand
what the renter actually needs.

"Are you still looking?" Yes.
"Is next month still your move date?" Yes.
"Would you like to see a place that's
two hundred dollars cheaper?" Yes.
"Can I set up a tour for Thursday?"

Each question clarifies what the renter
needs. Each answer narrows the search.
The result is a better match.

This is conversational qualification.
Understanding needs through dialogue,
not assumptions. [BEAT]
It works *everywhere*.


[SECTION 6: SCALE — 5:00 to 6:00]

Thirty thousand conversations a month.
Zero human agents.
Ninety-seven percent contribution margins
in a twenty percent industry.
Cost per conversation: *fractions of a cent*.

This is what happens when you decompose
a sales organization into atomic components
and replace each one with code.

The renter gets a better experience.
The building gets a qualified tenant.
The machine runs at three AM.

[PAUSE]

And the guy who built it? [BEAT]
He's asleep.
</pre>

## Voiceover Script: "What 1,039,939 Accidental Text Messages Taught Me" (4 min)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#e8e4de; overflow-x:auto; margin:2rem 0;">
[SECTION 1: COLD OPEN — 0:00 to 0:30]

On a Tuesday afternoon in twenty twenty-four,
my system sent one million, thirty-nine thousand,
nine hundred and thirty-nine text messages
in a single deployment.

[PAUSE]

I was supposed to send two hundred.

[BEAT]

This is not a story about a bug.
This is a story about what I built *because* of it.


[SECTION 2: THE INCIDENT — 0:30 to 1:30]

I had an engineering team.
They deployed a messaging update that was supposed
to go to a test cohort of two hundred leads.
Instead, it went to *every* lead in the database.
Every. Single. One.

Five figures in Twilio charges in an afternoon.
The database ground to a halt under the write load.

And the engineering team's response?

[BEAT]

"The deploy didn't land in production."

It had. They just didn't check.

David McRaney writes about ego depletion —
this idea that willpower is a finite resource.
You use it up resisting one temptation,
and you have less for the next.

Engineering teams have the same problem.
Checking your work is *effortful*.
Verification is *boring*.
After a long day of coding, the last thing
anyone wants to do is open the production logs
and count records.

So they don't. [BEAT]
And a million messages go out.


[SECTION 3: THE SYSTEM — 1:30 to 3:00]

I fired the team. Not because they made a mistake —
because the *architecture* allowed the mistake.

And then I built the system that makes it impossible.

[BEAT]

Three lines of bash.

[slower, reading code]
"If the command matches DROP TABLE, TRUNCATE,
or DELETE FROM — blocked. Exit code two.
Hard stop. No exceptions."

This runs before *every single command* I execute.
It cannot be skipped. It cannot be overridden.

But here's the thing about ego depletion
that McRaney gets right:
you can't rely on *willpower* to check your work.
The human will forget.
The hook *won't*.

You don't make the system depend on people
being disciplined.
You make discipline a *property of the architecture*.


[SECTION 4: THE PRINCIPLE — 3:00 to 4:00]

Every rule in my system is a scar.
Every hook is a postmortem.

The bash guard exists because of the Twilio incident.
The bottom-up analysis law exists because I made
business decisions on garbage classifier fields.
The database safety rules exist because an early
session nearly wiped five years of lead data.

[PAUSE]

Marc Andreessen has this thing about Joe Pike —
the character with the red arrows tattooed
on his deltoids, always pointing forward.
"We don't stop. We don't slow down.
We don't revisit past decisions."

I love that. But there's a nuance:
you can point forward and still encode the scars.
The arrows point forward.
The hooks remember backward.
That's the architecture.

[PAUSE]

One million thirty-nine thousand nine hundred
and thirty-nine messages cost me five figures
and an engineering team.

The defense system they created
has prevented every incident since.

[BEAT]

The most valuable thing I own
isn't the AI agent. [BEAT]
It's the scars.
</pre>

---

<p class="coming-soon">Remaining voiceover scripts (Cost Collapse, Socratic Framework, War Diary) will be added in the same format. Each script has timing marks, emphasis cues ([BEAT], [PAUSE], *emphasis*), and section breaks for recording.</p>
