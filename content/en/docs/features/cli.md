---
title: Command Line Interface (CLI)
weight: 1
---

The command line is Pando without the furniture: you write one request, Pando does the work and hands back the answer in the same terminal. Think of it as a letterbox. You drop a note in and collect the reply, without stepping inside.

```bash
pando -p "Write a python script that prints 'Hello World' and run it"
```

## What it does for you

- **One question, one answer.** No window, no session to manage.
- **Fits into scripts.** Other programs can call Pando and read what it says, so it can take a turn in your automations: a nightly check, a step in a build, a batch of files to tidy.
- **Works where there is no screen.** A server, a container, a machine you reach over SSH.
- **Full strength.** The one-line Pando reads files, runs commands, browses the web and writes code exactly like the windowed one.
- **A pocket assistant for the shell.** Forgot how to do something in the terminal? `pando cli-assist` turns plain language into the command.

## How it feels in practice

You type a request and press Enter. Pando works silently and prints the result. If you asked for machine-readable output, you get it as JSON, ready for the next program in the chain.

The command assistant is even smaller. Ask "how can I list files in the current directory?" and it proposes the command; you decide whether to run it.

{{< asciinema file="https://asciinema.org/a/62CCiqfws8mDbL5U.cast" >}}

## When to use it

- A quick question you do not want to open a window for.
- A task you repeat and would like to automate.
- A machine without a desktop.

For a real conversation, with back and forth, files and a terminal next to each other, the [desktop app]({{< relref "/docs/features/desktop-app" >}}) or the [Web UI]({{< relref "/docs/features/web-ui" >}}) is more comfortable.

## Good to know

- In one-line mode nobody is sitting there to answer permission questions, so for unattended runs you can tell Pando up front that it may use its tools freely. Only do that where a mistake cannot hurt.
- The request can come from the command itself, from another program's output or from a variable, so it is easy to chain.
- Long, autonomous jobs are better as a goal: see [Goal Mode]({{< relref "/docs/features/goal-mode" >}}).

## Next steps

- Guide: [Choose your surface]({{< relref "/guides/choose-your-surface" >}}), with the commands to try.
- Reference: [every flag and start command]({{< relref "/docs/configuration/webui" >}}).
- Related: [Terminal UI]({{< relref "/docs/features/terminal-interface" >}}), [Slash Commands]({{< relref "/docs/features/slash-commands" >}}).
