---
title: Características
weight: 3
---

## TUI Interactiva

Pando está construido con [Bubble Tea](https://github.com/charmbracelet/bubbletea), un framework para crear interfaces de usuario en terminal. Proporciona una experiencia fluida y responsiva directamente en tu terminal.

## Editor Vim-like

Pando incluye un editor integrado con atajos al estilo Vim para componer mensajes y editar código cómodamente sin salir del TUI.

## Soporte de Editor Externo

Puedes abrir tu editor preferito (Neovim, Emacs, etc.) para componer mensajes largos o complejos.

## Gestión de Sesiones

- Guarda y recupera conversaciones anteriores
- Múltiples sesiones simultáneas
- Persistencia en base de datos SQLite local

## Integración de Herramientas

La IA puede ejecutar herramientas directamente en tu proyecto:

- **Ejecutar comandos**: Ejecuta comandos de shell para compilar, testear, etc.
- **Búsqueda de archivos**: Busca y lee archivos del proyecto
- **Modificación de código**: Edita archivos directamente con confirmación del usuario
- **Búsqueda web**: Búsqueda en internet para información actualizada

## Comandos Personalizados

Los comandos personalizados son prompts predefinidos almacenados como archivos Markdown:

1. **Comandos de usuario** (prefijo `user:`): `$XDG_CONFIG_HOME/pando/commands/` o `$HOME/.pando/commands/`
2. **Comandos de proyecto** (prefijo `project:`): `<DIR_PROYECTO>/.pando/commands/`

Los comandos soportan **argumentos con nombre** como placeholders:

```markdown
Analiza el archivo {{filename}} y explica la función {{function_name}}
```

## Integración LSP

Pando incluye soporte para el **Language Server Protocol (LSP)**, lo que permite obtener inteligencia de código contextual:

- Autocompletado informado por el LSP
- Diagnósticos y errores en tiempo real
- Navegación de código

## Seguimiento de Cambios de Archivos

Pando rastrea y visualiza los cambios en archivos realizados durante una sesión, mostrando un diff de lo que la IA modificó.

## Compactación Automática

Con `autoCompact = true`, Pando compacta automáticamente el historial de conversaciones largas para optimizar el uso de tokens.

## Hooks Lua

Pando soporta hooks en **Lua** para personalizar y automatizar comportamientos:

- Hooks antes/después de enviar mensajes
- Hooks de inicio/fin de sesión
- Automatización de flujos de trabajo

Ver el directorio `docs/` del repositorio para ejemplos de hooks Lua.
