---
title: Superpowers Mode (Specs-Driven Development)
weight: 29
---

Superpowers mode is an opt-in per-session workflow discipline that enforces a structured development process: understand → design → plan → implement with tests → verify. It's inspired by the [superpowers](https://github.com/obra/superpowers) workflow principles, reimplemented natively in Pando.

This mode helps ensure high-quality code changes by requiring design approval, written plans, test-first implementation, and verification before marking work complete.

## How to Use

### Enable

Type `/superpowers [objective]` in the chat input:

```bash
/superpowers                    # enable with no specific objective
/superpowers Fix login bug      # enable with a stated objective
```

This is a synchronous command — it activates immediately without an AI turn.

### Disable

Type `/superpowers-finish` in the chat input:

```bash
/superpowers-finish
```

This triggers a real AI turn that:
1. Verifies what was done
2. Summarizes changes
3. States what is NOT done
4. Offers next actions

The mode only disables on a successful response. If the turn is cancelled or fails, the workflow stays active.

## What It Does

When superpowers is active, every subsequent turn follows this lifecycle:

1. **Understand** — analyze the request before acting
2. **Design + Approval** — propose a design and wait for user approval before implementing
3. **Written Plan** — for multi-file work, create a prioritized plan with:
   - Phases ordered by risk and dependency
   - Exit criteria for each phase
   - Verification command for each phase
4. **Test-First Implementation** — write tests in small, testable increments
5. **Reproduce Before Fixing** — for bugs, reproduce the issue first
6. **Verify with Real Output** — run tests and checks, don't assume correctness
7. **Self-Review** — review changes before presenting them

## Safety Guarantees

Superpowers mode guarantees:

- **Never commits, merges, or pushes** — no automatic git side effects
- **Never touches branches or worktrees** — stays within the current working directory
- **Never discards work** — no `git checkout` or `git reset`
- **Never changes git config** — your git settings are untouched

## Precedence

- Direct user instructions outrank the superpowers policy
- AGENTS.md rules outrank the superpowers policy
- The permission system still applies — tool approvals work as normal
- Trivial or read-only requests skip the workflow gates

## Configuration

Superpowers mode has no configurable default by design — it is always opt-in per session. There is no TOML setting to enable it globally.

{{< callout type="info" >}}
Superpowers is ephemeral in v1 — it does not survive a restart. If you close and reopen Pando, you need to re-enable it with `/superpowers`.
{{< /callout >}}

## When to Use

| Scenario | Use Superpowers? |
|----------|-----------------|
| Quick bug fix | No — overkill for small changes |
| Multi-file refactor | Yes — ensures structured approach |
| New feature with tests | Yes — enforces test-first |
| Exploratory coding | No — too restrictive |
| Production-critical changes | Yes — adds verification gates |

{{< callout >}}
Superpowers mode works well alongside other modes. You can combine it with `/caveman` for brief output, or use it independently. The workflow policy applies to how work is done, not how results are expressed.
{{< /callout >}}
