---
title: Sandbox and Command Permissions
weight: 40
---

Reference for the [Command Sandbox]({{< relref "/docs/features/sandbox" >}}). To set it up step by step, follow [Sandbox and permissions]({{< relref "/guides/sandbox-and-permissions" >}}).

## `[Sandbox]`

```toml
[Sandbox]
Disabled = false                 # true turns the sandbox off (the UI switch)
Mode = "workspace-write"         # workspace-write | read-only | strict | off
Network = "allowed"              # allowed | restricted (read-only and strict always restrict)
AutoAllowBashDisabled = false    # true keeps the approval prompt for every command
WritableRoots = ["~/work/shared"]   # extra writable folders (absolute, ~, or relative to the project)
ReadOnlyRoots = ["~/datasets"]      # extra readable folders for strict mode
DenyPaths = ["~/.ssh", "~/.aws", "*.pem"]  # neither readable nor writable
CacheDirsDisabled = false        # true removes the dependency caches from the writable folders
UseBwrap = "auto"                # auto | always | never (Linux)
ExtendTo = ["mcp", "subagents"]  # also confine these; ACP terminals and skills are always confined
AllowAutoEscalation = false      # true lets "run once outside" requests through without a prompt

[Sandbox.Env]
Inherit = "all"                  # all | core | none
KeepSecrets = false              # true stops hiding secret-looking variables
Keep = ["NPM_TOKEN"]             # let these through
Exclude = ["MY_PRIVATE_*"]       # hide these too
```

In JSON the section is `"sandbox"` with camelCase keys (`"mode"`, `"autoAllowBashDisabled"`, `"env": {"keepSecrets": …}`).

| Key | Default | Meaning |
|---|---|---|
| `Disabled` | `false` | Main switch |
| `Mode` | `workspace-write` | See modes below |
| `Network` | `allowed` | Internet for confined commands |
| `AutoAllowBashDisabled` | `false` | Keep asking before every command |
| `WritableRoots` | `[]` | Extra folders the agent may write |
| `ReadOnlyRoots` | `[]` | Extra folders readable in `strict` |
| `DenyPaths` | `[]` | Unreadable and unwritable paths, globs allowed |
| `CacheDirsDisabled` | `false` | Take dependency caches out of the writable set |
| `UseBwrap` | `auto` | Linux: `never` skips bubblewrap, `always` fails instead of falling back |
| `ExtendTo` | `[]` | `mcp`, `subagents` |
| `AllowAutoEscalation` | `false` | Dangerous commands still ask. A project config cannot turn it on |
| `Env.Inherit` | `all` | `core` passes only PATH, HOME, locale, terminal and similar |

## Modes

| Mode | Can write to | Can read | Network |
|---|---|---|---|
| `workspace-write` | Project, temp folders, dependency caches, `WritableRoots` | Everything | Allowed |
| `read-only` | Temp folders only | Everything | Blocked |
| `strict` | Project, temp folders, `WritableRoots` (no caches) | Project, writable folders, system folders, toolchains, `ReadOnlyRoots` | Blocked |
| `off` | Everything | Everything | Allowed |

Temp folders: `/tmp`, `/var/tmp`, `$TMPDIR` (macOS also `/private/tmp`, `/private/var/tmp`, `/private/var/folders`). Dependency caches: Go, npm, pnpm, yarn, bun, pip, cargo, gradle, maven and `~/.cache`.

## What is confined

| Started by Pando | Default |
|---|---|
| Agent shell commands | Confined |
| Terminals served to editors' sub-agents (ACP), skill command-line tools | Confined |
| MCP servers started as local programs | Not confined. `ExtendTo = ["mcp"]`, or `Sandbox = true` on one server |
| Delegated agent CLIs | Not confined. `ExtendTo = ["subagents"]` |
| Terminals you open yourself, `pando ?` | Never confined |

With `Container.Runtime` set to docker or podman the container is the isolation and the host sandbox does not apply.

## Protected paths

Always read-only for confined commands: `.pando.toml` / `.pando.json` and the `.pando/` folder of the project, `.git/hooks` and `.git/config`, your global config files (`~/.pando.toml`, `~/.pando.json`, `~/.config/pando`) and everything in `DenyPaths` (also unreadable).

## Hidden variables

Removed from the command's environment: names containing `API_KEY`, `APIKEY`, `ACCESS_KEY`, `PRIVATE_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `PASSWD` or `CREDENTIAL`, and names ending in `_KEY`, `_PAT`, `_PASS` or `_DSN`.

## Environment variable

`PANDO_SANDBOX` for one run: `off` (also `false`, `0`, `no`, `disabled`, `none`), `read-only`, `strict`, `workspace-write`, or `on` (the mode from your config).

## Precedence

Strongest first: a key locked by your organisation, `PANDO_SANDBOX`, the project config (can only tighten), the global config, the defaults. A project config cannot disable the sandbox, loosen the mode, open the network, re-enable auto-allow, allow auto-escalation, keep secrets or add folders outside the project.

## Platform support

| Platform | Protection |
|---|---|
| Linux, kernel 6.7 or later, with bubblewrap | Full |
| Linux, kernel 5.13 to 6.6, with bubblewrap | Partial: Pando's own ports cannot be blocked; prompts stay |
| Linux, kernel 5.13 or later, without bubblewrap | Partial: `.git/hooks` and `.git/config` not protected, no new files in the project root, deny paths stay readable; prompts stay |
| Linux older than 5.13, or not amd64/arm64 | Not enforced |
| WSL 2 | Same as Linux |
| macOS | Full |
| Windows | Not enforced. Commands are stopped when Pando exits; prompts stay |

Ubuntu 24.04 and later can prevent bubblewrap from starting; Pando then falls back and `pando sandbox status` says why.

## Commands

```bash
pando sandbox status          # backend, full or partial, mode, network, folders, protected paths, guarded ports
pando sandbox status --json
pando sandbox exec -- sh -c 'touch "$HOME/.probe"'   # run one command confined; expect "Permission denied"
```

## Events

Sandbox events appear on the Logs screen and are appended to `<data dir>/sandbox-events.jsonl`: `sandbox.applied`, `sandbox.unavailable`, `sandbox.denied`, `sandbox.escalation.requested`, `sandbox.escalation.granted`, `sandbox.escalation.denied`.

## Limits

- Commands an editor runs in its own terminal (Zed, VS Code, JetBrains) are the editor's, not confined by Pando.
- Lua scripts and language servers are not confined.
- Temp folders are always writable, even in `read-only`.
- A background process keeps the rules it started with until it exits.
- The network setting is all or nothing; there is no per-site list.
- In a folder with no `.git` yet, a command can create a repository with a hook. Review repositories the agent creates before running git in them.

## `[Bash]` and `[Permissions]`

```toml
[Bash]
BannedCommands  = []   # replaces the built-in list when not empty
AllowedCommands = []   # run without asking; also removed from the built-in banned list

[Permissions]
AutoApproveTools = false   # true approves tool use without asking
```

Built-in banned commands: `alias`, `curl`, `curlie`, `wget`, `axel`, `aria2c`, `nc`, `telnet`, `lynx`, `w3m`, `links`, `httpie`, `xh`, `http-prompt`, `chrome`, `firefox`, `safari`.
