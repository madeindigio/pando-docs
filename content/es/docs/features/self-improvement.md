---
title: Sistema de Auto-Mejora
weight: 25
---

Después de un partido, un buen entrenador ve la repetición y apunta una o dos cosas que hacer mejor la próxima vez. Pando puede hacer lo mismo con tus sesiones: puntúa cada una cuando termina, se fija en lo que funcionó y propone reglas cortas para el futuro. Tú lees las propuestas, y solo se usan las que apruebas.

Viene **desactivado por defecto**.

## Qué hace por ti

- **Cada sesión recibe una nota**, sin llamar a ningún modelo: si tuviste que corregir a Pando, cuántas acciones fallaron, cuántas veces cancelaste, cuánto costó.
- **Tu opinión cuenta más.** Un pulgar arriba o abajo tuyo sustituye a la nota automática.
- **Lecciones de los casos claros.** Cuando una sesión fue claramente bien o claramente mal, un modelo juez la lee y puede proponer una regla, como «comprueba la compilación antes de dar el trabajo por terminado».
- **Tú eres el editor.** Cada regla propuesta es un fichero pequeño que puedes leer, retocar, aprobar o rechazar.
- **Las reglas que no ayudan se retiran** solas.

## Cómo se nota en el día a día

{{< shot src="images/webui/pando-webui-self-improvement.jpg" alt="Vista Self-Improvement: contadores, evaluaciones por día y reglas aprendidas" >}}

Trabajas como siempre. De vez en cuando abres la vista Self-Improvement: muestra cuántas sesiones se han puntuado, la media, cómo ha evolucionado en las dos últimas semanas y por qué cada sesión reciente tiene la nota que tiene. Una lista de reglas pendientes te espera con botones de aprobar y rechazar. Las reglas aprobadas se suman a las instrucciones de Pando en las sesiones que empieces después.

Si te gustan los experimentos, también puedes escribir dos versiones de una instrucción y dejar que Pando averigüe cuál da mejores sesiones.

## Cuándo usarlo

Compensa cuando usas Pando con regularidad en el mismo tipo de trabajo, porque los patrones necesitan repetición para aparecer. Con un uso ocasional no hay bastante de lo que aprender.

## Conviene saber

- **Pando nunca reescribe sus propias instrucciones a tus espaldas.** Las reglas son ficheros que tú apruebas, y las variantes de instrucciones son ficheros que tú escribes.
- El juez tiene un presupuesto diario, así que no puede dispararte la factura.
- El juez solo opina de sesiones de cierta longitud que acabaron claramente bien o mal. Que haya pocas propuestas al principio es normal.
- Un «doctor» integrado te dice con palabras claras si el entrenador está trabajando y, si no, por qué.

## Siguientes pasos

- Guía: [Ayuda a Pando a aprender de tus sesiones]({{< relref "/guides/self-improvement" >}}).
- Referencia: [Configuración de la automejora]({{< relref "/docs/configuration/self-improvement" >}}).
