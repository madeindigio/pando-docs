---
title: Configuration
weight: 2
---

Pando looks for its configuration in the following locations (in priority order):

1. `./.pando.json` or `./.pando.toml` (local project directory)
2. `$XDG_CONFIG_HOME/pando/.pando.json` or `$XDG_CONFIG_HOME/pando/.pando.toml`
3. `$HOME/.pando.json` or `$HOME/.pando.toml`

Both **JSON** and **TOML** formats are supported. Pando auto-detects the format based on file extension.

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

Pando supports the following AI providers:

- **Anthropic** (Claude 3.5 Sonnet, Claude 3.7 Sonnet, etc.)
- **OpenAI** (GPT-4o, GPT-4 Turbo, etc.)
- **Google Gemini** (Gemini 1.5 Pro, Gemini 2.0, etc.)
- **AWS Bedrock** (Claude on AWS)
- **Groq** (Llama, Mixtral, etc.)
- **Azure OpenAI**
- **GitHub Copilot**
- **OpenRouter** (access to multiple models)
- **Local models** (via custom endpoint)
- **Local models** (via custom endpoint)

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
- telemetry.*: Telemetry configuration (disabled by default).
- logging.*: Log level and file.

## Premium Security & Convenience Settings

Pando includes several modern features to streamline your configuration and keep your keys protected:

- **Local Parameter Encryption (AGE)**: You can encrypt any sensitive value (such as API keys or database connection strings) in `.pando.toml` using `pando encrypt`. This keeps your credentials secure, allowing you to safely upload your configuration files to shared Git repositories.
- **Visual Model Switching in TUI**: When using the interactive configuration panel (`Ctrl+g` in terminal), Pando provides a dynamic visual model selector with autocompletion, preventing typos when entering model names.
- **Automatic Local HTTPS**: Pando automatically generates local SSL certificates during startup to secure all network communication for the desktop app and the browser-based Web-UI over HTTPS.
- **Snapshot Toggle**: Control whether Pando automatically saves incremental session snapshots. You can disable snapshots in `.pando.toml` to save disk space on very large codebases.

This flexible configuration allows adapting Pando to many environments and use cases, from local development to CI/CD pipelines or production deployments.

## Configuration via TUI assistant

One of the easiest ways to configure Pando is via its interactive TUI assistant, which runs automatically if no configuration file is found. It will open the configuration panel, generate a default configuration file and let you add the AI providers you want to use and customize other options. The TUI assistant is ideal for new users or those who prefer guided setup.

Provider and tool configuration is also saved in your user profile, so your API keys and preferences are preserved even if you move your project to another directory. When you start Pando in a new folder, the assistant pre-fills providers and tools already configured in your profile so you can start using them without reconfiguring everything.

{{< asciinema file="https://asciinema.org/a/DgVZRnUHU0GEBKjW.cast" >}}
