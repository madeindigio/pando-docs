---
title: Opciones de la Web UI, el escritorio y la terminal
weight: 20
---

Todas las opciones de las superficies de Pando. La explicación está en [Web UI]({{< relref "/docs/features/web-ui" >}}), [App de escritorio]({{< relref "/docs/features/desktop-app" >}}) e [Interfaz de terminal]({{< relref "/docs/features/terminal-interface" >}}). Para el paso a paso, mira las guías [Oriéntate en la Web UI]({{< relref "/guides/webui-tour" >}}), [Proyectos y pestañas de trabajo]({{< relref "/guides/projects-workspaces" >}}), [Acceso remoto]({{< relref "/guides/remote-access" >}}) y [Design Studio]({{< relref "/guides/design-studio" >}}).

## Formas de arrancar Pando

| Comando | Qué abre |
|---|---|
| `pando` | La interfaz de terminal en la carpeta actual |
| `pando app` | Web UI y API en un mismo puerto (por defecto `8765`, HTTPS con certificado automático) |
| `pando desktop` | La misma interfaz en una ventana nativa |
| `pando serve` | Solo la API, sin interfaz |
| `pando -p "..."` | Una respuesta, sin interfaz |
| `pando cli-assist "..."` | Un comando de shell sugerido a partir de lenguaje natural |

Opciones de `pando app` y `pando serve`:

| Opción | Por defecto | Significado |
|---|---|---|
| `--host` | `localhost` | Dirección en la que escucha. `0.0.0.0` deja entrar a otros dispositivos de la red |
| `--port` | `8765` | Puerto preferido |
| `--tls-cert`, `--tls-key` | automático | Tu propio certificado y clave |

Opciones de `pando` sin comando:

| Opción | Significado |
|---|---|
| `-c <path>` | Arranca en esa carpeta |
| `-p "<prompt>"` | Ejecuta una petición y sale. También la lee de la entrada estándar o de `PANDO_PROMPT` (prioridad: `-p`, stdin, variable, interactivo) |
| `-m <model>` | Modelo para esta ejecución, por ejemplo `copilot.gpt-5.4` |
| `-f json` / `--output-format json` | Respuesta en JSON |
| `--goal "<objective>"` | Ejecuta un objetivo autónomo y sale |
| `--yolo` / `--allow-all-tools` | Aprueba todas las herramientas sin preguntar |
| `--quiet` | Imprime solo la respuesta |
| `-d` | Registro de depuración; `-l <fichero>` lo escribe en un fichero |
| `-v` | Muestra la versión |

## Servidor y acceso

```toml
[Server]
Enabled     = true
Host        = "localhost"   # "0.0.0.0" or a network address to accept other devices
Port        = 9999
RequireAuth = false         # protect API endpoints with a bearer token

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "alice"
Password = "alice-password"

[[Server.BasicAuth.Users]]
Username = "bob"
Password = "bob-password"
```

Lo mismo en `.pando.json`:

```json
{
  "server": {
    "host": "0.0.0.0",
    "basicAuth": {
      "enabled": true,
      "users": [
        { "username": "admin", "password": "your-secure-password" }
      ]
    }
  }
}
```

| Clave | Significado |
|---|---|
| `Server.Enabled` | Activa o desactiva la API HTTP. Requiere reiniciar |
| `Server.Host` | `localhost` deja Pando solo en esta máquina. `0.0.0.0` o una dirección concreta lo abre a la red. Aquí requiere reiniciar; el interruptor del pie lo cambia en caliente |
| `Server.Port` | Puerto de la API. Requiere reiniciar |
| `Server.RequireAuth` | Pide un token en las llamadas a la API |
| `Server.BasicAuth.Enabled` | Pide usuario y contraseña |
| `Server.BasicAuth.Users` | Lista de pares `Username` / `Password`. Las contraseñas se guardan cifradas con AGE |

Cuándo se pide usuario y contraseña:

| Pando escucha en | Accesible desde otros dispositivos | Pide credenciales |
|---|---|---|
| `localhost` o `127.0.0.1` | No | No. El ajuste queda inactivo |
| `0.0.0.0` o una dirección de red | Sí | Sí, a todos los clientes |

No se puede activar sin al menos un usuario, y al borrar el último se desactiva.

Gestión de usuarios por la API (cambia el puerto y los nombres):

