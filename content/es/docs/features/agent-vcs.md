---
title: Agent-VCS (Control de Versiones para Agentes)
weight: 15
---

Agent-VCS es un sistema ligero de control de versiones que rastrea cambios de archivos entre sesiones del agente. Proporciona commits inmutables, changelogs por sesión, diffs a nivel de archivo y capacidad de revertir—inspirado en jj (Jujutsu).

## Comandos CLI

```bash
# Listar todas las sesiones
pando agent-vcs sessions

# Mostrar log de commits de una sesión
pando agent-vcs log <session-id>

# Mostrar detalles y diff de un commit
pando agent-vcs show <commit-id>

# Revertir a un commit anterior
pando agent-vcs revert <commit-id>

# Compactar: mantener solo sesiones recientes
pando agent-vcs compact --keep 20

# Compactar: eliminar sesiones mayores de N días
pando agent-vcs compact --days 30
```

## Conceptos Clave

### Commits

Snapshots inmutables en el tiempo con IDs derivados del contenido (SHA-256). Cada commit registra:
- Adiciones, modificaciones y eliminaciones de archivos
- Marca de tiempo y asociación a sesión
- Hash de contenido para integridad

### Árboles

Listados de archivos deduplicados almacenados por separado. Múltiples commits pueden referenciar el mismo árbol si no cambiaron archivos.

### Sesiones

Cadenas lineales de commits por sesión del agente. Cada sesión agrupa cambios relacionados hechos durante una única conversación.

### Diffs

Rastreo de cambios a nivel de archivo entre dos commits cualesquiera. Muestra archivos añadidos, modificados y eliminados con sus cambios de contenido.

## Revertir

Restaura tu directorio de trabajo al estado de un commit anterior:

```bash
pando agent-vcs revert <commit-id>
```

Se crea un commit de seguridad antes de revertir, siempre puedes deshacer el revert.

## Configuración

```toml
[Snapshots]
Enabled = true
MaxSnapshots = 5
MaxFileSize = '10MB'
ExcludePatterns = ['dist', 'node_modules', '.env', '.pando']
AutoCleanupDays = 5
```

## Integración con Web UI

La Web UI proporciona una ventana de snapshot con visualización de diffs, permitiéndote revisar los cambios hechos por el agente y revertir archivos específicos o sesiones completas.

{{< callout >}}
Agent-VCS rastrea cambios incrementalmente—solo se almacenan los archivos modificados en cada commit, manteniendo el almacenamiento eficiente incluso en proyectos grandes.
{{< /callout >}}
