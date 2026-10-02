---
title: "Ejecuta los comandos del agente dentro de un contenedor"
shortTitle: "Dev containers"
description: "Elige Docker o Podman, pon los límites y deja que el agente trabaje en una caja que puedes tirar."
summary: "Docker o Podman, con seguridad."
track: soil
level: advanced
weight: 25
---

Un contenedor es un taller sellado: el agente puede montar dentro todo el lío que quiera y tu ordenador sigue limpio. Úsalo cuando quieras un entorno repetible o un aislamiento más fuerte que el [sandbox]({{< relref "/guides/sandbox-and-permissions" >}}). Necesitas tener instalado Docker o Podman. La app de escritorio es idéntica a la Web UI que se muestra aquí; esta página de ajustes está en inglés también con la interfaz en español.

## Elige un runtime

Ve a **Configuración > Entorno de contenedores**. Las tarjetas de arriba muestran lo que Pando ha encontrado en tu máquina y si cada opción puede ejecutar comandos y llegar a los ficheros de tu proyecto.

{{< shot src="images/webui/pando-webui-settings-container-runtime.jpg" alt="Ajustes del runtime de contenedores" >}}

En **Runtime configuration**, elige **Runtime**:

| Runtime | Dónde se ejecutan los comandos |
|---|---|
| **host** (por defecto) | Directamente en tu ordenador, protegidos por el sandbox |
| **docker** | Dentro de un contenedor Docker |
| **podman** | Dentro de un contenedor Podman |
| **embedded** | En un runtime pequeño que Pando lleva dentro, sin instalar nada. No ve los ficheros de tu proyecto |
| **auto** | Elige Pando: primero Podman sin root, luego Docker, luego host |

La línea bajo las tarjetas te dice cuál se está usando ahora mismo.

## Configura el contenedor

Rellena el resto de **Runtime configuration**:

- **Image**: la imagen de la que parte el contenedor, a ser posible una que ya traiga las herramientas de tu proyecto.
- **Pull policy**: cuándo descargar la imagen. **if-not-present** la descarga solo la primera vez.
- **Socket**: solo si tu Docker o Podman no está en el sitio habitual.
- **Work dir**: la carpeta en la que se sitúa el agente dentro del contenedor.
- **Network**: `none` por defecto, así que el contenedor no tiene internet.
- **User**, **CPU limit**, **Memory limit**, **PIDs limit**: quién es el agente ahí dentro y cuánta máquina puede usar.

## Échale el cerrojo

Baja hasta **Security** y **Advanced**.

{{< shot src="images/webui/pando-webui-settings-container-runtime-security.jpg" alt="Ajustes de seguridad y avanzados del contenedor" >}}

- **Read-only root filesystem**: el sistema del propio contenedor no se puede modificar. Recomendado.
- **No new privileges**: nada de lo que hay dentro puede ascenderse a administrador.
- **Allowed environment variables** y **Allowed mount paths**: las únicas variables y carpetas que una sesión puede traer consigo.
- **Extra environment** y **Extra mounts**: variables y carpetas que añades siempre.

Pulsa **Save**.

## Lanza una sesión dentro

Abre un chat nuevo y pide algo que ejecute un comando, por ejemplo «pasa los tests». El agente trabaja como siempre; lo que cambia es dónde se ejecuta el comando.

Cuando los comandos corren en Docker o Podman, la valla es el contenedor. El sandbox del host se hace a un lado.

## Comprueba que funciona

Baja hasta el final de **Configuración > Entorno de contenedores** y pulsa **Refresh Activity**.

{{< shot src="images/webui/pando-webui-settings-container-runtime-activity.jpg" alt="Sesiones de contenedor activas y eventos recientes" >}}

**Active sessions** lista los contenedores en marcha y **Recent events** muestra lo que Pando ha hecho con ellos.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Una tarjeta dice `Status: unavailable` | Ese runtime no está instalado o no está arrancado. Arranca Docker o instala Podman sin root |
| `Exec: no` | Pando ve el runtime pero no puede ejecutar comandos con él. Comprueba que tu usuario tiene permiso para usarlo |
| El agente no puede descargar dependencias | **Network** está en `none`. Usa una imagen que ya las traiga o elige una red |
| El agente no encuentra tus ficheros | Con **embedded** el proyecto no es visible. Usa **docker** o **podman** |
| No aparece actividad | Pulsa **Refresh Activity** y mira la línea que dice qué runtime está seleccionado |

## ¿Prefieres la terminal?

Los contenedores se configuran en la sección `[Container]` del fichero de configuración. Todas las claves están en la [referencia de contenedores]({{< relref "/docs/configuration/containers" >}}).
