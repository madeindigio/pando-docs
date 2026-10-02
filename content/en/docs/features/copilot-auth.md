---
title: GitHub Copilot Authentication
weight: 34
---

If you have a GitHub Copilot subscription, Pando can use its models. You sign in with your GitHub account and that is the whole setup: no key to create, copy or renew. It is like using your gym card at another branch of the same chain.

## What it does for you

- **No new bill.** You use what your Copilot plan already includes.
- **No keys to look after.** You approve Pando once on GitHub's own page.
- **Your company's models too.** If your organisation added its own models to Copilot (what GitHub calls BYOK, "bring your own key"), they appear in Pando's model list just as they do in VS Code. On a Business seat that is often twenty models or more.
- **Usable everywhere in Pando.** In the chat, in sub-agents, and through the [local proxy]({{< relref "/docs/features/llm-proxy" >}}) for your other tools.

## How it feels in practice

You press **Login with GitHub**, GitHub shows you a page, you type a short code and approve. Back in Pando, the model picker now has entries that start with `copilot.`. You choose one and work as usual.

## When to use it

Use it if you or your company already pay for Copilot. It is the quickest way to get good models into Pando.

Which models you see depends on your plan: the free plan has a small set, Pro and Pro+ have more, and Business or Enterprise seats add the organisation's own.

## Good to know

- The sign-in uses GitHub's standard flow for devices. Your GitHub password never passes through Pando.
- The pass that GitHub hands back is kept on your machine, in your Pando profile.
- GitHub Enterprise (your company's own GitHub address) is supported.
- If your organisation's models do not appear, signing out and in again usually fixes it.

## Next steps

- Guide: [Use Pando from your editor and other apps]({{< relref "/guides/editors-and-other-apps" >}}) walks through the sign-in.
- Reference: [sign-in commands and plans]({{< relref "/docs/configuration/providers" >}}).
- Related: [Local LLM Proxy]({{< relref "/docs/features/llm-proxy" >}}), [Model Auto Mode]({{< relref "/docs/features/model-auto-mode" >}}).
