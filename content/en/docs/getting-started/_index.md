---
title: Getting Started
weight: 1
---

Welcome. Pando is an AI assistant for people who build software: it reads your project, answers questions about it, writes and changes code, runs commands and remembers what you decided last week. This page is the trailhead. Pick a path and follow the signs.

## The short path: three guides

Do these in order and you will be working with Pando in about fifteen minutes.

{{< cards >}}
  {{< card link="../../guides/install" title="1. Install Pando" icon="download" subtitle="One download or one line in a terminal" >}}
  {{< card link="../../guides/setup-providers-models" title="2. Connect an AI account" icon="key" subtitle="The setup assistant, accounts and models" >}}
  {{< card link="../../guides/first-session" title="3. Your first session" icon="chat" subtitle="One real request, from start to finish" >}}
{{< /cards >}}

## In a hurry?

On Linux or macOS, paste this in a terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

On Windows, in PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

Then go to your project and open Pando:

```bash
cd my-project
pando app        # the Web UI, in your browser
```

`pando desktop` opens the same interface in its own window, and plain `pando` opens the terminal interface. The first time, a setup assistant asks for your AI account.

## How this site is organised

Three kinds of pages, three kinds of questions:

| Section | It answers | Start with |
|---|---|---|
| [Guides]({{< relref "/guides" >}}) | "How do I set this up and use it?" Step by step, with screenshots | [Find your way around the Web UI]({{< relref "/guides/webui-tour" >}}) |
| [Features]({{< relref "/docs/features" >}}) | "What is this and do I want it?" Plain explanations | [Web UI]({{< relref "/docs/features/web-ui" >}}) |
| [Configuration]({{< relref "/docs/configuration" >}}) | "What is that option called?" Lists of settings and commands | [Configuration]({{< relref "/docs/configuration" >}}) |

## What to try after your first session

- [Choose your surface]({{< relref "/guides/choose-your-surface" >}}): desktop, browser, terminal or a single line.
- [Teach Pando your project]({{< relref "/guides/remembrances" >}}): give it a memory.
- [Work on several projects]({{< relref "/guides/projects-workspaces" >}}): one tab each.
- [Use Pando from your phone]({{< relref "/guides/remote-access" >}}).

## For the terminal-minded

```bash
pando -c /path/to/project                       # start in a specific folder
pando -p "Explain the use of context in Go"     # one question, one answer
pando -p "Explain the use of context in Go" -f json
pando -d                                        # with debug messages
```

All start-up options are in the [reference]({{< relref "/docs/configuration/webui" >}}); building from source is covered at the end of the [installation guide]({{< relref "/guides/install" >}}).
