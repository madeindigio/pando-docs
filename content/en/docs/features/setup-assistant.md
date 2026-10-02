---
title: Setup Assistant
weight: 40
---

The first time you open Pando in the Web UI or the desktop app, a setup assistant walks you through the minimum you need to start working: where to save your settings, which AI provider to use, which models, and whether you want memory and code search.

It opens by itself when nothing is configured yet. You can also open it at any time from the configuration banner, with **Setup assistant**.

## The steps

### 1. Where to save your settings

{{< shot src="images/webui/pando-webui-setup-assistant-scope.jpg" dark="images/webui/pando-webui-setup-assistant-scope-dark.jpg" alt="Setup assistant: where to save the settings" >}}

- **Global** (recommended): the settings apply to every project on this machine.
- **This directory only**: the settings stay with this project.

### 2. Provider

{{< shot src="images/webui/pando-webui-setup-assistant-provider.jpg" dark="images/webui/pando-webui-setup-assistant-provider-dark.jpg" alt="Setup assistant: provider accounts" >}}

Pick the AI provider you want to use: GitHub Copilot, Anthropic, OpenAI, Gemini, OpenRouter, Groq, xAI, Ollama or any OpenAI-compatible service. Each one shows what it needs and a link to get an API key.

If you already have accounts configured, the assistant offers to keep using them.

With **GitHub Copilot** there is no key to paste. The assistant shows a code, you open GitHub, enter it, and the assistant continues by itself when the login completes. If your editor is already signed in to Copilot, that step is skipped.

### 3. Models

{{< shot src="images/webui/pando-webui-setup-assistant-models.jpg" dark="images/webui/pando-webui-setup-assistant-models-dark.jpg" alt="Setup assistant: main and secondary model" >}}

Choose two models:

- the **main model**, which writes and reasons about your code
- a **fast, cheap model** for small background jobs, such as naming sessions or summarising

The assistant suggests suitable models from the provider you picked.

### 4. Memory and code search (Remembrances)

{{< shot src="images/webui/pando-webui-setup-assistant-remembrances.jpg" dark="images/webui/pando-webui-setup-assistant-remembrances-dark.jpg" alt="Setup assistant: Remembrances embedding models" >}}

This step is optional. Remembrances gives Pando long-term memory and semantic search over your code and documents, and it runs locally with [Ollama](https://ollama.com).

- If Ollama is not installed, the assistant shows how to install it on your system. Where it can, it offers to run the install for you after you confirm.
- If Ollama is installed but stopped, there is a **Start Ollama** button.
- When Ollama is running, you download the two models it needs with a button and a progress bar.

You can skip this step and turn Remembrances on later from Settings.

### 5. Done

A summary of what was configured. Press **Finish** and start chatting.

## Cancelling

**Cancel assistant**, the close button or `Esc` close the assistant at any step. Nothing is lost: the usual settings screens are still there and you can configure everything by hand.

{{< callout >}}
The assistant is part of the Web UI and the desktop app. In the terminal interface you configure providers and models from the settings screen, as before.
{{< /callout >}}
