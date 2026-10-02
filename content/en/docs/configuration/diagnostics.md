---
title: Updates, Diagnostics and Maintenance
weight: 43
---

Reference for [Installers]({{< relref "/docs/features/installers" >}}), [Self-Update]({{< relref "/docs/features/self-update" >}}), [Remote Diagnostics]({{< relref "/docs/features/remote-diagnostics" >}}), [Database Compact]({{< relref "/docs/features/db-compact" >}}) and [Auto HTTPS Certificates]({{< relref "/docs/features/https-auto-cert" >}}). Step by step: [Update and diagnostics]({{< relref "/guides/update-and-diagnostics" >}}).

## Install

Files of the [latest release](https://github.com/digiogithub/pando/releases/latest):

| Platform | File |
|---|---|
| macOS, Apple Silicon | `pando-<version>-darwin-arm64.pkg` |
| macOS, Intel | `pando-<version>-darwin-x64.pkg` |
| Linux, x86-64 | [`pando-linux-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-x64.zip) |
| Linux, ARM64 | [`pando-linux-arm64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-arm64.zip) |
| Windows, x86-64 | [`pando-windows-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-windows-x64.zip) |

- **macOS**: the `.pkg` is signed and notarized. It installs `Pando.app` in `/Applications` and the `pando` command in `/usr/local/bin`.
- **Linux**: unzip, make the binary executable and move it to a folder in your `PATH`, for example `~/.local/bin/pando`.
- **Windows**: unzip and run `pando.exe`. The binary is Authenticode-signed.

Each release publishes `SHA256SUMS` with the SHA-256 of every file.

### Linux and macOS script

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

On Linux it detects the architecture (x86-64 or ARM64), installs `~/.local/bin/pando`, adds that folder to your `PATH` if needed, creates a menu entry with the Pando icon and installs the GTK and WebKitGTK libraries the desktop window needs through apt, dnf, pacman or zypper (asks for `sudo` only if some are missing; a failure there does not stop the install). On macOS it downloads the `.pkg` for your architecture, checks its signature and runs the system installer (asks for `sudo`). Run it again to update. The download is verified against `SHA256SUMS`; releases published before that file existed are installed with a warning.

Pass options after `bash -s --`, or set the variable:

| Option | Variable | Effect |
|---|---|---|
| `--version v1.2.7` | `PANDO_VERSION` | Install that release instead of the latest |
| `--dir <path>` | `PANDO_INSTALL_DIR` | Where the binary goes (default `~/.local/bin`) |
| `--no-desktop` | `PANDO_NO_DESKTOP=1` | Linux: no system packages, icon or menu entry |
| `--cli-only` | `PANDO_CLI_ONLY=1` | macOS: only the `pando` binary, no `.pkg` |
| `--force` | `PANDO_FORCE=1` | Reinstall the same version |

```bash
# server, container or CI, where there is no desktop
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash -s -- --no-desktop
```

### Windows script

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

Installs to `%LOCALAPPDATA%\Programs\pando`, adds it to your user `PATH`, checks the SHA-256 and the Authenticode signature, accepts `-Version v1.2.7`, and installs the x86-64 build on Windows on ARM.

### Build from source

You need Go and [Bun](https://bun.sh):

```bash
make build            # CLI only
make build-desktop    # desktop application
```

## Update

```bash
pando update              # latest stable release
pando update --check      # only check
pando update v1.2.6       # one specific release; the "v" is optional
```

Releases come from GitHub (`digiogithub/pando`). Pando picks the file for your system, downloads it and replaces its own executable in one step. You need write permission on the folder where `pando` lives. Updating to "latest" needs a released build; installing a named version works from any build.

## Remote diagnostics

```toml
[Telemetry]
Enabled  = false
DebugID  = ''        # created the first time you enable it
MinLevel = 'info'    # debug | info | warn | error
```

```bash
pando telemetry status       # available, enabled, ID, level
pando telemetry status --json
pando telemetry enable       # turn on and print the debug ID
pando telemetry disable      # turn off, keeping the ID
pando telemetry id           # print only the ID
pando telemetry regenerate   # replace the ID
pando telemetry level warn   # debug, info, warn or error
```

Sent per log line: time, level, message, debug ID, Pando version and variant, operating system and architecture, mode, source, session id, a small set of extra fields. Long text is cut. Debug lines are sent only when Pando's own `Debug` is on too.

Blanked before sending: anything whose name looks like a secret (`*key`, `*token`, `*secret`, `*password`, `Authorization`, `Cookie`), values that look like tokens, API keys or URLs with credentials, and your home folder path (rewritten as `~`).

Never sent: file contents, conversation requests and answers.

Builds you compile yourself have no diagnostics (`available: no`). To send to your own collector, set `PANDO_TELEMETRY_TOKEN` and `PANDO_TELEMETRY_ENDPOINT` (must be `https://`, except for `localhost`).

## Logs

```toml
Debug   = false   # more detail in the logs
LogFile = ''      # also write logs to this file
```

`PANDO_DEBUG=true` does the same for one run.

## Database

```bash
pando db compact                  # full tidy, and enables cheap tidying for the future
pando db compact --incremental    # only hand back already-freed space
pando db compact --no-auto-vacuum # full tidy without enabling the cheap mode
```

`/db-compact` does the same from the chat. If another Pando is running in the same folder, the request is passed to it (30-minute limit). Size before, after and space freed are reported.

## HTTPS certificate

```bash
pando serve                                              # creates a certificate if none is given
pando serve --tls-cert /path/cert --tls-key /path/key    # use your own
pando serve --host 0.0.0.0                               # reachable from other devices
```

`pando app` takes the same flags. Pando creates two things on your machine, in `~/.config/pando/tls`: a small local certificate authority (`ca.crt`, valid 10 years) and a server certificate signed by it, covering `localhost` and your local addresses, which Pando reissues by itself when it expires or your address changes. Every project reuses them. Import `ca.crt` as trusted once on a device to stop the browser warning there.

## Config file discovery

Order, strongest first:

1. `.pando.toml` or `.pando.json` in the working directory
2. The same file in any parent folder, walking up and stopping at your home folder. Only files you can read and write are used
3. `$HOME/.config/pando/.pando.toml`
4. `$HOME/.pando.toml`

`PANDO_CONFIG_PARENT_SEARCH=false` turns the upward search off. A `.pando/` data folder in a parent directory is found the same way.
