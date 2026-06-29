---
title: Goal Mode Configuration
weight: 31
---

Configure Goal mode (Autopilot) behavior in `.pando.toml`.

## Basic Configuration

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

Goals progress through these states:

| State | Description |
|-------|-------------|
| `running` | Goal is actively being pursued |
| `completed` | Objective achieved |
| `failed` | Objective cannot be achieved |
| `blocked` | Goal is blocked by external factors |
| `cancelled` | User cancelled the goal |
| `timeout` | Max iterations or duration exceeded |
| `stalled` | No progress for N iterations |

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

## Slash Commands

| Command | Description |
|---------|-------------|
| `/goal <objective>` | Start goal mode |
| `/autopilot <objective>` | Alias for `/goal` |
| `/goal-status` | Show current goal status |
| `/goal-cancel` | Cancel running goal |

## Evaluation

The `HeuristicGoalEvaluator` analyzes each iteration for:

- **Completion signals**: Tests passing, build success, explicit completion statements
- **Blocking signals**: Error messages, missing dependencies, unresolvable issues
- **Stalling**: No meaningful progress for N consecutive iterations

## Safety

- `AutoApprove = true` skips permission prompts during goal mode
- `DangerousPatterns` blocks commands matching regex patterns
- Ctrl+C cancels the running goal (instead of exiting Pando)
- Max iterations and duration provide hard limits

{{< callout >}}
Goal mode is powerful for autonomous tasks but should be used with caution. Start with simple objectives and gradually increase complexity as you trust the system.
{{< /callout >}}
