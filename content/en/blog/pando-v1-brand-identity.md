---
title: "Pando v1: A New Identity — One Root, Many Agents"
date: 2026-09-25
tags: ["Brand", "Release", "WebUI", "Desktop"]
---

Pando is getting its v1 visual identity: a new symbol, a real palette, and a design system that now runs consistently across the Web UI, the desktop app, the TUI, and the standalone Mesnada orchestrator UI. The old mascot SVG is retired.

## The symbol — 木

The new mark is 木, the character for "tree": two curved strokes over a trunk, with three small circuit nodes woven into the branches. The idea is literal — **one root, many agents**. A single Pando instance, many subagents branching out from it.

The same monoline system extends to two sibling marks for Pando's other identities: **Remembrances** 本 (root / book — the gold stroke at the root stands for stored memory) and **Mesnada** 众 (crowd / retinue — a solid node for the lord, ring nodes for his mesnada). Same strokes, same nodes, different character.

The full palette, usage rules, and every downloadable asset now live on a dedicated page: [Brand & Identity](/docs/brand).

## A themeable Web UI to match

The identity ships alongside a broader **Web UI redesign** that's been landing over the last few releases. The interface now runs on a proper token-based design system: neutral surfaces, hairline borders, soft radii, and one restrained accent color instead of scattered ad-hoc styling.

Theming is now a real `family × mode × accent` model:

- **Family** — `pando` (the new default, built straight from Bosque/Marfil/Álamo), `paper`, `slate`, or `forest`.
- **Mode** — light, dark, or system.
- **Accent** — seven presets (gold, terracotta, violet, blue, green, rose, graphite) that override just the accent color on top of any family.

Pick any combination from Settings → Appearance. The `pando` family in dark mode uses Bosque backgrounds with Marfil text and Álamo as the accent; in light mode it uses a Marfil-tinted background with a darkened accent, because the raw Álamo oscuro gold doesn't clear WCAG AA as body text or button color — worth knowing if you're building your own UI surface on top of these tokens.

## Where you'll see it

- **Web UI** — the 木 mark pulses in the title bar while an agent is working, and appears on the splash screen and empty-chat state.
- **Desktop app** — the app icon (macOS, Windows) is generated from the new mark, and the window background now matches Bosque instead of the previous default.
- **TUI** — the `pando` theme applies the same palette to the terminal, the Remembrances and Mesnada sections in settings render their 本 / 众 glyphs in the accent color, and the boot/busy animation now cycles through 枝葉林森 instead of the old sequence.
- **Mesnada UI** — the standalone orchestrator interface picked up the Mesnada mark as its favicon, replacing a placeholder logo.

## Try it

Update to the latest Pando build and open Settings → Appearance in the Web UI to switch families and accents, or set `[TUI].theme = "pando"` in your config for the terminal. Everything about the identity — the palette table, the symbol family, and direct links to every SVG and PNG asset — is documented on the [Brand & Identity](/docs/brand) page.

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
