---
title: Goal Mode (Autopilot)
weight: 10
---

Goal mode enables Pando to pursue a persistent objective autonomously across multiple agent turns, without requiring user input after each step. The agent iterates, evaluates its own progress, and continues until the goal is achieved, blocked, or cancelled.

## Starting Goal Mode

Use the `/goal` slash command in TUI, Web UI, or ACP mode:

```
/goal <objective description>
```

You can also use the alias:

```
/autopilot <objective description>
```

## Monitoring Progress

While a goal is running, Pando displays a dedicated status component showing:

- **Status badge** with animated spinner (running, completed, failed, blocked, timeout, stalled, cancelled)
- **Objective text**
- **Iteration counter** (e.g., "Iteration 3/20")
- **Elapsed time**
- **Progress text**
- **Next step description**

Check status at any time with:

```
/goal-status
```

## Cancelling a Goal

Cancel the running goal with:

```
/goal-cancel
```

Or press **Ctrl+C** while a goal is active (this cancels the goal instead of exiting Pando).

## How It Works

1. The `GoalRunner` creates a goal record in the database
2. Each iteration sends the goal prompt to the agent
3. A `HeuristicGoalEvaluator` analyzes the response for completion, blocking, or stalling
4. Progress is recorded and the loop continues until a terminal state is reached

Terminal states: `completed`, `failed`, `cancelled`, `blocked`, `timeout`, `stalled`

## Configuration

```toml
[Goal]
MaxIterations = 20       # Maximum iterations (0 = default 20)
MaxDuration = '1h'       # Go duration string
StallIterations = 3      # Consecutive no-progress before stalled
AutoApprove = true       # Auto-approve tool calls during goal mode
DangerousPatterns = []   # Patterns to block in goal mode
```

## Non-Interactive Goal Mode

From the command line, use the `--goal` flag for fully autonomous execution:

```bash
pando --goal "Fix all failing tests in the project"
pando --goal "Refactor auth module" --model copilot.gpt-5.4
```

The CLI returns a structured result with session ID, objective, status, iteration count, and progress.

{{< callout >}}
Goal mode works in TUI, ACP, Web UI, and CLI non-interactive mode. In TUI, the chat input is disabled while a goal is running to prevent interference.
{{< /callout >}}
