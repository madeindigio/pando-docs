---
title: Cifrado AGE
weight: 32
---

Pando usa [AGE](https://github.com/FiloSottile/age) para cifrar todos los secretos en `.pando.toml`—claves API, tokens OAuth, credenciales de servidores MCP y claves de embedding.

## Cómo Funciona

- Los valores con prefijo `age1:` se descifran automáticamente al cargar
- Las claves se almacenan en `~/.config/pando/keys/<keyset-name>/`
- Genera automáticamente un keypair X25519 si no existe ninguno
- Todos los valores descifrados permanecen solo en memoria

## Uso CLI

```bash
# Cifrar un token
pando secret my-token

# Descifrar un valor cifrado
pando secret 'age1:YWdlLWVu...'

# Usar conjunto de claves con nombre
pando secret my-token --age-keys mykeys
```

## Configuración

```toml
# Conjunto de claves con nombre (predeterminado: "default")
AgeKeys = ''
```

## Qué Se Cifra

- Claves API de proveedores (`[providers.*].apiKey`)
- Tokens OAuth (`[providers.*].accessToken`, `refreshToken`)
- Variables de entorno de servidores MCP (`[mcpServers.*].env.*`)
- Claves API de embeddings
- Cualquier valor con prefijo `age1:`

## Gestión de Claves

Las claves se almacenan en:

```
~/.config/pando/keys/
  default/
    key.txt       # Clave privada (X25519)
    public.txt    # Clave pública
  mykeys/
    key.txt
    public.txt
```

## Cifrado Automático

Usa la función `TransformSecretString` para detectar automáticamente la dirección:

```bash
# Primera llamada cifra
pando secret "my-api-key-123"
# Salida: age1:YWdlLWVuY2ly...

# Mismo valor se detecta como ya cifrado
pando secret "age1:YWdlLWVuY2ly..."
# Salida: my-api-key-123
```

{{< callout >}}
Nunca hagas commit de `.pando.toml` con secretos sin cifrar. Usa el prefijo `age1:` para todos los valores sensibles. La clave privada permanece en tu máquina y nunca se comparte.
{{< /callout >}}
