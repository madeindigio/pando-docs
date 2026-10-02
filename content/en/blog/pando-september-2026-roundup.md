---
title: "Pando September 2026: Version 1.0, a Sandbox by Default, and a New Look"
date: 2026-09-30
tags: ["Release", "Features", "Roundup", "Security", "Desktop", "Web UI", "Models"]
---

September was the month Pando reached **version 1.0**. Around that milestone came the changes you notice first when you open it: a redesigned interface, a setup assistant for the first run, and a sandbox that protects your machine without asking you to configure anything.

## Pando 1.0

Pando 1.0 was released on 25 September, with a new visual identity across the terminal, the Web UI, the desktop app and this site. The story of the new mark is in [Pando v1: a new identity]({{< relref "/blog/pando-v1-brand-identity" >}}).

The releases are now signed. The macOS installer is signed and notarized, and the Windows binary carries a trusted signature, so both open without security warnings. Download them from the [latest release](https://github.com/digiogithub/pando/releases/latest).

## A sandbox, on by default

The commands the agent runs on your machine are now confined to your project on **Linux and macOS**, with no containers and nothing to install.

- A command can write only in your project, in temp folders and in the usual dependency caches.
- Pando's configuration and your git hooks are read-only for the agent.
- Your API keys and tokens are removed from the environment the agent's shell sees.

There is a practical benefit too. Because a confined command can do little harm, Pando stops asking permission for each ordinary shell command. Dangerous ones, such as `sudo`, still ask. When a command really needs to leave the sandbox, the agent asks to run it once outside, and only you can approve that.

You can choose a stricter mode for repositories you do not trust, or turn the sandbox off, from Settings. A repository you clone can make your sandbox stricter but never looser. Details in [Command Sandbox]({{< relref "/docs/features/sandbox" >}}).

## A new look for the Web UI and the desktop app

The Web UI was redesigned from the ground up to feel like a native application.

- **Themes**: light, dark or following your system, four colour families and a choice of accent colour.
- **A window of its own**: the desktop app draws its own title bar, so the content uses the whole window. On Linux and Windows there is a system tray icon.
- **Simple chat in the same window**: the simple view now lives next to the full one, and Pando remembers which you use.
- **Your version, in sight**: the chat info panel and the settings show which version you run and when a newer one exists.
- **No lost settings**: leaving a settings page with unsaved changes asks first.
- **One window per project** in the desktop app, each on its own folder.

On Linux, when a library the window needs is missing, Pando now says which one and how to install it. On macOS, opening Pando from the Dock starts in your home folder with the same tools your terminal finds.

More in [Web-UI & PWA]({{< relref "/docs/features/web-ui" >}}) and [Native Desktop App]({{< relref "/docs/features/desktop-app" >}}).

## A setup assistant for the first run

Open Pando for the first time in the Web UI or the desktop app and an assistant takes you through four decisions: where to keep your settings, which AI provider, which models, and whether to switch on memory and code search.

With GitHub Copilot there is nothing to paste: you enter a code on GitHub and the assistant continues by itself. For memory, it detects whether Ollama is installed, helps you install or start it, and downloads the models with a progress bar.

You can cancel at any step and configure things by hand, as before. See [Setup Assistant]({{< relref "/docs/features/setup-assistant" >}}).

## Auto: the right model for each prompt

Select **Auto** as your model and Pando chooses for each prompt. You describe a few kinds of work, such as quick questions, implementation and planning, and assign a model to each. A very small, fast model reads the prompt and picks the route.

Your strongest model does the hard work and a cheap or local one answers the quick questions. Pando shows which model it picked each time, retries on a fallback model if a provider fails, and uses your normal model when no route fits. A playground in the settings lets you test a prompt against your routes before you rely on them.

It is off by default. See [Model Auto Mode]({{< relref "/docs/features/model-auto-mode" >}}).

## Go back to a previous version

`pando update` now accepts a version:

```bash
pando update v1.1.1
```

It installs exactly that release, even an older one. If an update does not work for you, going back is one command. See [Self-Update]({{< relref "/docs/features/self-update" >}}).

## Self-improvement you can review

The self-improvement system was rebuilt so that it does its job, and so that you stay in charge of it.

Pando scores each finished session by itself, at no cost: did you have to correct the agent, were there tool errors, how many tokens did it take. You can rate a session yourself with `/feedback good` or `/feedback bad`. For the sessions that went clearly well or badly, a judge model may propose a short rule for the future.

Those rules are files you read, edit and approve. Nothing is added to your prompts without your approval, and rules that do not help are retired. `pando evaluator doctor` tells you in plain words whether the loop is running and why not. See [Self-Improvement System]({{< relref "/docs/features/self-improvement" >}}).

## Memory that follows the question

Pando now adds to each prompt the memories that relate to what you are asking, instead of a fixed set. The rest of the prompt stays stable between messages, which lets providers reuse their cache: long sessions cost less and respond faster.

## Remote diagnostics, when you ask for them

When something fails, you can switch on remote diagnostics, reproduce the problem and give the maintainers a random debug ID. They find your logs with it; you do not paste anything.

It is off by default. Your code, your conversations and your keys are never sent. See [Remote Diagnostics]({{< relref "/docs/features/remote-diagnostics" >}}).

## Pando inside your own web app

Pando already spoke AG-UI, the protocol behind CopilotKit and similar toolkits. In September it became ready for real applications:

- **Agent profiles**: several named agents from the same Pando, each with its own model, persona and tools.
- **Conversations that survive** a page reload or a restart.
- **Runs that keep going** when the browser disconnects, and resume where they were.
- **One token to configure**, kept between restarts.

See [AG-UI for Web Apps]({{< relref "/docs/features/agui" >}}).

## Also in September

- **Obscura browser**: a small, fast headless browser you can select for browser automation, well suited to servers and CI. See [Browser Automation]({{< relref "/docs/features/browser-automation" >}}).
- **Extensions for organisations**: extensions can now supply managed settings and lock them, connect your identity provider, and hide parts of the interface. See [Extensions]({{< relref "/docs/features/extensions" >}}).
- **Signing in to providers**: Anthropic and Gemini use an API key; GitHub Copilot uses your GitHub login. The Antigravity provider was removed.
- **Xcode 27**: Pando works as an agent in the new Xcode.
- **Correct context sizes** for models served by OpenAI-compatible providers, so long conversations are compacted at the right moment.
- **Design Studio**: a clearer interface for creating and previewing designs.
- **Knowledge base**: documents keep the extra front-matter fields you add, and the knowledge base can be written and searched over the REST API.

### One change to act on

If you run Pando as an **MCP server over HTTP**, every request now needs an access token, also on your own machine. Pando creates one for you on `localhost` and shows it at startup. Clients over `stdio` are not affected. See [MCP]({{< relref "/docs/mcp" >}}).

## What's next

Project workspaces as tabs inside a single window are already landing, along with an install script that covers Linux and macOS, and automatic persona selection that shares the same decision model as Auto mode.

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
