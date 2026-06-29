---
title: Interactive User Questions
weight: 22
---

The `ask_user_question` tool allows the agent to pause and ask you structured, selectable questions mid-task—similar to Claude Code's interactive pattern.

## How It Works

1. The agent calls `ask_user_question` with structured questions
2. In TUI/Web UI: an interactive dialog appears
3. In ACP: questions are formatted as numbered text and the agent pauses
4. You respond by selecting options or typing free text
5. The agent receives your answers and continues

## Features

- **1-4 questions** per call
- **2-4 options** per question
- **Multi-select** support (checkboxes)
- **Free-text "Other"** option automatically included
- **Short headers** (≤12 chars) displayed as chips
- **Summary screen** before confirmation
- **Reconnect-safe**: pending questions survive reconnection

## Example

The agent might ask:

```
Question 1/2: Database Choice
 ○ PostgreSQL
 ● SQLite
 ○ MySQL
 ○ Other

Question 2/2: ORM Preference
 ○ GORM
 ○ sqlx
 ○ Other
```

## Configuration

Disable the tool entirely:

```toml
[InternalTools]
AskUserQuestionDisabled = true
```

## Interface Behavior

| Interface | Behavior |
|-----------|----------|
| TUI | Modal dialog with keyboard navigation |
| Web UI | Overlay dialog with mouse/keyboard support |
| ACP | Formatted text, agent pauses until response |
| API | Structured response via API endpoint |

{{< callout >}}
The agent uses this tool when it needs clarification on implementation choices, architecture decisions, or ambiguous requirements. It's more structured than free-form text input.
{{< /callout >}}
