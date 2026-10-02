---
title: "Instala Pando en macOS, Linux y Windows"
shortTitle: "Instalación"
description: "Pando instalado y respondiendo en tu máquina en un par de minutos."
summary: "Descárgalo o deja que un script de una línea haga el trabajo."
track: surface
level: beginner
weight: 1
---

Instalar Pando es como plantar una semilla: entra un fichero pequeño en la tierra y todo lo demás crece a partir de él. Elige el camino que más te guste. Solo necesitas conexión a internet.

## Elige tu camino

Hay dos caminos y los dos llegan al mismo sitio:

- **Descargar el instalador**, si prefieres hacer clic. Lo mejor en macOS y Windows.
- **Ejecutar el script de instalación**, si no te importa pegar una línea en una terminal. Lo mejor en Linux, y para actualizar más adelante.

## Descarga una versión

Abre la [última versión en GitHub](https://github.com/digiogithub/pando/releases/latest) y coge el fichero de tu ordenador:

| Tu ordenador | Fichero |
|---|---|
| Mac con chip de Apple (M1 o posterior) | `pando-<versión>-darwin-arm64.pkg` |
| Mac con chip Intel | `pando-<versión>-darwin-x64.pkg` |
| Linux, PC normal | [`pando-linux-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-x64.zip) |
| Linux, ARM | [`pando-linux-arm64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-linux-arm64.zip) |
| Windows | [`pando-windows-x64.zip`](https://github.com/digiogithub/pando/releases/latest/download/pando-windows-x64.zip) |

Después:

- **macOS**: abre el `.pkg` y sigue el instalador. Tendrás **Pando** en Aplicaciones y el comando `pando` en la terminal. El paquete está firmado, así que macOS lo abre sin protestar.
- **Windows**: descomprime y ejecuta `pando.exe`. También está firmado.
- **Linux**: descomprime, mueve `pando` a una carpeta que tu terminal conozca, por ejemplo `~/.local/bin/`, y dale permiso de ejecución.

## O usa el script de instalación

En **Linux y macOS**, pega esto en una terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

El script mira tu máquina, descarga el fichero adecuado, comprueba que nadie lo ha manipulado y lo deja en su sitio. En Linux además añade Pando al menú de aplicaciones e instala las dos librerías del sistema que necesita la ventana de escritorio; solo pide tu contraseña si falta algo.

En **Windows**, en PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

Vuelve a ejecutar la misma línea cuando quieras actualizar.

## Ajusta el script (opcional)

Casi todo el mundo puede saltarse este paso. Si necesitas algo especial, añade una opción después de `bash -s --`:

| Opción | Qué hace |
|---|---|
| `--version v1.2.7` | Instala esa versión en lugar de la más nueva |
| `--dir <ruta>` | Deja el programa en otro sitio que no sea `~/.local/bin` |
| `--no-desktop` | Linux: solo el comando, sin entrada de menú ni librerías del sistema. Ideal para servidores |
| `--cli-only` | macOS: solo el comando `pando`, sin la aplicación |
| `--force` | Reinstala la versión que ya tienes |

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash -s -- --no-desktop
```

Cada opción existe también como variable (`PANDO_VERSION`, `PANDO_INSTALL_DIR`, `PANDO_NO_DESKTOP=1`, `PANDO_CLI_ONLY=1`, `PANDO_FORCE=1`). En Windows el script acepta `-Version v1.2.7`.

## Comprueba que funciona

Abre una terminal nueva y pregúntale a Pando quién es:

```bash
pando -v
```

Debe aparecer un número de versión. Ahora abre la aplicación desde tu menú, el Dock o el menú Inicio, o escribe `pando desktop`. Aparece una ventana de Pando y, la primera vez, un asistente de configuración te saluda.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Pando recién abierto" >}}

Siguiente parada: [conecta tus cuentas de IA y elige modelos]({{< relref "/guides/setup-providers-models" >}}).

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| `pando: command not found` | Cierra la terminal y abre otra. Si sigue igual, la carpeta de instalación no está en tu `PATH`: ejecuta el script otra vez, él la añade |
| En Linux la ventana no se abre y Pando nombra una librería que falta | Ejecuta el comando que te muestra Pando, o vuelve a lanzar el script sin `--no-desktop` |
| «No hay pantalla» por SSH | No hay dónde dibujar una ventana. Arranca `pando app` y abre la dirección en un navegador |
| El script avisa de que falta la suma de comprobación | Has pedido una versión antigua, anterior a las sumas de comprobación. Se instala igualmente |
| Windows en ARM | El script instala la versión normal, que funciona bien ahí |

## ¿Prefieres compilarlo tú?

Para quien contribuye al proyecto. Necesitas Go y [Bun](https://bun.sh):

```bash
git clone https://github.com/digiogithub/pando.git
cd pando
make build            # command only
make build-desktop    # with the desktop window
```

`go install github.com/digiogithub/pando@latest` también funciona, sin la ventana de escritorio. Más sobre lo que trae cada instalador: [Instaladores multiplataforma]({{< relref "/docs/features/installers" >}}).
