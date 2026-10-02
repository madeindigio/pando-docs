---
title: Embedding Models for Code
weight: 31
---

Which embedding models work for the code index, what each was trained on and how they compare. For the idea, read [Code search by meaning]({{< relref "/docs/features/code-embeddings" >}}); for the setup in the Web UI, the guide [Choose a model that reads code]({{< relref "/guides/code-search" >}}).

## Keys

```toml
[Remembrances]
UseSameModel          = false          # true = the code index uses the document model
CodeEmbeddingProvider = 'ollama'       # 'ollama', 'openai', 'anthropic' or 'openai-compatible'
CodeEmbeddingModel    = 'hf.co/ggml-org/jina-embeddings-v2-base-code-Q8_0-GGUF:Q8_0'
CodeEmbeddingBaseURL  = ''             # only for 'openai-compatible' or a remote Ollama
CodeEmbeddingAPIKey   = ''             # stored encrypted
```

Web UI: **Settings > Remembrances > Code embeddings**. With `UseSameModel = true`, or with the code fields empty, the code index uses `DocumentEmbeddingProvider` and `DocumentEmbeddingModel`.

After changing the model, run **Re-index all** (**Settings > Remembrances > Code indexing**). Vectors made by another model are not comparable, and vectors of a different size are skipped by the search.

## Models that work in Ollama

All were pulled and tested with Ollama 0.35 in October 2026. GGUF is the file format Ollama loads; `hf.co/<user>/<repo>:<tag>` pulls a GGUF file directly from Hugging Face.

| Model | Size | Vector | Context | Trained on | License |
|---|---|---|---|---|---|
| CodeRankEmbed (137M) | 90 MB | 768 | 8192 | Code in Python, Java, JavaScript, PHP, Go, Ruby | MIT |
| CodeRankEmbed, less compressed | 146 MB | 768 | 8192 | Same | MIT |
| Jina Embeddings v2 Base Code (161M) | 172 MB | 768 | 8192 | English and 30 programming languages | Apache 2.0 |
| Qwen3 Embedding 0.6B | 639 MB | 1024 | 32K | Text in 100+ human languages, and code | Apache 2.0 |
| Nomic Embed Text v1.5 (general text) | 274 MB | 768 | 8192 | Ordinary text | Apache 2.0 |

The name to give Ollama and to type in **Code embedding model**:

```bash
ollama pull hf.co/brandtcormorant/CodeRankEmbed-Q4_K_M-GGUF:Q4_K_M         # CodeRankEmbed
ollama pull hf.co/brandtcormorant/CodeRankEmbed-Q8_0-GGUF:Q8_0             # CodeRankEmbed, less compressed
ollama pull hf.co/ggml-org/jina-embeddings-v2-base-code-Q8_0-GGUF:Q8_0     # Jina Embeddings v2 Base Code
ollama pull qwen3-embedding:0.6b                                           # Qwen3 Embedding 0.6B
ollama pull nomic-embed-text                                               # Nomic Embed Text v1.5
```

The 30 languages of Jina v2 Base Code: Assembly, Batchfile, C, C#, C++, CMake, CSS, Dockerfile, FORTRAN, Go, Haskell, HTML, Java, JavaScript, Julia, Lua, Makefile, Markdown, PHP, Perl, PowerShell, Python, Ruby, Rust, SQL, Scala, Shell, TypeScript, TeX and Visual Basic.

Smaller files of Jina v2 Base Code (from 83 MB) are in `hf.co/second-state/jina-embeddings-v2-base-code-GGUF`, with tags such as `Q4_K_M`.

## A small comparison

This is a home-made check, not a benchmark. 48 snippets (six tasks, each written in Python, Go, TypeScript, Java, Rust, PHP, C# and shell) with meaningless function names, so the model has to read the code. For each task a plain-English question is asked and we count how many of the eight right snippets are among the first eight results. Speed is 1,500-character pieces of real source files embedded per second on one desktop graphics card; read it as a ratio between models, not as what you will get.

| Model | Right answers found | Weak spots | Pieces per second |
|---|---|---|---|
| Nomic Embed Text (general text) | 67 % | Go 0 of 6, shell 1 of 6 | about 95 |
| CodeRankEmbed Q4_K_M | 88 % | shell 1 of 6 | about 100 |
| CodeRankEmbed Q8_0 | 88 % | shell 1 of 6 | about 100 |
| Jina v2 Base Code Q8_0 | 100 % | none | about 85 |
| Qwen3 Embedding 0.6B | 100 % | none | about 25 |

Reading it:

- A general text model is the weak choice for code, and the gap is largest in languages it saw little of.
- CodeRankEmbed is the lightest. It is strong in the six languages it was trained on and weaker outside them.
- Jina v2 Base Code covers the most languages for its size and speed.
- Qwen3 Embedding matches it and also reads many human languages, at four times the cost in time and space.
- The more compressed CodeRankEmbed file gave the same results as the larger one.

CodeRankEmbed is designed to receive questions with the prefix `Represent this query for searching relevant code: `. Pando does not add it. In the check above the prefix raised its result from 88 % to 92 %.

## Models that did not work or were not tried

| Model | Status |
|---|---|
| `hf.co/limcheekin/CodeRankEmbed-GGUF:Q4_K_M` | The repository is no longer public on Hugging Face; a new pull fails. It was the default of the setup assistant. A copy already on your machine keeps working |
| `hf.co/jinaai/jina-code-embeddings-0.5b-GGUF` | Downloads, but Ollama answers `501 Not Implemented` when asked for embeddings. It needs a setting (last-token pooling) that Ollama does not expose. Non-commercial license |
| `nomic-embed-code` (7B) | Not tried. From 2.8 GB to 7.5 GB: a different weight class, slow without a large graphics card |
| Qodo-Embed-1-1.5B | Not tried. Only community GGUF files (about 1.6 GB); own license (QodoAI-Open-RAIL-M) |

## Related

- [Remembrances configuration]({{< relref "/docs/configuration/remembrances" >}}): the rest of the index and search keys.
