---
title: Agent Delegation & Orchestration
weight: 11
---

Pando includes **Mesnada**, a powerful agent orchestration framework that allows you to delegate tasks to specialized sub-agents running in the background. Sub-agents can work on different projects, use different engines, and report results back to the parent agent automatically.

## Spawning Sub-Agents

The `mesnada_spawn_agent` tool launches background tasks:

```json
{
  "prompt": "Analyze the authentication module and write tests",
  "subagent_type": "general",
  "description": "Write auth tests",
  "background": true
}
```

### Key Parameters

| Parameter | Description |
|-----------|-------------|
| `prompt` | The instruction for the spawned task |
| `subagent_type` | `explore` (read-only) or `general` (full capabilities) |
| `background` | `true` for fire-and-forget, `false` to block until completion |
| `project` | Target a registered project by id, name, or path |
| `engine` | CLI engine: `pando`, `copilot`, `claude`, `gemini`, etc. |
| `model` | Override the model for this task |
| `dependencies` | List of task IDs that must complete first |
| `task_id` | Relaunch an existing task in-place |

## Waiting for Results

### Non-Blocking (Recommended)

Use `mesnada_await` after spawning background tasks:

```json
{
  "action": "wait",
  "actor_id": "explore-1"
}
```

The parent agent is automatically resumed when results arrive.

### Blocking

Use `mesnada_wait_task` to block until a specific task completes:

```json
{
  "task_id": "T1",
  "timeout": "10m"
}
```

## Task Dependencies

Tasks can depend on other tasks. A dependent task starts only when all its dependencies complete:

```json
{
  "prompt": "Write tests based on the analysis",
  "dependencies": ["T1", "T2"],
  "include_dependency_logs": true,
  "dependency_log_lines": 100
}
```

## Custom Engine Templates

Define custom agent engines by placing `*.template.yaml` files in the engines directory:

```toml
[Mesnada.Orchestrator]
EnginesDir = ''   # defaults to <dirname(LogDir)>/engines
```

Each template specifies command, args (with Go template expressions), prompt mode, output format, and available models. Custom engines appear dynamically in the `mesnada_spawn_agent` tool.

## Multi-Project Delegation

Delegate tasks to other running Pando instances across different projects:

```toml
[Mesnada.Delegation]
Enabled = true
ReuseWarmInstances = true
AutoStartWarmInstance = true
```

The `project` parameter routes the task to the correct project's warm instance.

## Warm Instance Reuse

When enabled, delegated tasks are routed to already-running ("warm") ACP instances instead of spawning new CLI processes:

```toml
[Mesnada.Delegation]
ReuseWarmInstances = true
WarmInstanceIdleTimeout = '10m'
MaxConcurrent = 8
```

## Delegation Supervisor

The supervisor handles automatic finalization of delegated tasks:

- **Inject into live loop**: When a task completes while the parent is running, results are injected automatically
- **Resurrect idle loop**: When tasks complete while the parent is idle, the parent is woken up with combined results

```toml
[Mesnada.Delegation]
Enabled = true
InjectIntoLiveLoop = true
ResurrectIdleLoop = true
MaxResurrections = 4
MaxDepth = 3
```

## Hot-Peer Delegation (IPC)

Instances can delegate tasks to external peer instances over ZeroMQ IPC:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # caller-side
AcceptDelegations = true           # target-side
```

## Session Management

Manage Mesnada tasks with dedicated tools:

- `mesnada_get_task` - Get task details
- `mesnada_list_tasks` - List tasks with filters
- `mesnada_cancel_task` - Cancel a task
- `mesnada_get_task_output` - Get stdout/stderr

{{< callout >}}
Sub-agents run in isolated sessions with their own context. They inherit the working directory and project configuration but operate independently.
{{< /callout >}}
