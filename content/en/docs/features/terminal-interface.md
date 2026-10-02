---
title: Terminal UI
weight: 1
---

Type `pando` in a terminal and you get the whole application drawn with text: a chat, a file browser, an editor, settings. It is the original Pando, a full workshop that fits through the narrowest door, the kind you can carry into a server over SSH or open on a phone terminal.

## What it does for you

- **Everything, without a mouse.** Chat, past sessions, settings, models, files and commands are each one key away.
- **Works anywhere a terminal works.** Linux, macOS, Windows, SSH, Android terminals. No browser, no window system.
- **Files next to the conversation.** Browse the project, open several files in tabs with colours for code, and edit them without leaving.
- **See what changed.** In a git project, the files Pando modified and their changes are listed for review.
- **Pictures too.** Images and charts the agent produces are shown right in the terminal.
- **Change engine on the fly.** Switch model or provider in the middle of a session.

## How it feels in practice

Like a well-organised desk where every drawer has a keyboard shortcut. You start a new session, describe a task, and watch Pando work. When you want to look at a file you open the file panel; when you want an old conversation you call up the session list. Your hands never leave the keys, though the mouse works if you want it.

{{< asciinema file="https://asciinema.org/a/QvjIvPKDk2PEnHXD.cast" >}}

One key is worth remembering above all: `Ctrl+H` shows the shortcuts of whatever is on screen.

## When to use it

- You already live in a terminal and switching to a window breaks your flow.
- You work on a remote machine.
- You want the lightest possible Pando.

If you prefer clicking, the [Web UI]({{< relref "/docs/features/web-ui" >}}) and the [desktop app]({{< relref "/docs/features/desktop-app" >}}) show the same sessions with buttons.

## Good to know

- The first-run setup assistant belongs to the Web UI and the desktop app. Here you add providers and models from the settings screen.
- Icons need a terminal font that includes them; without one, Pando can draw plain characters instead.
- The extras that make it comfortable (themes, tabs, the info sidebar) are described in [TUI Enhancements]({{< relref "/docs/features/tui-enhancements" >}}).

## Next steps

- Guide: [Choose your surface]({{< relref "/guides/choose-your-surface" >}}).
- Reference: [keyboard shortcuts and terminal options]({{< relref "/docs/configuration/webui" >}}).
- Related: [Command Line Interface]({{< relref "/docs/features/cli" >}}), [TUI Enhancements]({{< relref "/docs/features/tui-enhancements" >}}).
