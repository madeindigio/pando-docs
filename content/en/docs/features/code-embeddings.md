---
title: Code Search by Meaning
weight: 14
---

Pando can find code by what it does, not only by the words in it. You ask "where do we check that a user is logged in?" and it goes to the right function even if the word "logged" appears nowhere. To do that it uses a small helper model that reads each piece of your code and files it by meaning, like a librarian who shelves books by subject and not by title.

Pando keeps two librarians: one for your notes and documents, one for your code. They can be the same model, but the search is better when the one for code was trained on code.

## Why a different model for code

A model trained on ordinary text reads code the way you would read sheet music without knowing music: it sees the symbols and misses the tune. It notices that two snippets share words, not that they do the same thing.

A model trained on code knows that a `for` loop in Go and a list comprehension in Python can be the same idea, that `strrev` and `[::-1]` both turn a string around, and that a function called `f` can still be a prime-number check. It matches your question to what the code does.

In a small test of ours, with the same six questions over snippets in eight languages, the general text model found two out of three right answers and missed every one written in Go. Models trained on code found from seven in eight up to all of them.

## What it does for you

- **Pando lands on the right file sooner.** Fewer wrong turns means fewer files opened and fewer tokens spent.
- **You ask in your own words.** No need to remember what the function is called.
- **It works across languages.** A project with Go, TypeScript and shell scripts is one map, not three.
- **It stays on your machine.** The helper model runs locally; your code is not sent anywhere to be indexed.

## How it feels in practice

Nothing changes in how you chat. Pando's own searches get better: when it looks for "the place where sessions are saved", the first results are the ones that matter. With [context enrichment]({{< relref "/docs/features/context-enrichment" >}}) on, those finds arrive with your message before Pando starts working.

## When to use it

Use a code model as soon as you index a real project. Keeping one model for everything is fine for a folder of notes with a few scripts.

## Good to know

- These helper models are small: from 90 MB to about 600 MB. The smallest are also the fastest, by a wide margin.
- Changing the model means drawing the map again. The old map was made by another librarian and the new one cannot read it.
- Not every model you find online works. Some need settings Ollama does not offer. The reference lists the ones we tried.
- Which model is best depends on the languages you write. The reference says what each one was trained on.

## Next steps

- Guide: [Choose a model that reads code]({{< relref "/guides/code-search" >}}).
- Reference: [Embedding models for code]({{< relref "/docs/configuration/embedding-models" >}}).
- Related: [Context enrichment]({{< relref "/docs/features/context-enrichment" >}}), [Persistent memory]({{< relref "/docs/features/persistent-memory" >}}).
