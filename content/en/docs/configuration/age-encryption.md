---
title: AGE Encryption
weight: 32
---

Pando uses [AGE](https://github.com/FiloSottile/age) encryption to protect all secrets in `.pando.toml`—API keys, OAuth tokens, MCP server credentials, and embedding keys.

## How It Works

- Values prefixed with `age1:` are automatically decrypted at load time
- Keys stored at `~/.config/pando/keys/<keyset-name>/`
- Auto-generates X25519 keypair if none exists
- All decrypted values stay in memory only

## CLI Usage

```bash
# Encrypt a token
pando secret my-token

# Decrypt an encrypted value
pando secret 'age1:YWdlLWVu...'

# Use named key set
pando secret my-token --age-keys mykeys
```

## Configuration

```toml
# Named key set (default: "default")
AgeKeys = ''
```

## What Gets Encrypted

- Provider API keys (`[providers.*].apiKey`)
- OAuth tokens (`[providers.*].accessToken`, `refreshToken`)
- MCP server environment variables (`[mcpServers.*].env.*`)
- Embedding API keys
- Any value prefixed with `age1:`

## Key Management

Keys are stored in:

```
~/.config/pando/keys/
  default/
    key.txt       # Private key (X25519)
    public.txt    # Public key
  mykeys/
    key.txt
    public.txt
```

## Auto-Encryption

Use the `TransformSecretString` function to auto-detect direction:

```bash
# First call encrypts
pando secret "my-api-key-123"
# Output: age1:YWdlLWVuY2ly...

# Same value is detected as already encrypted
pando secret "age1:YWdlLWVuY2ly..."
# Output: my-api-key-123
```

{{< callout >}}
Never commit `.pando.toml` with unencrypted secrets. Use `age1:` prefix for all sensitive values. The private key stays on your machine and is never shared.
{{< /callout >}}
