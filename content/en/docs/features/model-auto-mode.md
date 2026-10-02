---
title: Model Auto Mode
weight: 39
---

Auto mode lets Pando choose the model for each prompt. You describe a few kinds of work and say which model handles each one. Hard work goes to your strongest model, quick questions go to a cheap or local one.

It is **off by default**.

## How it works

1. You select **Auto** as the model.
2. For each prompt you send, a very small and fast *decision model* reads it and picks the route that fits best.
3. Pando runs that turn on the model you assigned to the route, and tells you which one it picked.

```
Auto: implementation → anthropic.claude-sonnet-4 (p=0.93, 38 ms via ollama/tev1:0.8b)
```

If no route fits clearly, or the decision model is not reachable, the turn runs on your normal coder model. Auto mode never blocks a prompt.

The choice is made once per prompt. While the agent works through its tool calls the model stays the same.

## Set it up

### 1. Choose a decision model

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Decision model settings" >}}

Open **Settings > Decision model** and pick the provider. The simplest option is local, with [Ollama](https://ollama.com) 0.35 or later:

```bash
ollama pull tev1:0.8b
```

Use **Test connection** to confirm it works. Pando does not install Ollama or download models for you.

### 2. Define your routes

{{< shot src="images/webui/pando-webui-settings-auto-mode.jpg" alt="Auto mode settings" >}}

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes.jpg" alt="Auto mode routes with primary and fallback models" >}}

Open **Settings > Model auto mode**, switch it on and add routes. Each route has a description of the work and a model. In the config file it looks like this:

```toml
[ModelAutoMode]
Enabled = true

[[ModelAutoMode.Routes]]
ID          = 'quick'
Description = 'Short question or explanation about code, a concept, an error message or a command; no code changes needed.'
Model       = 'ollama.qwen2.5-coder:7b'

[[ModelAutoMode.Routes]]
ID          = 'implementation'
Description = 'Write, modify, refactor or fix code across one or more files, including adding tests.'
Model       = 'anthropic.claude-sonnet-4'
Fallbacks   = ['copilot.gpt-5.4']

[[ModelAutoMode.Routes]]
ID          = 'planning'
Description = 'Design, architecture, trade-off analysis or planning a feature before implementing it.'
Model       = 'anthropic.claude-opus-4'
```

### 3. Try it before you rely on it

{{< shot src="images/webui/pando-webui-settings-auto-mode-playground-result.jpg" alt="Auto mode playground showing the winning route" >}}

The settings page has a **playground**: type a sample prompt and see which route wins and why, without sending anything to a model.

## Using Auto

- **Web UI and desktop**: Auto is the first entry of the model switcher. While a turn runs, the switcher shows `Auto · <model picked>`.
- **TUI**: Auto is the first entry of the model dialog.
- **Editors (Zed, Xcode and others over ACP)**: Auto appears as the first model in the list.

Picking a concrete model turns Auto off for that session until you select it again.

## Fallback models

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes-fallbacks.jpg" alt="Fallback models of a route" >}}

Each route can have up to two fallback models. If the first one fails because of a rate limit, a server error or a network problem, Pando retries the same turn on the next one and tells you.

## Writing good routes

- Use few routes, three to five. Each extra route makes the decision less clear.
- One sentence per route that describes the *task*, with concrete verbs.
- Make routes clearly different. Overlapping descriptions leave no clear winner and the turn falls back to the coder model.
- Short follow-ups such as "ok, continue" match no route and stay on the coder model. That is usually what you want.

## Good to know

- Delegated sub-agents keep their own configured model.
- Switching models between prompts makes the provider's prompt cache less effective for that conversation. Few routes with stable models keep the cost down.
- `pando doctor` checks that the decision model is reachable and that every route points to a model that exists.

## If something is off

| What you see | What to do |
|---|---|
| Everything runs on the coder model | Open the playground. If the best route scores low, sharpen the descriptions or lower `Threshold` |
| "Upgrade Ollama to >= 0.35" | Update Ollama |
| The decision model list is empty | Run `ollama pull tev1:0.8b` |
| The first prompt is slow | The decision model is loading. Later prompts are fast |
| "route has no usable model" | The models of that route are unknown, disabled or too small for the conversation |
