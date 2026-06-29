---
title: Agent-VCS (Version Control for Agents)
weight: 15
---

Agent-VCS is a lightweight version control system that tracks file changes across agent sessions. It provides immutable commits, per-session changelogs, file-level diffs, and revert capability—inspired by jj (Jujutsu).

## CLI Commands

```bash
# List all sessions
pando agent-vcs sessions

# Show commit log for a session
pando agent-vcs log <session-id>

# Show commit details and diff
pando agent-vcs show <commit-id>

# Revert to a previous commit
pando agent-vcs revert <commit-id>

# Compact: keep only recent sessions
pando agent-vcs compact --keep 20

# Compact: remove sessions older than N days
pando agent-vcs compact --days 30
```

## Key Concepts

### Commits

Immutable point-in-time snapshots with content-derived IDs (SHA-256). Each commit records:
- File additions, modifications, and deletions
- Timestamp and session association
- Content hash for integrity

### Trees

Deduplicated file listings stored separately. Multiple commits can reference the same tree if no files changed.

### Sessions

Linear chains of commits per agent session. Each session groups related changes made during a single conversation.

### Diffs

File-level change tracking between any two commits. Shows added, modified, and deleted files with their content changes.

## Revert

Restore your working directory to any previous commit's state:

```bash
pando agent-vcs revert <commit-id>
```

A safety commit is created before reverting, so you can always undo the revert.

## Configuration

```toml
[Snapshots]
Enabled = true
MaxSnapshots = 5
MaxFileSize = '10MB'
ExcludePatterns = ['dist', 'node_modules', '.env', '.pando']
AutoCleanupDays = 5
```

## Web UI Integration

The Web UI provides a snapshot window with diff visualization, allowing you to review changes made by the agent and revert specific files or entire sessions.

{{< callout >}}
Agent-VCS tracks changes incrementally—only modified files are stored in each commit, keeping storage efficient even for large projects.
{{< /callout >}}
