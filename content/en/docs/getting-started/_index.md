---
title: Getting Started
weight: 1
---

## Installation

### Download a release

Download the binary for your operating system from the [latest release on GitHub](https://github.com/digiogithub/pando/releases/latest): a `.pkg` installer for macOS, a `.zip` for Linux and Windows.

### With the install script

On Linux and macOS:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

On Windows, in PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

See [Cross-Platform Installers]({{< relref "/docs/features/installers" >}}) for what the scripts do and their options.

### With Go

If you have Go installed (1.21 or higher). This builds from source and does not include the desktop wrapper:

```bash
go install github.com/digiogithub/pando@latest
```

### Building from source

```bash
git clone https://github.com/digiogithub/pando.git
cd pando
cd web-ui && bun install && bun run build:embedded && cd ..
go build -o pando
./pando
```

## Quick start

Once installed, start Pando with:

```bash
pando
```

This opens the interactive TUI in your terminal.

### Start options

```bash
# Start in a specific directory
pando -c /path/to/project

# Non-interactive mode (single query)
pando -p "Explain the use of context in Go"

# JSON format response
pando -p "Explain the use of context in Go" -f json

# Enable debug
pando -d
```

## Next steps

{{< cards >}}
  {{< card link="../configuration" title="Configuration" icon="adjustments" subtitle="Configure AI providers and advanced options" >}}
  {{< card link="../features" title="Features" icon="star" subtitle="Explore all Pando features" >}}
{{< /cards >}}
