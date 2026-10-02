---
title: "Your first session with Pando"
shortTitle: "Your first session"
description: "Install Pando, open it in a project and follow one request from the surface down to the roots."
summary: "One request, followed from the surface to the roots."
track: surface
level: beginner
weight: 2
featured: true
home: true
video:
  provider: youtube
  id: ""
  subtitles: [en, es]
chapters:
  - { t: "00:00", title: "Install" }
  - { t: "00:00", title: "Open a project" }
  - { t: "00:00", title: "First request" }
  - { t: "00:00", title: "What happened below" }
  - { t: "00:00", title: "Switch surfaces" }
---

## Install

Pando is a single binary. Download it for macOS, Linux or Windows from the [latest release on GitHub](https://github.com/digiogithub/pando/releases/latest), or on Linux and macOS run the install script:

```sh
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

## Open a project

Run Pando from the root of your repository. That folder becomes the ground the grove grows in.

```sh
cd my-project
pando
```

## Your first request

Ask for something real: explain a module, fix a failing test. Keep an eye on the activity panel while it works.

{{< shot alt="First request in Pando Desktop" >}}

## What happened below

You typed one message. Underneath, several parts of the organism moved together.

{{< under-surface >}}
Remembrances indexed your code with tree‑sitter and recalled related context. When the task grew, Mesnada split it among subagents. None of it needed a command from you.
{{< /under-surface >}}

## Switch surfaces

Your session is waiting in Desktop, Web and the TUI. For quick shell help without opening a session, use the CLI assistant.

```sh
pando cli-assist
```
