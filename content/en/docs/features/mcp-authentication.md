---
title: MCP Server Authentication
weight: 18
---

Pando supports authenticating with MCP (Model Context Protocol) servers that require authentication. This includes static API keys, OAuth 2.1 flows, client certificate (mTLS) authentication, and enterprise CA trust — all configurable from the TUI, WebUI, or configuration file.

## Authentication Types

| Type | Description | Use Case |
|------|-------------|----------|
| **none** | No authentication | Local or trusted servers |
| **bearer** | Static bearer token (API key) | Most API-based MCP servers |
| **basic** | Username + password | Servers using HTTP Basic Auth |
| **header** | Custom header with static value | Non-standard auth headers |
| **oauth** | OAuth 2.1 with browser-based login | Servers requiring user authorization |
| **oauth_client_credentials** | OAuth 2.1 client credentials grant | Server-to-server, no user interaction |

## Configuration

### Via Web UI

1. Open **Settings > MCP Servers**
2. Select or add a server
3. Choose the **Auth Type** from the dropdown
4. Fill in the required fields (token, username/password, OAuth settings)
5. Save

### Via TUI

1. Open Settings (**Ctrl+G**)
2. Navigate to **MCP Servers**
3. Select the server and configure auth type and credentials

### Via Configuration File

Add to your `.pando.toml`:

```toml
[[McpServers]]
Name = "my-server"
Url = "https://mcp.example.com/sse"

[McpServers.Auth]
Type = "bearer"
Token = "your-api-key"

# Or for Basic Auth:
# Type = "basic"
# Username = "user"
# Password = "secret"

# Or for OAuth:
# Type = "oauth"
# [McpServers.Auth.OAuth]
# ClientID = "my-client-id"
# ClientSecret = "my-client-secret"
# Scopes = ["read", "write"]
# AuthURL = "https://auth.example.com/authorize"
# TokenURL = "https://auth.example.com/token"
```

## OAuth Login Flow

When a server requires OAuth authentication:

1. The agent detects the 401 response and reports: *"MCP server requires authorization"*
2. Run `pando mcp login <server-name>` in your terminal
3. A browser window opens for authorization
4. After authorizing, the tokens are stored securely

### CLI Commands

```bash
# List MCP server statuses
pando mcp list

# Login to a server (opens browser)
pando mcp login my-server

# Login without opening browser (copy URL manually)
pando mcp login my-server --no-browser

# Check authentication status
pando mcp status my-server

# Logout (clears stored tokens)
pando mcp logout my-server
```

### Token Storage

OAuth tokens are stored in `~/.config/pando/mcp-auth.json` with:
- File permissions 0600 (owner-only access)
- Tokens encrypted with AGE at rest
- Automatic disk-watch for external changes
- Process-level locking for concurrent access

## Enterprise mTLS

For corporate environments that require client certificate authentication:

```toml
[[McpServers]]
Name = "enterprise-server"
Url = "https://internal-mcp.corp.com/sse"

[McpServers.Auth]
Type = "oauth_client_credentials"

[McpServers.Auth.OAuth]
ClientID = "corporate-client"
ClientSecret = "corporate-secret"
Resource = "https://internal-mcp.corp.com"

# Client certificate for mTLS
ClientCert = "/path/to/client.crt"
ClientKey = "/path/to/client.key"
# Optional: encrypted key password
ClientKeyPassword = "key-password"

# Optional: custom CA certificate
CACert = "/path/to/internal-ca.crt"
# Optional: don't merge with system trust store
CACertExclusive = false

# Optional: override TLS verification hostname
TLSServerName = "internal-mcp.corp.com"
# Optional: TLS version constraints
MinTLSVersion = "1.2"
MaxTLSVersion = "1.3"
```

### Supported Key Formats

- **Unencrypted PEM** — standard private key
- **PKCS#8 encrypted** — PBES2 with PBKDF2 or scrypt KDF (common output of `openssl genpkey`)
- **RFC 1423 encrypted** — legacy PEM encryption (Go stdlib)

### CA Trust Behavior

By default, `CACert` **merges** with the system trust store — your internal CA is added alongside public CAs. Set `CACertExclusive = true` to trust only your internal CA.

{{< callout type="warning" >}}
If you're reaching a server by IP address or internal alias, set `TLSServerName` to the expected hostname. Without it, TLS verification will fail because the certificate's DNS names won't match the connection address.
{{< /callout >}}

## Troubleshooting

### "MCP server requires authorization" during conversation

Run `pando mcp login <server-name>` in a terminal. The agent will detect the login and retry automatically.

### OAuth callback fails

- Ensure no firewall is blocking localhost port 19876
- Try `--no-browser` mode and paste the URL manually
- Check that the `state` parameter matches (security validation)

### mTLS handshake fails

1. Verify the client certificate and key match
2. If the key is encrypted, ensure `ClientKeyPassword` is correct
3. Check that the CA certificate is in PEM format
4. Try `TLSServerName` if connecting by IP

### "unsupported PBES2 algorithm" error

The key uses an encryption algorithm not yet supported. Re-encrypt with:
```bash
openssl pkcs8 -topk8 -in old.key -out new.key -v2 aes-256-cbc
```

{{< callout type="info" >}}
TLS 1.0 and 1.1 cannot be enabled through configuration — they are disabled by design per RFC 8996 security recommendations.
{{< /callout >}}
