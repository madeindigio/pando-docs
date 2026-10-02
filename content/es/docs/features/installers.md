---
title: Instaladores Multi-Plataforma
weight: 23
---

Cada versión de Pando publica en GitHub binarios firmados para macOS, Linux y Windows. Descarga el de tu plataforma o deja que un script de instalación lo haga por ti.

## Descargar una versión

Los ficheros están en la [última versión](https://github.com/digiogithub/pando/releases/latest):

| Plataforma | Fichero |
|---|---|
| macOS, Apple Silicon | `pando-<versión>-darwin-arm64.pkg` |
| macOS, Intel | `pando-<versión>-darwin-x64.pkg` |
| Linux, x86-64 | [`pando-linux-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-x64.zip) |
| Linux, ARM64 | [`pando-linux-arm64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-arm64.zip) |
| Windows, x86-64 | [`pando-windows-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-windows-x64.zip) |

- **macOS**: abre el `.pkg`. Está firmado y notarizado, e instala `Pando.app` en `/Applications` y el comando `pando` en `/usr/local/bin`.
- **Linux**: descomprime, da permiso de ejecución al binario y muévelo a una carpeta de tu `PATH`, por ejemplo `~/.local/bin/pando`.
- **Windows**: descomprime y ejecuta `pando.exe`. El binario está firmado con Authenticode.

Cada versión publica también `SHA256SUMS` con el SHA-256 de todos los ficheros.

## Linux y macOS: script de instalación

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

En **Linux** el script:

- detecta la arquitectura (x86-64 o ARM64) y descarga el zip correspondiente
- instala `~/.local/bin/pando` y añade esa carpeta a tu `PATH` si hace falta
- crea una entrada de menú con el icono de Pando
- instala las bibliotecas GTK y WebKitGTK que necesita la ventana de escritorio, con apt, dnf, pacman o zypper. Solo pide `sudo` si falta alguna, y un fallo en ese paso no detiene la instalación

En **macOS** descarga el `.pkg` de tu arquitectura, comprueba su firma y ejecuta el instalador del sistema (pide `sudo`).

Vuelve a ejecutarlo para actualizar: compara la versión instalada con la publicada y reemplaza el binario.

### Opciones

Pasa las opciones después de `bash -s --`, o define la variable de entorno:

| Opción | Variable | Efecto |
|---|---|---|
| `--version v1.2.7` | `PANDO_VERSION` | Instala esa versión en lugar de la última |
| `--dir <ruta>` | `PANDO_INSTALL_DIR` | Dónde se instala el binario (por defecto `~/.local/bin`) |
| `--no-desktop` | `PANDO_NO_DESKTOP=1` | Linux: sin paquetes del sistema, icono ni entrada de menú |
| `--cli-only` | `PANDO_CLI_ONLY=1` | macOS: solo el binario `pando`, sin `.pkg` |
| `--force` | `PANDO_FORCE=1` | Reinstala la misma versión |

Para un servidor, un contenedor o CI, donde no hay escritorio:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash -s -- --no-desktop
```

{{< callout >}}
El script verifica la descarga con el `SHA256SUMS` de la versión. Las versiones publicadas antes de que existiera ese fichero se instalan con un aviso.
{{< /callout >}}

## Windows: script de instalación

En PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

El script:

- instala en `%LOCALAPPDATA%\Programs\pando` y lo añade a tu `PATH` de usuario
- comprueba el SHA-256 y la firma Authenticode del binario
- acepta `-Version v1.2.7` para instalar una versión concreta
- instala la compilación x86-64 en Windows on ARM, donde se ejecuta emulada

## Compilar desde el código

Para quien contribuye. Necesitas Go y [Bun](https://bun.sh):

```bash
# Solo la CLI
make build

# Aplicación de escritorio
make build-desktop
```
