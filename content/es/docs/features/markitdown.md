---
title: Conversión de Documentos (MarkItDown)
weight: 17
---

Mucho de lo que sabe un proyecto no está en el código: está en PDF, documentos de Word, hojas de cálculo y presentaciones. Pando puede leer todo eso convirtiéndolo antes a texto plano, como un traductor que te deja leer un libro escrito en otro alfabeto.

## Qué hace por ti

- **Hace que tus documentos se puedan buscar.** La especificación en PDF, la lista de precios en una hoja de cálculo y las diapositivas del arranque pasan a formar parte de lo que Pando puede consultar.
- **Cubre los sospechosos habituales.** PDF, Word, Excel, PowerPoint, páginas web, CSV, libros electrónicos, notebooks, feeds, XML y JSON, y hasta ZIP con todo eso dentro.
- **No toca los originales.** Pando lee una copia en texto plano. Tus ficheros no cambian nunca.
- **No hay que configurar nada.** No hay nada que encender.

## Cómo se nota en el día a día

Dejas una carpeta con los documentos del proyecto en el sitio que Pando vigila para su base de conocimiento. Un rato después preguntas «¿qué decía el contrato sobre las fechas de entrega?» y Pando contesta citando el PDF.

También puedes convertir un fichero tú cuando solo quieres su texto:

```bash
pando convert report.pdf
```

## Cuándo usarlo

- Las decisiones de tu proyecto viven en documentos que nadie quiere volver a teclear.
- Quieres pegar el contenido de un fichero en un chat sin el lío del formato.

## Conviene saber

- Un PDF escaneado es la foto de una página, no texto. Esos salen vacíos.
- El formato se simplifica: quedan títulos, listas y tablas, no las fuentes ni los colores.
- El conversor se despierta solo cuando llega el primer documento, así que no hace más lento el arranque de Pando.

## Siguientes pasos

- Guía: [Enseña tu proyecto a Pando con Remembrances]({{< relref "/guides/remembrances" >}}) añade documentos a la base de conocimiento; [Dale ojos y manos a Pando]({{< relref "/guides/web-browser-desktop-tools" >}}) explica la conversión a mano.
- Referencia: [formatos y comandos]({{< relref "/docs/configuration/tools" >}}).
