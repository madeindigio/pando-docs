---
title: Configuración ACP Avanzada
weight: 33
---

Ajustes finos para usar Pando dentro de un editor de código a través de ACP, el idioma común con el que los editores alojan un asistente externo. Empieza por la guía [Usa Pando desde tu editor y otras aplicaciones]({{< relref "/guides/editors-and-other-apps" >}}) y por los fragmentos para cada editor de [Protocolo ACP]({{< relref "/docs/acp" >}}); ven aquí cuando necesites cambiar cómo se comportan las sesiones.

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
ACP funciona con VS Code, Zed y los editores de JetBrains. Los fragmentos de configuración están en [Protocolo ACP]({{< relref "/docs/acp" >}}).
{{< /callout >}}
