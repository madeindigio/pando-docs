---
title: "Trabaja en varios proyectos con pestañas de trabajo"
shortTitle: "Proyectos y pestañas"
description: "Tus proyectos en una lista, cada uno a un clic en su propia pestaña."
summary: "Una ventana, muchos proyectos."
track: surface
level: intermediate
weight: 6
---

Si Pando es un taller, una pestaña de proyecto es un segundo banco de trabajo en la misma sala: con sus herramientas a mano y su tarea a medias, y pasas de un banco a otro sin recoger nada. Necesitas Pando abierto (Web UI o app de escritorio, son lo mismo) y al menos dos carpetas de proyecto en tu disco.

## Abre la lista de proyectos

Haz clic en **Proyectos** en el menú de la izquierda. Cada fila es una carpeta que Pando conoce: su nombre, su ruta y si su espacio de trabajo está en marcha.

{{< shot src="images/webui/pando-webui-projects.jpg" alt="Lista de proyectos" >}}

## Añade un proyecto

Pulsa **Añadir proyecto**, elige la carpeta y confirma. Se suma a la lista. Con el icono del lápiz (**Renombrar**) le das un nombre más cómodo; el nombre es solo una etiqueta, la carpeta no se toca.

## Ábrelo en una pestaña

Haz clic en la fila o usa **Abrir pestaña** en la columna de acciones. Pando despierta un espacio de trabajo para ese proyecto y lo abre como pestaña en la parte inferior de la ventana. La pestaña es un Pando completo: chat, sesiones, ficheros y terminal, todo apuntando a la carpeta de ese proyecto.

{{< shot src="images/webui/pando-webui-project-workspace-tab.jpg" alt="Un proyecto abierto en su propia pestaña" >}}

Un punto verde en la pestaña indica que el espacio de trabajo está en marcha.

## Muévete entre pestañas

Haz clic en las pestañas de abajo o usa el teclado:

- **Ctrl+Alt+1…9** salta a la pestaña principal o a una de las primeras de proyecto.
- **Ctrl+Alt+Izquierda / Derecha** va a la pestaña anterior o siguiente.

Al cambiar no se pierde nada. La terminal que dejaste abierta en la otra pestaña sigue ahí, a medio comando, como una olla a fuego lento.

## Cierra una pestaña, o detenla

Pulsa la **×** de la pestaña (o **Ctrl+Alt+W**). Tienes dos opciones:

- **Cerrar**: oculta la pestaña pero deja el espacio de trabajo en marcha. Volver a abrirla es instantáneo.
- **Cerrar y detener el espacio de trabajo**: además lo apaga. Elígela cuando hayas terminado por hoy.

También puedes detener un espacio de trabajo desde la lista, con el icono **Detener** de su fila.

## Abre un proyecto en su propia ventana

¿Prefieres dos ventanas una al lado de otra? En la app de escritorio, usa **Abrir en una ventana nueva** en la fila. Ese proyecto tendrá una ventana de Pando para él solo.

## Decide adónde va el trabajo delegado

Arriba de la lista, **Destino de delegación** muestra el proyecto que recibe los trabajos que Pando encarga a agentes ayudantes. Si el espacio de trabajo de un proyecto ya está en marcha, esos ayudantes lo usan en lugar de arrancar otra copia. Más en [Delega con Mesnada]({{< relref "/guides/mesnada" >}}).

## Pon los límites

Cada espacio de trabajo en marcha consume memoria, como cada app abierta en el móvil. En **Configuración > General**, bajo **Project workspaces**:

- **Max running workspaces**: cuántos pueden estar en marcha a la vez (6 por defecto, 0 para no poner límite).
- **Workspace startup timeout**: cuánto esperar a que uno arranque antes de darlo por fallido (20 segundos por defecto).

{{< shot src="images/webui/pando-webui-settings-general-tool-discovery-workspaces.jpg" alt="Ajustes de los espacios de proyecto" >}}

## Comprueba que funciona

Abre dos proyectos en pestañas. Lanza un comando en la terminal del primero, pasa al segundo y vuelve: el comando sigue en marcha. Recarga la página: las pestañas vuelven.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| El espacio de trabajo muestra **Error** o no sale de **Iniciando** | Sube **Workspace startup timeout** y abre la pestaña otra vez |
| Una pestaña nueva no se abre | Has llegado a **Max running workspaces**. Detén uno que no necesites |
| Una fila marcada como **Externo** no se puede detener | La arrancó otra cosa, por ejemplo tu editor. Ciérrala desde allí |
| La vista previa de Diseño no aparece dentro de una pestaña de proyecto | Las vistas previas no están disponibles en pestañas. Abre el proyecto en su propia ventana |

## ¿Prefieres el fichero de configuración?

```toml
[Projects]
MaxWebInstances   = 6
WebStartupTimeout = "20s"
```

Todas las claves, los atajos de teclado y la API están en la [referencia]({{< relref "/docs/configuration/webui" >}}). Qué es una pestaña de proyecto y cómo se mantiene privada: [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}).
