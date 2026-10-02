---
title: MCP Reference
weight: 42
---

Every option for connecting MCP servers to Pando. For the explanation see [MCP Server Authentication]({{< relref "/docs/features/mcp-authentication" >}}); for the step-by-step see the guide [Connect MCP servers]({{< relref "/guides/mcp-servers" >}}). To offer Pando itself as an MCP server, see [MCP Server]({{< relref "/docs/mcp" >}}).

## Servers

One section per server in `.pando.toml`. The section name is the server name.

```toml
[MCPServers.my-tool]
Type    = 'stdio'              # stdio | sse | streamable-http
Command = 'my-mcp-server'
Args    = ['--flag']
Env     = ['MY_VAR=value']

[MCPServers.remote-tool]
Type    = 'streamable-http'
URL     = 'https://mcp.example.com/mcp'
Headers = { 'X-Team' = 'docs' }
Timeout = '30s'
```

| Key | Used by | What it is |
|---|---|---|
| `Type` | all | `stdio` (a program on your machine), `sse` or `streamable-http` (a server on the network) |
| `Command`, `Args`, `Env` | stdio | The program to start, its arguments and its environment variables |
| `URL`, `Headers` | sse, streamable-http | The address and any extra headers |
| `Timeout` | all | How long to wait for the server |
| `Sandbox` | stdio | `true` runs this server inside the [command sandbox]({{< relref "/docs/features/sandbox" >}}) |
| `NoSandbox` | stdio | `true` keeps it out of the sandbox even when the sandbox covers MCP servers |

Secret values in `Env`, `Headers` and `Auth` can be stored encrypted with [AGE]({{< relref "/docs/configuration/age-encryption" >}}); Pando decrypts them in memory at startup.

## Authentication

```toml
[MCPServers.my-server.Auth]
Type  = 'bearer'
Token = 'your-api-key'
```

| `Type` | Fields | Use it for |
|---|---|---|
| `none` | none | Local or trusted servers |
| `bearer` | `Token` | Most servers that give you an API key |
| `basic` | `Username`, `Password` | Servers with user and password |
| `header` | `HeaderName`, `Token` | Servers that want the key in a header of their own |
| `oauth` | `[...Auth.OAuth]` | Servers where you sign in through the browser |
| `oauth_client_credentials` | `[...Auth.OAuth]` | Machine to machine, nobody signs in |

### OAuth

```toml
[MCPServers.my-server.Auth]
Type = 'oauth'

[MCPServers.my-server.Auth.OAuth]
ClientID     = 'my-client-id'      # leave empty to let the server register Pando by itself
ClientSecret = 'my-client-secret'
Scopes       = ['read', 'write']
AuthURL      = 'https://auth.example.com/authorize'
TokenURL     = 'https://auth.example.com/token'
Resource     = 'https://mcp.example.com'
```

Tokens are kept in `~/.config/pando/mcp-auth.json`: readable only by you (permissions `0600`), encrypted with AGE, and safe to use from several Pando windows at once. The browser sign-in listens on local port `19876`.

### Company certificates (mTLS)

These keys go in the same `Auth` section and work with any `Type`.

```toml
[MCPServers.enterprise-server]
Type = 'sse'
URL  = 'https://internal-mcp.corp.com/sse'

[MCPServers.enterprise-server.Auth]
Type              = 'oauth_client_credentials'
ClientCert        = '/path/to/client.crt'
ClientKey         = '/path/to/client.key'
ClientKeyPassword = 'key-password'        # only for an encrypted key
CACert            = '/path/to/internal-ca.crt'
CACertExclusive   = false
TLSServerName     = 'internal-mcp.corp.com'
MinTLSVersion     = '1.2'
MaxTLSVersion     = '1.3'

[MCPServers.enterprise-server.Auth.OAuth]
ClientID     = 'corporate-client'
ClientSecret = 'corporate-secret'
Resource     = 'https://internal-mcp.corp.com'
```

| Key | What it does |
|---|---|
| `ClientCert`, `ClientKey` | Your client certificate and its key |
| `ClientKeyPassword` | Password of the key, if it has one |
| `CACert` | Your company's certificate authority. By default it is **added** to the ones your system already trusts |
| `CACertExclusive` | `true` trusts **only** `CACert` |
| `TLSServerName` | The name the certificate was issued for. Set it when you reach the server by IP address or by an internal alias |
| `MinTLSVersion`, `MaxTLSVersion` | `1.2` or `1.3` |
| `SkipTLSVerify` | Turns certificate checks off. Insecure: only for local tests against a server you trust |

Key formats accepted: plain PEM, encrypted PKCS#8 (PBES2 with PBKDF2 or scrypt, what `openssl genpkey` writes) and legacy RFC 1423 encrypted PEM.

TLS 1.0 and 1.1 cannot be enabled. They are switched off on purpose (RFC 8996).

## Troubleshooting

| What you see | What to do |
|---|---|
| "MCP server requires authorization" during a conversation | Run `pando mcp login <server-name>` in a terminal. The agent notices the sign-in and retries by itself |
| The browser sign-in fails | Check no firewall blocks local port 19876. Try `--no-browser` and open the link by hand. The link must come back unchanged: Pando checks its `state` value for safety |
| The certificate handshake fails | Check the client certificate and key belong together, that `ClientKeyPassword` is right, that `CACert` is in PEM format, and set `TLSServerName` if you connect by IP |
| "unsupported PBES2 algorithm" | The key is encrypted in a way Pando cannot read yet. Re-encrypt it: `openssl pkcs8 -topk8 -in old.key -out new.key -v2 aes-256-cbc` |

## Commands

```bash
pando mcp list                        # servers and whether each one is signed in
pando mcp login my-server             # sign in (opens the browser)
pando mcp login my-server --no-browser   # print the link instead of opening it
pando mcp login my-server --manual    # paste the redirect link by hand
pando mcp status my-server            # details for one server
pando mcp logout my-server            # forget the stored sign-in
```

`pando mcp login` waits five minutes by default; change it with `--timeout`.

## Gateway

The gateway watches which MCP tools you really use and keeps the frequent ones close at hand.

```toml
[MCPGateway]
Enabled            = true
FavoriteThreshold  = 3    # uses needed to become a favourite
MaxFavorites       = 10
FavoriteWindowDays = 7    # uses are counted over this many days
DecayDays          = 30   # days without use before a favourite is dropped
```
