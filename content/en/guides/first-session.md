---
title: "Your first session with Pando"
shortTitle: "Your first session"
description: "Open Pando in a project, ask for something real and see what moved under the ground."
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
  - { t: "00:00", title: "Open Pando in a project" }
  - { t: "00:00", title: "Meet the screen" }
  - { t: "00:00", title: "Ask for something real" }
  - { t: "00:00", title: "Say yes or no" }
  - { t: "00:00", title: "What happened below" }
  - { t: "00:00", title: "Come back later" }
  - { t: "00:00", title: "Check it works" }
  - { t: "00:00", title: "If something goes wrong" }
---

Ten minutes, one real request. You need Pando [installed]({{< relref "/guides/install" >}}) and at least one AI account connected; if the setup assistant greets you, [this guide]({{< relref "/guides/setup-providers-models" >}}) walks you through it.

## Open Pando in a project

Pando works on a folder, the way a gardener works on one plot. Choose the folder of your project:

- **Desktop app**: open Pando, go to **Projects**, press **Add project**, pick the folder and then click the project in the list. It opens in its own tab at the bottom.
- **From a terminal**: go to the folder and start the Web UI.

```sh
cd my-project
pando app
```

The terminal prints an address. Open it in your browser.

## Meet the screen

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="The chat screen of Pando" >}}

Three columns, like a workbench:

- **Left**: your sessions (past conversations) and the menu to every other screen.
- **Middle**: the conversation. The box at the bottom is where you write.
- **Right**: the fact sheet of the session: which folder Pando is working on, whether the sandbox is on, and which files it has changed.

## Ask for something real

Skip "hello". Ask for something you actually need, or press one of the starter buttons under the box: **Explain this codebase**, **Find and fix a bug**, **Write tests**, **Review my changes**.

```
Explain how login works in this project and point me to the files involved.
```

Press **Enter**. Pando starts reading files and tells you what it is doing as it goes.

## Say yes or no

When Pando wants to do something that changes your project, such as editing a file or running a command, it asks first. Read the request and allow or deny it. You are the one holding the keys.

If it heads in the wrong direction, you do not need to stop it: write a new message while it works ("only the login part, please") and it corrects course at the next safe moment. That is called [steering]({{< relref "/docs/features/steering" >}}).

## What happened below

You typed one message. Under the ground, several parts moved together.

{{< under-surface >}}
Pando looked through your code for the parts related to your question, recalled anything it had noted about this project before, and picked the tools it needed. If the job had been bigger, it would have split it among helpers. None of that needed a command from you.
{{< /under-surface >}}

## Come back later

Close the window. Your conversation stays in the list on the left, with a title Pando wrote for it. Click it tomorrow and continue where you left off, from the desktop app, the browser or the terminal: it is the same session everywhere.

## Check it works

- The answer mentions real files of your project.
- The session appears in the left column with a title.
- If Pando edited something, the file shows up under **Modified files** on the right.

## If something goes wrong

| What you see | What to do |
|---|---|
| A setup assistant instead of the chat | No AI account yet. Follow [Connect your AI accounts]({{< relref "/guides/setup-providers-models" >}}) |
| A yellow bar saying the project has no local config file | Harmless. Press **Dismiss**, or **Setup assistant** if you want settings just for this project |
| The answer never starts | Check the model name next to the send button and try another one |
| Pando talks about the wrong folder | Look at **Working directory** on the right. Open the right project from **Projects** |

Where to go next: [take the tour of the Web UI]({{< relref "/guides/webui-tour" >}}).
