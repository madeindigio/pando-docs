---
title: Modelos de embeddings para código
weight: 31
---

Qué modelos de embeddings sirven para el índice de código, con qué se entrenó cada uno y cómo se comparan. Para la idea, lee [Búsqueda de código por significado]({{< relref "/docs/features/code-embeddings" >}}); para la configuración en la Web UI, la guía [Elige un modelo que sepa leer código]({{< relref "/guides/code-search" >}}).

## Claves

```toml
[Remembrances]
UseSameModel          = false          # true = the code index uses the document model
CodeEmbeddingProvider = 'ollama'       # 'ollama', 'openai', 'anthropic' or 'openai-compatible'
CodeEmbeddingModel    = 'hf.co/ggml-org/jina-embeddings-v2-base-code-Q8_0-GGUF:Q8_0'
CodeEmbeddingBaseURL  = ''             # only for 'openai-compatible' or a remote Ollama
CodeEmbeddingAPIKey   = ''             # stored encrypted
```

Web UI: **Configuración > Remembrances > Code embeddings**. Con `UseSameModel = true`, o con los campos de código vacíos, el índice de código usa `DocumentEmbeddingProvider` y `DocumentEmbeddingModel`.

Después de cambiar de modelo, ejecuta **Re-index all** (**Configuración > Remembrances > Code indexing**). Los vectores hechos por otro modelo no son comparables, y la búsqueda se salta los vectores de otro tamaño.

## Modelos que funcionan en Ollama

Todos se descargaron y probaron con Ollama 0.35 en octubre de 2026. GGUF es el formato de fichero que carga Ollama; `hf.co/<usuario>/<repo>:<etiqueta>` descarga un fichero GGUF directamente de Hugging Face.

| Modelo | Tamaño | Vector | Contexto | Entrenado con | Licencia |
|---|---|---|---|---|---|
| CodeRankEmbed (137M) | 90 MB | 768 | 8192 | Código en Python, Java, JavaScript, PHP, Go, Ruby | MIT |
| CodeRankEmbed, menos comprimido | 146 MB | 768 | 8192 | Lo mismo | MIT |
| Jina Embeddings v2 Base Code (161M) | 172 MB | 768 | 8192 | Inglés y 30 lenguajes de programación | Apache 2.0 |
| Qwen3 Embedding 0.6B | 639 MB | 1024 | 32K | Texto en más de 100 idiomas, y código | Apache 2.0 |
| Nomic Embed Text v1.5 (texto general) | 274 MB | 768 | 8192 | Texto corriente | Apache 2.0 |

El nombre que hay que dar a Ollama y escribir en **Code embedding model**:

```bash
ollama pull hf.co/brandtcormorant/CodeRankEmbed-Q4_K_M-GGUF:Q4_K_M         # CodeRankEmbed
ollama pull hf.co/brandtcormorant/CodeRankEmbed-Q8_0-GGUF:Q8_0             # CodeRankEmbed, less compressed
ollama pull hf.co/ggml-org/jina-embeddings-v2-base-code-Q8_0-GGUF:Q8_0     # Jina Embeddings v2 Base Code
ollama pull qwen3-embedding:0.6b                                           # Qwen3 Embedding 0.6B
ollama pull nomic-embed-text                                               # Nomic Embed Text v1.5
```

Los 30 lenguajes de Jina v2 Base Code: Assembly, Batchfile, C, C#, C++, CMake, CSS, Dockerfile, FORTRAN, Go, Haskell, HTML, Java, JavaScript, Julia, Lua, Makefile, Markdown, PHP, Perl, PowerShell, Python, Ruby, Rust, SQL, Scala, Shell, TypeScript, TeX y Visual Basic.

Hay ficheros más pequeños de Jina v2 Base Code (desde 83 MB) en `hf.co/second-state/jina-embeddings-v2-base-code-GGUF`, con etiquetas como `Q4_K_M`.

## Una comparación pequeña

Es una comprobación casera, no un benchmark. 48 fragmentos (seis tareas, cada una escrita en Python, Go, TypeScript, Java, Rust, PHP, C# y shell) con nombres de función sin significado, para que el modelo tenga que leer el código. Para cada tarea se hace una pregunta en inglés llano y contamos cuántos de los ocho fragmentos correctos salen entre los ocho primeros resultados. La velocidad son trozos de 1.500 caracteres de ficheros reales procesados por segundo en una tarjeta gráfica de sobremesa; léela como proporción entre modelos, no como lo que obtendrás tú.

| Modelo | Respuestas correctas encontradas | Puntos flojos | Trozos por segundo |
|---|---|---|---|
| Nomic Embed Text (texto general) | 67 % | Go 0 de 6, shell 1 de 6 | unos 95 |
| CodeRankEmbed Q4_K_M | 88 % | shell 1 de 6 | unos 100 |
| CodeRankEmbed Q8_0 | 88 % | shell 1 de 6 | unos 100 |
| Jina v2 Base Code Q8_0 | 100 % | ninguno | unos 85 |
| Qwen3 Embedding 0.6B | 100 % | ninguno | unos 25 |

Cómo leerla:

- Un modelo de texto general es la opción floja para código, y la diferencia es mayor en los lenguajes que vio poco.
- CodeRankEmbed es el más ligero. Es fuerte en los seis lenguajes con los que se entrenó y más flojo fuera de ellos.
- Jina v2 Base Code es el que más lenguajes cubre para su tamaño y velocidad.
- Qwen3 Embedding lo iguala y además lee muchos idiomas, a cambio de cuatro veces más tiempo y espacio.
- El fichero más comprimido de CodeRankEmbed dio los mismos resultados que el grande.

CodeRankEmbed está pensado para recibir las preguntas con el prefijo `Represent this query for searching relevant code: `. Pando no lo añade. En la comprobación de arriba, el prefijo subió su resultado del 88 % al 92 %.

## Modelos que no funcionaron o no se probaron

| Modelo | Estado |
|---|---|
| `hf.co/limcheekin/CodeRankEmbed-GGUF:Q4_K_M` | El repositorio ya no es público en Hugging Face; una descarga nueva falla. Era el valor por defecto del asistente de configuración. Una copia que ya tengas en tu equipo sigue funcionando |
| `hf.co/jinaai/jina-code-embeddings-0.5b-GGUF` | Se descarga, pero Ollama responde `501 Not Implemented` al pedirle embeddings. Necesita un ajuste (pooling del último token) que Ollama no expone. Licencia no comercial |
| `nomic-embed-code` (7B) | No probado. De 2,8 GB a 7,5 GB: otra categoría de peso, lento sin una tarjeta gráfica grande |
| Qodo-Embed-1-1.5B | No probado. Solo hay ficheros GGUF de la comunidad (unos 1,6 GB); licencia propia (QodoAI-Open-RAIL-M) |

## Relacionado

- [Configuración de Remembrances]({{< relref "/docs/configuration/remembrances" >}}): el resto de claves del índice y la búsqueda.
