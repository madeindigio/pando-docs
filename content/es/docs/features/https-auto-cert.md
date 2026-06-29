---
title: Certificados HTTPS Automáticos
weight: 28
---

Cuando ejecutas `pando serve` o `pando app` sin configuración TLS explícita, Pando genera automáticamente certificados SSL auto-firmados para conexiones locales seguras.

## Cómo Funciona

1. Genera un certificado auto-firmado ECDSA P-256
2. Los SANs incluyen `localhost` e todas las IPs de interfaces locales
3. Almacena en `<data_dir>/tls/server.crt` y `server.key`
4. Se regenera automáticamente si expira o falta
5. Válido por 10 años

## Uso

```bash
# Genera certificado TLS automáticamente
pando serve

# Usar certificado personalizado
pando serve --tls-cert /ruta/cert --tls-key /ruta/key

# Vincular todas las interfaces (acceso remoto)
pando serve --host 0.0.0.0
```

## Seguridad

- Los certificados se almacenan localmente y nunca se comparten
- Se renuevan automáticamente dentro de 30 días de expiración
- La instalación PWA funciona al acceder remotamente
- Toda la comunicación cifrada en tránsito

{{< callout >}}
Los certificados auto-generados son auto-firmados. Para despliegues de producción, usa certificados de una CA confiable o la PKI de tu organización.
{{< /callout >}}
