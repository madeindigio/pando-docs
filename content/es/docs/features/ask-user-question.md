---
title: Preguntas Interactivas al Usuario
weight: 22
---

A veces lo honrado en un asistente es parar y preguntar. Cuando Pando llega a una bifurcación, qué base de datos, qué enfoque, qué querías decir exactamente, se detiene y te enseña una tarjeta con opciones, como el camarero que pregunta «¿con gas o sin gas?» antes de traer la botella equivocada.

## Qué hace por ti

- **Menos suposiciones erróneas.** Una respuesta tuya de diez segundos ahorra diez minutos de trabajo en mala dirección.
- **Fácil de contestar.** Eliges entre unas pocas opciones en lugar de escribir una redacción. Siempre hay una casilla «Otro» por si ninguna encaja.
- **Varias preguntas de una vez.** Llegan juntas hasta cuatro preguntas relacionadas, y ves un resumen de tus respuestas antes de confirmar.
- **Más de una opción cuando tiene sentido.** Algunas preguntas permiten marcar varias.
- **Paciente.** Si se cae la conexión o recargas la página, la pregunta sigue esperando.

## Cómo se vive

Pando va por la mitad de una tarea y aparece una tarjeta:

```
Question 1/2: Database Choice
 ○ PostgreSQL
 ● SQLite
 ○ MySQL
 ○ Other

Question 2/2: ORM Preference
 ○ GORM
 ○ sqlx
 ○ Other
```

Eliges, confirmas y Pando sigue con tus respuestas en la mano.

La tarjeta se adapta al sitio: una ventana con ratón y teclado en la Web UI y la app de escritorio, un diálogo de teclado en la interfaz de terminal y una lista numerada de opciones en el panel de asistente de un editor, donde Pando espera a que respondas con texto.

## Cuándo usarlo

No lo llamas tú; lo llama Pando cuando necesita que decidas sobre un enfoque, una elección de diseño o una petición poco clara. Para tener más preguntas y menos suposiciones, díselo («pregúntame antes de decidir nada importante») o usa el [modo aprendizaje]({{< relref "/docs/features/learning-mode" >}}).

## Conviene saber

- Cada ronda tiene de una a cuatro preguntas con dos a cuatro opciones cada una, así que nunca se convierte en un formulario.
- Se puede desactivar si prefieres que Pando no interrumpa nunca con tarjetas.
- Las preguntas no son lo mismo que las peticiones de permiso. Una pregunta es «¿por dónde?»; una petición de permiso es «¿puedo?».

## Siguientes pasos

- Guía: [Oriéntate en la Web UI]({{< relref "/guides/webui-tour" >}}).
- Referencia: [cómo desactivar las preguntas]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Feedback rápido]({{< relref "/docs/features/steering" >}}).
