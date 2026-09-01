---
title: Desktop Controller
weight: 35
---

The Desktop Controller lets Pando see and drive the graphical desktop: list open applications, read what is on screen, click buttons, fill fields, press keys and take screenshots — on Windows, macOS and Linux (X11 and Wayland).

**Off by default.** Read [Security](#security) before enabling it.

## Why it is different from "computer use"

Most agents that control a computer take a screenshot, ask a vision model to guess where things are, and click blind coordinates. Pando reads the **accessibility tree** instead — the same semantic description of the screen that screen readers use. The agent works with real elements ("the Save button"), not pixels.

That means:

- **Far cheaper.** A list of matching elements is a few lines; a screenshot is thousands of vision tokens.
- **Far more reliable.** Actions do not miss because a window moved, a dialog animated, or the display scaling changed.
- **Screenshots stay as a fallback**, used only for interfaces that expose no usable structure at all (canvas apps, games, remote desktops). Any result obtained that way is explicitly marked as coming from vision.

## What the agent can do

| Capability | Asks for permission? |
|---|---|
| List running apps and their windows | no |
| Read a window's content and structure | no |
| Find an element by name or role | no |
| Wait for something to appear, disappear, become enabled or focused | no |
| Click, focus, type text, press a key or chord, scroll | **yes** |
| Take a screenshot of the screen, a window or one element | **yes** |
| Click a raw screen coordinate (vision fallback) | **yes** |

Reading is free; anything that touches the screen or changes state asks you first, through the same permission prompt as file edits and shell commands.

## Enabling it

In `.pando.toml`:

```toml
[InternalTools]
DesktopEnabled = true
```

Or from the interface:

- **TUI**: Settings → Internal Tools → Desktop Controller
- **WebUI**: Settings → Internal Tools → "Desktop Controller (Accessibility Automation)"

## Configuration

```toml
[InternalTools]
DesktopEnabled            = false   # master switch
DesktopBackend            = 'auto'  # auto | atspi | uia | ax | cdp | null
DesktopAllowPhysicalInput = true    # allow synthetic mouse/keyboard fallback
DesktopMaxNodes           = 500     # max elements reported per observation
DesktopDefaultDepth       = 3       # how deep to look into a window by default
DesktopActionTimeout      = 10      # seconds
DesktopSnapshotTTL        = 60      # seconds an observation stays usable
DesktopScreenshotScale    = 1.0     # shrink screenshots before sending them to the model
DesktopAllowedApps        = []      # if set, only these apps can be touched
DesktopDeniedApps         = []      # never touched; wins over the allow list
```

| Key | What it is for |
|---|---|
| `DesktopBackend` | Leave on `auto`. Pando picks the right accessibility API for your OS and, when a browser session is open, drives the browser through the same tools. Setting anything else pins that one backend. |
| `DesktopAllowPhysicalInput` | When an application does not support a proper accessibility action, Pando can fall back to a real mouse click or keystroke. Set to `false` for a strictly semantic-only mode. |
| `DesktopAllowedApps` / `DesktopDeniedApps` | The practical way to scope the agent: allow only the app you are working on, and deny your password manager, mail client or terminal. Deny always wins. |
| `DesktopScreenshotScale` | Lower it (e.g. `0.5`) to cut the token cost of screenshots. |

## Browser windows

If a browser session is already open, it shows up as one more application on the desktop and can be driven with the same tools.

Use the **browser tools** (`browser_navigate`, `browser_click`, …) when you already know the URL, the CSS selector or the JavaScript you need, or you want network and console data. Use the **desktop tools** when the browser is part of a wider workflow that also touches native windows — a file picker, a native "Save As" dialog, switching focus between apps — or when you only know an element by what it says on screen.

Pando never launches a browser just because you used a desktop tool.

## Platform requirements

| Platform | What you need |
|---|---|
| **Linux (X11)** | An accessibility bus running (`org.a11y.Bus`), enabled by default in GNOME/KDE. |
| **Linux (Wayland)** | Explicit consent through the desktop portal dialog the first time. Wayland has no global input or screenshot API without it. Consent is remembered between runs. |
| **macOS** | Grant Pando **Accessibility** permission (System Settings → Privacy & Security → Accessibility). Screenshots additionally need **Screen Recording**. |
| **Windows** | Nothing extra. |

If a permission is missing, Pando says so explicitly and tells you which one — it never silently pretends a capability exists.

## Maturity

Honest status, so you know what to expect:

- **Browser control**: fully verified end to end.
- **Linux / AT-SPI**: verified against a real accessibility bus.
- **Windows / macOS**: implemented and built for those platforms, but not yet validated against a real desktop by the maintainers. Treat them as early support and report what you find.

## Using it from other tools

The desktop tools can also be published through Pando's MCP server, so another MCP client can drive the desktop through Pando:

```bash
pando mcp-server
```

Exposure is opt-in and follows the same `DesktopEnabled` switch.

## Security

Enabling this gives the agent the ability to act on your desktop as if it were you.

- It is **off by default** and needs an explicit switch.
- Every mutating action and every screenshot goes through a permission prompt.
- Screenshots capture your whole screen, including anything else you have open — that is why they prompt even though they change nothing.
- Blind coordinate clicks are worded as such in the prompt, so you always know when the agent is acting without semantic certainty.
- Use `DesktopAllowedApps` to keep the agent inside the application you are actually working on.
- Set `DesktopAllowPhysicalInput = false` if you never want synthetic input generated on your machine.

{{< callout type="warning" >}}
Do not enable the Desktop Controller in an unattended or auto-approve setup unless you have scoped it with an allow list. A permission prompt is only a protection while there is a human reading it.
{{< /callout >}}
