---
title: Document Conversion (MarkItDown)
weight: 17
---

Much of what a project knows is not in code: it sits in PDFs, Word documents, spreadsheets and slides. Pando can read all of those by first turning them into plain text, like a translator who lets you read a book written in another alphabet.

## What it does for you

- **Makes your documents searchable.** The specification in a PDF, the price list in a spreadsheet and the kick-off slides become part of what Pando can look up.
- **Covers the usual suspects.** PDF, Word, Excel, PowerPoint, web pages, CSV, e-books, notebooks, feeds, XML and JSON, even ZIP archives of those.
- **Leaves the originals alone.** Pando reads a copy in plain text. Your files are never changed.
- **Needs no setup.** There is nothing to switch on.

## How it feels in practice

You drop a folder of project documents into the place Pando watches for its knowledge base. A little later you ask "what did the contract say about delivery dates?" and Pando answers, quoting the PDF.

You can also convert one file yourself when you just want its text:

```bash
pando convert report.pdf
```

## When to use it

- Your project's decisions live in documents nobody wants to retype.
- You want to paste the content of a file into a chat without the formatting mess.

## Good to know

- A scanned PDF is a photo of a page, not text. Those come out empty.
- Layout is simplified: you get headings, lists and tables, not the fonts and colours.
- The converter wakes up only when the first document arrives, so it does not slow Pando's start.

## Next steps

- Guide: [Teach Pando your project with Remembrances]({{< relref "/guides/remembrances" >}}) adds documents to the knowledge base; [Give Pando eyes and hands]({{< relref "/guides/web-browser-desktop-tools" >}}) covers converting by hand.
- Reference: [formats and commands]({{< relref "/docs/configuration/tools" >}}).
