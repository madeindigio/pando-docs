---
title: TUI Enhancements
weight: 26
---

The terminal interface is not a bare black screen. Over time it has collected the comforts you expect from a desktop app: tabs, themes, a side panel, a file tree, a built-in terminal. This page is the tour of those comforts, the way an estate agent shows you the nice touches of a flat.

## What it does for you

- **Three layouts, one key each.** Chat only, editor only, or both side by side, so the screen matches what you are doing.
- **A fact sheet beside the chat.** Session title, the plan Pando is following with each step's status, the files it changed and where the project lives. It appears by itself when the terminal is wide enough.
- **Themes.** Eleven colour themes (pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai), each also available with a transparent background.
- **Mention a file by typing `@`.** A search box finds it as you type.
- **Know your model before you pick it.** The model list shows how much each can read at once, what it costs, whether it can reason or see images, and how recent its knowledge is.
- **A fuel gauge.** The status bar shows how full the conversation's memory is while Pando works, and warns you past 80%.
- **A real terminal inside.** Open a shell panel, with tabs, without leaving Pando.

## How it feels in practice

You start in the chat. A file needs a look, so you switch to the split layout: code on one side, conversation on the other. The bar at the bottom keeps you oriented: which project, which model, how much memory is used, how many errors the code checker found, which files you touched last. Everything on it can be clicked.

The file tree marks new, changed and deleted files, loads folders only when you open them and filters as you type. Arrow up brings back the messages you sent before, like in any shell.

There is also a switch that lets Pando use its tools without asking each time. A badge in the status bar reminds you while it is on.

## When to use it

Always, if the terminal is your home: these are not modes to turn on but the way the terminal interface is. Reach for the themes and the icon switch on day one, and for the layouts when you start reviewing code.

## Good to know

- Icons need a font that includes them (a "Nerd Font"). If you see little boxes, switch icons off and Pando draws plain characters.
- Hidden files (the ones starting with a dot) are out of sight until you ask for them.
- Letting tools run without asking is convenient and risky in equal parts. The [command sandbox]({{< relref "/docs/features/sandbox" >}}) is the safer way to get fewer questions.
- `/` is reserved for [slash commands]({{< relref "/docs/features/slash-commands" >}}); files are mentioned with `@`.

## Next steps

- Guide: [Choose your surface]({{< relref "/guides/choose-your-surface" >}}).
- Reference: [every shortcut and every `[TUI]` option]({{< relref "/docs/configuration/webui" >}}).
- Related: [Terminal UI]({{< relref "/docs/features/terminal-interface" >}}).
