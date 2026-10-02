---
title: Configuration File Discovery
weight: 32
---

You do not have to tell Pando where its settings are. Wherever you start it, it looks in the current folder, then in the folder above, and keeps climbing the stairs until it finds a settings file. The first one it meets is the one it uses.

## What it does for you

- **One file for a big repository.** Put `.pando.toml` at the top and every folder beneath it follows the same settings.
- **Shared team settings.** Commit that one file and everyone works the same way.
- **Tidy folders.** No copies of the settings file scattered among your source code.
- **Sensible fallback.** With no project file anywhere on the way up, Pando uses your personal settings.

## How it feels in practice

```
/my-project/
├── .pando.toml          ← Pando finds this
├── src/
│   ├── frontend/        (start Pando here: it climbs two floors and finds it)
│   └── backend/         (same here)
```

You start Pando deep inside a project and it behaves as if you had started it at the top. The same goes for the `.pando/` folder where Pando keeps the project's sessions and caches: if it exists further up, it is reused.

## When to use it

It is automatic. Take advantage of it in repositories with many sub-projects, or when you like to work from inside a subfolder.

## Good to know

- The climb stops at your home folder. Pando does not use files it finds above it.
- Only files you can both read and change are used.
- The nearest file wins. A file in a subfolder hides the one at the top.
- The file's format and options are the same wherever it lives.
- The search can be switched off for a run if you ever need the old behaviour.

## Next steps

- The full search order and the switch to disable it: [Diagnostics and maintenance reference]({{< relref "/docs/configuration/diagnostics" >}})
- What goes in the file: [Configuration]({{< relref "/docs/configuration" >}})
- A walk through the maintenance corner: [Update and diagnostics]({{< relref "/guides/update-and-diagnostics" >}})
