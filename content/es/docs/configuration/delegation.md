---
title: Configuración de delegación y Mesnada
weight: 35
---

Claves del orquestador Mesnada y del tratamiento de las tareas delegadas, más las herramientas que usa el agente para delegar. Para la idea, lee [Delegación de agentes]({{< relref "/docs/features/agent-delegation" >}}); para el paso a paso, la guía [Delega en subagentes con Mesnada]({{< relref "/guides/mesnada" >}}).

Web UI: **Configuración > Mesnada** (servidor, orquestador, ACP) y **Configuración > General > Delegación de subagentes**.

{{< shot src="images/webui/pando-webui-settings-mesnada.jpg" alt="Ajustes de Mesnada" >}}

## Orquestador

```toml
[Mesnada]
Enabled = true

[Mesnada.Server]
Host = 'localhost'
Port = 5005

[Mesnada.Orchestrator]
StorePath        = './.pando/mesnada/tasks.json'
LogDir           = './.pando/mesnada/logs'
EnginesDir       = ''        # defaults to <dirname(LogDir)>/engines
MaxParallel      = 5         # tasks in flight at once; 0 = unlimited
MaxPerEngine     = 0         # per-engine cap; 0 = unlimited
ClaimTTL         = '2m'      # how long a dispatch reservation lasts
DispatchInterval = '10s'     # how often deferred tasks are started
DefaultEngine    = 'pando'
DefaultModel     = ''
PersonaPath      = ''
```

| Clave | Etiqueta en la Web UI | Descripción |
|---|---|---|
| `MaxParallel` | Max parallel / Tareas en paralelo máximas | Las tareas por encima del límite esperan y arrancan según quedan huecos |
| `MaxPerEngine` | Tareas máximas por motor (0 = sin límite) | Evita que un solo motor ocupe todos los huecos |
| `ClaimTTL` | TTL de la reserva de despacho | Una reserva que caduca sin que la tarea arranque se recupera |
| `DispatchInterval` | Intervalo de despacho | Duración en formato Go |
| `DefaultEngine` | Default engine | `pando`, `claude`, `copilot`, `openai`, `google`, `ollama` o un motor personalizado |
| `DefaultModel` | Default model | Se usa cuando la tarea no nombra ninguno |
| `PersonaPath` | Persona path | Carpeta con los ficheros de personas |

### Motores personalizados

Coloca ficheros `*.template.yaml` en `EnginesDir`. Cada plantilla indica el comando, los argumentos (con expresiones de plantillas de Go), el modo de prompt, el formato de salida y los modelos disponibles. Los motores personalizados aparecen de forma dinámica en la herramienta `mesnada_spawn_agent`.

## Delegación

{{< shot src="images/webui/pando-webui-settings-general-subagent-delegation.jpg" alt="Ajustes de delegación de subagentes" >}}

```toml
[Mesnada.Delegation]
Enabled             = true
InjectIntoLiveLoop  = true
ResurrectIdleLoop   = true
SynthesizeFallback  = false
MaxResurrections    = 4
MaxDepth            = 3
MaxConcurrent       = 8
ResurrectionTimeout = '10m'
```

| Clave | Por defecto | Etiqueta en la Web UI | Descripción |
|---|---|---|---|
| `Enabled` | `false` | Delegación activada | Captura las conclusiones de las tareas delegadas y vuelve a entrar en el bucle del agente padre |
| `InjectIntoLiveLoop` | `false` | Inyectar en bucle activo | Entrega una conclusión a un padre que sigue en marcha |
| `ResurrectIdleLoop` | `false` | Reactivar bucle inactivo | Despierta una sesión padre inactiva cuando termina una tarea relacionada |
| `SynthesizeFallback` | `false` | Sintetizar alternativa | Redacta una conclusión cuando el subagente la omite |
| `MaxResurrections` | `4` | Máx. reactivaciones | Reactivaciones permitidas por sesión y cadena de turnos |
| `MaxDepth` | `3` | Profundidad máx. | Niveles de subagentes de subagentes |
| `MaxConcurrent` | `8` | Máx. concurrentes | Tareas pendientes por padre, y sesiones enviadas a una misma instancia activa |
| `ResurrectionTimeout` | `10m` | Tiempo de espera de reactivación | Cuánto se espera a las conclusiones hermanas que faltan |

