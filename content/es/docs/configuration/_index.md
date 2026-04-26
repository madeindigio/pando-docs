---
title: Configuración
weight: 2
---

Pando busca su configuración en los siguientes ubicaciones (en orden de prioridad):

1. `./.pando.json` o `./.pando.toml` (directorio local del proyecto)
2. `$XDG_CONFIG_HOME/pando/.pando.json` o `$XDG_CONFIG_HOME/pando/.pando.toml`
3. `$HOME/.pando.json` o `$HOME/.pando.toml`

Se soportan ambos formatos **JSON** y **TOML**. Pando detecta el formato automáticamente por la extensión.

## Configuración básica

### TOML

```toml
[data]
directory = ".pando"

[providers.anthropic]
apiKey = "tu-api-key"
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
      "apiKey": "tu-api-key",
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

## Variables de entorno

| Variable de entorno        | Propósito                                                    |
| -------------------------- | ------------------------------------------------------------ |
| `ANTHROPIC_API_KEY`        | Para modelos Claude de Anthropic                             |
| `OPENAI_API_KEY`           | Para modelos OpenAI                                          |
| `GEMINI_API_KEY`           | Para Google Gemini                                           |
| `GITHUB_TOKEN`             | Para Github Copilot                                          |
| `GROQ_API_KEY`             | Para modelos Groq                                            |
| `AWS_ACCESS_KEY_ID`        | Para AWS Bedrock (Claude)                                    |
| `AWS_SECRET_ACCESS_KEY`    | Para AWS Bedrock (Claude)                                    |
| `AWS_REGION`               | Para AWS Bedrock (Claude)                                    |
| `AZURE_OPENAI_ENDPOINT`    | Para modelos Azure OpenAI                                    |
| `AZURE_OPENAI_API_KEY`     | Para Azure OpenAI                                            |
| `AZURE_OPENAI_API_VERSION` | Para Azure OpenAI                                            |
| `VERTEXAI_PROJECT`         | Para Google Cloud VertexAI (Gemini)                          |
| `VERTEXAI_LOCATION`        | Para Google Cloud VertexAI (Gemini)                          |
| `LOCAL_ENDPOINT`           | Para modelos auto-alojados                                   |
| `PANDO_DEV_DEBUG`          | Activa modo debug de desarrollo (`true`)                     |
| `SHELL`                    | Shell por defecto (si no se especifica en la configuración)  |

## Proveedores de IA

Pando soporta los siguientes proveedores de IA:

- **Anthropic** (Claude 3.5 Sonnet, Claude 3.7 Sonnet, etc.)
- **OpenAI** (GPT-4o, GPT-4 Turbo, etc.)
- **Google Gemini** (Gemini 1.5 Pro, Gemini 2.0, etc.)
- **AWS Bedrock** (Claude en AWS)
- **Groq** (Llama, Mixtral, etc.)
- **Azure OpenAI**
- **GitHub Copilot**
- **OpenRouter** (acceso a múltiples modelos)
- **Modelos locales** (via endpoint personalizado)
