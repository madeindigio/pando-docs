---
title: MCP Server Authentication
weight: 18
---

MCP servers are boxes of extra tools you plug into Pando. Some sit on your own machine and open to anyone. Others live on the internet or inside your company and want to know who is knocking. This feature is Pando's key ring: it holds the right key for each of those doors and uses it without bothering you.

## What it does for you

- **Opens every common kind of door.** A plain API key, a user and password, a key in a special header, or a browser sign-in like "Sign in with…" on a website (OAuth).
- **Signs in once.** After a browser sign-in, Pando keeps the pass and renews it by itself.
- **Works in company networks.** It can show a client certificate and trust your company's own certificate authority, which is what many internal servers require.
- **Keeps secrets locked.** Passes are stored on your machine, readable only by you and encrypted.

## How it feels in practice

Most of the time you paste a key when you add the server and never think about it again.

With a browser sign-in, the first time Pando needs the server it tells you in the chat that the server wants authorization. You run one command, approve in the browser, and Pando carries on with what it was doing, without you having to repeat the request.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-http-auth.jpg" alt="Kinds of sign-in when adding an MCP server" >}}

## When to use it

Whenever a server's instructions mention an API key, a token, a login or a certificate. Servers that run as a small program on your own machine usually need none of this.

## Good to know

- Sign-in applies to servers reached over the network. A local program gets its keys through its own settings instead.
- Old and unsafe connection standards (TLS 1.0 and 1.1) cannot be switched on. This is on purpose.
- If you reach a company server by its IP address or a nickname, Pando needs to be told the server's real name, or the certificate check fails. The reference explains the option.

## Next steps

- Guide: [Connect MCP servers]({{< relref "/guides/mcp-servers" >}}) adds a server and signs in, step by step.
- Reference: [every sign-in type, certificate option and command]({{< relref "/docs/configuration/mcp" >}}).
- Related: [MCP Server]({{< relref "/docs/mcp" >}}), for offering Pando's own tools to other programs.
