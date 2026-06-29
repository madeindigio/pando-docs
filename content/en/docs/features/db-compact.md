---
title: Database Compact
weight: 27
---

Pando maintains a SQLite database for sessions, memories, and code index. Over time, this database can grow due to deleted records. The DB Compact command reclaims space using SQLite's VACUUM operation.

## CLI Usage

```bash
# Full VACUUM
pando db compact

# Incremental (only reclaim freed pages)
pando db compact --incremental

# Without enabling auto_vacuum
pando db compact --no-auto-vacuum
```

## Slash Command

Use the `/db-compact` slash command in TUI, Web UI, or ACP:

```
/db-compact
```

Reports size before/after and freed bytes.

## How It Works

1. Checks if another Pando instance is running for this directory
2. If running, forwards the VACUUM request over IPC to the primary
3. If not running, performs VACUUM in-process
4. Enables `auto_vacuum=INCREMENTAL` for future cheap reclamation
5. Reports statistics

## Multi-Instance Support

In multi-instance setups, only the primary performs database writes. The `/db-compact` command automatically routes to the primary via IPC, with a 30-minute timeout.

## Configuration

No explicit configuration needed. The command uses existing database settings.

{{< callout >}}
Run `/db-compact` periodically to keep the database lean. The incremental mode is faster and reclaims only pages that were freed by deletes.
{{< /callout >}}
