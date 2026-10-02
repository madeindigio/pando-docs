---
title: Command Sandbox
weight: 38
---

Pando runs the shell commands the agent writes directly on your machine. The command sandbox confines those commands with your operating system's own protections, so a command cannot write outside your project, cannot change Pando's configuration or your git hooks, and does not see your API keys.

There are no containers and nothing to install. On **Linux and macOS the sandbox is on by default**.

## What it protects

While a command runs inside the sandbox:

- **It can only write in your project**, in temporary folders and in the usual dependency caches (Go, npm, pnpm, yarn, bun, pip, cargo, gradle, maven).
- **Pando's configuration is read-only**: `.pando.toml`, the `.pando/` folder and your global config. The agent cannot switch the sandbox off by editing a file.
- **Git hooks and git config are read-only**: `.git/hooks` and `.git/config`. A command cannot plant a hook that runs later outside the sandbox.
- **Your credentials are removed from the environment**: variables that look like keys, tokens or passwords never reach the agent's shell.
- **Pando's own ports are blocked**, so a command cannot talk to the Pando API to change settings.

Only the commands the agent writes are confined. The terminals you open yourself in the TUI or the Web UI are never confined: they run what you type.

## Fewer permission prompts

Because a confined command can do little harm, Pando **approves shell commands automatically** while the sandbox gives its full protection. Dangerous commands, such as `sudo` or deleting a system path, still ask you first.

If you prefer to keep approving every command, set `AutoAllowBashDisabled = true`.

## Modes

| Mode | Can write to | Network | Use it for |
|---|---|---|---|
| `workspace-write` (default) | Project, temp folders, dependency caches | Allowed | Normal development |
| `read-only` | Temp folders only | Blocked | Exploring or reviewing code the agent must not change |
| `strict` | Project and temp folders | Blocked | Repositories you do not trust: the agent cannot read your home folder |
| `off` | Everything | Allowed | Turning the sandbox off |

## When a command is blocked

The agent gets a note explaining that the sandbox blocked the command and why. Most of the time it retries inside the project.

When a command really needs to go outside the sandbox, the agent can ask to run it once without confinement. That request **always needs your explicit approval**, in the TUI, the Web UI and in editors. Auto-approve and unattended modes never grant it.

## Changing the mode or turning it off

{{< shot src="images/webui/pando-webui-settings-sandbox.jpg" alt="Command sandbox settings" >}}

Any of these applies to the next command, with no restart:

- **TUI**: Settings > Sandbox. The footer shows a badge with the current state.
- **Web UI and desktop**: Settings > Sandbox. The same badge appears in the chat info panel.
- **Config file** (`~/.pando.toml`):

  ```toml
  [Sandbox]
  Mode = "read-only"     # workspace-write | read-only | strict | off
  ```

- **For one run only**:

  ```bash
  PANDO_SANDBOX=off pando
  PANDO_SANDBOX=strict pando
  ```

{{< callout >}}
A project cannot loosen your sandbox. The `.pando.toml` inside a repository can only make it stricter, so cloning a repository never disables your protection.
{{< /callout >}}

## Common settings

```toml
[Sandbox]
Mode = "workspace-write"
Network = "allowed"                 # or "restricted" to block the network
WritableRoots = ["~/work/shared"]   # extra folders the agent may write to
DenyPaths = ["~/.ssh", "~/.aws", "*.pem"]   # neither readable nor writable
AutoAllowBashDisabled = false       # true keeps the prompt for every command

[Sandbox.Env]
Keep = ["NPM_TOKEN"]                # let this variable through
```

## Check what is active

```bash
pando sandbox status                      # backend, mode, what is protected
pando sandbox exec -- touch ~/.probe      # run one command confined; expect "Permission denied"
```

## Platform support

| Platform | Protection |
|---|---|
| Linux, kernel 6.7 or later, with bubblewrap installed | Full |
| Linux, older kernel or without bubblewrap | Partial. Pando says what is missing and keeps asking before each command |
| macOS | Full |
| WSL 2 | Same as Linux |
| Windows | Not confined. Pando keeps asking before each command |

On Linux, install bubblewrap for full protection: `sudo apt install bubblewrap` (or `dnf`, `pacman`, `zypper`).

## Good to know

- If you run commands inside Docker or Podman, the container is the isolation and the host sandbox does not apply.
- When Pando works inside an editor (Zed, VS Code, JetBrains) and the editor runs the command in its own terminal, the editor is in charge and the command is not confined.
- MCP servers and delegated agent CLIs are not confined by default, because they usually need their own files outside the project. Opt in with `ExtendTo = ["mcp", "subagents"]`.
- Temp folders are always writable, even in `read-only` mode.
