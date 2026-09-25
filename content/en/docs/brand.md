---
title: Brand & Identity
weight: 6
---

Pando's v1 visual identity: the symbol, the palette, the type, and where each one shows up across the app. This page is for anyone writing docs, building a screenshot, contributing a UI patch, or packaging Pando for a new platform and needing the right asset.

## The symbol — 木

The mark is 木, the Chinese/Japanese character for "tree": two curved strokes over a trunk, plus three small circuit nodes woven into the branches. The idea behind it — **one root, many agents** — is literal: a single Pando instance, many subagents branching out from it.

The strokes are monoline (constant width, rounded caps and joins) so the mark stays legible from a 16px favicon up to a full wordmark lockup.

## Palette

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#0F2A20;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Bosque | `#0F2A20` | Brand background / ink — the dark green every mark sits on, and the stroke color used on light backgrounds |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#F4F1E8;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Marfil | `#F4F1E8` | The stroke color on dark backgrounds — warm off-white, never pure white |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#E9B949;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Álamo | `#E9B949` | Accent — the circuit nodes and highlights **on dark backgrounds only** |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#C68A17;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Álamo oscuro | `#C68A17` | Accent — nodes and small marks **on light backgrounds only** |

{{< callout type="warning" >}}
**Álamo oscuro is for marks, not for text.** `#C68A17` on Marfil or white reads as ~2.6:1 contrast — it fails WCAG AA for body copy, labels, or buttons. Use it for the circuit-node dots and small brand accents only. When the WebUI needs an accessible accent color for light-mode UI text and controls, it computes a darker `#8f6310` instead — see [Where the brand appears](#where-the-brand-appears-in-pando) below.
{{< /callout >}}

## Typography

- **Space Grotesk**, weights 500–600, for the wordmark and headings. In the logo files the wordmark is already converted to paths, so it renders correctly even where the font isn't installed.
- **JetBrains Mono** for the TUI, code samples, and any monospaced label.

## The symbol family

Pando's mark is the root of a small family. Every section keeps the same system — monoline strokes in Marfil or Bosque, accent-colored circuit nodes — with its own character standing in for what that section does:

| Section | Character | Idea | Mark (light bg / dark bg) |
|---|---|---|---|
| **Pando** | 木 — tree | One root, many trunks | <img src="/images/brand/pando-mark-dark.svg" alt="Pando mark" class="brand-logo-light-only" width="28" height="30" /><img src="/images/brand/pando-mark-light.svg" alt="Pando mark" class="brand-logo-dark-only" width="28" height="30" /> |
| **Remembrances** | 本 — root / book | The gold stroke at the root is stored memory | <img src="/images/brand/remembrances-mark-dark.svg" alt="Remembrances mark" class="brand-logo-light-only" width="28" height="28" /><img src="/images/brand/remembrances-mark-light.svg" alt="Remembrances mark" class="brand-logo-dark-only" width="28" height="28" /> |
| **Mesnada** | 众 — crowd / retinue | The lord as a solid node, his mesnada as the ring around him | <img src="/images/brand/mesnada-mark-dark.svg" alt="Mesnada mark" class="brand-logo-light-only" width="28" height="28" /><img src="/images/brand/mesnada-mark-light.svg" alt="Mesnada mark" class="brand-logo-dark-only" width="28" height="28" /> |

<div class="brand-family">
  <figure><img src="/images/brand/pando-icon.svg" alt="Pando icon" width="56" height="56" /><figcaption>Pando 木</figcaption></figure>
  <figure><img src="/images/brand/remembrances-icon.svg" alt="Remembrances icon" width="56" height="56" /><figcaption>Remembrances 本</figcaption></figure>
  <figure><img src="/images/brand/mesnada-icon.svg" alt="Mesnada icon" width="56" height="56" /><figcaption>Mesnada 众</figcaption></figure>
</div>

## Logo lockups

The full logo pairs the mark with the Space Grotesk wordmark. There are two color variants — pick the one that matches the color of the **background**, not the mark itself:

<p>
<img src="/images/brand/pando-logo-dark.svg" alt="Pando logo, dark ink" class="brand-logo-light-only" width="220" height="58" />
<img src="/images/brand/pando-logo-light.svg" alt="Pando logo, light ink" class="brand-logo-dark-only" width="220" height="58" />
</p>

- `pando-logo-dark.svg` — Bosque-colored strokes, for **light backgrounds**.
- `pando-logo-light.svg` — Marfil-colored strokes, for **dark backgrounds**.

Yes, the naming is backwards from what it sounds like at first: the suffix names the color of the *ink*, not the background. `-dark` is dark ink (used on light backgrounds), `-light` is light ink (used on dark backgrounds).

## Assets

All source files live in `assets/pando-brand-v1/` in the main [pando](https://github.com/digiogithub/pando) repository — that folder is the single source of truth. The most commonly needed files are also published here for direct download:

| File | Use |
|---|---|
| [pando-logo-dark.svg](/images/brand/pando-logo-dark.svg) | Full logo (mark + wordmark), dark ink, for light backgrounds |
| [pando-logo-light.svg](/images/brand/pando-logo-light.svg) | Full logo, light ink, for dark backgrounds |
| [pando-mark-dark.svg](/images/brand/pando-mark-dark.svg) | Symbol only, dark ink, for light backgrounds |
| [pando-mark-light.svg](/images/brand/pando-mark-light.svg) | Symbol only, light ink, for dark backgrounds |
| [pando-icon.svg](/images/brand/pando-icon.svg) | App icon — mark on a Bosque tile, self-contained (works on any background) |
| [pando-icon-256.png](/images/brand/pando-icon-256.png) | App icon, 256×256 raster |
| [remembrances-mark-dark.svg](/images/brand/remembrances-mark-dark.svg) / [-light.svg](/images/brand/remembrances-mark-light.svg) | Remembrances 本 symbol, dark / light ink |
| [remembrances-icon.svg](/images/brand/remembrances-icon.svg) | Remembrances app/section icon |
| [mesnada-mark-dark.svg](/images/brand/mesnada-mark-dark.svg) / [-light.svg](/images/brand/mesnada-mark-light.svg) | Mesnada 众 symbol, dark / light ink |
| [mesnada-icon.svg](/images/brand/mesnada-icon.svg) | Mesnada app/section icon |

Additional formats (Windows `.ico`, macOS `.icns`, monochrome variants, and the full PNG size ladder from 16px to 1024px) live alongside the SVGs in the source repository.

## Where the brand appears in Pando

- **WebUI** — the 木 mark sits in the title bar next to "Pando" (it pulses while an agent is working) and on the splash screen. The `pando` theme family in Settings → Appearance is derived straight from this palette: dark mode uses Bosque backgrounds, Marfil text, and Álamo as the accent; light mode uses a Marfil-tinted background with the darkened `#8f6310` accent for AA contrast. It's one of four families (`pando`, `paper`, `slate`, `forest`), each available in light/dark with a choice of accent color.
- **Desktop app** — the app icon (macOS `.icns`, Windows `.ico`) is generated from `pando-icon.svg`, and the window background matches Bosque.
- **TUI** — the `pando` theme applies the same Bosque/Marfil/Álamo palette to the terminal UI. The Remembrances and Mesnada sections in settings and the orchestrator header use the 本 and 众 glyphs in the accent color, and the boot/busy animation cycles through 枝葉林森 (branch, leaf, forest, grove — all tree-adjacent characters).
- **Mesnada UI** (the standalone orchestrator interface) — uses the Mesnada mark as its favicon.

## Contributing

If you're adding a new UI surface or packaging Pando somewhere new, reuse the SVGs in `assets/pando-brand-v1/` rather than redrawing the mark — the stroke widths and node placement are tuned to stay legible at small sizes, and redrawing tends to drift. If you need a size, format or color variant that doesn't exist yet, open an issue or a PR against the [pando](https://github.com/digiogithub/pando) repository.
