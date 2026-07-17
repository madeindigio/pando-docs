---
title: WebUI Access (Basic Auth)
weight: 20
---

When Pando's Web UI is accessible from other devices on your network (not just your computer), Basic Authentication protects it with a username and password. This prevents unauthorized access to your Pando instance.

## When Is Basic Auth Required?

| Bind Address | From Same Machine | From Other Devices | Auth Required? |
|--------------|-------------------|-------------------|----------------|
| `localhost` or `127.0.0.1` | Yes | No (not reachable) | No |
| `0.0.0.0` or specific IP | Yes | Yes | **Yes** |

**Example scenarios:**

- Running `pando serve` on your laptop and only accessing it locally → **No auth needed**
- Running `pando serve --host 0.0.0.0` to access from your phone or another computer → **Auth required**

## Setting Up Basic Auth

### Via Web UI (Recommended)

1. Open Pando Web UI and go to **Settings > WebUI Access**
2. Add at least one user (username + password)
3. Toggle **"Require username and password"** to enable

The settings panel shows whether auth is currently **enforced** or **inert** (because the server is bound to localhost).

### Via Configuration File

Add to your `.pando.toml`:

```toml
[Server]
Host = "0.0.0.0"    # or your network IP

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "admin"
Password = "your-secure-password"
```

Or in `.pando.json`:

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

## How It Works

### Automatic Protection

Pando automatically detects when protection is needed:

1. **Localhost binding** → No auth required (safe by default)
2. **Non-localhost binding** → Auth enforced if users are configured
3. **Requests from your machine** → Always allowed (even with non-localhost binding)

### Login Flow

When you access the Web UI from another device:

1. The Web UI detects auth is required
2. A login dialog appears (not the browser's native prompt)
3. Enter your username and password
4. You're authenticated for the session

### Password Security

- Passwords are stored **encrypted** in your config file (using AGE encryption)
- Decrypted only in memory when Pando starts
- The Web UI can reveal passwords on demand (for authenticated users)
- Never sent over the network in plain text (HTTPS is used)

## Managing Users

### Add a User

**Web UI:** Settings > WebUI Access > Add user

**API:**
```bash
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "securepass"}'
```

### Delete a User

**Web UI:** Settings > WebUI Access > Click delete on user

**API:**
```bash
curl -X DELETE http://localhost:3939/api/v1/config/api-server/basic-auth/users/username
```

{{< callout type="warning" >}}
Deleting the last user automatically disables basic auth. This prevents locking yourself out.
{{< /callout >}}

### Reveal a Password

**Web UI:** Settings > WebUI Access > Click reveal on user

**API:**
```bash
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users/username/reveal
```

## Configuration Reference

| Setting | Location | Description |
|---------|----------|-------------|
| `Server.Host` | `.pando.toml` | Bind address (`localhost` for local only, `0.0.0.0` for network) |
| `Server.BasicAuth.Enabled` | `.pando.toml` | Enable/disable basic auth |
| `Server.BasicAuth.Users` | `.pando.toml` | List of username/password pairs |

## Common Use Cases

### Access from Phone/Tablet

```bash
# Start Pando accessible from your network
pando serve --host 0.0.0.0

# Then enable basic auth via Web UI Settings
```

### Team Access

```toml
[Server]
Host = "0.0.0.0"

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "alice"
Password = "alice-password"

[[Server.BasicAuth.Users]]
Username = "bob"
Password = "bob-password"
```

### Development (No Auth)

```bash
# Local access only - no auth needed
pando serve
# or
pando serve --host localhost
```

## Troubleshooting

### "Basic auth required" but I didn't set it up

You're accessing Pando from another device. Either:
- Bind to localhost: `pando serve --host localhost`
- Set up basic auth as described above

### Can't enable auth with no users

You must add at least one user before enabling basic auth. The system prevents enabling auth without credentials.

### Auth is "inert" in settings

The server is bound to localhost, so auth isn't enforced. This is normal and safe — auth only activates when the server is network-accessible.

{{< callout >}}
Basic auth protects the API surface. Localhost requests and loopback-bound servers are never challenged, keeping development workflows seamless.
{{< /callout >}}
