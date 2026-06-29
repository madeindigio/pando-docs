---
title: Compactación de Sesión
weight: 29
---

La compactación de sesión comprime el historial de conversación en un resumen, liberando espacio de contexto para conversaciones largas.

## Compactación Manual

Usa comandos slash para compactar bajo demanda:

```
/compact
/summarize
```

## Compactación Automática

Pando compacta automáticamente cuando la ventana de contexto se llena durante la ejecución de un agente:

```toml
AutoCompact = true
```

Configuración por agente:

```toml
[Agents.coder]
AutoCompact = false
AutoCompactThreshold = 0.0

[Agents.summarizer]
Model = 'ollama.qwopus:latest'
```

## Cómo Funciona

1. El método `Summarize` comprime el historial de conversación
2. Los mensajes antes del resumen se reemplazan por él
3. El resumen se almacena como un límite especial en el historial
4. Se libera espacio de contexto para nuevos mensajes

## Configuración

| Parámetro | Descripción |
|-----------|-------------|
| `AutoCompact` | Toggle global de auto-compactación |
| `AutoCompactThreshold` | Umbral de uso de contexto para activar (0.0 = automático) |
| `[Agents.summarizer].Model` | Modelo usado para el resumen |

## Cuándo Usar

- Conversaciones largas que se acercan a los límites del contexto
- Después de completar una tarea mayor y comenzar una nueva
- Cuando la calidad de respuesta se degrada por ruido de contexto

{{< callout >}}
La compactación preserva la información más importante mientras elimina salidas verbosas de herramientas y pasos intermedios. El resumen captura decisiones clave, cambios de archivos y progreso.
{{< /callout >}}
