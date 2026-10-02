---
title: Thinking & Reasoning Effort
weight: 37
---

Modern models have a "how hard should I think" dial. It is the difference between answering off the top of your head and sitting down with pen and paper. Pando lets you turn that dial, and takes care of a detail that used to hurt: every model has different steps on it.

## What it does for you

- **Only shows what your model accepts.** Some models only know "high", others "low" and "high", some have no dial at all. Pando offers just the steps that exist for the model you chose.
- **Never fails on a wrong value.** If a setting does not fit the model, Pando moves it to the nearest valid step instead of stopping your work with an error.
- **Picks a sensible default.** Medium when it exists, otherwise the closest thing.

## How it feels in practice

Across all providers the dial can go through none, minimal, low, medium, high, extra high and max. What you see depends on the model. Switch model and the list of steps changes with it.

| Effort | Good for |
|--------|----------|
| None, minimal | Mechanical edits, formatting, translations, bulk work where speed and cost matter |
| Low | Everyday coding in code you know well |
| Medium | The default. Most tasks |
| High and above | Design decisions, a bug you do not understand, planning a change in several steps |

## When to use it

More thinking costs more and takes longer, so do not leave the dial on high out of habit. Because you can change model and effort in the middle of a session, a common pattern is to plan at high effort and then drop to low for the mechanical part.

## Good to know

- The dial is set per agent: the one that codes, the one that summarises and so on can each have their own.
- Some models use a slightly different dial, a share of the answer reserved for thinking. Pando shows it as "thinking mode" next to the effort.
- Price, memory size and thinking support of each model are filled in from the public [models.dev](https://models.dev) catalogue, so they show up in the model list without you configuring anything.

## Next steps

- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}) shows where the dial is.
- Reference: [Working modes]({{< relref "/docs/configuration/modes" >}}).
- Related: [Model Auto Mode]({{< relref "/docs/features/model-auto-mode" >}}) to change model by itself.
