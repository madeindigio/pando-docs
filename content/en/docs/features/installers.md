---
title: Cross-Platform Installers
weight: 23
---

Pando is one program, published ready-made for macOS, Linux and Windows. Every release is signed, which is the seal on the jar: your system can check that the file really comes from the Pando team and was not opened on the way.

## What it does for you

- **A download for your machine**, whatever it is: Apple Silicon or Intel Macs, Linux on common and ARM processors, Windows.
- **One line that does it all.** An install script detects your system, downloads the right file, checks it and puts it in place.
- **The desktop app included.** On macOS the installer adds `Pando.app`; on Linux the script adds a menu entry and the pieces the desktop window needs.
- **Checked on arrival.** Downloads are verified against the list of fingerprints published with each release.

## How it feels in practice

On **macOS** you open a `.pkg` and click through, like any other app. On **Linux** and **macOS** you can also paste one line in a terminal and wait a few seconds. On **Windows** you paste one line in PowerShell, or unzip and run `pando.exe`.

Running the script again later updates Pando: it compares what you have with the newest release and replaces it.

## When to use what

| You are… | Use |
|---|---|
| On a Mac and like installers | The `.pkg` |
| On Linux, or happy in a terminal | The install script |
| On Windows | The PowerShell script, or the zip |
| Setting up a server or an automated job with no screen | The script in its "no desktop" form |
| Contributing to Pando | Build from source |

## Good to know

- On Linux the script may ask for your password, only to install the system pieces the desktop window needs. If that step fails, the install still completes.
- On Windows on ARM, the standard build is installed and runs fine in emulation.
- Releases older than the fingerprint list are installed with a warning.

## Next steps

- Install step by step, with every download and option: [Install Pando]({{< relref "/guides/install" >}})
- Download table, script options and building from source: [Diagnostics and maintenance reference]({{< relref "/docs/configuration/diagnostics" >}})
- Stay current afterwards: [Self-Update]({{< relref "/docs/features/self-update" >}})
- All releases: [GitHub](https://github.com/digiogithub/pando/releases/latest)
