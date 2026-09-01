---
title: Controlador de Escritorio
weight: 35
---

El Controlador de Escritorio permite a Pando ver y manejar el escritorio gráfico: listar aplicaciones abiertas, leer lo que hay en pantalla, pulsar botones, rellenar campos, enviar teclas y hacer capturas — en Windows, macOS y Linux (X11 y Wayland).

**Desactivado por defecto.** Lee la sección de [Seguridad](#seguridad) antes de activarlo.

## Por qué no es el típico «computer use»

La mayoría de agentes que controlan un ordenador hacen una captura, piden a un modelo de visión que adivine dónde están las cosas y pulsan coordenadas a ciegas. Pando lee el **árbol de accesibilidad**: la misma descripción semántica de la pantalla que usan los lectores de pantalla. El agente trabaja con elementos reales («el botón Guardar»), no con píxeles.

Eso significa:

- **Mucho más barato.** Una lista de elementos son unas pocas líneas; una captura son miles de tokens de visión.
- **Mucho más fiable.** Las acciones no fallan porque una ventana se haya movido, un diálogo se haya animado o cambie el escalado de pantalla.
- **Las capturas quedan como último recurso**, solo para interfaces sin estructura aprovechable (aplicaciones de lienzo, juegos, escritorios remotos). Todo resultado obtenido así viene marcado explícitamente como procedente de visión.

## Qué puede hacer el agente

| Capacidad | ¿Pide permiso? |
|---|---|
| Listar aplicaciones y sus ventanas | no |
| Leer el contenido y la estructura de una ventana | no |
| Buscar un elemento por nombre o rol | no |
| Esperar a que algo aparezca, desaparezca, se habilite o reciba el foco | no |
| Pulsar, enfocar, escribir texto, enviar una tecla o combinación, hacer scroll | **sí** |
| Capturar la pantalla, una ventana o un elemento | **sí** |
| Pulsar una coordenada en bruto (recurso de visión) | **sí** |

Leer es gratis; todo lo que toca la pantalla o cambia estado te lo pregunta antes, con el mismo diálogo de permisos que las ediciones de archivos y los comandos de shell.

## Activarlo

En `.pando.toml`:

```toml
[InternalTools]
DesktopEnabled = true
```

O desde la interfaz:

- **TUI**: Ajustes → Internal Tools → Desktop Controller
- **WebUI**: Ajustes → Internal Tools → «Desktop Controller (Accessibility Automation)»

## Configuración

```toml
[InternalTools]
DesktopEnabled            = false   # interruptor principal
DesktopBackend            = 'auto'  # auto | atspi | uia | ax | cdp | null
DesktopAllowPhysicalInput = true    # permitir ratón/teclado sintético como respaldo
DesktopMaxNodes           = 500     # máximo de elementos por observación
DesktopDefaultDepth       = 3       # profundidad por defecto dentro de una ventana
DesktopActionTimeout      = 10      # segundos
DesktopSnapshotTTL        = 60      # segundos que una observación sigue siendo válida
DesktopScreenshotScale    = 1.0     # reducir capturas antes de enviarlas al modelo
DesktopAllowedApps        = []      # si se define, solo estas apps son accesibles
DesktopDeniedApps         = []      # nunca accesibles; gana sobre la lista de permitidas
```

| Clave | Para qué sirve |
|---|---|
| `DesktopBackend` | Déjalo en `auto`. Pando elige la API de accesibilidad de tu sistema y, si hay una sesión de navegador abierta, lo maneja con las mismas herramientas. Cualquier otro valor fija ese backend. |
| `DesktopAllowPhysicalInput` | Cuando una aplicación no soporta una acción de accesibilidad decente, Pando puede recurrir a un clic o pulsación reales. Ponlo a `false` para un modo estrictamente semántico. |
| `DesktopAllowedApps` / `DesktopDeniedApps` | La forma práctica de acotar al agente: permite solo la aplicación con la que trabajas y deniega tu gestor de contraseñas, el correo o la terminal. Denegar siempre gana. |
| `DesktopScreenshotScale` | Bájalo (por ejemplo `0.5`) para reducir el coste en tokens de las capturas. |

## Ventanas de navegador

Si ya hay una sesión de navegador abierta, aparece como una aplicación más del escritorio y se maneja con las mismas herramientas.

Usa las **herramientas de navegador** (`browser_navigate`, `browser_click`…) cuando ya sabes la URL, el selector CSS o el JavaScript que necesitas, o cuando quieres datos de red y consola. Usa las **herramientas de escritorio** cuando el navegador es parte de un flujo más amplio que también toca ventanas nativas —un selector de archivos, un diálogo «Guardar como», cambiar el foco entre aplicaciones— o cuando solo conoces un elemento por lo que dice en pantalla.

Pando nunca lanza un navegador solo porque hayas usado una herramienta de escritorio.

## Requisitos por plataforma

| Plataforma | Qué necesitas |
|---|---|
| **Linux (X11)** | Un bus de accesibilidad activo (`org.a11y.Bus`), habilitado por defecto en GNOME/KDE. |
| **Linux (Wayland)** | Consentimiento explícito en el diálogo del portal del escritorio la primera vez. Wayland no ofrece API global de entrada ni de captura sin él. El consentimiento se recuerda entre ejecuciones. |
| **macOS** | Conceder a Pando permiso de **Accesibilidad** (Ajustes del Sistema → Privacidad y seguridad → Accesibilidad). Las capturas requieren además **Grabación de pantalla**. |
| **Windows** | Nada adicional. |

Si falta un permiso, Pando lo dice explícitamente e indica cuál: nunca finge en silencio que una capacidad existe.

## Madurez

Estado honesto, para que sepas qué esperar:

- **Control de navegador**: verificado de extremo a extremo.
- **Linux / AT-SPI**: verificado contra un bus de accesibilidad real.
- **Windows / macOS**: implementado y compilado para esas plataformas, pero aún no validado contra un escritorio real por los mantenedores. Trátalo como soporte temprano y reporta lo que encuentres.

## Usarlo desde otras herramientas

Las herramientas de escritorio también se pueden publicar por el servidor MCP de Pando, para que otro cliente MCP maneje el escritorio a través de Pando:

```bash
pando mcp-server
```

La exposición es opcional y sigue el mismo interruptor `DesktopEnabled`.

## Seguridad

Activar esto da al agente la capacidad de actuar en tu escritorio como si fueras tú.

- Está **desactivado por defecto** y requiere un interruptor explícito.
- Cada acción que modifica algo y cada captura pasan por un diálogo de permiso.
- Las capturas recogen toda tu pantalla, incluido lo demás que tengas abierto: por eso piden permiso aunque no cambien nada.
- Los clics a ciegas por coordenada se anuncian como tales en el diálogo, así que siempre sabes cuándo el agente actúa sin certeza semántica.
- Usa `DesktopAllowedApps` para mantener al agente dentro de la aplicación con la que realmente trabajas.
- Pon `DesktopAllowPhysicalInput = false` si no quieres que se genere entrada sintética en tu máquina.

{{< callout type="warning" >}}
No actives el Controlador de Escritorio en un montaje desatendido o con auto-aprobación salvo que lo hayas acotado con una lista de permitidas. Un diálogo de permiso solo protege mientras hay una persona leyéndolo.
{{< /callout >}}
