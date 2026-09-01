---
title: "Pando August 2026: Design Studio, Desktop Control, and Extensions"
date: 2026-08-31
tags: ["Release", "Features", "Roundup", "Design", "Desktop Automation", "Extensions", "Copilot"]
---

August was about giving Pando hands and eyes. Two big new capabilities landed — a full **Design Studio** and a **Desktop Controller** that drives real applications on your screen — plus an extension system for shipping private modules, and a long list of quality-of-life work across the Web UI.

## Pando Designer

Pando can now design. You describe a landing page, a dashboard or a slide deck, and it builds a real HTML/CSS artifact, renders it in a headless browser, looks at the result, critiques its own work and iterates.

The parts that matter in daily use:

- **The preview opens by itself.** Ask for a design and a preview appears — a browser tab from the terminal, the Design page in the Web UI, a native window in the desktop app, a clickable link inside Zed or VS Code.
- **It reloads live.** Every change the agent makes refreshes the open preview. You watch the design being built instead of asking for screenshots.
- **The files are yours.** An artifact is a directory in your working tree (`designer/<slug>/`), committable and editable with any tool. Nothing hidden inside `.pando/`.
- **Versions.** Every accepted iteration is a version you can list, compare and go back to.
- **A shared design system.** Colours, type, spacing and radii live in one place and every artifact links to it — so everything looks like the same product.

The design system does not have to be invented, either. Point Pando at something that already looks right:

```bash
pando design system extract --from code            # your own stylesheets
pando design system extract https://example.com --from url
pando design system extract ./brand.png --from image
pando design system extract ./brand-guide.md --from text
```

There are bundled templates to start from (`landing-page`, `dashboard-page`, `web-prototype`, `deck-basic`, `magazine-deck`), craft references the agent reads while designing — typography, colour, layout, and an "anti-AI-slop" guide that keeps output from looking generic — and a quality gate that scores contrast, spacing, type scale and token usage before calling the work done.

From the shell:

```bash
pando design list
pando design open quarterly-review --slide 3
pando design export landing --format pdf
```

The Design Studio is **always on** — there is no flag to enable. Full details in [Design Studio](/docs/features/design-studio).

## Desktop Controller

Pando can now operate your desktop: list open applications, read what is on screen, click, type, press keys, scroll and take screenshots — on Windows, macOS and Linux (X11 and Wayland).

The interesting part is how. Most agents that "use a computer" screenshot the screen and ask a vision model to guess pixel coordinates. Pando reads the **accessibility tree** instead — the same semantic description screen readers use — so it works with real elements ("the Save button"), not pixels. That is dramatically cheaper in tokens and far more reliable: actions do not miss because a window moved or a dialog animated. Screenshots remain a fallback for interfaces with no usable structure, and any result obtained that way is explicitly marked as such.

If a browser session is open it shows up as one more application, so a workflow can cross freely between a web page and a native "Save As" dialog.

It is **off by default**:

```toml
[InternalTools]
DesktopEnabled     = true
DesktopAllowedApps = ["Firefox"]     # scope it
DesktopDeniedApps  = ["1Password"]   # deny always wins
```

Reading is free; anything that clicks, types or captures the screen asks your permission first. Read the [Desktop Controller](/docs/features/desktop-controller) page — particularly the security section — before turning it on.

## Extensions

Pando has a formal extension system now: optional modules compiled into the binary that can add tools, HTTP routes, UI panels and memory behaviour. It is how private and enterprise capabilities ship without forking Pando.

Most people do not need one — an MCP server, a Lua hook or a skill is usually the cheaper answer, and there is a [decision table](/docs/features/extensions) that says which. But when something genuinely has to reach Pando's core, or ship as a single executable, it now has a supported path.

```bash
pando extensions list      # what this binary contains, and what loaded
pando --version            # v0.9.1 (enterprise)
```

Standard builds are unchanged.

## One switch for MCP tools

Tool Discovery and the MCP gateway used to be two parallel mechanisms with their own tools and their own switches. They are now one: `ToolDiscovery.Enabled`.

With it on, your favourite MCP tools stay directly visible, and everything else — however many servers you have connected — stays out of the context window and is reached through `tool_search`, which now both finds *and* runs tools, MCP ones included. Connect a dozen servers without paying for their entire catalog on every message.

## Reasoning effort, per model

Models disagree about the "how hard should I think" dial: some accept only `high`, some only `low` and `high`, some nothing at all. Pando now knows what the selected model actually supports, offers you only those values, clamps anything out of range, and picks a sensible default instead of failing mid-task. The ACP selectors in Zed, VS Code and JetBrains rebuild themselves when you switch models. See [Thinking & Reasoning Effort](/docs/features/reasoning-modes).

## GitHub Copilot: organization BYOK models

If your organization added its own models to Copilot through BYOK — OpenRouter, Gemini, others routed through GitHub — they now appear in Pando's model picker exactly as they do in VS Code. On a Business seat that typically means twenty or more extra models. Nothing to configure: log in normally.

## External access without a restart

The Web UI footer now has an **External access** toggle. Flip it and the running instance becomes reachable from your phone or another machine — no restart, no `--host 0.0.0.0`, multiple clients at once. Works in `pando serve`, `pando app` and the desktop app. Basic auth is enforced the instant you enable it, so there is no window where the instance sits open and unprotected.

## Context enrichment as an agent

Context enrichment can now run as a small dedicated agent that iteratively searches memory, the knowledge base, past events and the code index until it has what it needs — instead of a single round of searches. It runs on its own cheap model, appears as a child session you can open and inspect, tells you in chat what it is doing and how much it added, and falls back to the classic search if it comes back empty.

By default it only runs on the first message of a session, which is where the value is.

```toml
[Remembrances]
ContextEnrichmentAgentLoopEnabled = true
```

## Web UI

- **Design page**, with the template gallery and live preview.
- **Sessions load progressively** as you scroll — a long history no longer slows down opening the app.
- **Sessions and chats of other running Pando instances** are listed again.
- **Working directory** is always visible in the chat info panel.
- **Modified files** panel works with every provider, not only streaming ones.
- **Change tracking** shows the actual diff of a session rather than counting the whole repository.
- **Knowledge base folder browser** and a **per-provider embeddings model selector** in the Remembrances settings.
- **Questions from the agent survive a reconnect** — reload the page and the pending question is still there.
- External links in chat open in a new window instead of replacing the app.

## Also in August

- **AG-UI personas**: `pando agui-serve --persona <name>` applies a persona to every run, so a Generative-UI frontend gets a consistently voiced assistant.
- **Fresh installs behave**: no phantom provider entries, no hardcoded default models — the first provider and model you configure is what gets used.
- **macOS desktop app**: copy and paste work from the application menu; startup and refresh issues fixed.
- **TOON 4.1**: Pando's structured tool-output format was brought up to the current specification, including nested field groups and keyed tables — the same compact output, more of it representable.
- Security and dependency hardening across the board, plus the usual round of CI fixes.

## What's next

More live validation of the Desktop Controller on Windows and macOS, more design artifact kinds, and continued work on the extension surface.

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
