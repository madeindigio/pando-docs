---
title: Referencia de herramientas integradas
weight: 40
---

Todas las opciones de las herramientas que trae Pando: leer páginas web, buscar en la web, manejar un navegador, manejar tu escritorio y convertir documentos. Las explicaciones están en [Automatización del navegador]({{< relref "/docs/features/browser-automation" >}}), [Control del escritorio]({{< relref "/docs/features/desktop-controller" >}}) y [Conversión de documentos]({{< relref "/docs/features/markitdown" >}}); el paso a paso, en la guía [Dale ojos y manos a Pando]({{< relref "/guides/web-browser-desktop-tools" >}}).

Todas las claves van en la sección `[InternalTools]` de `.pando.toml`.

## Lectura y búsqueda web

```toml
[InternalTools]
FetchEnabled            = true
FetchMaxSizeMB          = 10
GoogleSearchEnabled     = true
GoogleAPIKey            = ''
GoogleSearchEngineID    = ''
BraveSearchEnabled      = true
BraveAPIKey             = ''
PerplexitySearchEnabled = true
PerplexityAPIKey        = ''
ExaSearchEnabled        = false
ExaAPIKey               = ''
SourcegraphEnabled      = false
SourcegraphToken        = ''      # optional: the public service is used when empty
Context7Enabled         = true    # library documentation, no key needed
```

La herramienta fetch puede leer una página a través de un navegador cuando la página necesita JavaScript:

```json
{
  "url": "https://example.com",
  "format": "markdown",
  "browser": "auto"
}
```

`browser` admite `auto`, `chrome`, `firefox`, `curl` y `http`.

## Navegador

```toml
[InternalTools]
BrowserEnabled     = true
BrowserType        = 'chrome'
BrowserExecutable  = ''         # empty: find it automatically
BrowserHeadless    = false      # true: no visible window
BrowserTimeout     = 30         # seconds
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

| `BrowserType` | Navegador |
|---|---|
| `chrome` | Google Chrome (por defecto) |
| `msedge` | Microsoft Edge |
| `chromium` | Chromium |
| `opera` | Opera |
| `firefox` | Firefox (a través de la herramienta fetch) |
| `lightpanda` | Lightpanda, un navegador ligero sin ventana |
| `obscura` | [Obscura](https://github.com/h4ckf0r0day/obscura), un navegador rápido sin ventana, escrito en Rust |

Lightpanda y Obscura los arranca Pando como un programa en segundo plano y no tienen ventana ni perfil de usuario, así que `BrowserHeadless` y `BrowserUserDataDir` no se les aplican. Para Obscura, el comando `obscura` tiene que estar en tu `PATH`.

Las sesiones de navegador se reparten de un grupo limitado por `BrowserMaxSessions`. Si tu perfil habitual está en uso, Pando recurre a uno temporal.

| Herramienta | Qué hace el agente con ella |
|---|---|
| `browser_navigate` | Abrir una dirección |
| `browser_get_content` | Leer la página: HTML, texto o título |
| `browser_screenshot` | Sacar una captura de la página o de un elemento |
| `browser_click` | Hacer clic en algo |
| `browser_fill` | Rellenar un campo de formulario |
| `browser_scroll` | Desplazar la página |
| `browser_evaluate` | Ejecutar JavaScript en la página |
| `browser_console_logs` | Leer los mensajes de consola de la página |
| `browser_network` | Ver las peticiones que hizo la página |
| `browser_pdf` | Guardar la página como PDF |

## Control del escritorio

```toml
[InternalTools]
DesktopEnabled            = false   # master switch
DesktopBackend            = 'auto'  # auto | atspi | uia | ax | cdp | null
DesktopAllowPhysicalInput = true    # allow a real mouse click or key press as fallback
DesktopMaxNodes           = 500     # most elements reported per look
DesktopDefaultDepth       = 3       # how deep to look into a window by default
DesktopActionTimeout      = 10      # seconds
DesktopSnapshotTTL        = 60      # seconds a look stays usable
DesktopScreenshotScale    = 1.0     # shrink screenshots before sending them to the model
DesktopAllowedApps        = []      # if set, only these apps can be touched
DesktopDeniedApps         = []      # never touched; wins over the allow list
```

| Clave | Para qué sirve |
|---|---|
| `DesktopBackend` | Déjalo en `auto`. Pando elige el adecuado para tu sistema y, si hay una sesión de navegador abierta, maneja el navegador con las mismas herramientas. Cualquier otro valor fija ese |
| `DesktopAllowPhysicalInput` | Cuando una aplicación no ofrece una forma propia de actuar sobre un elemento, Pando puede recurrir a un clic o una pulsación reales. `false` lo prohíbe |
| `DesktopAllowedApps` / `DesktopDeniedApps` | La forma práctica de ponerle una valla al agente: permite solo la aplicación con la que trabajas, prohíbe tu gestor de contraseñas, el correo o la terminal. La prohibición siempre gana |
| `DesktopScreenshotScale` | Bájalo (por ejemplo `0.5`) para que las capturas salgan más baratas |

| Qué puede hacer el agente | ¿Te pregunta antes? |
|---|---|
| Listar las aplicaciones abiertas y sus ventanas | no |
| Leer el contenido y la estructura de una ventana | no |
| Buscar un elemento por nombre o por tipo | no |
| Esperar a que algo aparezca, desaparezca, se active o reciba el foco | no |
| Hacer clic, dar foco, escribir texto, pulsar una tecla o una combinación, desplazar | **sí** |
| Sacar una captura de la pantalla, de una ventana o de un elemento | **sí** |
| Hacer clic en una posición de la pantalla (último recurso, a ojo) | **sí** |

| Plataforma | Qué necesitas |
|---|---|
| Linux (X11) | Un bus de accesibilidad en marcha (`org.a11y.Bus`); GNOME y KDE lo traen activado |
| Linux (Wayland) | Aceptar el diálogo del escritorio la primera vez. Tu respuesta se recuerda |
| macOS | Dar a Pando el permiso de **Accesibilidad** (Ajustes del Sistema → Privacidad y seguridad → Accesibilidad). Las capturas necesitan además **Grabación de pantalla** |
| Windows | Nada más |

Las herramientas de escritorio también se pueden ofrecer a otros programas con `pando mcp-server`. Obedecen al mismo interruptor `DesktopEnabled`.

## Conversión de documentos

Sin opciones. Funciona tal cual.

```bash
pando convert report.docx              # print the Markdown
pando convert data.xlsx -o data.md     # write it to a file
pando convert https://example.com/page.html
pando convert --list-formats
```

| Tipo | Extensiones |
|---|---|
| PDF | `.pdf` |
| Word | `.docx` |
| Excel | `.xlsx`, `.xls` |
| PowerPoint | `.pptx` |
| Web | `.html`, `.htm` |
| Datos | `.csv` |
| Libro electrónico | `.epub` |
| Notebook | `.ipynb` |
| Feed | `.rss`, `.atom` |
| Marcado | `.xml`, `.json`, `.jsonl` |
| Archivo comprimido | `.zip` |
| Texto | `.txt`, `.md`, `.markdown` |

Para añadir una carpeta entera de documentos a la base de conocimiento, convirtiéndolos por el camino:

```bash
pando kb import /path/to/documents
```
