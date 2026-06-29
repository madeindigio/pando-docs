---
title: Fast User Feedback (Steering)
weight: 20
---

Fast user feedback allows you to provide real-time course corrections while the agent is running, without cancelling the current operation. Messages are injected at the next safe boundary.

## How It Works

1. The agent is processing a task (running tools, generating code, etc.)
2. You type a message and submit it
3. The message is queued as "steering feedback"
4. At the next safe boundary (after current tool results), the feedback is injected
5. The agent receives it as a new user turn and adjusts

## Usage by Interface

### TUI

Type your message while the agent is running and press **Ctrl+S** to queue it. A status indicator shows the number of queued feedback messages.

### Web UI

Submit feedback through the chat interface during an active run. The message is queued automatically.

### ACP (Editor)

Send a prompt to an active session. It's queued as feedback.

### API

```bash
curl -X POST http://localhost:8766/api/v1/sessions/:id/steer \
  -H "Content-Type: text/plain" \
  -d "Focus on the authentication module instead"
```

## Key Characteristics

- **Non-destructive**: The current operation completes before feedback is processed
- **Safe boundary injection**: Feedback is injected after tool results are persisted
- **Loop continuation**: If feedback arrives between turns, the agent continues with the new direction
- **Auto-compaction**: Context is automatically compacted if history exceeds the provider budget
- **Reconnect-safe**: Pending feedback survives reconnection in Web UI

## Example Workflow

1. Agent starts refactoring the entire codebase
2. You realize the scope is too broad
3. Type: "Focus only on the auth module" + Ctrl+S
4. Agent finishes current tool call, receives feedback, narrows scope

{{< callout >}}
Steering is more efficient than cancelling and restarting. Use it when you want to redirect the agent without losing progress on completed work.
{{< /callout >}}
