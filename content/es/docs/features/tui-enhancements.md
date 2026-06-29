---
title: Mejoras en la TUI
weight: 26
---

La Terminal UI de Pando ha recibido mejoras significativas en productividad y atractivo visual.

## Pestañas de Espacio de Trabajo

Cambia entre tres modos de espacio de trabajo con **Alt+1/2/3** o haz clic en las pestañas:

| Pestaña | Modo | Descripción |
|---------|------|-------------|
| 1 | Chat | Interfaz de chat a ancho completo |
| 2 | Editor | Editor de archivos con barra lateral |
| 3 | Editor+Chat | Vista dividida con ambos |

## Barra Lateral de Info del Chat

Un panel de información en el lado derecho mostrando:

- Título de sesión
- Configuración LSP
- Plan (entradas de TodoWrite con estado)
- Archivos modificados con estadísticas de diff en tiempo real
- URL del repositorio y CWD

Alterna con **Ctrl+Shift+B**. Se muestra automáticamente cuando el ancho de terminal ≥ 120 columnas.

```toml
[tui]
chatSidebar = 'auto'           # 'auto' u 'off'
chatSidebarMinWidth = 120      # ancho mínimo de terminal
```

## Temas

Cambia de temas instantáneamente con **Ctrl+T**:

Temas disponibles: pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai

Cada tema tiene una variante `-nobg` para fondos transparentes.

```toml
[tui]
theme = 'pando'
```

## Selector de Archivos (@)

Escribe **@** en el input del chat para abrir un diálogo de completado de archivos con búsqueda fuzzy. Reemplaza el carácter `/` anterior (ahora reservado para comandos slash).

## Alternar Auto-Aprobar

Presiona **Shift+Tab** para alternar el modo auto-aprobar. Cuando está activo, todos los permisos de herramientas se aprueban automáticamente.

```toml
[permissions]
autoApproveTools = false
```

## Estimación de Tokens en Tiempo Real

La barra de estado muestra el uso de tokens de la ventana de contexto en vivo con prefijo `~` mientras el agente se ejecuta. Muestra advertencia al 80%+ de uso.

## Alternar Archivos Ocultos

Presiona **Ctrl+Shift+H** para mostrar/ocultar archivos ocultos en el árbol de archivos.

```toml
[tui]
showHiddenFiles = false
```

## Nerd Fonts

Alterna entre glifos Nerd Font y ASCII plano:

```toml
[tui]
nerdFonts = true
```

O a través de variable de entorno:

```bash
PANDO_NERD_FONTS=0
```

## Barra de Estado Mejorada

- Widget de ayuda (clicable)
- Rastro de breadcrumbs (archivos editados recientemente)
- Insignia de proyecto activo
- Uso de tokens de contexto
- Insignia de auto-aprobar
- Conteo de favoritos del gateway MCP
- Diagnósticos LSP (errores/advertencias)
- Insignia del modelo

## Soporte de Ratón

Soporte completo de ratón en todos los componentes:

- Árbol de archivos: clic para abrir, scroll para navegar
- Mensajes de chat: clic en botones de copiar, arrastrar para seleccionar
- Barra de estado: zonas clicables
- Diálogo de permisos: clic en Permitir/Denegar

## Mejoras en Árbol de Archivos

- Indicadores de estado Git (+, -, ?, →)
- Creación de nuevo archivo (**Ctrl+Shift+N**)
- Carga lazy de directorios
- Filtro de búsqueda fuzzy

## Historial de Input

Presiona las teclas **Arriba/Abajo** para navegar por mensajes enviados previamente.

## Terminal Integrada

- **Ctrl+U**: Alternar panel de terminal
- **Ctrl+Y**: Nueva pestaña de terminal
- **Ctrl+Shift+Y**: Cambiar pestañas de terminal

{{< callout >}}
Presiona **Ctrl+h** en cualquier vista para ver los atajos de teclado disponibles para ese panel.
{{< /callout >}}
