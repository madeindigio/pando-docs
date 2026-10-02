---
title: Cifrado AGE
weight: 32
---

Referencia del cifrado que protege claves y contraseñas en tu fichero de configuración. Introducción en lenguaje llano: [Seguridad con cifrado AGE]({{< relref "/docs/configuration/security-age" >}}). Paso a paso: [Sandbox y permisos]({{< relref "/guides/sandbox-and-permissions" >}}).

Pando usa [AGE](https://github.com/FiloSottile/age).

- Los valores que empiezan por `age1:` se descifran al cargar la configuración.
- Los valores descifrados solo viven en memoria.
- La primera vez que hace falta se crea un par de claves (X25519).

## Comandos

```bash
pando secret my-token                    # encrypt: prints age1:…
pando secret 'age1:YWdlLWVu...'          # decrypt: prints the original
pando secret my-token --age-keys mykeys  # use a named key set
```

`pando secret` detecta el sentido por sí solo: un valor normal se cifra, un valor `age1:` se descifra. `--age-keys` funciona en todos los comandos de Pando.

## Configuración

```toml
AgeKeys = ''    # named key set; empty means "default"
```

## Qué se cifra

- Claves de API de proveedores (`[providers.*].apiKey`)
- Tokens OAuth (`[providers.*].accessToken`, `refreshToken`)
- Variables de entorno de servidores MCP (`[mcpServers.*].env.*`)
- Claves de API de embeddings
- Contraseñas de la Web UI
- Cualquier valor al que pongas el prefijo `age1:`

## Dónde están las claves

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
La clave privada no sale nunca de tu máquina. Un fichero de configuración con valores `age1:` solo se puede abrir donde esté esa clave, así que un compañero u otro ordenador necesita sus propias claves o una copia de las tuyas.
{{< /callout >}}
