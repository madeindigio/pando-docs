---
title: Delegation and Mesnada Configuration
weight: 35
---

Keys of the Mesnada orchestrator and of delegated-task handling, plus the tools the agent uses to delegate. For the idea, read [Agent delegation]({{< relref "/docs/features/agent-delegation" >}}); for the walkthrough, the guide [Delegate to subagents with Mesnada]({{< relref "/guides/mesnada" >}}).

Web UI: **Settings > Mesnada** (server, orchestrator, ACP) and **Settings > General > Subagent Delegation**.

{{< shot src="images/webui/pando-webui-settings-mesnada.jpg" alt="Mesnada settings" >}}

## Orchestrator

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

| Key | Web UI label | Description |
|---|---|---|
| `MaxParallel` | Max parallel / Max parallel tasks | Tasks over the cap wait and start as slots free up |
| `MaxPerEngine` | Max tasks per engine (0 = no limit) | Keeps one engine from using every slot |
| `ClaimTTL` | Dispatch claim TTL | A reservation that expires without the task starting is reclaimed |
| `DispatchInterval` | Dispatch interval | Go duration string |
| `DefaultEngine` | Default engine | `pando`, `claude`, `copilot`, `openai`, `google`, `ollama` or a custom engine |
| `DefaultModel` | Default model | Used when a task names none |
| `PersonaPath` | Persona path | Folder with persona files |

### Custom engines

Place `*.template.yaml` files in `EnginesDir`. Each template specifies command, args (with Go template expressions), prompt mode, output format and available models. Custom engines appear dynamically in the `mesnada_spawn_agent` tool.

## Delegation

{{< shot src="images/webui/pando-webui-settings-general-subagent-delegation.jpg" alt="Subagent delegation settings" >}}

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

| Key | Default | Web UI label | Description |
|---|---|---|---|
| `Enabled` | `false` | Delegation Enabled | Capture delegated-task conclusions and re-enter the parent agent loop |
| `InjectIntoLiveLoop` | `false` | Inject Into Live Loop | Hand a conclusion to a parent that is still running |
| `ResurrectIdleLoop` | `false` | Resurrect Idle Loop | Wake an idle parent session when a related task completes |
| `SynthesizeFallback` | `false` | Synthesize Fallback | Write a conclusion when the subagent omits it |
| `MaxResurrections` | `4` | Max Resurrections | Wake-ups allowed per session and chain of turns |
| `MaxDepth` | `3` | Max Depth | Levels of subagents of subagents |
| `MaxConcurrent` | `8` | Max Concurrent | Outstanding tasks per parent, and sessions routed to one warm instance |
| `ResurrectionTimeout` | `10m` | Resurrection Timeout | How long to wait for sibling conclusions still pending |

### Warm instances and other projects

{{< shot src="images/webui/pando-webui-settings-general-delegation-warm-instances.jpg" alt="Warm instance, integrity gate and circuit breaker settings" >}}

```toml
[Mesnada.Delegation]
ReuseWarmInstances       = true
AutoStartWarmInstance    = true
WarmInstanceIdleTimeout  = '10m'   # '0' or empty = never stop it
WarmQueueDepth           = 0       # 0 = start a separate process when the instance is full
AllowExternalWarmTargets = true    # caller side
AcceptDelegations        = true    # target side
```

| Key | Web UI label | Description |
|---|---|---|
| `ReuseWarmInstances` | Reuse Warm Instances | Route a delegated task to the already-running instance of its project. Requires `Enabled` |
| `AutoStartWarmInstance` | Auto-Start Warm Instance | Start an instance for the project when none is running (off = reuse only) |
| `WarmInstanceIdleTimeout` | Warm Instance Idle Timeout (0 = never) | Stop an auto-started instance after this long without delegated work |
| `WarmQueueDepth` | Warm Queue Depth (0 = cold-spawn at cap) | Tasks that may wait for a slot in a full instance |
| `AllowExternalWarmTargets` | Allow External Warm Targets | Send a task to an instance launched by an editor, over IPC. The target must accept delegations |
| `AcceptDelegations` | Accept Delegations | Let this instance run tasks sent by peer instances |

The `project` parameter of `mesnada_spawn_agent` routes the task to the right project's instance.

### Safety nets

{{< shot src="images/webui/pando-webui-settings-general-delegation-event-log.jpg" alt="Durable event log and dispatch settings" >}}

