---
title: LSP Auto-Activation
weight: 19
---

A language server is a proofreader for one programming language: it spots the typo, the missing import, the call to something that does not exist. Pando carries a proofreader for each common language and calls the right one the moment it touches a file. You set up nothing.

## What it does for you

- **Pando checks its own work.** After changing a file it asks the proofreader for problems, and fixes them before telling you it is done.
- **Nothing to configure.** Pando recognises the language from the file name and knows which proofreader goes with it. Its catalogue covers more than forty languages.
- **Nothing wasted.** A proofreader starts only when a file of its language shows up. If you never open a Rust file, the Rust one never starts.
- **Missing ones install themselves.** Many are downloaded the first time they are needed. For the rest, Pando tells you the command to run.

## How it feels in practice

You ask for a change in a Python file. Pando edits it, and a moment later adds: "there was an unused import, I removed it". That second look came from the proofreader.

You also see the problem counts in the terminal interface's status bar, and next to the lines when you browse a file in the editor.

{{< shot src="images/webui/pando-webui-settings-lsp.jpg" alt="Language Servers settings" >}}

## When to use it

It is on from the start and most people leave it alone. Open its settings when you want to:

- add a proofreader for a language Pando does not know,
- make one start with Pando because it is slow to warm up,
- silence one you do not want,
- have problems reported while you only read files, not just when Pando edits them.

## Good to know

- If a proofreader is not installed and cannot be installed automatically, Pando marks it as unavailable and stops trying. No stream of errors.
- If one crashes, Pando does not restart it in the same session. Restart Pando to try again.
- Some need a project file to make sense of your code, such as `go.mod` for Go.
- Your own settings always win over the built-in ones.

## Next steps

- Guide: [Let Pando spot mistakes as it writes]({{< relref "/guides/language-servers" >}}).
- Reference: [every option and the list of built-in servers]({{< relref "/docs/configuration/lsp" >}}).
