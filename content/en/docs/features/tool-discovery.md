---
title: Tool Discovery
weight: 14
---

Every tool Pando can use comes with a little instruction leaflet, and the model reads all the leaflets on every message. With five tools that is nothing. With a hundred, it is like starting each conversation by reading the manuals of every appliance in the house. Tool Discovery keeps the everyday tools on the workbench and the rest in a labelled drawer the model can search.

## What it does for you

- **Cheaper, faster messages.** The model stops paying to read leaflets for tools it will not use.
- **Connect as much as you like.** A dozen extra tool servers no longer weigh on every message.
- **Nothing gets lost.** When the model needs a tool from the drawer, it describes what it wants in plain words, finds it and uses it.
- **Your favourites stay out.** The tools you use most remain directly at hand.

## How it feels in practice

You do not see it. The everyday tools (reading, editing and searching files, running commands) are always on the workbench. When a task needs something unusual, such as creating an issue in your tracker, the model looks in the drawer first and then uses the tool. Once found, the tool stays on the workbench for the rest of the conversation.

It is one switch for everything: built-in tools, tools from extra servers and tools from scripts all follow the same rule.

## When to use it

Leave it on its automatic setting. With few tools it does nothing; it wakes up by itself once you pass a certain number (64 by default). Force it on if you want the leanest possible conversations, or off if you suspect the model is not finding a tool.

## Good to know

- It only changes what the model has in front of it at the start. Every tool remains available.
- The search matches the words of the request against each tool's name and description, so tools with clear descriptions are found more easily.

## Next steps

- Set the mode and the threshold: [Save tokens]({{< relref "/guides/save-tokens" >}})
- Option names, sources and how the search tool is called: [Token optimization reference]({{< relref "/docs/configuration/token-optimization" >}})
- Add more tools: [Connect MCP servers]({{< relref "/guides/mcp-servers" >}})
