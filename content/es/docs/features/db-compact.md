---
title: Compactación de Base de Datos
weight: 27
---

Pando mantiene una base de datos SQLite para sesiones, memorias e índice de código. Con el tiempo, esta base de datos puede crecer debido a registros eliminados. El comando DB Compact reclama espacio usando la operación VACUUM de SQLite.

## Uso CLI

```bash
# VACUUM completo
pando db compact

# Incremental (solo reclamar páginas liberadas)
pando db compact --incremental

# Sin habilitar auto_vacuum
pando db compact --no-auto-vacuum
```

## Comando Slash

Usa el comando slash `/db-compact` en TUI, Web UI o ACP:

```
/db-compact
```

Reporta tamaño antes/despais y bytes liberados.

## Cómo Funciona

1. Verifica si otra instancia de Pando está ejecutándose para este directorio
2. Si está ejecutando, reenvía la solicitud VACUUM a la primaria via IPC
3. Si no está ejecutando, realiza VACUUM in-process
4. Habilita `auto_vacuum=INCREMENTAL` para futuras reclamaciones baratas
5. Reporta estadísticas

## Soporte Multi-Instancia

En configuraciones multi-instancia, solo la primaria realiza escrituras a la base de datos. El comando `/db-compact` enruta automáticamente a la primaria via IPC, con timeout de 30 minutos.

## Configuración

No se necesita configuración explícita. El comando usa la configuración existente de la base de datos.

{{< callout >}}
Ejecuta `/db-compact` periódicamente para mantener la base de datos ligera. El modo incremental es más rápido y reclama solo las páginas que fueron liberadas por eliminaciones.
{{< /callout >}}
