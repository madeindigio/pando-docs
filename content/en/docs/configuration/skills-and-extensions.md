---
title: Skills, Lua and Extensions
weight: 42
---

Reference for the ways to teach Pando new tricks. Explanation: [Extensions]({{< relref "/docs/features/extensions" >}}). Step by step: [Write your first skill]({{< relref "/guides/first-skill" >}}).

## Skills

```toml
[Skills]
Enabled = true
Paths   = ['./agents/skills']   # extra folders to search

[SkillsCatalog]
Enabled      = true
BaseURL      = ''               # empty = https://skills.sh
AutoUpdate   = false
DefaultScope = 'global'         # global | project
```

Folders searched, besides `Paths`: `~/.pando/skills`, `<project>/.pando/skills`, `~/.claude/skills`, `<project>/.claude/skills`. Each skill is a folder with a `SKILL.md`.

`SKILL.md` header fields:

| Field | Meaning |
|---|---|
| `name` | Defaults to the folder name |
| `description` | When to use the skill. Defaults to the first paragraph |
| `when-to-use`, `when-not-to-use` | Extra hints for choosing it |
| `version`, `author`, `license`, `compatibility` | Information only |
| `allowed-tools` | Tools the skill may use |
| `user-invocable` | You can call it by name |
| `disable-model-invocation` | Pando never picks it on its own |

Skills Pando proposes from your sessions live in `.pando/skills/learned/`:

```bash
pando skills list --status pending
pando skills approve <id>
pando skills reject <id>
```

## Lua

```toml
[Lua]
Enabled         = false
ScriptPath      = ''      # path to your hooks file
Timeout         = ''      # e.g. "5s"
StrictMode      = false   # treat script errors as fatal
HotReload       = false   # reload when the file changes
LogFilteredData = false   # log what scripts filtered or blocked
```

## Extensions

Extensions are built into the Pando program. Configuration only chooses which of the built-in ones load and passes them their settings.

```toml
[Extensions]
Disabled = ["memory.sink.corp"]     # never load these, whatever else says

[Extensions.Entries."memory.sink.corp"]
Enabled = true

[Extensions.Entries."memory.sink.corp".Config]
Endpoint = "https://remembrances.corp.internal"
```

`Disabled` is the stronger switch: it also turns off extensions that would load by default.

```bash
pando extensions list      # built-in extensions and whether they loaded
pando ext                  # run commands contributed by extensions
pando --version            # shows the build variant, e.g. v0.9.1 (enterprise)
```

### Building a binary with extensions

```bash
make build                          # ./pando
make build-enterprise               # ./pando-enterprise
make release-enterprise             # a distributable archive
make xpando                         # the composing build tool

./xpando build v0.9.1 \
    --with github.com/yourorg/your-extension/tools \
    --output ./pando-enterprise
```

| Flag | Meaning |
|---|---|
| `--with module[/pkg][@version][=/local/path]` | Extension package to link in. Repeatable; `=path` builds against a local checkout |
| `--replace module[@version]=replacement` | A dependency replacement with no import. Repeatable |
| `--tags`, `--ldflags`, `--output` | Passed through to the build |
| `--variant name` | Overrides the variant shown by `--version` |

`GOOS`, `GOARCH` and the usual Go toolchain variables are honoured. The Web UI is embedded in the core, so a composed binary ships the stock interface unless one of its extensions supplies its own.
