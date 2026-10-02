---
title: Configuration
weight: 2
---

This section is the reference shelf: exact option names, defaults and commands. If you want to learn how to set something up, the [guides]({{< relref "/guides" >}}) walk you through it in the Web UI, and almost every option here has a switch in **Settings**.

## Where the config file lives

Pando reads the first file it finds, in this order:

1. `./.pando.toml` or `./.pando.json` in the folder where you start it
2. The same file in any folder above it, walking up and stopping at your home folder
3. `$XDG_CONFIG_HOME/pando/.pando.toml` (usually `~/.config/pando/`)
4. `$HOME/.pando.toml` or `$HOME/.pando.json`

Both **TOML** and **JSON** work; Pando tells them apart by the file extension. Any value can be overridden for one run with an environment variable prefixed with `PANDO_`, for example `PANDO_DEBUG=true`. More in [Configuration File Discovery]({{< relref "/docs/features/config-discovery" >}}).

## Reference pages

| Topic | Page |
|---|---|
| Web UI, remote access, project workspaces | [Web UI]({{< relref "/docs/configuration/webui" >}}) |
| AI accounts and models | [Providers]({{< relref "/docs/configuration/providers" >}}) |
| Automatic model choice | [Auto mode]({{< relref "/docs/configuration/auto-mode" >}}) |
| Working modes (reasoning, caveman, learning…) | [Modes]({{< relref "/docs/configuration/modes" >}}) |
| Goal mode | [Goal]({{< relref "/docs/configuration/goal" >}}) |
| Memory, knowledge base, code index | [Remembrances]({{< relref "/docs/configuration/remembrances" >}}) |
| Models for code search | [Embedding models for code]({{< relref "/docs/configuration/embedding-models" >}}) |
| Subagents and orchestration | [Delegation]({{< relref "/docs/configuration/delegation" >}}) |
| Learning from past sessions | [Self-improvement]({{< relref "/docs/configuration/self-improvement" >}}) |
| MCP servers | [MCP]({{< relref "/docs/configuration/mcp" >}}) |
| Web search, browser, desktop control | [Tools]({{< relref "/docs/configuration/tools" >}}) |
| Language servers | [LSP]({{< relref "/docs/configuration/lsp" >}}) |
| Editors (ACP) | [ACP advanced]({{< relref "/docs/configuration/acp-advanced" >}}) |
| Sandbox and command permissions | [Sandbox]({{< relref "/docs/configuration/sandbox" >}}) |
| Docker and Podman | [Containers]({{< relref "/docs/configuration/containers" >}}) |
| Skills, Lua, extensions | [Skills and extensions]({{< relref "/docs/configuration/skills-and-extensions" >}}) |
| Spending fewer tokens | [Token optimization]({{< relref "/docs/configuration/token-optimization" >}}) |
| Updates, diagnostics, database, HTTPS | [Diagnostics and maintenance]({{< relref "/docs/configuration/diagnostics" >}}) |
| Encrypting keys | [Config security]({{< relref "/docs/configuration/security-age" >}}) · [AGE encryption]({{< relref "/docs/configuration/age-encryption" >}}) |

## Basic configuration

### TOML

```toml
[data]
directory = ".pando"

[providers.anthropic]
apiKey = "your-api-key"
disabled = false

[agents.coder]
model = "claude-3.7-sonnet"
maxTokens = 5000

[shell]
path = "/bin/bash"
args = ["-l"]

debug = false
autoCompact = true
```

### JSON

```json
{
  "data": {
    "directory": ".pando"
  },
  "providers": {
    "anthropic": {
      "apiKey": "your-api-key",
      "disabled": false
    }
  },
  "agents": {
    "coder": {
      "model": "claude-3.7-sonnet",
      "maxTokens": 5000
    }
  },
  "shell": {
    "path": "/bin/bash",
    "args": ["-l"]
  },
  "debug": false,
  "autoCompact": true
}
```

## Environment variables

| Environment Variable       | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `ANTHROPIC_API_KEY`        | For Anthropic Claude models                                |
| `OPENAI_API_KEY`           | For OpenAI models                                          |
| `GEMINI_API_KEY`           | For Google Gemini                                          |
| `GITHUB_TOKEN`             | For Github Copilot                                         |
| `GROQ_API_KEY`             | For Groq models                                            |
| `AWS_ACCESS_KEY_ID`        | For AWS Bedrock (Claude)                                   |
| `AWS_SECRET_ACCESS_KEY`    | For AWS Bedrock (Claude)                                   |
| `AWS_REGION`               | For AWS Bedrock (Claude)                                   |
| `AZURE_OPENAI_ENDPOINT`    | For Azure OpenAI models                                    |
| `AZURE_OPENAI_API_KEY`     | For Azure OpenAI                                           |
| `AZURE_OPENAI_API_VERSION` | For Azure OpenAI                                           |
| `VERTEXAI_PROJECT`         | For Google Cloud VertexAI (Gemini)                         |
| `VERTEXAI_LOCATION`        | For Google Cloud VertexAI (Gemini)                         |
| `LOCAL_ENDPOINT`           | For self-hosted models                                     |
| `PANDO_DEV_DEBUG`          | Enable dev debug mode (`true`)                             |
| `SHELL`                    | Default shell (if not specified in config)                 |

