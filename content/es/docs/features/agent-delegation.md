---
title: Delegación y Orquestación de Agentes
weight: 11
---

Pando incluye **Mesnada**, un poderoso framework de orquestación de agentes que permite delegar tareas a sub-agentes especializados ejecutándose en segundo plano. Los sub-agentes pueden trabajar en diferentes proyectos, usar diferentes motores y reportar resultados al agente padre automáticamente.

## Lanzar Sub-Agentes

La herramienta `mesnada_spawn_agent` lanza tareas en segundo plano:

```json
{
  "prompt": "Analizar el módulo de autenticación y escribir tests",
  "subagent_type": "general",
  "description": "Escribir tests de auth",
  "background": true
}
```

### Parámetros Clave

| Parámetro | Descripción |
|-----------|-------------|
| `prompt` | La instrucción para la tarea lanzada |
| `subagent_type` | `explore` (solo lectura) o `general` (todas las capacidades) |
| `background` | `true` para fire-and-forget, `false` para bloquear hasta completar |
| `project` | Dirigir a un proyecto registrado por id, nombre o ruta |
| `engine` | Motor CLI: `pando`, `copilot`, `claude`, `gemini`, etc. |
| `model` | Sobreescribir el modelo para esta tarea |
| `dependencies` | Lista de IDs de tareas que deben completarse primero |
| `task_id` | Relanzar una tarea existente in-place |

## Esperar Resultados

### No Bloqueante (Recomendado)

Usa `mesnada_await` después de lanzar tareas en segundo plano:

```json
{
  "action": "wait",
  "actor_id": "explore-1"
}
```

El agente padre se reanuda automáticamente cuando llegan los resultados.

### Bloqueante

Usa `mesnada_wait_task` para bloquear hasta que una tarea específica comple:

```json
{
  "task_id": "T1",
  "timeout": "10m"
}
```

## Dependencias de Tareas

Las tareas pueden depender de otras. Una tarea dependiente solo se inicia cuando todas sus dependencias se completan:

```json
{
  "prompt": "Escribir tests basados en el análisis",
  "dependencies": ["T1", "T2"],
  "include_dependency_logs": true,
  "dependency_log_lines": 100
}
```

## Plantillas de Motores Personalizados

Define motores de agente personalizados colocando archivos `*.template.yaml` en el directorio de motores:

```toml
[Mesnada.Orchestrator]
EnginesDir = ''   # por defecto <dirname(LogDir)>/engines
```

Cada plantilla especifica comando, args (con expresiones Go template), modo de prompt, formato de salida y modelos disponibles. Los motores personalizados aparecen dinámicamente en la herramienta `mesnada_spawn_agent`.

## Delegación Multi-Proyecto

Delega tareas a otras instancias de Pando en ejecución en diferentes proyectos:

```toml
[Mesnada.Delegation]
Enabled = true
ReuseWarmInstances = true
AutoStartWarmInstance = true
```

El parámetro `project` enruta la tarea a la instancia activa del proyecto correcto.

## Reutilización de Instancias Activas

Cuando está habilitado, las tareas delegadas se enrutan a instancias ACP ya en ejecución ("calientes") en lugar de lanzar nuevos procesos CLI:

```toml
[Mesnada.Delegation]
ReuseWarmInstances = true
WarmInstanceIdleTimeout = '10m'
MaxConcurrent = 8
```

## Supervisor de Delegación

El supervisor maneja la finalización automática de tareas delegadas:

- **Inyectar en bucle activo**: Cuando una tarea se completa mientras el padre está ejecutándose, los resultados se inyectan automáticamente
- **Resucitar bucle inactivo**: Cuando las tareas se completan mientras el padre está inactivo, se despierta al padre con resultados combinados

```toml
[Mesnada.Delegation]
Enabled = true
InjectIntoLiveLoop = true
ResurrectIdleLoop = true
MaxResurrections = 4
MaxDepth = 3
```

## Delegación Hot-Peer (IPC)

Las instancias pueden delegar tareas a instancias pares externas a través de ZeroMQ IPC:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # lado del llamador
AcceptDelegations = true           # lado del objetivo
```

## Gestión de Sesiones

Administra tareas Mesnada con herramientas dedicadas:

- `mesnada_get_task` - Obtener detalles de tarea
- `mesnada_list_tasks` - Listar tareas con filtros
- `mesnada_cancel_task` - Cancelar una tarea
- `mesnada_get_task_output` - Obtener stdout/stderr

{{< callout >}}
Los sub-agentes se ejecutan en sesiones aisladas con su propio contexto. Heredan el directorio de trabajo y configuración del proyecto pero operan independientemente.
{{< /callout >}}
