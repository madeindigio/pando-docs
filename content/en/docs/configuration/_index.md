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
