---
title: "Connect MCP servers"
shortTitle: "Connect MCP servers"
description: "Plug extra tools into Pando, sign in to the ones that ask for it, and see them at work in a chat."
summary: "Plug in extra tools and sign in to them."
track: soil
level: intermediate
weight: 20
---

An MCP server is a box of extra tools that someone else built: one talks to your issue tracker, another to your database, another to your design files. Think of Pando as a workbench with a power strip, and of each MCP server as something you plug into it. At the end of this guide you will have one plugged in and working.

You need Pando open in the Web UI (the desktop app is the same interface) and the details of the server you want to add: either the command that starts it or its web address.

## Open the MCP servers screen

Go to **Settings > MCP Servers**. The first time the list is empty.

{{< shot src="images/webui/pando-webui-settings-mcp-servers.jpg" alt="MCP servers screen with no servers yet" >}}

Press **Add Server**.

## Add a server that runs on your machine

Many servers are small programs that Pando starts for you. For these, leave **Type** on **stdio**.

1. **Name**: a short name you will recognise, such as `files`.
2. **Command**: the program to run, exactly as the server's instructions say. For example `npx @modelcontextprotocol/server-filesystem`.
3. **Arguments**: anything that goes after the command, written as you would in a terminal.
4. **Environment variables**: if the server needs a key or a setting, type its name on the left, its value on the right, and press **Add**.
5. Press **Save**.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-stdio.jpg" alt="Add MCP Server dialog for a program on your machine" >}}

## Add a server that lives on the internet

Other servers are already running somewhere and you only need their address. Set **Type** to **SSE** or **Streamable HTTP**; the server's instructions say which one.

1. **Name**: again, something short.
2. **URL**: the address they gave you.
3. **Headers**: only if the instructions ask for one.
4. Leave **Auth Type** on **None** for now and press **Save**.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-sse.jpg" alt="Add MCP Server dialog for a server on the network" >}}

## Sign in, if the server asks for it

A server on the internet usually wants to know who you are, the way a building asks for a badge at the door. Open the server again and pick the kind of badge in **Auth Type**:

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-http-auth.jpg" alt="Kinds of sign-in for an MCP server" >}}

| Pick | When | What you fill in |
|---|---|---|
| **Bearer token** | They gave you an API key. The most common case | The key |
| **Basic (username/password)** | They gave you a user and a password | Both |
| **Custom header** | The key must travel in a header with its own name | The header name and the key |
| **OAuth 2.1 (authorization code)** | You sign in through the browser, like "Sign in with…" on a website | Usually nothing: leave Client ID empty unless they gave you one |

Save. For the first three, that is all.

For **OAuth**, there is one more move the first time: open a terminal and run

```bash
pando mcp login my-server
```

Your browser opens, you approve, and Pando keeps the pass for next time. You do this once per server.

## Use its tools

Open **Chat** and ask for something the new server can do, in plain words: "list the open issues assigned to me", "what tables does the sales database have?". You do not name the tool. Pando sees what is plugged in and picks it.

The first time a tool wants to do something, Pando asks your permission, as it does for any action.

{{< under-surface >}}
Pando does not hand the model every tool from every server at once; that would be like emptying the whole toolbox onto the table. It keeps a short list ready and looks up the rest when the conversation needs them.
{{< /under-surface >}}

## Keep your favourites close

Go to **Settings > MCP Gateway**. With **Enable MCP Gateway** on, Pando notices which tools you really use and keeps those within easy reach, the way you leave your favourite screwdriver on the bench instead of in the drawer.

{{< shot src="images/webui/pando-webui-settings-mcp-gateway.jpg" alt="MCP gateway settings" >}}

The defaults are sensible: a tool becomes a favourite after 3 uses in 7 days, there are 10 favourites at most, and one you have not touched for 30 days steps down. Change the numbers only if you plug in many servers.

## Check it works

1. In **Settings > MCP Servers** the server is in the list.
2. In a chat, ask "which tools do you have from `my-server`?". Pando names them.
3. Ask for something real and watch the tool run in the conversation.

## If something goes wrong

| What you see | What to do |
|---|---|
| The server is in the list but Pando never uses it | Check **Command** by running it yourself in a terminal. If it fails there, it fails for Pando too |
| "MCP server requires authorization" in the chat | Run `pando mcp login <name>` in a terminal. Pando notices and tries again by itself |
| The browser sign-in never finishes | Something is blocking local port 19876. Try `pando mcp login <name> --no-browser` and open the link yourself |
| A company server rejects the connection | It probably wants a certificate. See [company certificates]({{< relref "/docs/configuration/mcp" >}}) |
| The key stopped working | Open the server, paste the new key, **Save** |

## Prefer the terminal?

Everything above can be written in `.pando.toml`:

```toml
[MCPServers.files]
Type    = 'stdio'
Command = 'npx'
Args    = ['@modelcontextprotocol/server-filesystem', '.']

[MCPServers.tracker]
Type = 'streamable-http'
URL  = 'https://mcp.example.com/mcp'

[MCPServers.tracker.Auth]
Type  = 'bearer'
Token = 'your-api-key'
```

And these commands tell you how each server is doing:

```bash
pando mcp list
pando mcp status tracker
pando mcp logout tracker
```

In the terminal interface, the same screen is under Settings (**Ctrl+G**) **> MCP Servers**.

The full list of options, including company certificates, is in the [MCP reference]({{< relref "/docs/configuration/mcp" >}}). To do it the other way round and offer Pando's own tools to another program, see [MCP Server]({{< relref "/docs/mcp" >}}).
