---
title: Browser Automation
weight: 24
---

Pando includes a full browser automation suite using chromedp, with support for multiple browser types including the lightweight Lightpanda browser.

## Browser Types

| Type | Description |
|------|-------------|
| `chrome` | Google Chrome (default) |
| `msedge` | Microsoft Edge |
| `chromium` | Chromium |
| `opera` | Opera |
| `firefox` | Firefox (via fetch tool) |
| `lightpanda` | Lightweight headless browser |
| `obscura` | Fast headless browser written in Rust |

## Available Tools

### Navigation & Content

- `browser_navigate` - Navigate to URL
- `browser_get_content` - Extract HTML, text, or title
- `browser_screenshot` - Capture page or element screenshot

### Interaction

- `browser_click` - Click on elements
- `browser_fill` - Fill form inputs
- `browser_scroll` - Scroll the page
- `browser_evaluate` - Execute JavaScript

### Analysis

- `browser_console_logs` - Get JavaScript console messages
- `browser_network` - Get network requests
- `browser_pdf` - Generate PDF of page

## Lightpanda Support

Lightpanda is a lightweight, headless browser designed for automation:

```toml
[InternalTools]
BrowserType = 'lightpanda'
```

Unlike local browsers, Lightpanda is launched as a CDP server process and connected via WebSocket. No user profile or headless flags apply.

## Obscura Support

[Obscura](https://github.com/h4ckf0r0day/obscura) is a small headless browser that starts quickly and uses little memory. It is a good fit for servers, containers and CI, where installing Chrome is heavy.

Install Obscura so that the `obscura` command is in your `PATH`, then select it:

```toml
[InternalTools]
BrowserType = 'obscura'
```

All the browser tools work with it: navigating, reading content, clicking, filling forms, running JavaScript and taking screenshots. Like Lightpanda, it has no window and no user profile.

## Configuration

{{< shot src="images/webui/pando-webui-settings-tools-browser.jpg" alt="Browser tool settings" >}}

```toml
[InternalTools]
BrowserEnabled = true
BrowserType = 'chrome'
BrowserExecutable = ''         # Auto-detect
BrowserHeadless = false
BrowserTimeout = 30            # seconds
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

## Fetch Tool Integration

The fetch tool supports browser backends for JavaScript-heavy pages:

```json
{
  "url": "https://example.com",
  "format": "markdown",
  "browser": "auto"
}
```

Browser backends: `auto`, `chrome`, `firefox`, `curl`, `http`

{{< callout >}}
Browser sessions are pooled with configurable limits. Profile lock detection automatically falls back to temp profiles when the default profile is in use.
{{< /callout >}}
