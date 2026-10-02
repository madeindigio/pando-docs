---
title: Búsqueda de código por significado
weight: 14
---

Pando puede encontrar código por lo que hace, no solo por las palabras que lleva. Preguntas «¿dónde comprobamos que el usuario ha iniciado sesión?» y va a la función correcta aunque la palabra «sesión» no aparezca por ningún lado. Para eso usa un pequeño modelo ayudante que lee cada trozo de tu código y lo archiva por significado, como un bibliotecario que ordena los libros por tema y no por título.

Pando tiene dos bibliotecarios: uno para tus notas y documentos y otro para tu código. Pueden ser el mismo modelo, pero la búsqueda mejora cuando el del código se formó leyendo código.

## Por qué un modelo distinto para el código

Un modelo entrenado con texto corriente lee código como leerías tú una partitura sin saber música: ve los símbolos y se le escapa la melodía. Nota que dos fragmentos comparten palabras, no que hacen lo mismo.

Un modelo entrenado con código sabe que un bucle `for` en Go y una comprensión de listas en Python pueden ser la misma idea, que `strrev` y `[::-1]` le dan la vuelta a una cadena, y que una función llamada `f` puede ser una comprobación de números primos. Relaciona tu pregunta con lo que el código hace.

En una prueba pequeña que hicimos, con las mismas seis preguntas sobre fragmentos en ocho lenguajes, el modelo de texto general acertó dos de cada tres respuestas y falló todas las escritas en Go. Los modelos entrenados con código acertaron desde siete de cada ocho hasta todas.

## Qué hace por ti

- **Pando llega antes al fichero correcto.** Menos vueltas equivocadas son menos ficheros abiertos y menos tokens gastados.
- **Preguntas con tus palabras.** No hace falta recordar cómo se llama la función.
- **Funciona entre lenguajes.** Un proyecto con Go, TypeScript y scripts de shell es un solo mapa, no tres.
- **Se queda en tu máquina.** El modelo ayudante funciona en local; tu código no se envía a ningún sitio para indexarlo.

## Cómo se nota en el día a día

Nada cambia en tu forma de chatear. Mejoran las búsquedas del propio Pando: cuando busca «el sitio donde se guardan las sesiones», los primeros resultados son los que importan. Con el [enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}) activado, esos hallazgos llegan con tu mensaje antes de que Pando empiece a trabajar.

## Cuándo usarlo

Usa un modelo de código en cuanto indexes un proyecto de verdad. Un solo modelo para todo va bien para una carpeta de notas con unos pocos scripts.

## Conviene saber

- Estos modelos ayudantes son pequeños: de 90 MB a unos 600 MB. Los más pequeños son también los más rápidos, con diferencia.
- Cambiar de modelo obliga a dibujar el mapa otra vez. El mapa antiguo lo hizo otro bibliotecario y el nuevo no sabe leerlo.
- No todos los modelos que encuentres por internet funcionan. Algunos necesitan ajustes que Ollama no ofrece. La referencia lista los que hemos probado.
- Cuál es el mejor depende de los lenguajes en los que escribas. La referencia dice con qué se entrenó cada uno.

## Siguientes pasos

- Guía: [Elige un modelo que sepa leer código]({{< relref "/guides/code-search" >}}).
- Referencia: [Modelos de embeddings para código]({{< relref "/docs/configuration/embedding-models" >}}).
- Relacionado: [Enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}), [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}).
