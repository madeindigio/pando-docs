---
title: Built-in Tools Reference
weight: 40
---

Every option for the tools Pando ships with: reading web pages, searching the web, driving a browser, driving your desktop and converting documents. For the explanations see [Browser Automation]({{< relref "/docs/features/browser-automation" >}}), [Desktop Controller]({{< relref "/docs/features/desktop-controller" >}}) and [Document Conversion]({{< relref "/docs/features/markitdown" >}}); for the step-by-step see the guide [Give Pando eyes and hands]({{< relref "/guides/web-browser-desktop-tools" >}}).

All keys live in the `[InternalTools]` section of `.pando.toml`.

## Web reading and search

```toml
[InternalTools]
FetchEnabled            = true
FetchMaxSizeMB          = 10
GoogleSearchEnabled     = true
GoogleAPIKey            = ''
GoogleSearchEngineID    = ''
BraveSearchEnabled      = true
BraveAPIKey             = ''
PerplexitySearchEnabled = true
PerplexityAPIKey        = ''
ExaSearchEnabled        = false
ExaAPIKey               = ''
SourcegraphEnabled      = false
SourcegraphToken        = ''      # optional: the public service is used when empty
Context7Enabled         = true    # library documentation, no key needed
```

The fetch tool can read a page through a browser when the page needs JavaScript:

```json
{
  "url": "https://example.com",
  "format": "markdown",
  "browser": "auto"
}
```

`browser` accepts `auto`, `chrome`, `firefox`, `curl` and `http`.

## Browser

```toml
[InternalTools]
BrowserEnabled     = true
BrowserType        = 'chrome'
BrowserExecutable  = ''         # empty: find it automatically
BrowserHeadless    = false      # true: no visible window
BrowserTimeout     = 30         # seconds
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

| `BrowserType` | Browser |
|---|---|
| `chrome` | Google Chrome (default) |
| `msedge` | Microsoft Edge |
| `chromium` | Chromium |
| `opera` | Opera |
| `firefox` | Firefox (through the fetch tool) |
| `lightpanda` | Lightpanda, a light browser with no window |
| `obscura` | [Obscura](https://github.com/h4ckf0r0day/obscura), a fast browser with no window, written in Rust |

Lightpanda and Obscura are started by Pando as a background program and have no window and no user profile, so `BrowserHeadless` and `BrowserUserDataDir` do not apply to them. For Obscura, the `obscura` command must be in your `PATH`.

Browser sessions are shared from a pool limited by `BrowserMaxSessions`. If your normal browser profile is in use, Pando falls back to a temporary one.

| Tool | What the agent does with it |
|---|---|
| `browser_navigate` | Open an address |
| `browser_get_content` | Read the page: HTML, text or title |
| `browser_screenshot` | Take a picture of the page or of one element |
| `browser_click` | Click something |
| `browser_fill` | Fill a form field |
| `browser_scroll` | Scroll |
| `browser_evaluate` | Run JavaScript in the page |
| `browser_console_logs` | Read the page's console messages |
| `browser_network` | See the requests the page made |
| `browser_pdf` | Save the page as PDF |

## Desktop controller

```toml
[InternalTools]
DesktopEnabled            = false   # master switch
DesktopBackend            = 'auto'  # auto | atspi | uia | ax | cdp | null
DesktopAllowPhysicalInput = true    # allow a real mouse click or key press as fallback
DesktopMaxNodes           = 500     # most elements reported per look
DesktopDefaultDepth       = 3       # how deep to look into a window by default
DesktopActionTimeout      = 10      # seconds
DesktopSnapshotTTL        = 60      # seconds a look stays usable
DesktopScreenshotScale    = 1.0     # shrink screenshots before sending them to the model
DesktopAllowedApps        = []      # if set, only these apps can be touched
DesktopDeniedApps         = []      # never touched; wins over the allow list
```

| Key | What it is for |
|---|---|
| `DesktopBackend` | Leave on `auto`. Pando picks the right one for your system and, when a browser session is open, drives the browser through the same tools. Any other value pins that one |
| `DesktopAllowPhysicalInput` | When an app does not offer a proper way to act on an element, Pando can fall back to a real click or key press. `false` forbids that |
| `DesktopAllowedApps` / `DesktopDeniedApps` | The practical way to fence the agent in: allow only the app you are working on, deny your password manager, mail or terminal. Deny always wins |
| `DesktopScreenshotScale` | Lower it (for example `0.5`) to make screenshots cheaper |

| What the agent can do | Asks you first? |
|---|---|
| List running apps and their windows | no |
| Read a window's content and structure | no |
| Find an element by name or role | no |
| Wait for something to appear, disappear, become enabled or focused | no |
| Click, focus, type text, press a key or key combination, scroll | **yes** |
| Take a screenshot of the screen, a window or one element | **yes** |
| Click a raw screen position (last resort, by sight) | **yes** |

| Platform | What you need |
|---|---|
| Linux (X11) | An accessibility bus running (`org.a11y.Bus`); GNOME and KDE have it on by default |
| Linux (Wayland) | Say yes to the desktop dialog the first time. Your answer is remembered |
| macOS | Give Pando **Accessibility** permission (System Settings → Privacy & Security → Accessibility). Screenshots also need **Screen Recording** |
| Windows | Nothing extra |

The desktop tools can also be offered to other programs through `pando mcp-server`. They follow the same `DesktopEnabled` switch.

## Document conversion

No options. It works out of the box.

```bash
pando convert report.docx              # print the Markdown
pando convert data.xlsx -o data.md     # write it to a file
pando convert https://example.com/page.html
pando convert --list-formats
```

| Kind | Extensions |
|---|---|
| PDF | `.pdf` |
| Word | `.docx` |
| Excel | `.xlsx`, `.xls` |
| PowerPoint | `.pptx` |
| Web | `.html`, `.htm` |
| Data | `.csv` |
| E-book | `.epub` |
| Notebook | `.ipynb` |
| Feed | `.rss`, `.atom` |
| Markup | `.xml`, `.json`, `.jsonl` |
| Archive | `.zip` |
| Text | `.txt`, `.md`, `.markdown` |

To add a whole folder of documents to the knowledge base, converting on the way:

```bash
pando kb import /path/to/documents
```
