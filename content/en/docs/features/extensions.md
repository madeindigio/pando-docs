---
title: Extensions
weight: 36
---

An extension is an extra organ grafted into Pando itself: a module that is built into the program and can add tools, screens and behaviour from the inside. It is how companies ship private features without keeping their own copy of Pando.

For most people it is also the last thing to reach for. Pando has lighter ways to learn new tricks, and they are usually the right ones.

## Which way of extending do I need?

Pick the first row that does the job:

| You want to… | Use | Think of it as |
|---|---|---|
| Give the model a new tool, written in any language | **MCP server** | Plugging an appliance into a power strip |
| Teach a procedure or a repeatable way of working | **Skill or slash command** | A recipe card |
| Nudge Pando at a precise moment with a small script | **Lua hook** | A sticky note on the fridge |
| Describe a new kind of AI provider or model | **Custom engine template** | An adapter plug |
| Reach Pando's insides, or ship inside the program | **Extension** | Surgery |

An MCP server is a separate program you can restart and configure per project. An extension is decided when the program is built, and someone has to build it. Code you do not fully trust belongs in an MCP server, which runs apart; an extension runs inside Pando with full access.

## When an extension is the right choice

1. **It needs to reach the core**: deciding which tools exist, changing what a memory search returns, adding a protected web address to Pando's own server, reacting to internal events. Nothing else can see those.
2. **It must travel in the program**: one file to deploy, nothing extra to install.
3. **It is yours and trusted**: if you would not merge the code into Pando itself, run it as an MCP server instead.

## What an extension can add

- **Tools**, and rules that wrap or filter all the others.
- **Slash commands**, shown like the built-in ones.
- **Web addresses** on Pando's own server, behind its login.
- **Panels and pages** in the Web UI, or a whole replacement interface.
- **Memory behaviour**: watching what gets remembered and enriching what a search returns.
- **Licensing checks**, for commercial modules.
- **Managed settings**: values supplied from a central place, with the ones you must not change locked. Locked settings appear greyed out in the settings screens.
- **Sign-in**: your organisation's login, with the right credentials attached to requests to AI providers.
- **Interface policy**: hiding or disabling parts of the interface that do not apply in your organisation.
- **Events and prompts**: reacting to what happens, such as a model being chosen or a session ending, and running prompts of its own.

## How it feels in practice

If you use a standard Pando download, nothing changes: it has no extensions and behaves as always. If your company gives you its own build, you see its extras as ordinary parts of the app, and `pando --version` shows the build name, for example `v0.9.1 (enterprise)`.

A program that was not built with an extension cannot switch it on later. That is deliberate: it makes the boundary a real wall and not a setting someone can flip.

## Good to know

- Settings can only choose which of the built-in extensions load, and hand them their options.
- An extension has no sandbox of its own. Treat it like any code that becomes part of the program.
- A company build shows the normal Web UI unless one of its extensions brings its own.

## Next steps

- Start with the lighter options: [Write your first skill]({{< relref "/guides/first-skill" >}}) and [Connect MCP servers]({{< relref "/guides/mcp-servers" >}})
- Settings, commands and how to build a program with extensions: [Skills, Lua and extensions reference]({{< relref "/docs/configuration/skills-and-extensions" >}})
