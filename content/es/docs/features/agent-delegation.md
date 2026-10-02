---
title: Delegación y Orquestación de Agentes
weight: 11
---

Un agente es un solo par de manos. **Mesnada** le da a Pando una cuadrilla: ayudantes, llamados subagentes, que cogen un encargo cada uno, trabajan en segundo plano a la vez y vuelven con un informe. Pando pasa a ser el capataz: reparte el trabajo, lo entrega y reúne los resultados.

## Qué hace por ti

- **Trabajo en paralelo.** Tres módulos que revisar son tres ayudantes trabajando a la vez, no uno detrás de otro.
- **Una conversación principal limpia.** Cada ayudante trabaja en su propia conversación aparte. A la tuya solo llegan las conclusiones.
- **El ayudante adecuado para cada encargo.** Hay ayudantes que solo pueden mirar y no tocar, ideales para explorar. Un ayudante puede usar otro modelo, o incluso otro asistente que tengas instalado.
- **Encargos en orden.** Un encargo puede esperar a que terminen otros y partir de sus resultados.
- **Entre proyectos.** Puedes mandar un ayudante a otro de tus proyectos.
- **Encargos con horario.** Una tarea puede repetirse sola cada mañana.

## Cómo se nota en el día a día

Muchas veces basta con pedirlo: «usa un subagente por servicio y dame un único resumen». Pando reparte los encargos y sigue con lo suyo. Cuando los ayudantes terminan, sus informes llegan solos a tu conversación, y si Pando ya había parado, se despierta para leerlos y continuar.

{{< shot src="images/webui/pando-webui-orchestrator-tasks.jpg" alt="Vista del orquestador con la lista de tareas de Mesnada" >}}

La vista Orquestador es la pizarra del capataz: cada encargo, en marcha o terminado, con su resultado. Desde ahí también puedes crear un encargo a mano o programar uno.

## Cuándo usarlo

Delega el trabajo que se puede partir en trozos que no se pisan: leer zonas distintas del código, escribir tests de módulos separados, investigar varias preguntas. No delegues dos encargos que editan el mismo fichero; son dos personas escribiendo en la misma hoja.

## Conviene saber

- Los ayudantes empiezan en la carpeta de tu proyecto y con tus ajustes, pero no ven tu conversación. Solo saben lo que dice la descripción del encargo.
- Más ayudantes es más velocidad y más gasto. Hay un límite de cuántos trabajan a la vez.
- Unos quitamiedos mantienen el orden: un límite para que los ayudantes no contraten ayudantes sin fin, una comprobación que rebaja un informe que menciona ficheros que no existen y un cortacircuitos que deja de relanzar un encargo que no para de fallar.
- Si un proyecto ya está abierto en otra ventana de Pando, un ayudante puede usar esa ventana en lugar de arrancar en frío.
- Los informes se escriben antes de entregarse, así que un reinicio a medias no los pierde.
- Puedes definir tus propios tipos de ayudante para manejar otros asistentes de línea de comandos.

## Siguientes pasos

- Guía: [Delega en subagentes con Mesnada]({{< relref "/guides/mesnada" >}}).
- Referencia: [Configuración de delegación y Mesnada]({{< relref "/docs/configuration/delegation" >}}), que incluye las herramientas con las que el agente delega.
- Relacionado: [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}), [Comunicación entre procesos]({{< relref "/docs/features/ipc" >}}).
