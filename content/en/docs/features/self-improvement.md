---
title: Self-Improvement System
weight: 25
---

After a match, a good coach watches the replay and writes down one or two things to do better next time. Pando can do the same with your sessions: it scores each one when it ends, notices what worked and proposes short rules for the future. You read the proposals, and only the ones you approve are used.

It is **off by default**.

## What it does for you

- **Every session gets a score**, without calling any model: did you have to correct Pando, how many actions failed, how many times you cancelled, how much it cost.
- **Your opinion counts more.** A thumbs up or down from you replaces the automatic score.
- **Lessons from the clear cases.** When a session went clearly well or clearly badly, a judge model reads it and may propose a rule, such as "verify the build before reporting done".
- **You are the editor.** Each proposed rule is a small file you can read, reword, approve or reject.
- **Rules that do not help are retired** by themselves.

## How it feels in practice

{{< shot src="images/webui/pando-webui-self-improvement.jpg" alt="Self-Improvement view: counters, evaluations per day and learned skills" >}}

You work as usual. Now and then you open the Self-Improvement view: it shows how many sessions were scored, the average, how it evolved over the last two weeks and why each recent session got its score. A list of pending rules waits for you with approve and reject buttons. Approved rules join Pando's instructions in the sessions you start afterwards.

If you like experiments, you can also write two versions of an instruction and let Pando find out which one gives better sessions.

## When to use it

It pays off when you use Pando regularly on the same kind of work, because patterns need repetition to show up. For occasional use there is not enough to learn from.

## Good to know

- **Pando never rewrites its own instructions behind your back.** Rules are files you approve, and instruction variants are files you write.
- The judge has a daily budget, so it cannot run up your bill.
- The judge only speaks about sessions of a certain length that ended clearly well or badly. Few proposals at the start is normal.
- A built-in "doctor" tells you in plain words whether the coach is working and, if not, why.

## Next steps

- Guide: [Help Pando learn from your sessions]({{< relref "/guides/self-improvement" >}}).
- Reference: [Self-improvement configuration]({{< relref "/docs/configuration/self-improvement" >}}).
