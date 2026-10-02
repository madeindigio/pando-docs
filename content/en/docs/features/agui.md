---
title: AG-UI for Web Apps
weight: 42
---

Pando can be the brain behind a chat box in your own web application. Your page is the shop counter; Pando is the workshop at the back, reading files, running tools and handing work to its crew. The two talk in [AG-UI](https://docs.ag-ui.com), the shared language used by [CopilotKit](https://www.copilotkit.ai) and similar toolkits.

It is **off by default**, because it puts an agent that can run code within reach of a browser.

## What it does for you

- **A real agent in your product.** Not a chat that only talks: one that works on a project.
- **Answers that arrive as they are written**, with the agent's activity shown alongside.
- **Approvals and questions inside your page.** When the agent needs permission or wants to ask something, your interface shows it.
- **Your page's own actions.** Buttons and functions you define can be used by the agent.
- **Live status to draw.** The model in use, the budget left, the to-do list, the files touched and the sub-agents at work arrive as data, ready to show as cards.
- **Several characters from one Pando.** A profile is a named agent with its own model, persona and tools. You can offer a careful "reviewer" and a hands-on "coder", each at its own address.

## How it feels in practice

A visitor types in your page. The answer streams in, with a small panel showing what the agent is doing. If they reload, the conversation is still there. If their connection drops, the work continues for two minutes; when they come back they get what they missed and then the live stream again. Even restarting Pando does not lose the thread.

## When to use it

Use it when you are building a web app and want an assistant in it that can really do things with a codebase or a set of files.

It is not meant for chatting with Pando yourself: for that there is the Web UI.

## Good to know

- Only the web addresses you list may connect, and every request needs an access token.
- The token stays the same between restarts, so you set it once in your page.
- Keep it listening on your own machine unless you put it behind your own gateway.
- Running it as its own process, apart from the Web UI, is the recommended way.

## Next steps

- Guide: [Use Pando from your editor and other apps]({{< relref "/guides/editors-and-other-apps" >}}) starts the server and connects a page.
- Reference: [commands, config keys, profiles and the client library]({{< relref "/docs/configuration/providers" >}}).
- Example: a complete Next.js app in [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).
