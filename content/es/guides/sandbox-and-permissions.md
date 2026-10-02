---
title: "Mantén al agente dentro del corralito: sandbox y permisos"
shortTitle: "Sandbox y permisos"
description: "Decide dónde pueden escribir los comandos del agente, cuáles puede ejecutar sin preguntar y deja tus claves fuera de la vista."
summary: "Pon la valla, la lista de permitidos y el candado a tus claves."
track: soil
level: beginner
weight: 26
---

El agente de Pando escribe comandos en tu ordenador por ti. Esta guía enseña los tres mandos que hacen que eso sea seguro: el **sandbox** (un corralito alrededor de cada comando), las **listas de comandos** (lo que siempre vale y lo que nunca vale) y las **claves cifradas** (para que un fichero de configuración compartido no revele nada). Solo necesitas tener Pando abierto; la app de escritorio es idéntica a la Web UI que se usa aquí. Las capturas están en inglés; los nombres en negrita son los que verás con la interfaz en español.

## Mira la etiqueta del sandbox

Abre un chat. En el panel de información de la derecha, busca **Sandbox**. De un vistazo te dice qué está haciendo el corralito: el modo cuando está activo, `off` cuando no.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Vista de chat con la etiqueta Sandbox en el panel de información" >}}

En Linux y macOS viene activado desde el primer día. En Windows la etiqueta avisa de que el sandbox no se aplica, y a cambio Pando te pregunta antes de cada comando.

## Abre los ajustes del sandbox

Ve a **Configuración > Sandbox**. Todo lo que cambies en esta página se aplica al siguiente comando. No hay que reiniciar nada.

{{< shot src="images/webui/pando-webui-settings-sandbox.jpg" alt="Ajustes del sandbox de comandos" >}}

- **Sandbox activado** es el interruptor principal. Déjalo encendido salvo que una tarea no pueda funcionar dentro de la valla.
- Un aviso rojo arriba te dice cuándo el sandbox está apagado, y uno amarillo cuándo tu sistema solo puede proteger a medias.

## Elige la altura de la valla

En **Modo**, escoge uno:

| Modo | El agente puede escribir en | Internet para sus comandos | Sirve para |
|---|---|---|---|
| **Escritura en el espacio de trabajo (por defecto)** | Tu proyecto, las carpetas temporales y las cachés de descargas de tus herramientas | Sí | El trabajo de cada día |
| **Solo lectura** | Solo las carpetas temporales | No | «Mirar y no tocar»: revisiones y exploración |
| **Estricto** | Tu proyecto y las carpetas temporales | No | Un repositorio del que aún no te fías. El agente ni siquiera puede leer tu carpeta personal |
| **Desactivado** | En todas partes | Sí | Quitar la valla |

**Red** te deja cortar internet a los comandos del agente sin cambiar de modo. Las conexiones del propio Pando con tu proveedor de IA no se ven afectadas.

## Abre o cierra puertas extra

Más abajo, en la misma página:

- **Directorios con escritura adicionales**: carpetas fuera del proyecto donde el agente también puede escribir, por ejemplo una carpeta compartida.
- **Rutas denegadas**: sitios que el agente no puede ni leer ni escribir, como `~/.ssh`. Valen patrones como `*.pem`.
- **Confinar también**: marca **Servidores MCP (stdio)** o **Subagentes** para meterlos también dentro de la valla. Por defecto quedan fuera porque suelen guardar sus propios ficheros en otros sitios.
- **Rutas protegidas** es una lista que puedes leer pero no editar: los ajustes del propio Pando y tus hooks de git. El agente no puede cambiarlos nunca, así que no puede abrir la puerta desde dentro.

Pulsa **Guardar**.

## Decide cuánto te pregunta Pando

Cuando el sandbox protege del todo, **Permitir bash automáticamente** deja que los comandos corrientes se ejecuten sin preguntar. Los arriesgados, como `sudo` o borrar una carpeta del sistema, siguen parando para pedirte permiso. Apaga **Permitir bash automáticamente** si prefieres aprobar tú cada comando.

Cuando un comando choca con la valla, al agente se le explica por qué y normalmente lo reintenta dentro del proyecto. Si de verdad necesita salir, pide ejecutar ese único comando sin sandbox. Esa petición siempre espera tu clic. Ningún modo automático puede concederla.

## Rellena las listas de «siempre» y «nunca»

Ve a **Configuración > Bash**.

{{< shot src="images/webui/pando-webui-settings-bash.jpg" alt="Comandos de shell prohibidos y permitidos" >}}

- **Banned commands** (prohibidos) se rechazan siempre, aunque tú dijeras que sí. Mientras la lista esté vacía, Pando usa la suya propia (herramientas de descarga y navegadores como `curl` y `wget`).
- **Allowed commands** (permitidos) se saltan la pregunta y se ejecutan directamente. Úsala para cosas inofensivas que estás harto de aprobar, como `ls` o `git status`. Un comando que añadas aquí sale además de la lista de prohibidos de serie.

Escribe un comando, pulsa **Add** y después **Save**.

## Pon candado a las claves de tu fichero de configuración

Las claves de API escritas en un fichero de configuración son la llave de casa debajo del felpudo. Pando puede cambiar cada una por una versión revuelta que solo tu ordenador sabe leer:

```bash
pando secret mi-clave-de-api
```

Copia el resultado (empieza por `age1:`) y pégalo donde estaba la clave. Pando la descifra en memoria cada vez que arranca. Las claves que escribes en **Configuración > Proveedores** ya se guardan así.

## Comprueba que funciona

Pide al sandbox de Pando que ejecute un comando que intenta escribir en tu carpeta personal:

```bash
pando sandbox exec -- touch ~/.probe
```

Deberías ver `Permission denied`. Luego ejecuta `pando sandbox status`: muestra el modo, si la protección es completa o parcial y qué está protegido.

{{< under-surface >}}
Pando no monta un contenedor. Le pide a tu sistema operativo que valle cada comando que arranca el agente, y quita de su vista todo lo que parezca una clave o una contraseña.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| La etiqueta dice `partial` | En Linux, instala bubblewrap (`sudo apt install bubblewrap`, o `dnf`, `pacman`, `zypper`). Con un kernel de Linux anterior al 6.7 hay protección que no se puede dar; Pando sigue preguntando antes de cada comando |
| «No se aplica en este sistema» | Es lo esperado en Windows y en Linux muy antiguos. Pando pregunta antes de cada comando |
| Una herramienta no puede escribir sus ficheros | Añade su carpeta a **Directorios con escritura adicionales** |
| Un comando necesita una clave que ha desaparecido | El sandbox esconde las variables que parecen secretos. Deja pasar una con `Keep` en el fichero de configuración (mira la referencia) |
| Un proyecto clonado intenta aflojar tu sandbox | No puede. La configuración de un proyecto solo puede apretar la valla |
| Un ajuste aparece en gris | Lo gestiona tu organización |

## ¿Prefieres la terminal?

```bash
pando sandbox status                 # qué está activo ahora mismo
PANDO_SANDBOX=strict pando           # una ejecución con la valla más alta
PANDO_SANDBOX=off pando              # una ejecución sin ella
pando secret 'age1:…'                # vuelve a mostrar un valor cifrado
```

En la TUI la misma página está en **Settings > Sandbox**. Todas las opciones, con su nombre exacto, están en la [referencia del sandbox]({{< relref "/docs/configuration/sandbox" >}}) y en la [referencia del cifrado de claves]({{< relref "/docs/configuration/age-encryption" >}}).
