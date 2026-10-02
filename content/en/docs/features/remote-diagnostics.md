---
title: Remote Diagnostics
weight: 41
---

When something goes wrong, you can let Pando send its logs to the maintainers so they can see what happened without you copying and pasting anything.

It is **off by default**. Nothing is sent unless you turn it on.

## Turn it on

{{< shot src="images/webui/pando-webui-settings-general-diagnostics.jpg" alt="Diagnostics section in General settings" >}}

- **Web UI and desktop**: Settings > General > Remote Diagnostics
- **TUI**: Settings > General > Remote Telemetry
- **Terminal**: `pando telemetry enable`

The first time, Pando creates a random 16-digit **debug ID**, such as `1234-5678-9012-3456`, and shows it next to the switch.

## Reporting a problem

1. Turn remote diagnostics on.
2. Reproduce the problem.
3. Paste your debug ID in the bug report.

A maintainer finds your records with that ID. You can turn diagnostics off again afterwards; the ID is kept, so the same one works across a whole troubleshooting conversation. **Regenerate** replaces it with a new one whenever you want.

The ID is random. It is not derived from your user name, your machine or anything else that identifies you.

## What is sent

Log lines: time, level, message, your debug ID, the Pando version and operating system, and a short summary of tool activity.

## What is never sent

- Your code or the contents of your files
- Your conversations with the model
- Keys, tokens and passwords: anything that looks like a secret is replaced by `[REDACTED]`
- Your home folder path, which is rewritten as `~`

## Commands

```bash
pando telemetry status       # is it available and enabled, and which ID
pando telemetry enable       # turn on and print the debug ID
pando telemetry disable      # turn off, keeping the ID
pando telemetry id           # print only the debug ID
pando telemetry regenerate   # replace the ID with a new one
pando telemetry level warn   # send only warnings and errors
```

{{< callout >}}
Remote diagnostics is available in the official release binaries. If you built Pando yourself, `pando telemetry status` reports that it is not available. That is expected.
{{< /callout >}}
