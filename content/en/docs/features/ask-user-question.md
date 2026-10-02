---
title: Interactive User Questions
weight: 22
---

Sometimes the honest thing for an assistant to do is stop and ask. When Pando reaches a fork in the road, which database, which approach, what exactly did you mean, it pauses and shows you a small card with choices, like a waiter checking "still or sparkling?" before bringing the wrong bottle.

## What it does for you

- **Fewer wrong guesses.** A ten-second answer from you saves ten minutes of work in the wrong direction.
- **Easy to answer.** You pick from a few options instead of writing an essay. There is always an "Other" box when none fits.
- **Several questions in one go.** Up to four related questions arrive together, and you see a summary of your answers before confirming.
- **More than one choice when it makes sense.** Some questions let you tick several options.
- **Patient.** If your connection drops or you reload the page, the question is still waiting.

## How it feels in practice

Pando is halfway through a task and a card appears:

```
Question 1/2: Database Choice
 ○ PostgreSQL
 ● SQLite
 ○ MySQL
 ○ Other

Question 2/2: ORM Preference
 ○ GORM
 ○ sqlx
 ○ Other
```

You choose, confirm, and Pando carries on with your answers in hand.

The card adapts to where you are: a window with mouse and keyboard in the Web UI and desktop app, a keyboard-driven dialog in the terminal interface, and a numbered list of options in an editor's assistant panel, where Pando waits for you to reply in text.

## When to use it

You do not call it; Pando does, when it needs you to decide about an approach, a design choice or an unclear request. To get more questions and fewer assumptions, say so ("ask me before deciding anything important") or use [Learning Mode]({{< relref "/docs/features/learning-mode" >}}).

## Good to know

- Each round has one to four questions with two to four options each, so it never turns into a form.
- It can be switched off if you prefer Pando never to interrupt with cards.
- Questions are different from permission requests. A question is "which way?"; a permission request is "may I?".

## Next steps

- Guide: [Find your way around the Web UI]({{< relref "/guides/webui-tour" >}}).
- Reference: [how to switch questions off]({{< relref "/docs/configuration/webui" >}}).
- Related: [Fast User Feedback]({{< relref "/docs/features/steering" >}}).
