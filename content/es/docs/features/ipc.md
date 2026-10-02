---
title: Comunicación Inter-Proceso (IPC)
weight: 21
---

Puedes tener Pando abierto varias veces a la vez: la aplicación de escritorio, una pestaña del navegador, una terminal, una ventana por proyecto. IPC es la forma en que esas ventanas se hablan, para comportarse como un solo Pando y no como desconocidos. Imagina un equipo con walkie-talkies: todos oyen lo que pasa, y uno de ellos lleva el cuaderno.

## Qué hace por ti

- **Todas las ventanas están al día.** Una sesión que empiezas en un sitio aparece en los demás, y puedes ver cómo se escribe una respuesta desde cualquiera.
- **No hay dos manos en el cuaderno.** Una ventana se encarga de escribir en la base de datos de Pando; las demás se lo piden a ella. Tu historial no se puede revolver porque dos ventanas guarden a la vez.
- **Nadie es imprescindible.** Si la ventana encargada se cierra o se cae, otra se da cuenta en segundos y toma el relevo. Las demás se reconectan solas.
- **Las ventanas se echan una mano.** Un Pando puede pasar una tarea a otro que ya está abierto en otro proyecto, sin arrancar uno nuevo desde cero.

## Cómo se nota en el día a día

Casi nunca lo notas, y de eso se trata. El único sitio donde lo ves es la pantalla **Instances**, que lista todos los Pando en marcha en tu máquina, cuál está al mando (marcado **PRIMARY**) y cómo se abrió cada uno.

{{< shot src="images/webui/pando-webui-instances.jpg" alt="Pantalla Instances con las ventanas de Pando en marcha" >}}

## Cuándo usarlo

Se enciende solo en cuanto arranca un segundo Pando. No hay nada que activar.

Lo único que eliges tú es dejar que las ventanas se pasen tareas: tienen que estar de acuerdo la que pide y la que acepta.

## Conviene saber

- Funciona entre ventanas de la misma máquina, no a través de la red.
- Ordenar la base de datos lo hace siempre la ventana que está al mando, lo pidas desde la que lo pidas.

## Siguientes pasos

- Guía: [Delega en subagentes con Mesnada]({{< relref "/guides/mesnada" >}}) explica cómo pasar trabajo entre proyectos.
- Referencia: [tiempos, mensajes e interruptores del relevo]({{< relref "/docs/configuration/providers" >}}).
- Relacionado: [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}), [Delegación de agentes]({{< relref "/docs/features/agent-delegation" >}}).
