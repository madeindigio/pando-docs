---
title: Web-UI & PWA
weight: 3
---

All Pando's features are available via a web interface accessible from any modern browser. The Pando Web-UI offers a smooth, interactive experience, designed for any device with browser access—including desktops, laptops, tablets, and smartphones.

The web interface includes the following features:

- **Multi-language support**: UI available in English, Spanish, French, German, Portuguese, Chinese, Japanese, with more coming.
- **Chat interface and previous session loading**: Load any previous session from the sessions menu, or start a new one from the main screen.
- **Interactive configuration panel**: Access configuration from the main menu, where you can add AI providers, configure tools, and customize Pando.
- **Options and commands access**: Use the sidebar for commands and options, including opening interactive terminals, checking logs, launching sub-agents, and more.
- **Updated Command Launcher**: Launch any local shell command directly and safely from your browser using the newly updated, intuitive action bar.
- **Hot model/provider switching**: Change your AI model or provider at any time—no reload needed.
- **File navigation**: Use the sidebar file panel to open any text file with syntax highlighting, and edit files in the web interface—no external editor needed.
- **Multiple open files in tabs**: Open and switch between multiple files at once in Web-UI tabs.
- **Image and graphic viewing**: The interface supports agent-generated images and graphics directly in the UI.
- **Integrated terminal**: Open a real terminal in the web UI powered by xterm.js, supporting full shell interaction including zsh, command history, and ANSI colors.
- **Chat info sidebar**: A right-hand information panel showing session details, modified files, and repository info — similar to the TUI sidebar.
- **Basic authentication**: When binding to an external IP, enable basic auth to secure your Pando instance with a username and password.
- **Project workspaces**: open registered projects as bottom tabs that host a full child WebUI, with keep-alive restoration and project-local terminals. See [Project workspaces](../project-workspaces).
- **Design page**: create, preview and iterate design artifacts without leaving the browser, with live reload and a template gallery. See [Design Studio](../design-studio).
- **External access toggle in the footer**: make the running instance reachable from your phone or another machine without restarting. See [WebUI Access](../webui-access).
- **Fast session list**: sessions load progressively as you scroll, so a long history no longer slows down opening the app.
- **Working directory always visible**: the chat info panel shows which directory the session is operating on.
- **Knowledge base folder browser**: pick the indexed path from a folder browser in the Remembrances settings instead of typing it.
- **Embeddings model selector**: choose the embeddings model per provider directly in the Remembrances settings.
- **Simple & advanced views**: Switch between a basic chat/tools view and an advanced view showing all options and panels—ideal for users of all experience levels.

{{< callout >}}
The Pando Web-UI is fully responsive and adapts to any screen size, providing an optimal experience on desktop and mobile. In addition, it features **robust offline reconnection**, automatically retrying and restoring your chat session if you temporarily lose your network connection.
{{< /callout >}}

## Project workspaces

The unified shell can open a registered project as its own embedded workspace tab, reusing a background `pando serve` child for that project. The tab bar supports keep-alive restoration, project-local terminals, and keyboard navigation without leaving the parent WebUI.

For the full workflow, shortcuts, security model, and `[Projects]` configuration, see [Project workspaces](../project-workspaces).

## Projects workspace API

When the Projects view opens a project inside the unified Web-UI, it uses the parent server's REST API instead of exposing the child server directly:

| Endpoint | Purpose |
|---|---|
| `POST /api/v1/projects/{id}/web/open` | Start or reuse the project's background `pando serve` child. Returns `status` (`opened` or `already_open`), `project_id`, relative `web_url` (`/api/v1/projects/{id}/web/`) and `web_port`. |
| `POST /api/v1/projects/{id}/web/close` | Stop only the background WebUI child and return `cancelled_delegations`. |
| `GET /api/v1/projects/web` | List running project WebUI children as `instances[]` with `project_id`, `name`, `path`, `web_port`, `web_url`, `pid`, `state`, `started_at` and `delegations`. |
| `GET /api/v1/projects/events` | Streams `web_started`, `web_stopped` and `web_error` SSE events (alongside the existing project events) so the tab bar updates live. |

`GET /api/v1/projects` and `GET /api/v1/projects/{id}` now also include `web_state`, `web_port` and `web_url` so the browser can restore project tabs after a reload.

Semantics of the related control endpoints stay split by child type:

- `activate` starts or focuses the **ACP delegation child** for a project.
- `stop` stops both the ACP child and the background WebUI child when the current server owns them.
- `open-desktop` still opens a separate native desktop window and does not replace `web/open`.

{{< youtube 6ETefyLsaOM >}}