| Key | Default | Web UI label | Description |
|---|---|---|---|
| `ConclusionGateDisabled` | `false` | Conclusion integrity gate (on) | The gate downgrades "success" to "partial" when the files or memory references cited do not exist |
| `BreakerDisabled` | `false` | Circuit breaker (on) | Refuses to relaunch a task that reached the failure limit, failed on authentication or is inside a rate-limit cooldown |
| `MaxTaskRetries` | `3` | Max consecutive failures | Reset by any success |
| `RateLimitCooldown` | `5m` | Rate-limit cooldown | Wait after a rate-limit failure |
| `RecentSuccessWindow` | `2m` | Recent-success window | Re-running a task that just succeeded is refused within this window |
| `EventLogDisabled` | `false` | Durable event log (on) | Every final task outcome is written to disk and delivered even after a restart |
| `EventLogMaxEntries` | `5000` | Event log max entries | Older events are compacted away |
| `BlackboardMaxEntriesPerSwarm` | `200` | | Size limit of a swarm's shared notes |
| `BlackboardTTL` | `168h` | | A finished swarm's shared notes are purged after this long |

## Tools the agent uses

`mesnada_spawn_agent` launches a task:

```json
{
  "prompt": "Analyze the authentication module and write tests",
  "subagent_type": "general",
  "description": "Write auth tests",
  "background": true
}
```

| Parameter | Description |
|-----------|-------------|
| `prompt` | The instruction for the spawned task |
| `subagent_type` | `explore` (read-only) or `general` (full capabilities) |
| `background` | `true` to keep going without waiting, `false` to block until completion |
| `project` | Target a registered project by id, name, or path |
| `engine` | CLI engine: `pando`, `copilot`, `claude`, `gemini`, etc. |
| `model` | Override the model for this task |
| `dependencies` | List of task IDs that must complete first |
| `task_id` | Relaunch an existing task in-place |

Dependencies, with the logs of the earlier tasks passed along:

```json
{
  "prompt": "Write tests based on the analysis",
  "dependencies": ["T1", "T2"],
  "include_dependency_logs": true,
  "dependency_log_lines": 100
}
```

Waiting without blocking (recommended) uses `mesnada_await`; the parent agent is resumed when results arrive:

```json
{
  "action": "wait",
  "actor_id": "explore-1"
}
```

Blocking until one task completes uses `mesnada_wait_task`:

```json
{
  "task_id": "T1",
  "timeout": "10m"
}
```

| Tool | Purpose |
|---|---|
| `mesnada_get_task` | Get task details |
| `mesnada_list_tasks` | List tasks with filters |
| `mesnada_cancel_task` | Cancel a task |
| `mesnada_get_task_output` | Get stdout/stderr |

## Agent self-service (`pando_setup`)

The built-in `pando_setup` tool needs no configuration and is always available to the agent. See [Agent Self-Service]({{< relref "/docs/features/pando-setup-tool" >}}).

| Command | Purpose |
|---------|---------|
| `help` | List available commands or get usage for a specific one |
| `config` | Read the active configuration (read-only, same view as TUI/WebUI settings) |
| `providers` | List configured provider accounts with types, credentials, and model counts |
| `models` | Browse available models with context window, pricing, and capabilities |
| `session` | Check last turn's token usage and accumulated session cost |
| `commands` | List available slash commands |
| `run <command>` | Activate a slash command for the current session |

```bash
pando_setup models --provider anthropic --detail --limit 5
pando_setup providers
pando_setup config                           # show all config
pando_setup config --search token            # search for token-related settings
pando_setup config TokenOptimization         # show a specific section
pando_setup run /caveman lite
pando_setup session
```

`models` uses the live model registry, enriched with [models.dev](https://models.dev): canonical ID (for example `copilot.gpt-5.4`), context window, price per million tokens, capabilities and knowledge cutoff.

Commands the agent may run with `run`:

- Mode commands: `/caveman`, `/caveman-finish`, `/ponytail`, `/ponytail-finish`, `/superpowers`, `/superpowers-finish`, `/learning`, `/learning-finish`.
- Instruction commands: `/improve-agents-md`, `/vulnhunt`, `/vulnhunter-fix`, `/vulnhunt-fix-verify`, and custom `user:` and `project:` commands.

Blocked, because they need you at the controls: `/goal*`, `/compact`, `/db-compact` and all `-finish` closing commands.

Security: configuration is strictly read-only (no write path exists); secrets are masked by key suffix (`apikey`, `token`, `password`, `secret`…) showing only the last 4 characters; the tool description stays under 600 characters; the tool cannot be trimmed away by context optimization.
