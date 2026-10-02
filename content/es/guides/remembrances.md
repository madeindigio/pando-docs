---
title: "Enseña tu proyecto a Pando con Remembrances"
shortTitle: "Enseña tu proyecto a Pando"
description: "Dale a Pando una libreta, una biblioteca y un mapa de tu código para que deje de preguntar lo mismo dos veces."
summary: "Una libreta, una biblioteca y un mapa de tu código."
track: roots
level: intermediate
weight: 10
home: true
kanji: "本"
---

Al terminar esta guía Pando conocerá tu código, leerá tus notas y recordará de un día para otro lo que decidas. Necesitas Pando abierto en un proyecto y [Ollama](https://ollama.com) instalado. Si pasaste por el [asistente de configuración]({{< relref "/guides/setup-providers-models" >}}), Ollama y sus dos pequeños modelos ayudantes ya están ahí.

Todo se hace desde la Web UI. La app de escritorio es la misma interfaz.

## Activa Remembrances

Abre **Configuración** y, en **Servicios**, entra en **Remembrances**. Activa **Enabled**.

{{< shot src="images/webui/pando-webui-settings-remembrances.jpg" alt="Ajustes de Remembrances con el interruptor Enabled y las opciones de la base de conocimiento" >}}

Imagina esta página como tres estantes: una biblioteca para tus documentos, un mapa de tu código y una libreta para datos sueltos. Los pasos siguientes llenan cada uno.

## Dale una forma de leer

Para encontrar las cosas por lo que significan, y no solo por la palabra exacta, Pando usa un pequeño modelo ayudante que funciona en tu propio equipo. No se envía nada fuera.

En **Document embeddings**:

1. En **Embedding provider** elige **ollama**.
2. En **Embedding model** elige **nomic-embed-text**. Pulsa **Refresh** si la lista sale vacía.
3. Pulsa **Test connection**. Un **OK** en verde significa que el ayudante responde.

{{< shot src="images/webui/pando-webui-settings-remembrances-document-embeddings.jpg" alt="Document embeddings: proveedor, modelo y un OK en verde tras probar la conexión" >}}

En **Code embeddings** puedes activar **Use same model as document** y listo, o elegir un modelo que lea mejor el código. El código se encuentra mejor con un modelo entrenado con código: la guía [Elige un modelo que sepa leer código]({{< relref "/guides/code-search" >}}) te ayuda a elegir uno e instalarlo.

{{< shot src="images/webui/pando-webui-settings-remembrances-code-embeddings.jpg" alt="Code embeddings con su propio proveedor y modelo" >}}

## Dibuja el mapa de tu código

Baja hasta **Context enrichment**. Junto a **Code project**, pulsa **+ Index workdir**. Pando recorre la carpeta que tienes abierta y construye un índice, como el que llevan los libros al final.

{{< shot src="images/webui/pando-webui-settings-remembrances-chunking-context.jpg" alt="Chunking, indexado de código y enriquecimiento de contexto, con el botón Index workdir" >}}

La primera pasada tarda en un proyecto grande. Después, elige tu proyecto en la lista **Code project**. Si algún día el mapa se queda viejo, **Re-index all** lo vuelve a dibujar desde cero.

## Llena la biblioteca con tus notas

Arriba del todo, en **KB filesystem sync**:

1. En **KB path**, pulsa **Browse…** y elige la carpeta donde guardas tus notas en Markdown. Una carpeta `.kb` dentro del proyecto es un buen sitio.
2. Deja activado **Watch KB path** para que una nota que edites se recoja al momento.
3. Deja activado **Auto import on startup** para que la biblioteca se ponga al día cada vez que arranca Pando.
4. Activa **Convert documents** si ahí también guardas ficheros Word, PDF o Excel. Pando los lee como si fueran notas.
5. **Wiki links** permite que las notas se enlacen entre sí con `[[dobles corchetes]]`, como las páginas de una wiki.

## Deja que Pando consulte por su cuenta

Sin salir de **Context enrichment**, activa **Enable context enrichment**. A partir de ahora, antes de responder, Pando echa un vistazo discreto a la biblioteca y al mapa y se trae lo que parece útil. Es la diferencia entre el compañero que llega a la reunión en blanco y el que se ha leído el expediente por el camino.

- **KB results** y **Code results** dicen cuántos hallazgos puede traer cada vez. Empieza con los valores que ves.
- **Past session events** añade lo que pasó en conversaciones anteriores.

Para una búsqueda más a fondo, activa **Agent loop enrichment**: un pequeño ayudante hace varias rondas de búsqueda y le entrega al agente principal solo el resumen.

{{< shot src="images/webui/pando-webui-settings-remembrances-context-enrichment.jpg" alt="Interruptores del bucle de enriquecimiento y filtro de relevancia" >}}

- **Run on every message** viene desactivado: el ayudante trabaja una vez, en el primer mensaje de la sesión, que es cuando Pando menos sabe.
- **Announce in chat** muestra una línea en el chat mientras trabaja.
- **Fallback to search** mantiene la búsqueda sencilla como red de seguridad.
- **Show loop in chat** guarda el trabajo del ayudante como una pequeña sesión aparte que puedes abrir y leer.

Más abajo, el **Filtro de relevancia con el modelo de decisión** puede descartar los hallazgos que no encajan con tu pregunta. Necesita un [modelo de decisión]({{< relref "/guides/decision-model" >}}).

## Abre la libreta

Al final, en **Memory system**, activa **Memory enabled**. Esta es la libreta: datos cortos como «aquí usamos pnpm» o «los tests se lanzan con `make test`».

{{< shot src="images/webui/pando-webui-settings-remembrances-memory.jpg" alt="Ajustes del sistema de memoria" >}}

Activa **Auto-inject in context** si quieres que Pando ojee la libreta antes de cada respuesta. **Context max items** dice cuántas notas puede leer cada vez. **Default TTL (days)** es lo que vive una nota si nadie vuelve a mirarla.

Pulsa **Guardar**.

## Comprueba que funciona

Abre una sesión nueva y prueba tres cosas:

1. Pregunta por tu código sin nombrar ningún fichero: «¿Dónde comprobamos que el usuario ha iniciado sesión?». Pando debería ir directo al sitio.
2. Cuéntale algo que merezca guardarse: «Recuerda que desplegamos los viernes». Luego, en otra sesión: «¿Cuándo desplegamos?».
3. Pregunta por algo que solo esté en tus notas.

{{< under-surface >}}
En tu primer mensaje Pando buscó en la biblioteca, en el mapa del código y en la libreta, y coló los mejores hallazgos delante de tu pregunta. Tú solo viste la respuesta.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| **Test connection** falla | Ollama no está en marcha. Arráncalo y pulsa **Refresh** |
| La lista de modelos está vacía | Descarga el ayudante: `ollama pull nomic-embed-text` |
| Pando no parece conocer tu código | Comprueba que hay un proyecto elegido en **Code project** y pulsa **Re-index all** |
| No encuentra una nota que acabas de escribir | Comprueba que **KB path** apunta a la carpeta correcta y que **Watch KB path** está activado |
| Las respuestas tardan más | Baja **KB results** y **Code results**, o desactiva **Run on every message** |

## ¿Prefieres la terminal?

Todo lo de esta página es también una línea de tu fichero de configuración. Lo básico:

```toml
[Remembrances]
ContextEnrichmentEnabled = true
MemoryEnabled = true
KBPath = '.kb'
```

La lista completa de opciones está en la [referencia de Remembrances]({{< relref "/docs/configuration/remembrances" >}}). Para entender para qué sirve cada estante, lee [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}) y [Enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}).
