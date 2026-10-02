---
title: Enriquecimiento de Contexto
weight: 13
---

El enriquecimiento de contexto es Pando haciendo los deberes antes de responder. Piensa en el compañero que, de camino a la reunión, saca la carpeta adecuada del archivador y la hojea. Cuando envías un mensaje, Pando mira con discreción tus notas, tu código y tus conversaciones anteriores, y se trae lo que parece útil. Tú solo ves una respuesta mejor.

## Qué hace por ti

- **Respuestas que conocen tu proyecto.** Pando llega con los ficheros y las notas que vienen al caso ya en la mano, sin que tú se los señales.
- **Menos explicaciones.** No hace falta pegar los mismos antecedentes en cada conversación.
- **Tres sitios consultados a la vez:** tu base de conocimiento, el mapa de tu código y lo ocurrido en sesiones anteriores.
- **Solo los buenos hallazgos.** Las coincidencias flojas se descartan antes de llegar al modelo.

## Cómo se nota en el día a día

En su forma sencilla es invisible: una ronda rápida de búsquedas antes de cada respuesta.

Hay también una forma más concienzuda. Un pequeño ayudante hace varias rondas de búsqueda, como el bibliotecario que vuelve unas cuantas veces a las estanterías, y le entrega al agente principal un resumen ordenado. Con ella activada:

- Por defecto trabaja en el primer mensaje de la sesión, que es el momento en que Pando menos sabe de tu proyecto.
- Lo ves trabajar: una línea en el chat dice que el ayudante está reuniendo contexto, y después cuánto ha añadido.
- Su trabajo queda guardado como una pequeña sesión aparte que puedes abrir para leer exactamente qué buscó y qué encontró.
- Si tarda demasiado o no encuentra nada, Pando recurre a la búsqueda sencilla, así que nunca te quedas con menos que antes.
- Se prepara mientras Pando arranca, de modo que tu primer mensaje no tiene que esperarlo.

El ayudante usa su propio modelo, distinto del que elegiste para programar. Basta uno barato y rápido.

## Cuándo usarlo

Actívalo cuando tu proyecto tenga algo que merezca consultarse: un código indexado, una carpeta de notas, algo de historia. En un proyecto recién creado y vacío todavía no hay nada que encontrar.

## Conviene saber

- Cada hallazgo que se trae ocupa sitio en la conversación. Tú eliges cuántos se permiten de cada sitio.
- Un filtro opcional, a cargo de un [modelo de decisión]({{< relref "/docs/features/decision-model" >}}) diminuto, puede descartar los hallazgos que no encajan con tu pregunta.
- La forma concienzuda cuesta un poco más, porque el ayudante también es un modelo. Su coste se suma al de la sesión.
- Pando también calibra cada mensaje (¿va de código, de un fallo, de una explicación?) para dejar fuera las instrucciones que no vienen al caso, lo que ahorra tokens.

## Siguientes pasos

- Guía: [Enseña tu proyecto a Pando con Remembrances]({{< relref "/guides/remembrances" >}}).
- Referencia: [Configuración de Remembrances]({{< relref "/docs/configuration/remembrances" >}}).
- Relacionado: [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}).
