---
title: Context Enrichment
weight: 13
---

Context enrichment is Pando doing its homework before answering. Think of a colleague who, on the way to the meeting, pulls the right folder from the cabinet and skims it. When you send a message, Pando quietly looks through your notes, your code and your past conversations, and brings along what looks useful. You only see a better answer.

## What it does for you

- **Answers that know your project.** Pando arrives with the relevant files and notes already in hand, without you pointing at them.
- **Less explaining.** You do not need to paste the same background into every conversation.
- **Three places searched at once:** your knowledge base, the map of your code, and what happened in earlier sessions.
- **Only the good finds.** Weak matches are thrown away before they reach the model.

## How it feels in practice

In its simple form it is invisible: one quick round of searches before each answer.

There is also a more thorough form. A small helper does several rounds of searching, the way a librarian goes back to the shelves a few times, and hands the main agent a tidy summary. With it on:

- By default it runs on the first message of a session, which is the moment Pando knows the least about your project.
- You see it working: a line in the chat says the helper is gathering context, and then how much it added.
- Its work is saved as a small side session that you can open to read exactly what it searched and found.
- If it takes too long or finds nothing, Pando falls back to the simple search, so you never end up with less than before.
- It is prepared while Pando starts, so your first message does not wait for it.

The helper uses its own model, separate from the one you chose for coding. A cheap, fast one is enough.

## When to use it

Turn it on once your project has something worth looking up: an indexed codebase, a folder of notes, some history. On a brand-new empty project there is nothing to find yet.

## Good to know

- Every find that is brought along takes up room in the conversation. You choose how many are allowed from each place.
- An optional filter, run by a tiny [decision model]({{< relref "/docs/features/decision-model" >}}), can discard finds that do not fit your question.
- The thorough form costs a little extra, because the helper is a model too. Its cost is added to the session.
- Pando also sizes up each message (is it about code, a bug, an explanation?) to leave out instructions that do not apply, which saves tokens.

## Next steps

- Guide: [Teach Pando your project with Remembrances]({{< relref "/guides/remembrances" >}}).
- Reference: [Remembrances configuration]({{< relref "/docs/configuration/remembrances" >}}).
- Related: [Persistent memory]({{< relref "/docs/features/persistent-memory" >}}).
