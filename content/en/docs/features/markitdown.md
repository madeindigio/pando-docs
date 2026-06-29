---
title: Document Conversion (MarkItDown)
weight: 17
---

Pando integrates the MarkItDown library to convert rich document formats into Markdown for Knowledge Base ingestion and RAG (Retrieval-Augmented Generation).

## Supported Formats

| Format | Extensions |
|--------|------------|
| PDF | `.pdf` |
| Word | `.docx` |
| Excel | `.xlsx`, `.xls` |
| PowerPoint | `.pptx` |
| Web | `.html`, `.htm` |
| Data | `.csv` |
| E-book | `.epub` |
| Notebook | `.ipynb` |
| Feed | `.rss`, `.atom` |
| Markup | `.xml`, `.json`, `.jsonl` |
| Archive | `.zip` |
| Text | `.txt`, `.md`, `.markdown` |

## CLI Usage

Convert a single file:

```bash
pando convert document.pdf
pando convert presentation.pptx
```

## KB Integration

When syncing a directory to the Knowledge Base, Pando automatically converts supported documents:

```bash
pando kb import /path/to/documents
```

Documents in supported formats (`.pdf`, `.docx`, `.xlsx`, `.pptx`, etc.) are automatically converted to Markdown before indexing.

## Configuration

No explicit configuration needed. Conversion is enabled automatically when the converter is available.

The conversion engine is lazily initialized to avoid startup costs from PDF processing.

## How It Works

1. KB sync detects a non-Markdown file
2. Checks if the extension is in the supported list
3. Converts to Markdown using the appropriate parser
4. Indexes the Markdown content with front-matter metadata
5. Original file is not modified

{{< callout >}}
Place documents you want indexed in a KB-watched directory. They'll be automatically converted and searchable. This is ideal for project documentation, specifications, and design docs stored as PDFs or Office documents.
{{< /callout >}}
