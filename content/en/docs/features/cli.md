---
title: Command Line Interface (CLI)
weight: 1
---

## Command Line Interface (CLI)

Pando can be run entirely from the command line, providing a smooth and interactive user experience without graphical interfaces. The CLI is the core of the Pando experience, letting users interact with their projects, manage sessions, run commands, and access tools directly from the terminal.

This mode is suitable for use in scripts and automations, as well as in environments without graphical access, keeping all the power of Pando accessible from any terminal.

CLI mode allows you to work in autonomous agent mode with a prompt and all the capabilities of Pando's tools: reading files, running commands, browsing the web, writing and running code, etc.

```bash
pando --quiet --yolo --model copilot.gpt-4.1 -p "Write a python script that prints 'Hello World' and execute it"
```

You can also generate output in JSON format to integrate it with other tools or scripts:

```bash
pando --quiet --yolo --model copilot.gpt-4.1 -p "Write a python script that prints 'Hello World' and execute it" --output-format json
```

## Command Assistant

You can ask pando for help in natural language to generate terminal commands. For example:

```bash
pando cli-assist "How can I list files in the current directory?"
```

{{< asciinema file="https://asciinema.org/a/62CCiqfws8mDbL5U.cast" >}}
