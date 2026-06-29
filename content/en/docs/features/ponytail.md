---
title: Ponytail Skill (YAGNI Mode)
weight: 16
---

Ponytail is a "lazy senior developer" instruction set that enforces YAGNI (You Aren't Gonna Need It) principles. It makes the agent write more concise code, prefer standard library solutions, and challenge unnecessary complexity.

## Activation

Use the `/ponytail` slash command:

```
/ponytail lite      # Build what's asked, name the lazier alternative
/ponytail full      # Enforce "The Ladder" - stdlib first, shortest diff
/ponytail ultra     # YAGNI extremist - deletion before addition
/ponytail off       # Disable (default for new sessions)
```

## Modes

| Mode | Behavior |
|------|----------|
| `lite` | Builds what's asked, names the lazier alternative |
| `full` | Enforces stdlib-first, shortest diff, shortest explanation |
| `ultra` | YAGNI extremist: deletion before addition, challenges the requirement |
| `off` | Disabled (default) |

## The Ladder (Full Mode)

When `full` mode is active, the agent follows "The Ladder":

1. **Standard library first** - Use existing stdlib before reaching for dependencies
2. **Shortest diff** - Make the minimal change that solves the problem
3. **Shortest explanation** - Explain only what's necessary

## Configuration

```toml
[Ponytail]
DefaultMode = ''   # 'lite', 'full', 'ultra', or '' (off)
```

Or via environment variable:

```bash
PANDO_PONYTAIL_DEFAULT_MODE=full
```

## Example

Without ponytail, the agent might create a new utility function with tests, documentation, and abstractions. With ponytail `full` mode, it would:

1. Check if stdlib already solves the problem
2. Use the simplest possible implementation
3. Skip premature abstractions
4. Write minimal tests

{{< callout >}}
Ponytail is inspired by Dietrich Gebert's ponytail skill (MIT licensed). It's particularly useful for refactoring sessions where you want to reduce complexity.
{{< /callout >}}
