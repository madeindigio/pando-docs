---
title: Config Security with AGE
weight: 3
---

Your config file often holds the keys to your AI accounts. Left as plain text, they are a house key under the doormat: anyone who sees the file has them. Pando can swap each key for a scrambled version that only your computer can read.

## What you get

- **Safe to share**: you can commit `.pando.toml` to Git. The sensitive parts are unreadable without the private key on your machine.
- **Nothing to remember**: when Pando starts it unscrambles the values in memory. They are never written back to disk in clear.
- **Done for you in the app**: keys you type in **Settings > Providers** and passwords in **Settings > WebUI Access** are stored scrambled.

## Scramble a value by hand

```bash
pando secret "your-secret-key-here"
```

It prints a text that starts with `age1:`. Paste it where the secret was:

```toml
[mcpServers.database-server]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
env = { DB_PASSWORD = "age1:…" }
```

Pando recognises the prefix and hands the real password to the database tool when it starts it.

## Next steps

- Every command and where the keys are stored: [AGE Encryption]({{< relref "/docs/configuration/age-encryption" >}})
- The other safety dials: [Sandbox and permissions]({{< relref "/guides/sandbox-and-permissions" >}})
