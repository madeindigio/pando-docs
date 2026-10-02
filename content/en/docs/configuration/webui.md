---
title: Web UI, Desktop and Terminal Options
weight: 20
---

Every option behind the surfaces of Pando. For the explanation see [Web UI]({{< relref "/docs/features/web-ui" >}}), [Desktop app]({{< relref "/docs/features/desktop-app" >}}) and [Terminal UI]({{< relref "/docs/features/terminal-interface" >}}). For step-by-step instructions see the guides [Find your way around the Web UI]({{< relref "/guides/webui-tour" >}}), [Projects and workspace tabs]({{< relref "/guides/projects-workspaces" >}}), [Remote access]({{< relref "/guides/remote-access" >}}) and [Design Studio]({{< relref "/guides/design-studio" >}}).

## Ways to start Pando

| Command | What opens |
|---|---|
| `pando` | Terminal UI in the current folder |
| `pando app` | Web UI and API on one port (default `8765`, HTTPS with an automatic certificate) |
| `pando desktop` | The same interface in a native window |
| `pando serve` | API only, no interface |
| `pando -p "..."` | One answer, no interface |
| `pando cli-assist "..."` | A shell command suggested from plain language |

`pando app` and `pando serve` flags:

| Flag | Default | Meaning |
|---|---|---|
| `--host` | `localhost` | Address to listen on. `0.0.0.0` makes Pando reachable from the network |
| `--port` | `8765` | Preferred port |
| `--tls-cert`, `--tls-key` | automatic | Your own certificate and key |

Flags of `pando` without a command:

| Flag | Meaning |
|---|---|
| `-c <path>` | Start in that folder |
| `-p "<prompt>"` | Run one prompt and exit. Also read from standard input or `PANDO_PROMPT` (priority: `-p`, stdin, variable, interactive) |
| `-m <model>` | Model for this run, for example `copilot.gpt-5.4` |
| `-f json` / `--output-format json` | Answer as JSON |
| `--goal "<objective>"` | Run an autonomous goal and exit |
| `--yolo` / `--allow-all-tools` | Approve every tool without asking |
| `--quiet` | Print only the answer |
| `-d` | Debug logging; `-l <file>` writes it to a file |
| `-v` | Print the version |

## Server and access

```toml
[Server]
Enabled     = true
Host        = "localhost"   # "0.0.0.0" or a network address to accept other devices
Port        = 9999
RequireAuth = false         # protect API endpoints with a bearer token

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "alice"
Password = "alice-password"

[[Server.BasicAuth.Users]]
Username = "bob"
Password = "bob-password"
```

The same in `.pando.json`:

```json
{
  "server": {
    "host": "0.0.0.0",
    "basicAuth": {
      "enabled": true,
      "users": [
        { "username": "admin", "password": "your-secure-password" }
      ]
    }
  }
}
```

| Key | Meaning |
|---|---|
| `Server.Enabled` | Turn the HTTP API on or off. Needs a restart |
| `Server.Host` | `localhost` keeps Pando on this machine. `0.0.0.0` or a specific address opens it to the network. Needs a restart when changed here; the footer toggle changes it live |
| `Server.Port` | Port of the API. Needs a restart |
| `Server.RequireAuth` | Ask for a bearer token on API calls |
| `Server.BasicAuth.Enabled` | Ask for username and password |
| `Server.BasicAuth.Users` | List of `Username` / `Password` pairs. Passwords are saved encrypted with AGE |

When username and password apply:

| Pando listens on | Reachable from other devices | Sign-in asked |
|---|---|---|
| `localhost` or `127.0.0.1` | No | No. The setting stays inactive |
| `0.0.0.0` or a network address | Yes | Yes, for every client |

You cannot enable sign-in without at least one user, and deleting the last user turns it off.

Managing users over the API (replace port and names):

```bash
# Add
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "securepass"}'

# Delete
curl -X DELETE http://localhost:3939/api/v1/config/api-server/basic-auth/users/username

# Reveal a password
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users/username/reveal
```

## Project workspaces

```toml
[Projects]
Enabled           = true
AutoRestore       = false
MaxProjects       = 20
MaxWebInstances   = 6
WebStartupTimeout = "20s"
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Turn the Projects feature on or off |
| `AutoRestore` | `false` | Reactivate the last active project when Pando starts |
| `MaxProjects` | `20` | How many projects can be registered. `0` means no limit |
| `MaxWebInstances` | `6` | How many project tabs may run in the background at once. `0` means no limit |
| `WebStartupTimeout` | `"20s"` | How long Pando waits for a project tab to start before giving up |

Keyboard shortcuts of the tab bar:

| Keys | Action |
|---|---|
| `Ctrl+Alt+1..9` | Go to the main tab or one of the first project tabs |
| `Ctrl+Alt+Left` / `Ctrl+Alt+Right` | Previous / next tab |
| `Ctrl+Alt+W` | Close the active project tab |

API used by the Projects view:

| Endpoint | Purpose |
|---|---|
| `POST /api/v1/projects/{id}/web/open` | Start or reuse the project's background workspace. Returns `status` (`opened` or `already_open`), `project_id`, relative `web_url` (`/api/v1/projects/{id}/web/`) and `web_port` |
| `POST /api/v1/projects/{id}/web/close` | Stop only the background workspace and return `cancelled_delegations` |
| `GET /api/v1/projects/web` | List running workspaces as `instances[]` with `project_id`, `name`, `path`, `web_port`, `web_url`, `pid`, `state`, `started_at` and `delegations` |
| `GET /api/v1/projects/events` | Stream of `web_started`, `web_stopped` and `web_error` events so the tab bar updates live |

`GET /api/v1/projects` and `GET /api/v1/projects/{id}` also include `web_state`, `web_port` and `web_url`, so the browser can restore tabs after a reload. `activate` starts or focuses the delegation child of a project, `stop` stops both the delegation child and the background workspace, and `open-desktop` opens a separate native window.

How a project tab is kept private: it listens only on this machine (`127.0.0.1`); the main Pando talks to it over TLS with a certificate it generated itself; its access token never reaches the browser; the browser gets a cookie that is valid only for that project's path; and the tab stops when the main Pando exits.

## Design Studio

```toml
[Design]
OutputDir   = 'designer'   # project-relative folder that holds the designs
SystemDir   = '_system'    # sub-folder that holds the design system
DefaultKind = 'web'        # 'web' or 'deck'

