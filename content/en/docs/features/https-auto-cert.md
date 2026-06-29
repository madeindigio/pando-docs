---
title: Auto HTTPS Certificates
weight: 28
---

When running `pando serve` or `pando app` without explicit TLS configuration, Pando automatically generates self-signed SSL certificates for secure local connections.

## How It Works

1. Generates an ECDSA P-256 self-signed certificate
2. SANs include `localhost` and all local interface IPs
3. Stored in `<data_dir>/tls/server.crt` and `server.key`
4. Auto-regenerated if expired or missing
5. Valid for 10 years

## Usage

```bash
# Auto-generates TLS cert
pando serve

# Use custom cert
pando serve --tls-cert /path/cert --tls-key /path/key

# Bind all interfaces (remote access)
pando serve --host 0.0.0.0
```

## Security

- Certificates are stored locally and never shared
- Auto-renewed within 30 days of expiry
- PWA installation works when accessing remotely
- All communication encrypted in transit

{{< callout >}}
The auto-generated certificates are self-signed. For production deployments, use certificates from a trusted CA or your organization's PKI.
{{< /callout >}}
