---
title: Ponytail Skill (YAGNI Mode)
weight: 16
---

Ponytail is the voice of the veteran developer who asks "do we really need this?". It pushes Pando to write less code, to use what the language already brings before adding anything, and to question complexity. The idea has a name among programmers, YAGNI: "you aren't gonna need it".

## What it does for you

- **Smaller changes.** The smallest edit that solves the problem.
- **Fewer moving parts.** What already exists is used before adding a new library.
- **Shorter explanations.** Only what you need to know.
- **A healthy "why?"** At its strongest level it questions the request itself.

## How it feels in practice

Without Ponytail, asked for a small helper, Pando might build a new function with its tests, its documentation and a couple of layers "for the future". With Ponytail at full level it first checks whether the language already solves it, uses the simplest version, skips the layers nobody asked for and writes the minimum tests.

There are three levels:

| Level | Behaviour |
|------|----------|
| **Lite** | Builds what you ask and mentions the lazier alternative |
| **Full** | Follows "the ladder": what the language already has first, then the smallest change, then the shortest explanation |
| **Ultra** | Removes before adding, and challenges whether the thing is needed at all |

## When to use it

It shines in clean-up sessions and in projects that have grown more complicated than they should. Leave it off when you really are building something new and broad.

## Good to know

- It is off for new sessions unless you set a default level.
- It changes how code is written, not how much Pando talks. For shorter answers use [Caveman]({{< relref "/docs/features/caveman-mode" >}}).
- It is inspired by Dietrich Gebert's ponytail skill (MIT licensed).

## Next steps

- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}).
- Reference: [Working modes]({{< relref "/docs/configuration/modes" >}}).
