---
title: Extensions
weight: 36
---

Pando now has a formal extension system: optional modules that are built into the binary and can add tools, HTTP endpoints, UI panels and memory behaviour. It is how private and enterprise capabilities ship without forking Pando.

## Which mechanism do I need?

Extensions are one of five ways to add behaviour to Pando, and usually not the one you want. Pick the cheapest that does the job:

| You want to… | Use |
|---|---|
| Add a tool the model can call, in any language, out of process | **MCP server** |
| Change how Pando behaves at a specific moment, with a small script | **Lua hook** |
| Add a prompt, a workflow or a repeatable procedure | **Skill or slash command** |
| Describe a new provider/model shape | **Custom engine template** |
| Reach Pando's core, or ship inside the binary | **Extension** |

An MCP server is a process you can restart and configure per project. An extension is a build-time decision baked into a binary someone has to produce. Prefer the top of the table.

Third-party or untrusted code belongs in an MCP server: that is a separate process speaking a narrow protocol. An extension runs in-process with full access and no sandbox.

## Choose an extension only when

1. **It needs to reach the core** — filtering the tool set, wrapping knowledge-base search, mounting an authenticated HTTP route, subscribing to internal events. Nothing else can see those.
2. **It must ship in the binary** — one executable to deploy, nothing extra to install.
3. **It is first-party and privileged** — if you would not merge the code into Pando itself, run it as an MCP server instead.

## Seeing what your binary has

```bash
pando extensions list      # compiled-in extensions and whether they loaded
pando ext                  # run commands contributed by extensions
pando --version            # shows the build variant, e.g. v0.9.1 (enterprise)
```

A binary that was not built with an extension cannot enable it. That is deliberate: it is what makes the boundary a real one rather than a runtime flag.

## Enabling and configuring

Configuration under `[Extensions]` only chooses which of the *already compiled-in* extensions load, and passes them their settings:

```toml
[Extensions]
Disabled = ["memory.sink.corp"]     # never load these, whatever else says

[Extensions.Entries."memory.sink.corp"]
Enabled = true

[Extensions.Entries."memory.sink.corp".Config]
Endpoint = "https://remembrances.corp.internal"
```

`Disabled` is the stronger switch: it also turns off extensions that would otherwise load by default.

## What an extension can add

- **Tools**, and middleware that wraps or filters the whole tool set.
- **Slash commands**, exposed like any built-in one.
- **HTTP routes** on Pando's own server, behind its authentication.
- **UI panels and pages** in the WebUI, including replacing the frontend entirely.
- **Memory behaviour** — observing what gets remembered, and augmenting what a search returns.
- **Licensing hooks**, for commercial modules.

## Enterprise builds

Standard builds are unchanged and print exactly what they always printed. Two extra paths exist for composed binaries:

```bash
make build                          # ./pando
make build-enterprise               # ./pando-enterprise
make release-enterprise             # a distributable archive
```

For a binary that links private modules, Pando ships `xpando`, a small build tool that generates a module importing Pando plus the extensions you name, and builds it with the normal Go toolchain:

```bash
make xpando

./xpando build v0.9.1 \
    --with github.com/yourorg/your-extension/tools \
    --output ./pando-enterprise
```

| Flag | Meaning |
|---|---|
| `--with module[/pkg][@version][=/local/path]` | Extension package to link in. Repeatable; `=path` builds against a local checkout. |
| `--replace module[@version]=replacement` | A dependency replacement with no import. Repeatable. |
| `--tags`, `--ldflags`, `--output` | Passed through to the build. |
| `--variant name` | Overrides the variant stamp shown by `--version`. |

`GOOS`, `GOARCH` and the usual toolchain variables are honoured, so cross-compiling works exactly as with `go build`.

{{< callout >}}
The WebUI is embedded in the core, so a composed binary ships the stock interface unless one of its extensions supplies its own assets. Extensions can add panels and pages, or replace the frontend outright.
{{< /callout >}}
