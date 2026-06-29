---
title: Cross-Platform Installers
weight: 23
---

Pando provides installer scripts for Linux, macOS, and Windows that automatically download and install the latest release.

## Linux

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-linux.sh)
```

**Features:**
- Detects architecture (x86_64/aarch64)
- Detects distro and package manager (apt/dnf/pacman/zypper)
- Installs Wails desktop runtime dependencies (GTK, WebKitGTK)
- Installs to `~/.local/bin/pando`
- Creates `.desktop` entry with icon
- Adds to PATH if needed
- Supports update (compares versions)

## macOS

Pando provides `.app` bundles and `.pkg` installers for macOS:

- **Apple Silicon (M1/M2/M3)**: Native ARM64 build
- **Intel**: x86_64 build
- **Code signed and notarized** for security

Download from the GitHub Releases page or build from source:

```bash
make build-desktop
```

## Windows

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

**Features:**
- Detects architecture (AMD64/ARM64)
- Installs to `%LOCALAPPDATA%\Programs\pando`
- Adds to user PATH
- Supports `-Version` parameter for specific version

## Build from Source

```bash
# Build CLI only
make build

# Build desktop application
make build-desktop
```

{{< callout >}}
The installer scripts handle all dependency resolution and PATH configuration. After installation, run `pando` from any terminal.
{{< /callout >}}
