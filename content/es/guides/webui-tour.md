---
title: "Oriéntate en la Web UI"
shortTitle: "Recorrido por la Web UI"
description: "Un paseo por todas las pantallas, para saber dónde está cada cosa y para qué sirve."
summary: "Todas las pantallas, una parada en cada una."
track: surface
level: beginner
weight: 5
---

Tómatelo como el primer paseo por un barrio nuevo: paramos una vez en cada esquina para que luego sepas dónde está la panadería. Ten Pando abierto en el navegador (`pando app`) o en la app de escritorio; son la misma interfaz.

## El chat: donde pasarás casi todo el tiempo

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="La pantalla de chat" >}}

- El **cuadro del centro** es donde escribes. **Intro** envía, **Mayús+Intro** añade una línea.
- Los **botones de debajo** son peticiones ya preparadas para empezar.
- El **panel derecho** es la ficha de la sesión: versión de Pando, carpeta de trabajo, estado del sandbox y ficheros que Pando ha cambiado. Se oculta con el icono de su esquina superior.
- La **columna izquierda** es el mapa: **Nueva sesión**, el buscador, todas las pantallas bajo **Navegar** y tus conversaciones anteriores bajo **Sesiones**.

## Sesiones: tus conversaciones, guardadas

Cada conversación se guarda sola y recibe un título. Haz clic en una de la columna izquierda para continuarla. Escribe en **Buscar sesiones** para encontrar una antigua. Las listas largas se van cargando al bajar.

## Quién responde y con qué cabeza

Dos selectores cambian cómo responde Pando:

- **Persona**, arriba a la derecha. Una persona es un papel, como pedirle a alguien que se ponga otro sombrero: **Assistant**, **Software Engineer**, **Qa**, **System Engineer**. **Auto** deja que Pando elija el sombrero en cada petición.

{{< shot src="images/webui/pando-webui-persona-selector.jpg" alt="Selector de persona" >}}

- **Modelo**, junto al botón de enviar. Haz clic en el nombre, busca y elige. Más en [Cuentas y modelos]({{< relref "/guides/setup-providers-models" >}}).

## Comandos slash: atajos con barra

Escribe `/` con el cuadro vacío y se abre un menú de comandos. Sigue escribiendo para filtrar y pulsa **Intro** para ejecutar. Son como los botones de un mando a distancia: una pulsación en lugar de una explicación larga.

{{< shot src="images/webui/pando-webui-chat-slash-commands.jpg" alt="Menú de comandos slash en el chat" >}}

La lista completa, agrupada por lo que quieres hacer, está en [Comandos slash]({{< relref "/docs/features/slash-commands" >}}).

## Cuando Pando pregunta y cuando interrumpes tú

- Si Pando duda, se detiene y enseña una tarjeta con opciones. Elige una o escribe tu propia respuesta. Mira [Preguntas interactivas]({{< relref "/docs/features/ask-user-question" >}}).
- Si eres *tú* quien quiere cambiar de rumbo mientras trabaja, envía otro mensaje sin más. Se pone en cola y se entrega en el siguiente momento seguro, sin tirar lo ya hecho. Mira [Feedback rápido]({{< relref "/docs/features/steering" >}}).

## Chat simple: la versión tranquila

**Chat Simple**, en el menú, deja solo la conversación, la lista de sesiones y el buscador. **Vista completa**, arriba, lo devuelve todo. Pando recuerda cuál prefieres.

{{< shot src="images/webui/pando-webui-simple-chat.jpg" alt="Vista de chat simple" >}}

## Editor de código: mirar y tocar

**Editor de Código** abre los ficheros de tu proyecto con colores para el código. Recorre la carpeta a la izquierda, abre varios ficheros en pestañas, edita y pulsa **Save**. Viene bien para revisar lo que ha escrito Pando sin salir de la ventana.

{{< shot src="images/webui/pando-webui-code-editor.jpg" alt="Editor de código" >}}

## Terminal: una de verdad

**Terminal** es una shell real en la carpeta del proyecto. Abre más con **New**. Lo que escribes aquí es cosa tuya: Pando ni lo confina ni lo filtra.

{{< shot src="images/webui/pando-webui-terminal.jpg" alt="Terminal" >}}

## Las otras habitaciones

Cada una tiene su guía; por ahora basta con saber que existen:

| Menú | Qué es | Guía |
|---|---|---|
| **Proyectos** | Tu lista de proyectos, cada uno se abre en su pestaña | [Proyectos y pestañas]({{< relref "/guides/projects-workspaces" >}}) |
| **Orquestador** | Trabajos encargados a agentes ayudantes y trabajos programados | [Delega con Mesnada]({{< relref "/guides/mesnada" >}}) |
| **Diseño** | Páginas y presentaciones que Pando diseña para ti | [Design Studio]({{< relref "/guides/design-studio" >}}) |
| **Agent VCS** | El historial de lo que Pando ha cambiado | [Revisar y deshacer]({{< relref "/guides/review-and-undo" >}}) |
| **Self-Improvement** | Cómo puntúa y mejora Pando su propio trabajo | [Self-improvement]({{< relref "/guides/self-improvement" >}}) |

## Registros e instancias: mirar bajo el capó

**Registros** es el diario de Pando: lo que hizo y los errores que encontró. Filtra por nivel (**Info**, **Warn**, **Error**) o busca una palabra.

{{< shot src="images/webui/pando-webui-logs.jpg" alt="Registros" >}}

**Instancias** lista todos los Pando que están en marcha en esta máquina ahora mismo y desde dónde se arrancó cada uno: escritorio, web o un editor.

{{< shot src="images/webui/pando-webui-instances.jpg" alt="Instancias en ejecución" >}}

## Hazlo tuyo

Abre **Configuración**, al pie de la columna izquierda.

- **Apariencia**: claro, oscuro o seguir al sistema; tamaño de letra; cuatro temas de color (**Pando**, **Paper**, **Slate**, **Forest**) y un color de acento. El icono de la luna, arriba, cambia entre claro y oscuro con un clic.
- **General > Idioma**: English, Español, Français, Deutsch, Português, 日本語, 中文.

{{< shot src="images/webui/pando-webui-settings-appearance.jpg" alt="Ajustes de apariencia" >}}

Pulsa **Guardar** en cada página. Si sales con cambios pendientes, Pando pregunta antes de descartarlos.

## Comprueba que funciona

Ya sabes, sin consultar nada: empezar una sesión, encontrar una antigua, cambiar de persona, lanzar un comando slash, abrir un fichero y abrir una terminal.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| La marca **Conectado**, abajo a la derecha, desaparece | Pando se ha parado o se ha caído la red. La página reconecta sola y recupera el chat cuando Pando vuelve |
| El panel derecho no está | Haz clic en el icono de panel, arriba a la derecha del chat |
| En el móvil no se ve el menú | Toca el icono de arriba a la izquierda para abrirlo |
| La interfaz está en otro idioma | **Configuración > General > Idioma** |

## ¿Prefieres la terminal?

La interfaz de terminal tiene las mismas habitaciones, a las que se llega con teclas en lugar de clics: `Ctrl+P` para los comandos, `Ctrl+R` para los ficheros, `Ctrl+U` para el panel de terminal, `Ctrl+T` para los temas. Todos los atajos están en la [referencia]({{< relref "/docs/configuration/webui" >}}).
