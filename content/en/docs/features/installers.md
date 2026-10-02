---
title: Cross-Platform Installers
weight: 23
---

Every Pando release publishes signed binaries for macOS, Linux and Windows on GitHub. Download the one for your platform, or let an install script do it.

## Download a release

Get the files from the [latest release](https://github.com/digiogithub/pando/releases/latest):

| Platform | File |
|---|---|
| macOS, Apple Silicon | `pando-<version>-darwin-arm64.pkg` |
| macOS, Intel | `pando-<version>-darwin-x64.pkg` |
| Linux, x86-64 | [`pando-linux-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-x64.zip) |
| Linux, ARM64 | [`pando-linux-arm64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-arm64.zip) |
| Windows, x86-64 | [`pando-windows-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-windows-x64.zip) |

- **macOS**: open the `.pkg`. It is signed and notarized, and installs `Pando.app` in `/Applications` plus the `pando` command in `/usr/local/bin`.
- **Linux**: unzip, make the binary executable and move it to a folder in your `PATH`, for example `~/.local/bin/pando`.
- **Windows**: unzip and run `pando.exe`. The binary is Authenticode-signed.

Each release also publishes `SHA256SUMS` with the SHA-256 of every file.

## Linux and macOS: install script

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

On **Linux** the script:

- detects the architecture (x86-64 or ARM64) and downloads the matching zip
- installs `~/.local/bin/pando` and adds that folder to your `PATH` if needed
- creates a menu entry with the Pando icon
- installs the GTK and WebKitGTK libraries the desktop window needs, through apt, dnf, pacman or zypper. It asks for `sudo` only if some are missing, and a failure there does not stop the install

On **macOS** it downloads the `.pkg` for your architecture, checks its signature and runs the system installer (asks for `sudo`).

Run it again to update: it compares the installed version with the release and replaces the binary.

### Options

Pass options after `bash -s --`, or set the environment variable:

| Option | Variable | Effect |
|---|---|---|
| `--version v1.2.7` | `PANDO_VERSION` | Install that release instead of the latest |
| `--dir <path>` | `PANDO_INSTALL_DIR` | Where the binary goes (default `~/.local/bin`) |
| `--no-desktop` | `PANDO_NO_DESKTOP=1` | Linux: no system packages, icon or menu entry |
| `--cli-only` | `PANDO_CLI_ONLY=1` | macOS: only the `pando` binary, no `.pkg` |
| `--force` | `PANDO_FORCE=1` | Reinstall the same version |

For a server, a container or CI, where there is no desktop:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash -s -- --no-desktop
```

{{< callout >}}
The script verifies the download against the release's `SHA256SUMS`. Releases published before that file existed are installed with a warning.
{{< /callout >}}

## Windows: install script

In PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

The script:

- installs to `%LOCALAPPDATA%\Programs\pando` and adds it to your user `PATH`
- checks the SHA-256 and the Authenticode signature of the binary
- accepts `-Version v1.2.7` to install a specific release
- installs the x86-64 build on Windows on ARM, where it runs under emulation

## Build from source

For contributors. You need Go and [Bun](https://bun.sh):

```bash
# Build CLI only
make build

# Build desktop application
make build-desktop
```
