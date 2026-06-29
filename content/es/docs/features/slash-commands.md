---
title: Comandos Slash
weight: 18
---

Pando soporta comandos slash para acceso rápido a funcionalidades sin salir de la interfaz de chat. Escribe `/` al inicio de un input vacío para ver los comandos disponibles.

## Comandos Disponibles

### Modo Objetivo

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Iniciar modo objetivo autónomo |
| `/autopilot <objetivo>` | Alias para `/goal` |
| `/goal-status` | Mostrar estado del objetivo actual |
| `/goal-cancel` | Cancelar objetivo en ejecución |

### Gestión de Sesiones

| Comando | Descripción |
|---------|-------------|
| `/compact` | Compactar contexto de sesión (liberar tokens) |
| `/summarize` | Alias para `/compact` |
| `/db-compact` | Ejecutar SQLite VACUUM para recuperar espacio |

### Calidad de Código

| Comando | Descripción |
|---------|-------------|
| `/ponytail lite` | Habilitar modo YAGNI lite |
| `/ponytail full` | Habilitar modo YAGNI full |
| `/ponytail ultra` | Habilitar modo YAGNI ultra |
| `/ponytail off` | Desactivar ponytail |

## Uso en Diferentes Interfaces

### TUI

Escribe `/` en el input del chat. Aparece un diálogo con búsqueda fuzzy con todos los comandos disponibles y categorías.

### Web UI

Escribe `/` en el input del chat. Los comandos aparecen en un dropdown de autocompletado.

### ACP (Integración con Editor)

Escribe `/` en el panel de chat del editor. Los comandos están disponibles en VS Code, Zed y JetBrains.

### CLI (No Interactivo)

Usa flags en lugar de comandos slash:

```bash
pando --goal "Corregir tests"           # equivalente a /goal
pando -p "/compact texto resumen"       # no aplicable en no interactivo
```

## Categorías de Comandos

Los comandos se organizan en categorías:

- **General**: Goal, compact, db-compact
- **Calidad de Código**: Modos ponytail
- **Archivos**: Operaciones de archivos (dependiente del contexto)
- **Sesiones**: Gestión de sesiones
- **Modelos**: Cambio de modelo
- **Vista**: Cambios de diseño de UI

{{< callout >}}
Los comandos slash funcionan en todas las interfaces de Pando (TUI, Web UI, ACP, CLI). La paleta de comandos proporciona búsqueda fuzzy para encontrar rápidamente el comando que necesitas.
{{< /callout >}}
