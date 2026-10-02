---
title: Goal Mode Configuration
weight: 31
---

Limits, states and commands of Goal Mode (Autopilot). For the idea, read [Goal Mode]({{< relref "/docs/features/goal-mode" >}}); for the walkthrough, the guide [Goal Mode: long tasks without babysitting]({{< relref "/guides/goal-mode" >}}).

## Basic Configuration

In `.pando.toml`:

```toml
[Goal]
# Maximum iterations before timeout (0 = default 20)
MaxIterations = 20

# Maximum duration (Go duration string)
MaxDuration = '1h'

# Consecutive no-progress iterations before stalled
StallIterations = 3

# Auto-approve all tool calls during goal mode
AutoApprove = true

# Patterns to block in goal mode (regex)
DangerousPatterns = []
```

## Goal States

| State | Description |
|-------|-------------|
| `running` | Goal is actively being pursued |
| `completed` | Objective achieved |
| `failed` | Objective cannot be achieved |
| `blocked` | Goal is blocked by external factors |
| `cancelled` | User cancelled the goal |
| `timeout` | Max iterations or duration exceeded |
| `stalled` | No progress for N iterations |

All except `running` are terminal states.

## Slash Commands

| Command | Description |
|---------|-------------|
| `/goal <objective>` | Start goal mode |
| `/autopilot <objective>` | Alias for `/goal` |
| `/goal-status` | Show current goal status |
| `/goal-cancel` | Cancel running goal |

They work in the TUI, the Web UI and in editors connected through ACP. In the TUI the chat input is disabled while a goal runs, and **Ctrl+C** cancels the goal instead of exiting Pando.

## Status component

While a goal runs, the interface shows a status badge (running, completed, failed, blocked, timeout, stalled, cancelled), the objective text, the iteration counter (for example "Iteration 3/20"), the elapsed time, the progress text and the next step.

## Non-Interactive Goal Mode

From the command line:

```bash
pando --goal "Fix all failing tests"
pando --goal "Refactor auth module" --model copilot.gpt-5.4
pando --goal "Add comprehensive error handling" --quiet
```

The CLI returns a structured result:

```json
{
  "session_id": "...",
  "objective": "Fix all failing tests",
  "status": "completed",
  "iteration": 5,
  "response": "All 12 tests now pass",
  "progress": "Fixed authentication, database, and API tests",
  "next_step": null,
  "blocked_reason": null
}
```

## How the loop runs

1. The `GoalRunner` creates a goal record in the database.
2. Each iteration sends the goal prompt to the agent.
3. The `HeuristicGoalEvaluator` analyses the response.
4. Progress is recorded and the loop continues until a terminal state is reached.

The evaluator looks for:

- **Completion signals**: tests passing, build success, explicit completion statements.
- **Blocking signals**: error messages, missing dependencies, unresolvable issues.
- **Stalling**: no meaningful progress for `StallIterations` consecutive iterations.

## Safety

- `AutoApprove = true` skips permission prompts during goal mode.
- `DangerousPatterns` blocks commands matching regex patterns.
- Ctrl+C cancels the running goal (instead of exiting Pando).
- Max iterations and duration provide hard limits.
