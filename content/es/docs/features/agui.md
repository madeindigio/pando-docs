---
title: AG-UI para aplicaciones web
weight: 42
---

Pando puede ser el cerebro que hay detrás de un chat en tu propia aplicación web. Tu página es el mostrador de la tienda; Pando es el taller de la trastienda, que lee ficheros, usa herramientas y reparte trabajo entre su cuadrilla. Los dos se hablan en [AG-UI](https://docs.ag-ui.com), el idioma común que usan [CopilotKit](https://www.copilotkit.ai) y herramientas parecidas.

Viene **desactivado**, porque deja al alcance de un navegador un agente que puede ejecutar código.

## Qué hace por ti

- **Un agente de verdad en tu producto.** No un chat que solo habla: uno que trabaja sobre un proyecto.
- **Respuestas que llegan mientras se escriben**, con la actividad del agente a la vista.
- **Aprobaciones y preguntas dentro de tu página.** Cuando el agente necesita permiso o quiere preguntar algo, lo muestra tu interfaz.
- **Las acciones de tu propia página.** El agente puede usar los botones y funciones que tú definas.
- **Estado en vivo para dibujar.** El modelo en uso, el presupuesto que queda, la lista de tareas, los ficheros tocados y los subagentes en marcha llegan como datos, listos para mostrarse como tarjetas.
- **Varios personajes con un solo Pando.** Un perfil es un agente con nombre, con su propio modelo, persona y herramientas. Puedes ofrecer un «reviewer» prudente y un «coder» que mete mano, cada uno en su dirección.

## Cómo se nota en el día a día

Alguien escribe en tu página. La respuesta va llegando, con un panel pequeño que enseña lo que hace el agente. Si recarga, la conversación sigue ahí. Si se le cae la conexión, el trabajo continúa dos minutos; cuando vuelve recibe lo que se perdió y después la emisión en directo. Ni siquiera reiniciar Pando hace perder el hilo.

## Cuándo usarlo

Úsalo cuando estés haciendo una aplicación web y quieras en ella un asistente que de verdad pueda hacer cosas con un proyecto o un conjunto de ficheros.

No es para hablar tú con Pando: para eso está la Web UI.

## Conviene saber

- Solo pueden conectarse las direcciones web que tú indiques, y cada petición necesita un token de acceso.
- El token no cambia entre reinicios, así que lo configuras una vez en tu página.
- Déjalo escuchando en tu propia máquina salvo que lo pongas detrás de una pasarela tuya.
- Lo recomendable es ejecutarlo como un proceso aparte de la Web UI.

## Siguientes pasos

- Guía: [Usa Pando desde tu editor y otras aplicaciones]({{< relref "/guides/editors-and-other-apps" >}}) arranca el servidor y conecta una página.
- Referencia: [comandos, claves de configuración, perfiles y la biblioteca cliente]({{< relref "/docs/configuration/providers" >}}).
- Ejemplo: una aplicación Next.js completa en [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).
