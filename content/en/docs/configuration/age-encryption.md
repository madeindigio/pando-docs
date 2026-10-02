---
title: AGE Encryption
weight: 32
---

Reference for the encryption that protects keys and passwords in your config file. Plain-language introduction: [Config Security with AGE]({{< relref "/docs/configuration/security-age" >}}). Step by step: [Sandbox and permissions]({{< relref "/guides/sandbox-and-permissions" >}}).

Pando uses [AGE](https://github.com/FiloSottile/age).

- Values that start with `age1:` are decrypted when the config is loaded.
- Decrypted values stay in memory only.
- A key pair (X25519) is created the first time one is needed.

## Commands

```bash
pando secret my-token                    # encrypt: prints age1:…
pando secret 'age1:YWdlLWVu...'          # decrypt: prints the original
pando secret my-token --age-keys mykeys  # use a named key set
```

`pando secret` detects the direction by itself: a plain value is encrypted, an `age1:` value is decrypted. `--age-keys` works on every Pando command.

## Configuration

```toml
AgeKeys = ''    # named key set; empty means "default"
```

## What is encrypted

- Provider API keys (`[providers.*].apiKey`)
- OAuth tokens (`[providers.*].accessToken`, `refreshToken`)
- MCP server environment variables (`[mcpServers.*].env.*`)
- Embedding API keys
- Web UI passwords
- Any value you prefix with `age1:`

## Where the keys are

```
~/.config/pando/keys/
  default/
    key.txt       # private key
    public.txt    # public key
  mykeys/
    key.txt
    public.txt
```

{{< callout >}}
The private key never leaves your machine. A config file with `age1:` values can only be opened where that key is, so a teammate or another computer needs their own keys or a copy of yours.
{{< /callout >}}