### Instancias activas y otros proyectos

{{< shot src="images/webui/pando-webui-settings-general-delegation-warm-instances.jpg" alt="Ajustes de instancias activas, verificación de conclusiones y cortacircuitos" >}}

```toml
[Mesnada.Delegation]
ReuseWarmInstances       = true
AutoStartWarmInstance    = true
WarmInstanceIdleTimeout  = '10m'   # '0' or empty = never stop it
WarmQueueDepth           = 0       # 0 = start a separate process when the instance is full
AllowExternalWarmTargets = true    # caller side
AcceptDelegations        = true    # target side
```

| Clave | Etiqueta en la Web UI | Descripción |
|---|---|---|
| `ReuseWarmInstances` | Reutilizar instancias activas | Envía una tarea delegada a la instancia ya abierta de su proyecto. Requiere `Enabled` |
| `AutoStartWarmInstance` | Auto-arrancar instancia activa | Arranca una instancia del proyecto si no hay ninguna (desactivado = solo reutilizar) |
| `WarmInstanceIdleTimeout` | Tiempo de inactividad de instancia activa (0 = nunca) | Detiene una instancia arrancada automáticamente tras este tiempo sin trabajo delegado |
| `WarmQueueDepth` | Profundidad de cola activa (0 = arranque en frío al límite) | Tareas que pueden esperar hueco en una instancia llena |
| `AllowExternalWarmTargets` | Permitir destinos externos activos | Envía una tarea a una instancia lanzada por un editor, por IPC. El destino debe aceptar delegaciones |
| `AcceptDelegations` | Aceptar delegaciones | Permite que esta instancia ejecute tareas enviadas por otras instancias |

El parámetro `project` de `mesnada_spawn_agent` dirige la tarea a la instancia del proyecto correcto.

### Redes de seguridad

{{< shot src="images/webui/pando-webui-settings-general-delegation-event-log.jpg" alt="Ajustes del registro de eventos durable y del despacho" >}}

| Clave | Por defecto | Etiqueta en la Web UI | Descripción |
|---|---|---|---|
| `ConclusionGateDisabled` | `false` | Verificación de conclusiones (activa) | Rebaja un «success» a «partial» cuando los ficheros o referencias de memoria citados no existen |
| `BreakerDisabled` | `false` | Cortacircuitos (activo) | Se niega a relanzar una tarea que llegó al límite de fallos, falló por autenticación o está dentro de la espera por límite de cuota |
| `MaxTaskRetries` | `3` | Fallos consecutivos máximos | Cualquier éxito lo pone a cero |
| `RateLimitCooldown` | `5m` | Espera tras límite de cuota | Espera tras un fallo por límite de cuota |
| `RecentSuccessWindow` | `2m` | Ventana de éxito reciente | Dentro de esta ventana se rechaza repetir una tarea que acaba de salir bien |
| `EventLogDisabled` | `false` | Registro de eventos durable (activo) | Cada resultado final se escribe en disco y se entrega incluso tras un reinicio |
| `EventLogMaxEntries` | `5000` | Máximo de eventos guardados | Los eventos más antiguos se compactan |
| `BlackboardMaxEntriesPerSwarm` | `200` | | Tamaño máximo de las notas compartidas de un enjambre |
| `BlackboardTTL` | `168h` | | Las notas compartidas de un enjambre terminado se borran pasado este tiempo |

## Herramientas que usa el agente

`mesnada_spawn_agent` lanza una tarea:

```json
{
  "prompt": "Analyze the authentication module and write tests",
  "subagent_type": "general",
  "description": "Write auth tests",
  "background": true
}
```