```bash
# Add
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "securepass"}'

# Delete
curl -X DELETE http://localhost:3939/api/v1/config/api-server/basic-auth/users/username

# Reveal a password
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users/username/reveal
```

## Espacios de proyecto

```toml
[Projects]
Enabled           = true
AutoRestore       = false
MaxProjects       = 20
MaxWebInstances   = 6
WebStartupTimeout = "20s"
```

| Clave | Por defecto | Significado |
|---|---|---|
| `Enabled` | `true` | Activa o desactiva los proyectos |
| `AutoRestore` | `false` | Reactiva el último proyecto activo al arrancar |
| `MaxProjects` | `20` | Cuántos proyectos se pueden registrar. `0` es sin límite |
| `MaxWebInstances` | `6` | Cuántas pestañas de proyecto pueden estar en marcha a la vez. `0` es sin límite |
| `WebStartupTimeout` | `"20s"` | Cuánto espera Pando a que arranque una pestaña de proyecto antes de darla por fallida |

Atajos de la barra de pestañas:

| Teclas | Acción |
|---|---|
| `Ctrl+Alt+1..9` | Ir a la pestaña principal o a una de las primeras de proyecto |
| `Ctrl+Alt+Left` / `Ctrl+Alt+Right` | Pestaña anterior / siguiente |
| `Ctrl+Alt+W` | Cerrar la pestaña de proyecto activa |

API que usa la vista de proyectos:

| Endpoint | Para qué |
|---|---|
| `POST /api/v1/projects/{id}/web/open` | Arranca o reutiliza el espacio de trabajo del proyecto. Devuelve `status` (`opened` o `already_open`), `project_id`, `web_url` relativa (`/api/v1/projects/{id}/web/`) y `web_port` |
| `POST /api/v1/projects/{id}/web/close` | Detiene solo el espacio de trabajo y devuelve `cancelled_delegations` |
| `GET /api/v1/projects/web` | Lista los espacios en marcha como `instances[]` con `project_id`, `name`, `path`, `web_port`, `web_url`, `pid`, `state`, `started_at` y `delegations` |
| `GET /api/v1/projects/events` | Flujo de eventos `web_started`, `web_stopped` y `web_error` para que la barra de pestañas se actualice sola |

`GET /api/v1/projects` y `GET /api/v1/projects/{id}` incluyen además `web_state`, `web_port` y `web_url`, para que el navegador recupere las pestañas al recargar. `activate` arranca o enfoca el proceso de delegación de un proyecto, `stop` detiene ese proceso y el espacio de trabajo, y `open-desktop` abre una ventana nativa aparte.

Cómo se mantiene privada una pestaña de proyecto: solo escucha en esta máquina (`127.0.0.1`); el Pando principal habla con ella por TLS con un certificado que ha generado él mismo; su token de acceso nunca llega al navegador; el navegador recibe una cookie válida solo para la ruta de ese proyecto; y la pestaña se detiene cuando se cierra el Pando principal.

## Design Studio

```toml
[Design]
OutputDir   = 'designer'   # project-relative folder that holds the designs
SystemDir   = '_system'    # sub-folder that holds the design system
DefaultKind = 'web'        # 'web' or 'deck'

[Design.Critique]
Enabled   = true
MaxRounds = 3        # designer/critic rounds per request
Threshold = 8.0      # score to beat, out of 10
Policy    = 'standard'

[MCPServer.Design]
Enabled = false      # publish the design_* tools through Pando's MCP server
```

Comandos:

```bash
pando design create "Landing page"             # create an empty design
pando design create "Q3 review" --skill deck-basic
pando design list                              # every design in the project
pando design open                              # open the most recent one
pando design open quarterly-review --slide 3   # jump to a slide
pando design versions landing                  # version history (--json for scripts)
pando design critique landing                  # run the quality check
pando design export landing --format html --out /tmp/landing.html
pando design export deck --format pdf --landscape
pando design export landing --format png --full-page

pando design skills                            # list templates and references
pando design skills show deck-basic

pando design system init                       # write the default system if none exists
pando design system show                       # print the current tokens
pando design system examples                   # list the bundled style guides
pando design system extract --from code        # from your stylesheets and components
pando design system extract https://example.com --from url
pando design system extract ./brand.png --from image     # colours only
pando design system extract ./brand-guide.md --from text
pando design system apply landing              # link the system into a design
```

