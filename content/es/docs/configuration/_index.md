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

## Configuración avanzada

A continuación se recogen las opciones avanzadas que reconoce Pando, con ejemplos en TOML y JSON. No todas son obligatorias; Pando usará valores por defecto cuando falten.

### Ejemplo completo (TOML)

```toml
[data]
directory = ".pando"           # Directorio donde Pando guarda datos (historial, comandos, etc.)

[providers]
[providers.anthropic]
apiKey = "tu-api-key"
disabled = false

[providers.openai]
apiKey = "tu-openai-key"
model = "gpt-4o"
disabled = false

[providers.gemini]
apiKey = "tu-gemini-key"
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

debug = false                  # Activa logs detallados
autoCompact = true            # Compacta automáticamente historiales largos

[acp]
enabled = true
max_sessions = 10
idle_timeout = "30m"
log_level = "info"           # info|debug|warn|error
auto_permission = false       # true para entornos CI o de confianza

[mcpServers]
[mcpServers.mi-servidor]
command = "mi-mcp-server"
args = ["--flag"]
env = { MI_VAR = "valor" }

[hooks]
# Ruta a hooks en Lua u otros scripts para personalizar comportamientos
path = ".pando/hooks"

[storage]
type = "sqlite"               # sqlite|filesystem|custom
path = ".pando/pando.db"

[ui]
theme = "dark"               # ui theme para web-ui si aplica
editor = "nvim"              # editor externo por defecto

[telemetry]
enabled = false
endpoint = "https://telemetry.example.com/collect"

[logging]
level = "info"
file = ".pando/pando.log"
```

### Ejemplo completo (JSON)

```json
{
  "data": { "directory": ".pando" },
  "providers": {
    "anthropic": { "apiKey": "tu-api-key", "disabled": false },
    "openai": { "apiKey": "tu-openai-key", "model": "gpt-4o", "disabled": false }
  },
  "agents": {
    "coder": { "model": "claude-3.7-sonnet", "maxTokens": 5000, "temperature": 0.2 },
    "chat": { "model": "gpt-4o", "maxTokens": 3000, "temperature": 0.7 }
  },
  "shell": { "path": "/bin/bash", "args": ["-l"] },
  "debug": false,
  "autoCompact": true,
  "acp": { "enabled": true, "max_sessions": 10, "idle_timeout": "30m", "log_level": "info", "auto_permission": false },
  "mcpServers": { "mi-servidor": { "command": "mi-mcp-server", "args": ["--flag"], "env": { "MI_VAR": "valor" } } },
  "hooks": { "path": ".pando/hooks" },
  "storage": { "type": "sqlite", "path": ".pando/pando.db" },
  "ui": { "theme": "dark", "editor": "nvim" },
  "telemetry": { "enabled": false, "endpoint": "https://telemetry.example.com/collect" },
  "logging": { "level": "info", "file": ".pando/pando.log" }
}
```

### Descripción de las opciones principales

- data.directory: Directorio base para datos de Pando (comandos, historial, caches).
- providers.<nombre>: Configuración por proveedor (apiKey, model, disabled, endpoint personalizado).
- agents.<nombre>: Configuración por agente/rol (model, maxTokens, temperature, systemPrompt opcional).
- shell.path / shell.args: Shell por defecto y argumentos al lanzarlo.
- debug: Activa salida de depuración.
- autoCompact: Habilita compactación automática del historial para ahorrar tokens.
- acp.*: Opciones del Agent Client Protocol (activar, sesiones máximas, timeouts, permisos automáticos).
- mcpServers.*: Define servidores MCP externos que Pando puede consumir (command, args, env).
- hooks.path: Ruta para hooks personalizados (Lua, scripts) que Pando ejecuta en eventos.
- storage.type/path: Tipo y ruta de almacenamiento (SQLite recomendado para persistencia).
- ui.theme/editor: Preferencias para UI/web-ui y editor externo.
- telemetry.*: Configuración para telemetría (desactivada por defecto).
- logging.*: Nivel y archivo de logs.

Esta configuración flexible permite adaptar Pando a una amplia variedad de entornos y casos de uso, desde desarrollo local hasta integración en pipelines CI/CD o entornos de producción.

## Configuración a través de asistente TUI

Una de las formas más sencillas de configurar Pando es a través de su asistente TUI interactivo, que se lanza automáticamente si no se encuentra un archivo de configuración. Se abrirá el panel de configuración, generará el fichero de configuración por defecto y podrás añadir los proveedores de IA que quieras usar, así como personalizar otras opciones. El asistente TUI es ideal para usuarios nuevos o para quienes prefieren una configuración guiada paso a paso.

La configuración de proveedores y tools también se guarda en tu perfil de usuario, lo que permite mantener tus claves API y preferencias incluso si mueves tu proyecto a otro directorio, cuando arrancas Pando sobre una nueva carpeta, el asistente autocompleta con los proveedores y herramientas que ya tienes configurados en tu perfil, para que puedas empezar a usarlos sin necesidad de configurar todo desde cero.

{{< asciinema file="https://asciinema.org/a/DgVZRnUHU0GEBKjW.cast" >}}