| Parámetro | Descripción |
|-----------|-------------|
| `prompt` | La instrucción de la tarea |
| `subagent_type` | `explore` (solo lectura) o `general` (todas las capacidades) |
| `background` | `true` para seguir sin esperar, `false` para bloquear hasta que termine |
| `project` | Apunta a un proyecto registrado por id, nombre o ruta |
| `engine` | Motor de CLI: `pando`, `copilot`, `claude`, `gemini`, etc. |
| `model` | Sustituye el modelo para esta tarea |
| `dependencies` | Lista de ids de tareas que deben terminar antes |
| `task_id` | Relanza una tarea existente en su sitio |

Dependencias, pasando los registros de las tareas anteriores:

```json
{
  "prompt": "Write tests based on the analysis",
  "dependencies": ["T1", "T2"],
  "include_dependency_logs": true,
  "dependency_log_lines": 100
}
```

Esperar sin bloquear (recomendado) usa `mesnada_await`; el agente padre se reanuda cuando llegan los resultados:

```json
{
  "action": "wait",
  "actor_id": "explore-1"
}
```

Bloquear hasta que termine una tarea usa `mesnada_wait_task`:

```json
{
  "task_id": "T1",
  "timeout": "10m"
}
```

| Herramienta | Para qué |
|---|---|
| `mesnada_get_task` | Detalles de una tarea |
| `mesnada_list_tasks` | Lista de tareas con filtros |
| `mesnada_cancel_task` | Cancelar una tarea |
| `mesnada_get_task_output` | Salida estándar y de errores |

## Autoservicio del agente (`pando_setup`)

La herramienta integrada `pando_setup` no necesita configuración y siempre está disponible para el agente. Mira [Autoservicio del agente]({{< relref "/docs/features/pando-setup-tool" >}}).

| Comando | Para qué |
|---------|---------|
| `help` | Lista los comandos disponibles o el uso de uno concreto |
| `config` | Lee la configuración activa (solo lectura, la misma vista que los ajustes de la TUI y la Web UI) |
| `providers` | Lista las cuentas de proveedor con su tipo, credenciales y número de modelos |
| `models` | Recorre los modelos disponibles con ventana de contexto, precio y capacidades |
| `session` | Consulta el uso de tokens del último turno y el coste acumulado de la sesión |
| `commands` | Lista los comandos slash disponibles |
| `run <comando>` | Activa un comando slash en la sesión actual |

```bash
pando_setup models --provider anthropic --detail --limit 5
pando_setup providers
pando_setup config                           # show all config
pando_setup config --search token            # search for token-related settings
pando_setup config TokenOptimization         # show a specific section
pando_setup run /caveman lite
pando_setup session
```

`models` usa el registro de modelos en vivo, enriquecido con [models.dev](https://models.dev): id canónico (por ejemplo `copilot.gpt-5.4`), ventana de contexto, precio por millón de tokens, capacidades y fecha de corte de conocimiento.

Comandos que el agente puede ejecutar con `run`:

- Comandos de modo: `/caveman`, `/caveman-finish`, `/ponytail`, `/ponytail-finish`, `/superpowers`, `/superpowers-finish`, `/learning`, `/learning-finish`.
- Comandos de instrucciones: `/improve-agents-md`, `/vulnhunt`, `/vulnhunter-fix`, `/vulnhunt-fix-verify`, y los comandos personalizados `user:` y `project:`.

Bloqueados, porque te necesitan a ti a los mandos: `/goal*`, `/compact`, `/db-compact` y todos los comandos de cierre `-finish`.

Seguridad: la configuración es estrictamente de solo lectura (no existe vía de escritura); los secretos se enmascaran por el sufijo de la clave (`apikey`, `token`, `password`, `secret`…) y solo se ven los 4 últimos caracteres; la descripción de la herramienta no pasa de 600 caracteres; la optimización de contexto no puede retirar la herramienta.