`pando design open` mantiene una vista previa local hasta que pulsas Ctrl+C; `--no-wait` abre el fichero directamente y vuelve (en ese modo no funcionan los recursos relativos ni la selección de elementos). `extract` acepta `--dry-run`. Plantillas incluidas: `landing-page`, `web-prototype`, `dashboard-page`, `deck-basic`, `magazine-deck` y `design-system-extract` (un flujo de trabajo, no una plantilla).

| Tipo | Para |
|---|---|
| `web` | Páginas web y prototipos: landing pages, paneles, sitios de marketing |
| `deck` | Presentaciones, con estilos de impresión para que el PDF pagine bien |

Ficheros del sistema de diseño, en `designer/_system/`: `tokens.json` (la fuente de verdad), `system.css` (generado) y `DESIGN.md` (las reglas escritas que sigue el agente).

## Interfaz de terminal

```toml
[TUI]
Theme               = 'pando'   # pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai; add -nobg for a transparent background
ShowHiddenFiles     = false
NerdFonts           = true      # false draws plain characters instead of icon glyphs
ChatSidebar         = 'auto'    # 'auto' or 'off'
ChatSidebarMinWidth = 120       # terminal width, in columns, at which the sidebar appears

[Permissions]
AutoApproveTools = false
```

`PANDO_NERD_FONTS=0` desactiva los iconos para una ejecución.

| Teclas | Acción |
|---|---|
| `Ctrl+N` | Sesión nueva |
| `Ctrl+S` | Cargar una sesión anterior. Mientras el agente trabaja: encolar tu mensaje como indicación |
| `Ctrl+G` | Ajustes |
| `Ctrl+P` | Comandos y opciones |
| `Ctrl+R` | Panel de ficheros |
| `Ctrl+H` | Atajos de la vista actual |
| `Ctrl+T` | Cambiar de tema |
| `Alt+1` / `Alt+2` / `Alt+3` | Chat / Editor / Editor y chat |
| `Ctrl+Shift+B` | Mostrar u ocultar el panel de información del chat |
| `Ctrl+Shift+H` | Mostrar u ocultar ficheros ocultos |
| `Ctrl+Shift+N` | Fichero nuevo en el árbol |
| `Shift+Tab` | Aprobar herramientas automáticamente, sí o no |
| `Ctrl+U` | Mostrar u ocultar el panel de terminal |
| `Ctrl+Y` / `Ctrl+Shift+Y` | Nueva pestaña de terminal / cambiar de pestaña |
| `Up` / `Down` | Mensajes que enviaste antes |
| `@` | Elegir un fichero para mencionarlo |
| `/` | Comandos slash |

La barra de estado muestra, de izquierda a derecha según el espacio: un botón de ayuda, los últimos ficheros editados, el proyecto activo, cuánto se ha llenado el contexto de la conversación (con `~` mientras el agente trabaja y un aviso a partir del 80 %), una etiqueta de aprobación automática, el número de favoritos del gateway MCP, errores y avisos del comprobador de código y el nombre del modelo. Todas las zonas admiten clic.

El panel de información del chat muestra el título de la sesión, el estado de los servidores de lenguaje, el plan con el estado de cada paso, los ficheros modificados con su recuento de cambios, y la dirección del repositorio y la carpeta de trabajo. El árbol de ficheros marca el estado de git (`+`, `-`, `?`, `→`).

## Preguntas e indicaciones

```toml
[InternalTools]
AskUserQuestionDisabled = true   # the agent can no longer ask you structured questions
```

Una ronda tiene de 1 a 4 preguntas, cada una con 2 a 4 opciones, una opción «Otro» de texto libre que se añade sola, selección múltiple opcional y un encabezado de hasta 12 caracteres.

Enviar una indicación a una sesión en marcha por la API:

```bash
curl -X POST http://localhost:8766/api/v1/sessions/:id/steer \
  -H "Content-Type: text/plain" \
  -d "Focus on the authentication module instead"
```

## Tus propios comandos slash

Los ficheros Markdown se convierten en comandos:

| Carpeta | Se muestra como |
|---|---|
| `<data-dir>/commands/` | `project:command-name` |
| `~/.config/pando/commands/` o `~/.pando/commands/` | `user:command-name` |

## Compilar la app de escritorio desde el código

```bash
make build-desktop
```
