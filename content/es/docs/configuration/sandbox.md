---
title: Sandbox y permisos de comandos
weight: 40
---

Referencia del [Sandbox de comandos]({{< relref "/docs/features/sandbox" >}}). Para configurarlo paso a paso, sigue [Sandbox y permisos]({{< relref "/guides/sandbox-and-permissions" >}}).

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

En JSON la sección es `"sandbox"` con claves en camelCase (`"mode"`, `"autoAllowBashDisabled"`, `"env": {"keepSecrets": …}`).

| Clave | Por defecto | Significado |
|---|---|---|
| `Disabled` | `false` | Interruptor principal |
| `Mode` | `workspace-write` | Mira los modos más abajo |
| `Network` | `allowed` | Internet para los comandos confinados |
| `AutoAllowBashDisabled` | `false` | Seguir preguntando antes de cada comando |
| `WritableRoots` | `[]` | Carpetas extra donde el agente puede escribir |
| `ReadOnlyRoots` | `[]` | Carpetas extra que se pueden leer en `strict` |
| `DenyPaths` | `[]` | Rutas que no se leen ni se escriben; admite patrones |
| `CacheDirsDisabled` | `false` | Saca las cachés de dependencias del conjunto escribible |
| `UseBwrap` | `auto` | Linux: `never` no usa bubblewrap, `always` falla en vez de usar la alternativa |
| `ExtendTo` | `[]` | `mcp`, `subagents` |
| `AllowAutoEscalation` | `false` | Los comandos peligrosos siguen preguntando. La configuración de un proyecto no puede activarlo |
| `Env.Inherit` | `all` | `core` deja pasar solo PATH, HOME, idioma, terminal y similares |

## Modos

| Modo | Puede escribir en | Puede leer | Red |
|---|---|---|---|
| `workspace-write` | Proyecto, carpetas temporales, cachés de dependencias, `WritableRoots` | Todo | Permitida |
| `read-only` | Solo carpetas temporales | Todo | Bloqueada |
| `strict` | Proyecto, carpetas temporales, `WritableRoots` (sin cachés) | Proyecto, carpetas escribibles, carpetas del sistema, herramientas de compilación, `ReadOnlyRoots` | Bloqueada |
| `off` | Todo | Todo | Permitida |

Carpetas temporales: `/tmp`, `/var/tmp`, `$TMPDIR` (en macOS también `/private/tmp`, `/private/var/tmp`, `/private/var/folders`). Cachés de dependencias: Go, npm, pnpm, yarn, bun, pip, cargo, gradle, maven y `~/.cache`.

## Qué se confina

| Lo arranca Pando | Por defecto |
|---|---|
| Comandos de shell del agente | Confinados |
| Terminales servidos a subagentes de editores (ACP), herramientas de línea de comandos de skills | Confinados |
| Servidores MCP arrancados como programas locales | Sin confinar. `ExtendTo = ["mcp"]`, o `Sandbox = true` en un servidor |
| CLI de agentes delegados | Sin confinar. `ExtendTo = ["subagents"]` |
| Terminales que abres tú, `pando ?` | Nunca se confinan |

Con `Container.Runtime` en docker o podman, el aislamiento es el contenedor y el sandbox del host no se aplica.

## Rutas protegidas

Siempre de solo lectura para los comandos confinados: `.pando.toml` / `.pando.json` y la carpeta `.pando/` del proyecto, `.git/hooks` y `.git/config`, tus ficheros de configuración global (`~/.pando.toml`, `~/.pando.json`, `~/.config/pando`) y todo lo que haya en `DenyPaths` (además ilegible).

## Variables ocultas

Se quitan del entorno del comando: nombres que contienen `API_KEY`, `APIKEY`, `ACCESS_KEY`, `PRIVATE_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, `PASSWD` o `CREDENTIAL`, y nombres que terminan en `_KEY`, `_PAT`, `_PASS` o `_DSN`.

## Variable de entorno

`PANDO_SANDBOX` para una sola ejecución: `off` (también `false`, `0`, `no`, `disabled`, `none`), `read-only`, `strict`, `workspace-write` u `on` (el modo de tu configuración).

## Precedencia

De más fuerte a más débil: una clave bloqueada por tu organización, `PANDO_SANDBOX`, la configuración del proyecto (solo puede apretar), la configuración global, los valores por defecto. La configuración de un proyecto no puede desactivar el sandbox, aflojar el modo, abrir la red, reactivar la aprobación automática, permitir el escalado automático, conservar secretos ni añadir carpetas fuera del proyecto.

## Soporte por plataforma

| Plataforma | Protección |
|---|---|
| Linux, kernel 6.7 o posterior, con bubblewrap | Completa |
| Linux, kernel 5.13 a 6.6, con bubblewrap | Parcial: no se pueden bloquear los puertos del propio Pando; se sigue preguntando |
| Linux, kernel 5.13 o posterior, sin bubblewrap | Parcial: `.git/hooks` y `.git/config` sin proteger, no se pueden crear ficheros en la raíz del proyecto, las rutas denegadas siguen siendo legibles; se sigue preguntando |
| Linux anterior a 5.13, o que no sea amd64/arm64 | No se aplica |
| WSL 2 | Igual que Linux |
| macOS | Completa |
| Windows | No se aplica. Los comandos se detienen al cerrar Pando; se sigue preguntando |

Ubuntu 24.04 y posteriores pueden impedir que bubblewrap arranque; Pando usa entonces la alternativa y `pando sandbox status` explica por qué.

## Comandos

```bash
pando sandbox status          # backend, full or partial, mode, network, folders, protected paths, guarded ports
pando sandbox status --json
pando sandbox exec -- sh -c 'touch "$HOME/.probe"'   # run one command confined; expect "Permission denied"
```

## Eventos

Los eventos del sandbox aparecen en la pantalla Registros y se añaden a `<data dir>/sandbox-events.jsonl`: `sandbox.applied`, `sandbox.unavailable`, `sandbox.denied`, `sandbox.escalation.requested`, `sandbox.escalation.granted`, `sandbox.escalation.denied`.

## Límites

- Los comandos que un editor ejecuta en su propio terminal (Zed, VS Code, JetBrains) son del editor; Pando no los confina.
- Los scripts Lua y los servidores de lenguaje no se confinan.
- Las carpetas temporales siempre son escribibles, incluso en `read-only`.
- Un proceso en segundo plano conserva las reglas con las que arrancó hasta que termina.
- El ajuste de red es todo o nada; no hay lista por sitios.
- En una carpeta que aún no tiene `.git`, un comando puede crear un repositorio con un hook. Revisa los repositorios que cree el agente antes de usar git en ellos.

## `[Bash]` y `[Permissions]`

```toml
[Bash]
BannedCommands  = []   # replaces the built-in list when not empty
AllowedCommands = []   # run without asking; also removed from the built-in banned list

[Permissions]
AutoApproveTools = false   # true approves tool use without asking
```

Comandos prohibidos de serie: `alias`, `curl`, `curlie`, `wget`, `axel`, `aria2c`, `nc`, `telnet`, `lynx`, `w3m`, `links`, `httpie`, `xh`, `http-prompt`, `chrome`, `firefox`, `safari`.
