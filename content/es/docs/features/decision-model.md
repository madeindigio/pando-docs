---
title: Modelo de decisión
weight: 39
---

El modelo de decisión son los reflejos de Pando. Cuando coges al vuelo un vaso que se cae no te paras a razonar: una parte rápida de ti decide y a la parte que piensa ni se le pregunta. Pando tiene el mismo reparto. El modelo grande con el que chateas es el que piensa; un modelo diminuto y muy rápido contesta las preguntas pequeñas que surgen a todas horas, como «¿qué modelo debería atender este mensaje?» o «¿esta nota viene a cuento?».

Lo configuras una vez y lo comparten varias funciones. Sin él, esas funciones siguen funcionando, de forma más sencilla.

## Qué hace por ti

- **Elige el modelo para cada mensaje.** En el [modo automático]({{< relref "/docs/features/model-auto-mode" >}}) lee tu mensaje y decide cuál de tus modelos debe responder.
- **Elige el sombrero.** Pando puede cambiar de persona (asistente, ingeniero de software, QA…) por su cuenta. El modelo de decisión puede hacer esa elección en lugar de un modelo más grande y más lento.
- **Descarta lo que no encaja.** Cuando el [enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}) trae notas y código para tu pregunta, el modelo de decisión revisa cada hallazgo y tira lo que no tiene nada que ver.
- **Barato y rápido.** Estas preguntas se contestan en milisegundos, en tu propio equipo y sin coste por mensaje.

## Cómo se nota en el día a día

No hablas con él y casi nunca lo ves. Lo que notas es el resultado: responde el modelo adecuado, la persona cambia cuando cambia el tema y Pando trae menos notas pero mejores. En el modo automático, una línea corta en el chat te dice qué decidió y cuánto tardó, normalmente unas decenas de milisegundos.

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Ajustes del modelo de decisión: proveedor, modelo y prueba de conexión" >}}

## Cuándo usarlo

Configúralo si quieres cualquiera de las tres cosas de arriba. Si usas un solo modelo para todo, sin personas y sin notas de proyecto, puedes saltártelo.

## Conviene saber

- Por defecto funciona en tu equipo con [Ollama](https://ollama.com), así que tus mensajes no salen de él. También puedes apuntarlo a un servicio alojado; entonces los mensajes que lee sí salen de tu máquina, y Pando te lo avisa en la configuración.
- Es un modelo especializado, no un modelo de chat pequeño. Pando sugiere los que sirven y puede descargarlos por ti.
- Nunca te deja bloqueado. Si va lento, falta o duda, Pando sigue como si no estuviera: responde tu modelo habitual, decide el selector de persona de siempre y las notas llegan sin filtrar.
- El filtro de contexto solo usa un modelo de decisión local, salvo que permitas uno alojado.

## Siguientes pasos

- Guía: [Dale reflejos rápidos a Pando con un modelo de decisión]({{< relref "/guides/decision-model" >}}).
- Referencia: [Modo automático y modelo de decisión]({{< relref "/docs/configuration/auto-mode" >}}).
- Relacionado: [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}), [Enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}).
