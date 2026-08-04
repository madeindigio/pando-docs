---
title: Configuration File Discovery
weight: 32
---

Pando automatically searches for your configuration file (`.pando.toml` or `.pando.json`) by walking up the directory tree from your current working directory. This means you can place your config in a parent directory and Pando will find it.

## How It Works

When Pando starts, it looks for a configuration file in this order:

1. **Current directory** — `./.pando.toml`
2. **Parent directory** — `../.pando.toml`
3. **Grandparent directory** — `../../.pando.toml`
4. **Continues up** until it reaches the filesystem root

The first `.pando.toml` (or `.pando.json`) found is used. If none is found, Pando uses default configuration.

## Why This Is Useful

- **Monorepo setups**: Place one `.pando.toml` at the repo root, and it applies to all subdirectories
- **Shared configuration**: Teams can share a single config file for a project tree
- **Clean working directories**: Keep your source directories free of config files

## Data Directory

Pando also searches upward for the data directory. If `.pando/` exists in a parent directory, it's used as the data directory for sessions, caches, and other state.

## Example

```
/my-project/
├── .pando.toml          ← Pando finds this
├── src/
│   ├── frontend/
│   │   └── (running pando here finds ../.pando.toml)
│   └── backend/
│       └── (running pando here also finds ../../.pando.toml)
```

## Configuration Reference

| Setting | Description |
|---------|-------------|
| None | This behavior is automatic and cannot be disabled |

{{< callout type="info" >}}
This feature is purely a convenience for configuration discovery. The config file format and all settings remain the same regardless of where the file is placed.
{{< /callout >}}
