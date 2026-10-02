---
title: Native Desktop App
weight: 5
---

The desktop app is Pando with a window of its own, on macOS, Windows and Linux. Same interface as the Web UI, but it lives among your other applications instead of among your browser tabs, like having a dedicated desk instead of borrowing a corner of the kitchen table.

## What it does for you

- **A tap on the shoulder.** Hand Pando a long job, minimise the window and do something else. A system notification tells you when the job is done or when Pando needs an answer.
- **Many things at once.** Several sessions and several projects keep working in the background without getting in each other's way.
- **Always within reach.** Open it from the Dock, the Start menu or the application launcher. On Linux and Windows an icon in the system tray brings the window back or quits.
- **All the room for your work.** The window has no separate title bar: the minimise, maximise and close buttons share one bar with the session title, so the content gets the full height. Drag that bar to move the window.
- **Private by default.** Conversations, settings and history stay on your machine, and the app talks to its own engine over an encrypted local connection.
- **Trusted installers.** The macOS installer and the Windows program are signed, so the system opens them without security warnings.

## How it feels in practice

You click the Pando icon. The app opens in your home folder as a general workspace; from **Projects** you open the project you want, either as a tab in the same window or in a window of its own. Each window has its own folder, sessions and terminals.

On a Mac it also learns the same paths your terminal uses, so the tools you installed with Homebrew or a version manager are found without extra steps.

The first time, with nothing configured, the [setup assistant]({{< relref "/docs/features/setup-assistant" >}}) greets you.

## When to use it

- Pando is part of your working day and deserves its own place.
- You run long jobs and want to be told when they finish.
- You juggle several projects.

On a machine without a screen, or from another device, use the [Web UI]({{< relref "/docs/features/web-ui" >}}) instead.

## Good to know

- On Linux the window needs two common system libraries (GTK 3 and WebKitGTK). If one is missing, Pando names it and shows the command to install it for your distribution. The install script takes care of it.
- With no graphical session at all, for example over SSH, Pando explains that there is no display to open a window on.
- Opening a project as a tab keeps everything in one window and one tray icon; a separate window is something you ask for explicitly.

## Next steps

- Guides: [Install Pando]({{< relref "/guides/install" >}}), [Choose your surface]({{< relref "/guides/choose-your-surface" >}}), [Projects and tabs]({{< relref "/guides/projects-workspaces" >}}).
- Reference: [start commands and building from source]({{< relref "/docs/configuration/webui" >}}).
- Related: [Cross-Platform Installers]({{< relref "/docs/features/installers" >}}), [Project Workspaces]({{< relref "/docs/features/project-workspaces" >}}).
