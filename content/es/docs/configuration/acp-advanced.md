---
title: Configuración ACP Avanzada
weight: 33
---

Configuración avanzada de ACP (Agent Client Protocol) para integración con editores.

## Configuración del Servidor

```toml
[Mesnada.ACP]
Enabled = false
DefaultAgent = 'pando'
AutoPermission = true

[Mesnada.ACP.Server]
Enabled = true
Transports = ['http']
Host = '0.0.0.0'
Port = 8766
MaxSessions = 100
SessionTimeout = '30m'
RequireAuth = false
```

## Sobreescripciones por Sesión

Las sesiones ACP soportan configuración por sesión:

| Campo | Descripción |
|-------|-------------|
| `cleanMode` | Deshabilitar instrucciones extra de system/prompt-builder |
| `persona` | Sobreescribir persona para esta sesión |
| `model` | Sobreescribir modelo para esta sesión |
| `mode` | Sobreescribir modo para esta sesión |
| `thinkingMode` | Sobreescribir modo de thinking (`disabled`, `low`, `medium`, `high`) |
| `thinkingStreamMode` | Controlar cómo se streamea el razonamiento |
| `askPermission` | Requisito de permiso por sesión |

## Comandos Slash en ACP

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Iniciar modo objetivo |
| `/goal-status` | Mostrar estado del objetivo |
| `/goal-cancel` | Cancelar objetivo |
| `/compact` | Compactar contexto de sesión |
| `/summarize` | Alias para `/compact` |
| `/db-compact` | VACUUM de base de datos |
| `/ponytail [mode]` | Alternar modo YAGNI |

## Modo Persona Limpia

Cuando `cleanMode` está habilitado, Pando deshabilita todas las instrucciones extra de system/prompt-builder, dando al editor control completo sobre el system prompt:

```json
{
  "cleanMode": true
}
```

Esto es útil para editores que gestionan sus propios system prompts.

## Visualización del Plan

Las sesiones ACP pueden mostrar el plan de tareas del agente (entradas de TodoWrite) en la UI del editor:

- Actualizaciones de progreso en tiempo real
- Estado por tarea (completada, en progreso, pendiente)
- Rastreo de ejecución de herramientas

## Streaming de Thinking

Controla cómo se streamea el razonamiento al editor:

```json
{
  "thinkingStreamMode": "header"
}
```

Opciones: `header`, `full`, `disabled`

{{< callout >}}
La integración ACP funciona con VS Code, Zed y JetBrains IDEs. Ve la documentación principal de ACP para instrucciones de configuración.
{{< /callout >}}
