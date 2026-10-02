---
title: Configuración
weight: 2
---

Esta sección es la estantería de consulta: nombres exactos de las opciones, valores por defecto y comandos. Si lo que quieres es aprender a configurar algo, las [guías]({{< relref "/guides" >}}) te llevan de la mano por la Web UI, y casi todas las opciones de aquí tienen su interruptor en **Configuración**.

## Dónde vive el fichero de configuración

Pando lee el primer fichero que encuentra, en este orden:

1. `./.pando.toml` o `./.pando.json` en la carpeta donde lo arrancas
2. El mismo fichero en cualquier carpeta de encima, subiendo hasta tu carpeta personal
3. `$XDG_CONFIG_HOME/pando/.pando.toml` (normalmente `~/.config/pando/`)
4. `$HOME/.pando.toml` o `$HOME/.pando.json`

Valen **TOML** y **JSON**; Pando los distingue por la extensión. Cualquier valor se puede cambiar para una sola ejecución con una variable de entorno con el prefijo `PANDO_`, por ejemplo `PANDO_DEBUG=true`. Más en [Descubrimiento del fichero de configuración]({{< relref "/docs/features/config-discovery" >}}).

## Páginas de referencia

| Tema | Página |
|---|---|
| Web UI, acceso remoto, espacios de proyecto | [Web UI]({{< relref "/docs/configuration/webui" >}}) |
| Cuentas de IA y modelos | [Proveedores]({{< relref "/docs/configuration/providers" >}}) |
| Elección automática de modelo | [Modo automático]({{< relref "/docs/configuration/auto-mode" >}}) |
| Modos de trabajo (razonamiento, caveman, aprendizaje…) | [Modos]({{< relref "/docs/configuration/modes" >}}) |
| Modo objetivo | [Goal]({{< relref "/docs/configuration/goal" >}}) |
| Memoria, base de conocimiento, índice de código | [Remembrances]({{< relref "/docs/configuration/remembrances" >}}) |
| Modelos para la búsqueda de código | [Modelos de embeddings para código]({{< relref "/docs/configuration/embedding-models" >}}) |
| Subagentes y orquestación | [Delegación]({{< relref "/docs/configuration/delegation" >}}) |
| Aprender de sesiones pasadas | [Automejora]({{< relref "/docs/configuration/self-improvement" >}}) |
| Servidores MCP | [MCP]({{< relref "/docs/configuration/mcp" >}}) |
| Búsqueda web, navegador, control del escritorio | [Herramientas]({{< relref "/docs/configuration/tools" >}}) |
| Servidores de lenguaje | [LSP]({{< relref "/docs/configuration/lsp" >}}) |
| Editores (ACP) | [ACP avanzado]({{< relref "/docs/configuration/acp-advanced" >}}) |
| Sandbox y permisos de comandos | [Sandbox]({{< relref "/docs/configuration/sandbox" >}}) |
| Docker y Podman | [Contenedores]({{< relref "/docs/configuration/containers" >}}) |
| Skills, Lua, extensiones | [Skills y extensiones]({{< relref "/docs/configuration/skills-and-extensions" >}}) |
| Gastar menos tokens | [Optimización de tokens]({{< relref "/docs/configuration/token-optimization" >}}) |
| Actualizaciones, diagnóstico, base de datos, HTTPS | [Diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}}) |
| Cifrar claves | [Seguridad de la configuración]({{< relref "/docs/configuration/security-age" >}}) · [Cifrado AGE]({{< relref "/docs/configuration/age-encryption" >}}) |

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

Pando funciona con Anthropic, OpenAI, Google Gemini, AWS Bedrock, Groq, Azure OpenAI, GitHub Copilot, OpenRouter y modelos locales a través de un endpoint propio. Las cuentas y las claves se explican en [Proveedores]({{< relref "/docs/configuration/providers" >}}).

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
- telemetry.*: Diagnóstico remoto (desactivado por defecto). Mira [Diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}}).
- logging.*: Nivel y archivo de logs.

## Primera configuración

Cuando Pando no encuentra ninguna configuración se ofrece a crearla: el [asistente de configuración]({{< relref "/docs/features/setup-assistant" >}}) en la Web UI y la app de escritorio, o el panel de configuración en la interfaz de terminal. Las cuentas y las herramientas se guardan además en tu perfil de usuario, así que una carpeta de proyecto nueva empieza con lo que ya tenías configurado.

{{< asciinema file="https://asciinema.org/a/DgVZRnUHU0GEBKjW.cast" >}}
