---
title: Language Servers Reference
weight: 41
---

Every option for language servers (LSP). For the explanation see [LSP Auto-Activation]({{< relref "/docs/features/lsp-auto-activation" >}}); for the step-by-step see the guide [Let Pando spot mistakes as it writes]({{< relref "/guides/language-servers" >}}).

## General switches

Top-level keys in `.pando.toml`.

| Key | Default | What it does |
|---|---|---|
| `LSPAutoActivate` | `true` | Start a language server when it is needed. `false` turns that off completely |
| `LSPActivateOn` | `"edits"` | What may wake a server up: `"edits"` (files Pando edits, or when it asks for problems), `"reads"` (also files read or opened in the viewer and file tree), `"workspace"` (also files changed outside Pando; watches the whole project), `"off"` |
| `LSPAutoInstall` | `true` | Install missing servers that come as npm packages into `~/.config/pando/lsp` |
| `LSPRunner` | `"auto"` | Who installs them: `"auto"` (bun when present, npm otherwise), `"bun"`, `"npm"`, `"off"` (never install; use only what is already in your `PATH`) |
| `LSPStartupTimeout` | `"20s"` | How long to wait for a server to be ready |
| `LSPInstallTimeout` | `"120s"` | Longer wait while a server is being installed |

Servers that come with a language's own toolkit (gopls, rust-analyzer, clangd…) are never installed for you: Pando tells you the command to run.

With `"workspace"`, Pando skips the usual folders that hold no source: `.git`, `node_modules`, `vendor`, `dist`, `build`, `target`, `out`.

## One section per server

```toml
[LSP]

# Change a built-in server
[LSP.gopls]
Disabled  = false
Autostart = true          # start when Pando starts, not on the first file
Command   = 'gopls'
Args      = ['-remote=auto']
Languages = ['.go']
Filenames = []

# Add your own
[LSP.my-custom-lsp]
Command   = 'my-lsp'
Args      = ['--stdio']
Languages = ['.mylang']
```

| Key | What it does |
|---|---|
| `Command`, `Args` | The program and its arguments |
| `Languages` | File extensions this server looks after |
| `Filenames` | Exact file names, for files whose extension says nothing (`Dockerfile`, `CMakeLists.txt`, `Gemfile`) |
| `Autostart` | `false` (default): starts with the first matching file. `true`: starts with Pando |
| `Disabled` | `true`: never starts, even if installed |

Fields you leave empty are taken from the built-in server of the same name. What you write always wins.

A few built-in servers stay off until you name them, because they need project setup or compete with a general one: `eslint-language-server`, `biome`, `sql-language-server` and `deno`. An empty section is enough: `[LSP.biome]`.

## Built-in servers

The catalogue covers more than forty languages. The most common:

| Language | Server | Program |
|---|---|---|
| Go | gopls | `gopls` |
| TypeScript / JavaScript | typescript-language-server | `typescript-language-server` |
| Python | pyright | `pyright` |
| Rust | rust-analyzer | `rust-analyzer` |
| C / C++ | clangd | `clangd` |
| Java | jdtls | `jdtls` |
| Ruby | solargraph | `solargraph` |
| PHP | phpactor | `phpactor` |
| Swift | sourcekit-lsp | `sourcekit-lsp` |
| Kotlin | kotlin-language-server | `kotlin-language-server` |

The full list, with what is installed on your machine, is in **Settings > LSP > Built-in catalogue**.

## Where problems show up

- In the TUI status bar: counts of errors and warnings.
- In the editor: next to the line, as you move through a file.
- For the agent: the `diagnostics` tool returns the problems of any file.
