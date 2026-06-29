---
title: Self-Update
weight: 19
---

Pando can update itself by downloading the latest release from GitHub and replacing the running binary.

## Usage

```bash
# Update to latest stable release
pando update

# Check if a newer version exists (no change)
pando update --check
```

## How It Works

1. Queries GitHub API for the latest release from `digiogithub/pando`
2. Matches your architecture (x64/arm64) and OS
3. Downloads the zip archive and extracts the pando binary
4. Atomically replaces the running executable
5. Checks write permissions before attempting update

## Background Update Check

On startup, Pando runs a background check (2-second timeout) and prints a notice to stderr if a newer version is available:

```
A newer version of Pando is available: v1.2.3 (current: v1.2.2)
Run 'pando update' to upgrade.
```

## Notes

- Requires write permissions to the pando binary location
- Resolves symlinks before replacing
- Safe to run while Pando is in use
- Updates are pulled from the `digiogithub/pando` GitHub repository

{{< callout >}}
Run `pando update` regularly to get the latest features and bug fixes. The update process is atomic—either the new binary is installed completely or the old one remains.
{{< /callout >}}
