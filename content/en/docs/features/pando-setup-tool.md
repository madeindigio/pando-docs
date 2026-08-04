---
title: Agent Self-Service (pando_setup)
weight: 31
---

The `pando_setup` tool lets the AI agent inspect Pando's configuration, discover available models, check session usage, and activate slash commands — all without leaving the conversation. It's like giving the agent its own control panel.

This tool is always available to the agent and requires no configuration. It's read-only for configuration and providers, and can activate certain slash commands when appropriate.

## How It Works

The agent uses `pando_setup` automatically during conversations. You don't call it directly — the AI decides when it needs to check settings, find available models, or run a command.

### What the Agent Can Do

| Command | Purpose |
|---------|---------|
| `help` | List available commands or get usage for a specific one |
| `config` | Read the active configuration (read-only, same view as TUI/WebUI settings) |
| `providers` | List configured provider accounts with types, credentials, and model counts |
| `models` | Browse available models with context window, pricing, and capabilities |
| `session` | Check last turn's token usage and accumulated session cost |
| `commands` | List available slash commands |
| `run <command>` | Activate a slash command for the current session |

## Examples

The agent might use these commands during a conversation:

- **Checking models**: `pando_setup models --provider copilot --detail` — shows available Copilot models with pricing and context windows
- **Listing providers**: `pando_setup providers` — shows all configured provider accounts
- **Viewing config**: `pando_setup config --search auth` — searches configuration for auth-related settings
- **Running a command**: `pando_setup run /caveman lite` — enables caveman mode for the session
- **Session stats**: `pando_setup session` — shows token usage and cost for the current session

## Model Discovery

The `models` command uses the live model registry, enriched with data from [models.dev](https://models.dev). It shows:

- **Canonical ID**: e.g., `copilot.gpt-5.4`, `anthropic.claude-sonnet-4-5`
- **Context window**: Token limit (e.g., 200K, 1M)
- **Pricing**: Per-million-token input/output costs
- **Capabilities**: Reasoning, image support, etc.
- **Knowledge cutoff**: Training data cutoff date

Filter by provider, search by name, or limit results:

```bash
pando_setup models --provider anthropic --detail --limit 5
```

## Configuration Access

The `config` command reads the same configuration that TUI and WebUI settings panels show. Secrets are masked (only last 4 characters visible) so the agent can tell "configured" from "unset" without seeing actual values.

```bash
pando_setup config                           # show all config
pando_setup config --search token            # search for token-related settings
pando_setup config TokenOptimization         # show a specific section
```

## Slash Commands

The agent can activate certain slash commands via `pando_setup run`:

**Mode commands** (mutate session state):
- `/caveman`, `/caveman-finish`
- `/ponytail`, `/ponytail-finish`
- `/superpowers`, `/superpowers-finish`
- `/learning`, `/learning-finish`

**Instruction commands** (return instructions for the current turn):
- `/improve-agents-md`
- `/vulnhunt`, `/vulnhunter-fix`, `/vulnhunt-fix-verify`
- Custom `user:` and `project:` commands

Some commands are **blocked** because they require surface-level interaction:
- `/goal*` commands
- `/compact`, `/db-compact`
- All `-finish` closing commands

## Security

- Configuration is strictly **read-only** — no write path exists
- Secrets are masked by key suffix (`apikey`, `token`, `password`, `secret`, etc.)
- The tool description stays under 600 characters to keep token cost low
- The tool is always included in the agent's toolset (cannot be trimmed by context optimization)

## Configuration Reference

The `pando_setup` tool requires no configuration. It is always available.

| Setting | Description |
|---------|-------------|
| None | The tool is built-in and always active |

{{< callout type="info" >}}
The `pando_setup` tool is designed to be cheap in tokens. Its description is minimal, and it discovers detail on demand through `help` and `--help` rather than enumerating everything upfront.
{{< /callout >}}
