---
title: Design Studio
weight: 6
---

Pando Designer turns the agent into a visual designer. You describe what you want — a landing page, a dashboard, a slide deck — and Pando builds a real HTML/CSS artifact, renders it, screenshots it, critiques its own work, and iterates until it meets the quality bar.

The Design Studio is **always active**. There is no flag to turn it on.

## What you get

- **Real files, in your repository.** An artifact is a directory in your working tree (`designer/<slug>/` by default) with `index.html`, its assets and a small manifest. It is committable, editable with any tool, and reviewable in a pull request.
- **Live preview everywhere.** The preview opens by itself when the agent creates an artifact — a browser tab from the TUI, the Design page in the WebUI, a native window in the desktop app, and a clickable resource link inside Zed/VS Code over ACP.
- **Live reload.** Every time the agent changes the design, the open preview refreshes on its own. You watch the design being built.
- **Versions you can go back to.** Each accepted iteration is a version. You can list the history, compare, and check out an earlier one.
- **A shared design system.** Colours, typography, spacing and radii live in one place, and every artifact links to it, so all your designs look like the same product.
- **Exports.** HTML (self-contained), PNG and PDF.

## Getting started

Just ask. In any surface (TUI, WebUI, desktop, Zed):

```
Design a landing page for my CLI tool, dark, developer-focused,
with a hero, three feature cards and a pricing table.
```

Pando creates the artifact, opens the preview, and starts iterating. Keep talking to it:

```
Make the hero less busy and increase the contrast on the buttons.
```

To have the directory exist before you start (so you can commit it first):

```bash
pando design create "Landing page"
pando design create "Q3 review" --skill deck-basic
```

## Artifact kinds

| Kind | For |
|------|-----|
| `web` | Web pages and prototypes — landing pages, dashboards, marketing sites |
| `deck` | Slide decks, with print styles so PDF export paginates correctly |

## Templates and craft references

Pando ships design templates you can scaffold from, and craft references the agent reads while designing (typography, colour, layout, and an "anti-AI-slop" guide that keeps output from looking generic).

```bash
pando design skills              # list templates and references
pando design skills show deck-basic
```

Bundled templates: `landing-page`, `web-prototype`, `dashboard-page`, `deck-basic`, `magazine-deck`, and `design-system-extract` (a workflow, not a scaffold).

In the WebUI, the Design page has a gallery with a **Try it** starter prompt for each template.

## The design system

One shared set of tokens for the whole project, in `designer/_system/`: `tokens.json` (the source of truth), `system.css` (generated) and `DESIGN.md` (the written contract the agent must follow).

```bash
pando design system init        # write the default system if none exists
pando design system show        # print the current tokens
pando design system examples    # list the bundled style guides
```

### Extracting a system from something that already looks right

Instead of inventing a look, point Pando at one:

```bash
# From your own codebase's stylesheets and components
pando design system extract --from code

# From a live page
pando design system extract https://example.com --from url

# From a screenshot or a logo (colours only)
pando design system extract ./brand.png --from image

# From a written style guide, or a bundled example
pando design system extract ./brand-guide.md --from text
```

Add `--dry-run` to see what would be extracted without writing anything. Prose you wrote in `DESIGN.md` is always preserved.

### Applying it to an existing artifact

```bash
pando design system apply landing
```

This links the system into the artifact and reports every hardcoded colour or size that should have been a token.

## Quality gate (the critic loop)

After each iteration, a critic pass scores the artifact against automated rules — contrast and accessibility, spacing consistency, typography scale, use of design tokens, and generic "AI-looking" patterns. If the score is below the threshold, the designer iterates again.

```bash
pando design critique landing
```

Configure the bounds:

```toml
[Design.Critique]
Enabled   = true
MaxRounds = 3        # designer/critic iterations per brief
Threshold = 8.0      # score to beat, out of 10
Policy    = 'standard'
```

Both roles run on the model you selected as coder — the critic differs by prompt, not by model, so there is no second provider to configure.

## Working from the shell

```bash
pando design list                              # every artifact in the project
pando design open                              # open the most recent one
pando design open quarterly-review --slide 3   # jump to a slide
pando design versions landing                  # version history
pando design versions landing --json           # for scripting

pando design export landing --format html --out /tmp/landing.html
pando design export deck --format pdf --landscape
pando design export landing --format png --full-page
```

`pando design open` runs a local preview server and keeps it alive until you press Ctrl+C. Use `--no-wait` to open the file directly and return immediately (relative assets and element selection are not available in that mode).

## Configuration

```toml
[Design]
OutputDir   = 'designer'   # project-relative directory holding artifacts
SystemDir   = '_system'    # sub-directory holding the design system
DefaultKind = 'web'        # 'web' or 'deck'

[Design.Critique]
Enabled   = true
MaxRounds = 3
Threshold = 8.0
Policy    = 'standard'
```

## Sharing a preview

Previews are served by the same server as the WebUI, so the [external access toggle](../webui-access) applies: flip it in the WebUI footer and the preview URL becomes reachable from your phone or another machine on the network. Basic auth is enforced automatically as soon as you do.

## Exposing design tools to other agents

The `design_*` tools can be published through Pando's own MCP server, so another agent can create and iterate designs through Pando:

```toml
[MCPServer.Design]
Enabled = true
```

Off by default. The Design Studio itself works regardless of this setting — it only controls MCP exposure.

{{< callout >}}
Artifacts live in your working tree, so they are versioned twice: by Pando's own version history, and by your normal git workflow. Nothing is hidden inside `.pando/`.
{{< /callout >}}
