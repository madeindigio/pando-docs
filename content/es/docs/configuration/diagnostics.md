---
title: Actualizaciones, diagnóstico y mantenimiento
weight: 43
---

Referencia de [Instaladores]({{< relref "/docs/features/installers" >}}), [Autoactualización]({{< relref "/docs/features/self-update" >}}), [Diagnóstico remoto]({{< relref "/docs/features/remote-diagnostics" >}}), [Compactación de la base de datos]({{< relref "/docs/features/db-compact" >}}) y [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}). Paso a paso: [Actualizar y diagnosticar]({{< relref "/guides/update-and-diagnostics" >}}).

## Instalación

Ficheros de la [última versión](https://github.com/digiogithub/pando/releases/latest):

| Plataforma | Fichero |
|---|---|
| macOS, Apple Silicon | `pando-<version>-darwin-arm64.pkg` |
| macOS, Intel | `pando-<version>-darwin-x64.pkg` |
| Linux, x86-64 | [`pando-linux-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-x64.zip) |
| Linux, ARM64 | [`pando-linux-arm64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-arm64.zip) |
| Windows, x86-64 | [`pando-windows-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-windows-x64.zip) |

- **macOS**: el `.pkg` está firmado y notarizado. Instala `Pando.app` en `/Applications` y el comando `pando` en `/usr/local/bin`.
- **Linux**: descomprime, da permiso de ejecución al binario y muévelo a una carpeta de tu `PATH`, por ejemplo `~/.local/bin/pando`.
- **Windows**: descomprime y ejecuta `pando.exe`. El binario lleva firma Authenticode.

Cada versión publica `SHA256SUMS` con el SHA-256 de cada fichero.

### Script para Linux y macOS

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

En Linux detecta la arquitectura (x86-64 o ARM64), instala `~/.local/bin/pando`, añade esa carpeta a tu `PATH` si hace falta, crea una entrada de menú con el icono de Pando e instala las librerías GTK y WebKitGTK que necesita la ventana de escritorio con apt, dnf, pacman o zypper (pide `sudo` solo si falta alguna; si eso falla, la instalación continúa). En macOS descarga el `.pkg` de tu arquitectura, comprueba su firma y lanza el instalador del sistema (pide `sudo`). Vuelve a ejecutarlo para actualizar. La descarga se verifica contra `SHA256SUMS`; las versiones publicadas antes de que existiera ese fichero se instalan con un aviso.

Pasa las opciones después de `bash -s --`, o define la variable:

| Opción | Variable | Efecto |
|---|---|---|
| `--version v1.2.7` | `PANDO_VERSION` | Instala esa versión en vez de la última |
| `--dir <ruta>` | `PANDO_INSTALL_DIR` | Dónde va el binario (por defecto `~/.local/bin`) |
| `--no-desktop` | `PANDO_NO_DESKTOP=1` | Linux: sin paquetes del sistema, icono ni entrada de menú |
| `--cli-only` | `PANDO_CLI_ONLY=1` | macOS: solo el binario `pando`, sin `.pkg` |
| `--force` | `PANDO_FORCE=1` | Reinstala la misma versión |

```bash
# server, container or CI, where there is no desktop
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash -s -- --no-desktop
```

### Script para Windows

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

Instala en `%LOCALAPPDATA%\Programs\pando`, lo añade a tu `PATH` de usuario, comprueba el SHA-256 y la firma Authenticode, acepta `-Version v1.2.7` e instala la versión x86-64 en Windows on ARM.

### Compilar desde el código

Necesitas Go y [Bun](https://bun.sh):

```bash
make build            # CLI only
make build-desktop    # desktop application
```

## Actualización

```bash
pando update              # latest stable release
pando update --check      # only check
pando update v1.2.6       # one specific release; the "v" is optional
```

Las versiones vienen de GitHub (`digiogithub/pando`). Pando elige el fichero de tu sistema, lo descarga y sustituye su propio ejecutable en un solo paso. Necesitas permiso de escritura en la carpeta donde está `pando`. Actualizar a «la última» requiere una versión publicada; instalar una versión concreta funciona desde cualquier compilación.

## Diagnóstico remoto

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

Se envía, por cada línea de registro: hora, nivel, mensaje, ID de depuración, versión y variante de Pando, sistema operativo y arquitectura, modo, origen, id de sesión y un conjunto pequeño de campos extra. El texto largo se corta. Las líneas de depuración solo se envían si además está activado el `Debug` del propio Pando.

Se tacha antes de enviar: todo lo que tenga nombre de secreto (`*key`, `*token`, `*secret`, `*password`, `Authorization`, `Cookie`), los valores que parecen tokens, claves de API o URL con credenciales, y la ruta de tu carpeta personal (se reescribe como `~`).

No se envía nunca: contenido de ficheros, peticiones y respuestas de las conversaciones.

Las versiones que compilas tú no tienen diagnóstico (`available: no`). Para enviar a tu propio recolector, define `PANDO_TELEMETRY_TOKEN` y `PANDO_TELEMETRY_ENDPOINT` (tiene que ser `https://`, salvo para `localhost`).

## Registros

```toml
Debug   = false   # more detail in the logs
LogFile = ''      # also write logs to this file
```

`PANDO_DEBUG=true` hace lo mismo para una ejecución.

## Base de datos

```bash
pando db compact                  # full tidy, and enables cheap tidying for the future
pando db compact --incremental    # only hand back already-freed space
pando db compact --no-auto-vacuum # full tidy without enabling the cheap mode
```

`/db-compact` hace lo mismo desde el chat. Si hay otro Pando en marcha en la misma carpeta, la petición se le pasa a él (límite de 30 minutos). Se informa del tamaño anterior, el posterior y el espacio liberado.

## Certificado HTTPS

```bash
pando serve                                              # creates a certificate if none is given
pando serve --tls-cert /path/cert --tls-key /path/key    # use your own
pando serve --host 0.0.0.0                               # reachable from other devices
```

`pando app` acepta las mismas opciones. Pando crea dos cosas en tu máquina, en `~/.config/pando/tls`: una pequeña autoridad de certificación local (`ca.crt`, válida 10 años) y un certificado de servidor firmado por ella, que cubre `localhost` y tus direcciones locales y que Pando vuelve a emitir por su cuenta cuando caduca o cambia tu dirección. Todos los proyectos los reutilizan. Importa `ca.crt` como de confianza una vez en un dispositivo para que el navegador deje de avisar ahí.

## Descubrimiento del fichero de configuración

Orden, de más fuerte a más débil:

1. `.pando.toml` o `.pando.json` en el directorio de trabajo
2. El mismo fichero en cualquier carpeta superior, subiendo hasta tu carpeta personal. Solo se usan ficheros que puedes leer y escribir
3. `$HOME/.config/pando/.pando.toml`
4. `$HOME/.pando.toml`

`PANDO_CONFIG_PARENT_SEARCH=false` desactiva la búsqueda hacia arriba. Una carpeta de datos `.pando/` en una carpeta superior se encuentra del mismo modo.
