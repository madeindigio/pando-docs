---
title: Conversión de Documentos (MarkItDown)
weight: 17
---

Pando integra la biblioteca MarkItDown para convertir formatos de documentos ricos a Markdown para la ingestión en la Base de Conocimiento y RAG (Generación Aumentada por Recuperación).

## Formatos Soportados

| Formato | Extensiones |
|---------|-------------|
| PDF | `.pdf` |
| Word | `.docx` |
| Excel | `.xlsx`, `.xls` |
| PowerPoint | `.pptx` |
| Web | `.html`, `.htm` |
| Datos | `.csv` |
| E-book | `.epub` |
| Notebook | `.ipynb` |
| Feed | `.rss`, `.atom` |
| Markup | `.xml`, `.json`, `.jsonl` |
| Archivo | `.zip` |
| Texto | `.txt`, `.md`, `.markdown` |

## Uso CLI

Convierte un archivo individual:

```bash
pando convert documento.pdf
pando convert presentacion.pptx
```

## Integración con KB

Al sincronizar un directorio con la Base de Conocimiento, Pando convierte automáticamente los documentos soportados:

```bash
pando kb import /ruta/a/documentos
```

Los documentos en formatos soportados (`.pdf`, `.docx`, `.xlsx`, `.pptx`, etc.) se convierten automáticamente a Markdown antes de indexar.

## Configuración

No se necesita configuración explícita. La conversión se habilita automáticamente cuando el convertidor está disponible.

El motor de conversión se inicializa de forma lazy para evitar costos de inicio del procesamiento PDF.

## Cómo Funciona

1. La sincronía de KB detecta un archivo que no es Markdown
2. Verifica si la extensión está en la lista soportada
3. Convierte a Markdown usando el parser apropiado
4. Indexa el contenido Markdown con metadatos de front-matter
5. El archivo original no se modifica

{{< callout >}}
Coloca documentos que quieras indexar en un directorio monitoreado por KB. Se convertirán automáticamente y serán buscables. Esto es ideal para documentación del proyecto, especificaciones y docs de diseño almacenados como PDFs o documentos Office.
{{< /callout >}}
