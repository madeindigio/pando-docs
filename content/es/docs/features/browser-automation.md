---
title: Automatización de Navegador
weight: 24
---

Pando incluye un completo suite de automatización de navegador usando chromedp, con soporte para múltiples tipos de navegador incluyendo el ligero navegador Lightpanda.

## Tipos de Navegador

| Tipo | Descripción |
|------|-------------|
| `chrome` | Google Chrome (predeterminado) |
| `msedge` | Microsoft Edge |
| `chromium` | Chromium |
| `opera` | Opera |
| `firefox` | Firefox (vía herramienta fetch) |
| `lightpanda` | Navegador headless ligero |

## Herramientas Disponibles

### Navegación y Contenido

- `browser_navigate` - Navegar a URL
- `browser_get_content` - Extraer HTML, texto o título
- `browser_screenshot` - Capturar captura de pantalla de página o elemento

### Interacción

- `browser_click` - Hacer clic en elementos
- `browser_fill` - Llenar inputs de formulario
- `browser_scroll` - Desplazar la página
- `browser_evaluate` - Ejecutar JavaScript

### Análisis

- `browser_console_logs` - Obtener mensajes de consola JavaScript
- `browser_network` - Obtener peticiones de red
- `browser_pdf` - Generar PDF de la página

## Soporte Lightpanda

Lightpanda es un navegador headless ligero diseñado para automatización:

```toml
[InternalTools]
BrowserType = 'lightpanda'
```

A diferencia de los navegadores locales, Lightpanda se lanza como un proceso servidor CDP y se conecta via WebSocket. No se aplican perfiles de usuario ni flags de headless.

## Configuración

```toml
[InternalTools]
BrowserEnabled = true
BrowserType = 'chrome'
BrowserExecutable = ''         # Auto-detectar
BrowserHeadless = false
BrowserTimeout = 30            # segundos
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

## Integración con Herramienta Fetch

La herramienta fetch soporta backends de navegador para páginas pesadas en JavaScript:

```json
{
  "url": "https://ejemplo.com",
  "format": "markdown",
  "browser": "auto"
}
```

Backends de navegador: `auto`, `chrome`, `firefox`, `curl`, `http`

{{< callout >}}
Las sesiones de navegador se agrupan con límites configurables. La detección de lock de perfil cambia automáticamente a perfiles temporales cuando el perfil predeterminado está en uso.
{{< /callout >}}