## AI Providers

Pando works with Anthropic, OpenAI, Google Gemini, AWS Bedrock, Groq, Azure OpenAI, GitHub Copilot, OpenRouter and local models through a custom endpoint. Accounts and keys are covered in [Providers]({{< relref "/docs/configuration/providers" >}}).

## Advanced configuration

Below are the advanced options recognized by Pando, with examples in TOML and JSON. Not all fields are required; Pando will use sensible defaults when fields are missing.

### Full example (TOML)

```toml
[data]
directory = ".pando"           # Directory where Pando stores data (history, commands, caches)

[providers]
[providers.anthropic]
apiKey = "your-api-key"
disabled = false

[providers.openai]
apiKey = "your-openai-key"
model = "gpt-4o"
disabled = false

[providers.gemini]
apiKey = "your-gemini-key"
disabled = true

[agents]
[agents.coder]
model = "claude-3.7-sonnet"
maxTokens = 5000
temperature = 0.2

[agents.chat]
model = "gpt-4o"
maxTokens = 3000
temperature = 0.7

[shell]
path = "/bin/bash"
args = ["-l"]

debug = false                  # Enable detailed logs
autoCompact = true            # Automatically compact long histories

[acp]
enabled = true
max_sessions = 10
idle_timeout = "30m"
log_level = "info"           # info|debug|warn|error
auto_permission = false       # true for CI or trusted environments

[mcpServers]
[mcpServers.my-server]
command = "my-mcp-server"
args = ["--flag"]
env = { MY_VAR = "value" }

[hooks]
# Path to hooks in Lua or other scripts to customize behavior
path = ".pando/hooks"

[storage]
type = "sqlite"               # sqlite|filesystem|custom
path = ".pando/pando.db"

[ui]
theme = "dark"               # UI theme for web-ui if applicable
editor = "nvim"              # default external editor

[telemetry]
enabled = false
endpoint = "https://telemetry.example.com/collect"

[logging]
level = "info"
file = ".pando/pando.log"
```

### Full example (JSON)

```json
{
  "data": { "directory": ".pando" },
  "providers": {
    "anthropic": { "apiKey": "your-api-key", "disabled": false },
    "openai": { "apiKey": "your-openai-key", "model": "gpt-4o", "disabled": false }
  },
  "agents": {
    "coder": { "model": "claude-3.7-sonnet", "maxTokens": 5000, "temperature": 0.2 },
    "chat": { "model": "gpt-4o", "maxTokens": 3000, "temperature": 0.7 }
  },
  "shell": { "path": "/bin/bash", "args": ["-l"] },
  "debug": false,
  "autoCompact": true,
  "acp": { "enabled": true, "max_sessions": 10, "idle_timeout": "30m", "log_level": "info", "auto_permission": false },
  "mcpServers": { "my-server": { "command": "my-mcp-server", "args": ["--flag"], "env": { "MY_VAR": "value" } } },
  "hooks": { "path": ".pando/hooks" },
  "storage": { "type": "sqlite", "path": ".pando/pando.db" },
  "ui": { "theme": "dark", "editor": "nvim" },
  "telemetry": { "enabled": false, "endpoint": "https://telemetry.example.com/collect" },
  "logging": { "level": "info", "file": ".pando/pando.log" }
}
```

### Main options description

- data.directory: Base directory for Pando data (commands, history, caches).
- providers.<name>: Provider-specific config (apiKey, model, disabled, custom endpoint).
- agents.<name>: Agent/role config (model, maxTokens, temperature, optional systemPrompt).
- shell.path / shell.args: Default shell and arguments used to launch it.
- debug: Enable debug output.
- autoCompact: Enable automatic history compaction to save tokens.
- acp.*: Agent Client Protocol options (enable, max sessions, timeouts, auto permissions).
- mcpServers.*: Define external MCP servers Pando can consume (command, args, env).
- hooks.path: Path for custom hooks (Lua, scripts) executed on events.
- storage.type/path: Storage type and path (SQLite recommended for persistence).
- ui.theme/editor: Preferences for UI/web-ui and external editor.
- telemetry.*: Remote diagnostics (disabled by default). See [Diagnostics and maintenance]({{< relref "/docs/configuration/diagnostics" >}}).
- logging.*: Log level and file.

## First-time setup

When Pando finds no configuration it offers to create one: the [setup assistant]({{< relref "/docs/features/setup-assistant" >}}) in the Web UI and desktop app, or the configuration panel in the terminal interface. Accounts and tools are also saved in your user profile, so a new project folder starts with what you already set up.

{{< asciinema file="https://asciinema.org/a/DgVZRnUHU0GEBKjW.cast" >}}
