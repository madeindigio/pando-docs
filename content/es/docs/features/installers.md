---
title: Instaladores Multi-Plataforma
weight: 23
---

Pando proporciona scripts de instalación para Linux, macOS y Windows que descargan e instalan automáticamente la última release.

## Linux

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-linux.sh)
```

**Características:**
- Detecta arquitectura (x86_64/aarch64)
- Detecta distribución y gestor de paquetes (apt/dnf/pacman/zypper)
- Instala dependencias del runtime de escritorio Wails (GTK, WebKitGTK)
- Instala en `~/.local/bin/pando`
- Crea entrada `.desktop` con icono
- Añade a PATH si es necesario
- Soporta actualización (compara versiones)

## macOS

Pando proporciona bundles `.app` e instaladores `.pkg` para macOS:

- **Apple Silicon (M1/M2/M3)**: Build ARM64 nativo
- **Intel**: Build x86_64
- **Firmado y notarizado** para seguridad

Descarga desde la página de GitHub Releases o compila desde fuente:

```bash
make build-desktop
```

## Windows

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

**Características:**
- Detecta arquitectura (AMD64/ARM64)
- Instala en `%LOCALAPPDATA%\Programs\pando`
- Añade al PATH del usuario
- Soporta parámetro `-Version` para versión específica

## Compilar desde Fuente

```bash
# Compilar solo CLI
make build

# Compilar aplicación de escritorio
make build-desktop
```

{{< callout >}}
Los scripts de instalación manejan toda la resolución de dependencias y configuración de PATH. Después de la instalación, ejecuta `pando` desde cualquier terminal.
{{< /callout >}}
