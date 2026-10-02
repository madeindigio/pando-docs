---
title: Self-Update
weight: 19
---

Pando updates itself: it downloads a release from GitHub and replaces its own binary.

## Usage

```bash
# Update to the latest stable release
pando update

# Only check whether a newer release exists
pando update --check

# Install one specific release
pando update v1.2.6
```

## Install a specific version or go back

Pass a version to `pando update` to install exactly that release, even when it is older than the one you have. Use it to go back after an update that does not work for you, or to reinstall the current version.

```bash
pando update v1.1.1      # go back to 1.1.1
pando update 1.2.6       # the "v" is optional
```

Pando tells you what it is about to do: `Installing`, `Downgrading` or `Reinstalling`.

## Where you see that an update exists

- **Terminal**: on startup, Pando prints a notice when a newer release is available.

  ```
  A newer version of Pando is available: v1.2.3 (current: v1.2.2)
  Run 'pando update' to upgrade.
  ```

- **Web UI and desktop**: the chat info panel and **Settings > General > Diagnostics** show your version and tell you when a newer one exists.

## How it works

1. Looks up the release on GitHub (`digiogithub/pando`)
2. Picks the file for your operating system and architecture
3. Downloads it and extracts the binary
4. Replaces the running executable in one step

## Notes

- You need write permission on the folder where the `pando` binary lives.
- It is safe to run while Pando is in use.
- The replacement is atomic: either the new binary is fully installed or the old one stays.
- On macOS, if you installed with the `.pkg`, use a new `.pkg` to update `Pando.app`. See [Cross-Platform Installers]({{< relref "/docs/features/installers" >}}).
