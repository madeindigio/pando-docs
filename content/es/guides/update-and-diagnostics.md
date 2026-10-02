---
title: "Pando en forma: actualizaciones, diagnóstico y mantenimiento"
shortTitle: "Actualizar y diagnosticar"
description: "Actualiza Pando, vuelve a una versión anterior, comparte el diagnóstico cuando algo se rompe, lee los registros y ordena la base de datos."
summary: "Actualiza, informa de un problema, ordena."
track: soil
level: beginner
weight: 28
---

Esta guía es el rincón del mantenimiento: cómo ver que hay versión nueva e instalarla, cómo dejar que los mantenedores miren un problema sin pegar registros y dos tareas de limpieza. La app de escritorio es idéntica a la Web UI que se muestra aquí. Las capturas están en inglés; los nombres en negrita son los de la interfaz en español.

## Mira qué versión tienes

Abre un chat y busca **Versión** en el panel de información de la derecha. Cuando hay una versión más nueva, lo dice y te enseña el comando que hay que ejecutar.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Vista de chat con la versión instalada y el aviso de actualización" >}}

La misma información, con un botón para copiarla, está en **Configuración > General > Diagnóstico**.

## Actualiza

Abre una terminal (la pantalla **Terminal** dentro de Pando sirve) y ejecuta:

```bash
pando update
```

Pando descarga la versión nueva y se cambia a sí mismo, como quien cambia una bombilla: la vieja solo sale cuando la nueva está lista. Se puede hacer con Pando abierto; reinícialo después para usar la versión nueva.

En macOS, si instalaste con el `.pkg`, descarga el `.pkg` nuevo para actualizar `Pando.app`. Mira [Instaladores]({{< relref "/docs/features/installers" >}}).

## Vuelve a una versión anterior

Si una actualización no te convence, di qué versión quieres:

```bash
pando update v1.1.1
```

Pando te cuenta lo que va a hacer: `Installing`, `Downgrading` o `Reinstalling`. La `v` es opcional.

## Activa el diagnóstico cuando algo se rompa

Ve a **Configuración > General** y baja hasta **Diagnóstico**.

{{< shot src="images/webui/pando-webui-settings-general-diagnostics.jpg" alt="Sección de diagnóstico en los ajustes generales" >}}

Enciende **Enviar registros y diagnósticos a los desarrolladores de Pando**. Viene apagado; nada sale de tu ordenador hasta que haces esto. Pando muestra un **ID de depuración**, un número aleatorio de 16 cifras que funciona como un número de ticket.

Después:

1. Reproduce el problema.
2. Pulsa el botón de copiar junto al ID de depuración y pégalo en tu informe de error.
3. Si quieres, vuelve a apagar el diagnóstico. El ID se mantiene durante toda la conversación con los mantenedores. **Regenerar** te da uno nuevo.

**Nivel mínimo de registro** elige cuánto se envía: todo desde **Información**, o solo advertencias y errores.

Tu código, tus ficheros y tus conversaciones no se envían nunca, y todo lo que parezca una clave o contraseña se tacha antes. Los detalles están en [Diagnóstico remoto]({{< relref "/docs/features/remote-diagnostics" >}}).

## Lee tú los registros

Abre **Registros** en el menú de la izquierda.

{{< shot src="images/webui/pando-webui-logs.jpg" alt="Pantalla de registros con filtros por nivel y búsqueda" >}}

Filtra por **Debug**, **Info**, **Warn** o **Error**, o escribe en el buscador. Si quieres más detalle, enciende **Modo de depuración** en **Configuración > General > Diagnóstico**.

## Ordena la base de datos

Pando guarda tus sesiones y recuerdos en un solo fichero. Al borrar cosas quedan huecos dentro, como en un cuaderno con hojas arrancadas. Para devolver ese espacio a tu disco, escribe esto en el chat:

```
/db-compact
```

Pando te dice el tamaño de antes y el de después. Hazlo de vez en cuando, por ejemplo tras borrar muchas sesiones antiguas.

## Ten claro dónde viven tus ajustes

Pando busca un fichero de ajustes primero junto a tu proyecto, luego en las carpetas de encima y luego en tu carpeta personal. Por eso un único fichero en lo alto de un repositorio grande sirve para todas las carpetas que cuelgan de él. El **Directorio de trabajo** del panel de información del chat te dice dónde está plantada la sesión actual. Más en [Descubrimiento del fichero de configuración]({{< relref "/docs/features/config-discovery" >}}).

## Comprueba que funciona

- Tras `pando update`, reinicia Pando: **Versión** muestra el número nuevo y el aviso desaparece.
- Tras activar el diagnóstico, `pando telemetry status` dice que está activado e imprime tu ID de depuración.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| `pando update` dice permiso denegado | Necesitas permiso de escritura en la carpeta donde está `pando`. Reinstala con el script de instalación o ejecuta la actualización con los permisos adecuados |
| El interruptor de diagnóstico no se deja encender | Usas una versión compilada por ti. El diagnóstico solo existe en las versiones oficiales |
| La app de escritorio en macOS sigue en la versión vieja | Instala el `.pkg` nuevo |
| `/db-compact` tarda | Normal con una base de datos grande. Puede hacerse con otra ventana de Pando abierta |
| Pando no hace caso a los ajustes de tu proyecto | Mira qué fichero ha encontrado: gana el `.pando.toml` más cercano subiendo desde el directorio de trabajo |

## ¿Prefieres la terminal?

```bash
pando update --check           # solo mira si hay versión nueva
pando telemetry enable         # activa el diagnóstico e imprime el ID
pando telemetry id             # imprime solo el ID
pando telemetry disable
pando telemetry level warn     # envía solo advertencias y errores
pando db compact               # ordena la base de datos
pando db compact --incremental # limpieza más rápida y ligera
pando doctor                   # chequeo de solo lectura del enrutado de modelos
```

En la TUI, el diagnóstico está en **Settings > General > Remote Telemetry**. Todas las opciones están en la [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}}).
