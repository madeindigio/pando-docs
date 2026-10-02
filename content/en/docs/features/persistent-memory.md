---
title: Persistent Memory System
weight: 12
---

Without memory, every conversation with an assistant starts like the first day of a new job. Pando keeps a notebook between visits: short facts about you and your project that it writes down, reads again when they are useful and forgets when nobody needs them any more.

## What it does for you

- **You stop repeating yourself.** "We use pnpm", "tests run with `make test`", "I prefer TypeScript": said once, remembered afterwards.
- **It reads the notebook by itself.** Before answering, Pando glances at the notes that have to do with what you are asking.
- **The important things float to the top.** Recent notes, notes it uses often and notes marked as important are read first.
- **It tidies up alone.** A note nobody has looked at in months fades away; a note that keeps being useful stays.

## How it feels in practice

You say "remember that we deploy on Fridays". Days later, in another session, you ask when the next deployment is, and Pando already knows. You did not open any settings or write any file. If something stops being true, say "forget that" and the note is gone.

Notes can be filed under a heading, such as things about you, things about this project or things about this session, which makes them easier to find later.

## When to use it

Memory is for short, lasting facts: preferences, conventions, decisions. For long material such as a design document or meeting notes, use the knowledge base, which is the library next to the notebook. Both are part of Remembrances.

## Good to know

- Everything is stored on your machine.
- A note lives about half a year if it is never read again. Each time Pando uses it, its life is extended. You can change that, and you can protect whole headings from the clean-up.
- You decide how many notes Pando may read before each answer, so the notebook never crowds out your question.
- Other tools can use the same notebook when Pando is connected to them as an [MCP server]({{< relref "/docs/mcp" >}}).

## Next steps

- Guide: [Teach Pando your project with Remembrances]({{< relref "/guides/remembrances" >}}).
- Reference: [Remembrances configuration]({{< relref "/docs/configuration/remembrances" >}}), including the tools the agent uses to write and read notes.
- Related: [Context enrichment]({{< relref "/docs/features/context-enrichment" >}}), [Learning mode]({{< relref "/docs/features/learning-mode" >}}).