[Design.Critique]
Enabled   = true
MaxRounds = 3        # designer/critic rounds per request
Threshold = 8.0      # score to beat, out of 10
Policy    = 'standard'

[MCPServer.Design]
Enabled = false      # publish the design_* tools through Pando's MCP server
```

Commands:

```bash
pando design create "Landing page"             # create an empty design
pando design create "Q3 review" --skill deck-basic
pando design list                              # every design in the project
pando design open                              # open the most recent one
pando design open quarterly-review --slide 3   # jump to a slide
pando design versions landing                  # version history (--json for scripts)
pando design critique landing                  # run the quality check
pando design export landing --format html --out /tmp/landing.html
pando design export deck --format pdf --landscape
pando design export landing --format png --full-page

pando design skills                            # list templates and references
pando design skills show deck-basic

pando design system init                       # write the default system if none exists
pando design system show                       # print the current tokens
pando design system examples                   # list the bundled style guides
pando design system extract --from code        # from your stylesheets and components
pando design system extract https://example.com --from url
pando design system extract ./brand.png --from image     # colours only
pando design system extract ./brand-guide.md --from text
pando design system apply landing              # link the system into a design
```

`pando design open` keeps a local preview running until you press Ctrl+C; `--no-wait` opens the file directly and returns (relative assets and element selection do not work in that mode). `extract` accepts `--dry-run`. Bundled templates: `landing-page`, `web-prototype`, `dashboard-page`, `deck-basic`, `magazine-deck` and `design-system-extract` (a workflow, not a scaffold).

| Kind | For |
|---|---|
| `web` | Web pages and prototypes: landing pages, dashboards, marketing sites |
| `deck` | Slide decks, with print styles so the PDF paginates correctly |

Design system files, in `designer/_system/`: `tokens.json` (the source of truth), `system.css` (generated) and `DESIGN.md` (the written rules the agent follows).

## Terminal UI

```toml
[TUI]
Theme               = 'pando'   # pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai; add -nobg for a transparent background
ShowHiddenFiles     = false
NerdFonts           = true      # false draws plain characters instead of icon glyphs
ChatSidebar         = 'auto'    # 'auto' or 'off'
ChatSidebarMinWidth = 120       # terminal width, in columns, at which the sidebar appears

[Permissions]
AutoApproveTools = false
```

`PANDO_NERD_FONTS=0` turns icon glyphs off for one run.

| Keys | Action |
|---|---|
| `Ctrl+N` | New session |
| `Ctrl+S` | Load a previous session. While the agent works: queue your message as feedback |
| `Ctrl+G` | Settings |
| `Ctrl+P` | Commands and options |
| `Ctrl+R` | File panel |
| `Ctrl+H` | Shortcuts of the current view |
| `Ctrl+T` | Switch theme |
| `Alt+1` / `Alt+2` / `Alt+3` | Chat / Editor / Editor and chat |
| `Ctrl+Shift+B` | Show or hide the chat info sidebar |
| `Ctrl+Shift+H` | Show or hide hidden files |
| `Ctrl+Shift+N` | New file in the file tree |
| `Shift+Tab` | Approve tools automatically, on or off |
| `Ctrl+U` | Show or hide the terminal panel |
| `Ctrl+Y` / `Ctrl+Shift+Y` | New terminal tab / switch terminal tab |
| `Up` / `Down` | Previous messages you sent |
| `@` | Pick a file to mention |
| `/` | Slash commands |

The status bar shows, left to right as space allows: a help button, the files you edited last, the active project, how full the conversation's context is (with a `~` while the agent runs and a warning from 80%), an auto-approve badge, the number of MCP gateway favourites, code-checker errors and warnings, and the model name. Every zone can be clicked.

The chat info sidebar shows the session title, language-server status, the plan with each step's state, modified files with their change counts, and the repository address and working folder. The file tree marks git status (`+`, `-`, `?`, `→`).

## Questions and feedback

```toml
[InternalTools]
AskUserQuestionDisabled = true   # the agent can no longer ask you structured questions
```

A question round has 1 to 4 questions, each with 2 to 4 options, an automatic "Other" free-text choice, optional multi-select, and a header of up to 12 characters.

Sending feedback to a running session over the API:

```bash
curl -X POST http://localhost:8766/api/v1/sessions/:id/steer \
  -H "Content-Type: text/plain" \
  -d "Focus on the authentication module instead"
```

## Your own slash commands

Markdown files become commands:

| Folder | Shown as |
|---|---|
| `<data-dir>/commands/` | `project:command-name` |
| `~/.config/pando/commands/` or `~/.pando/commands/` | `user:command-name` |

## Building the desktop app from source

```bash
make build-desktop
```
