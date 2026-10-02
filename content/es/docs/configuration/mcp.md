---
title: Referencia de MCP
weight: 42
---

Todas las opciones para conectar servidores MCP a Pando. La explicación está en [Autenticación de servidores MCP]({{< relref "/docs/features/mcp-authentication" >}}) y el paso a paso en la guía [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}}). Para ofrecer el propio Pando como servidor MCP, mira [Servidor MCP]({{< relref "/docs/mcp" >}}).

## Servidores

Una sección por servidor en `.pando.toml`. El nombre de la sección es el nombre del servidor.

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

| Clave | Para | Qué es |
|---|---|---|
| `Type` | todos | `stdio` (un programa en tu máquina), `sse` o `streamable-http` (un servidor en la red) |
| `Command`, `Args`, `Env` | stdio | El programa que se arranca, sus argumentos y sus variables de entorno |
| `URL`, `Headers` | sse, streamable-http | La dirección y las cabeceras extra |
| `Timeout` | todos | Cuánto se espera al servidor |
| `Sandbox` | stdio | `true` ejecuta este servidor dentro del [sandbox de comandos]({{< relref "/docs/features/sandbox" >}}) |
| `NoSandbox` | stdio | `true` lo deja fuera del sandbox aunque el sandbox cubra los servidores MCP |

Los valores secretos de `Env`, `Headers` y `Auth` pueden guardarse cifrados con [AGE]({{< relref "/docs/configuration/age-encryption" >}}); Pando los descifra en memoria al arrancar.

## Autenticación

```toml
[MCPServers.my-server.Auth]
Type  = 'bearer'
Token = 'your-api-key'
```

| `Type` | Campos | Para qué |
|---|---|---|
| `none` | ninguno | Servidores locales o de confianza |
| `bearer` | `Token` | La mayoría de servidores que te dan una clave de API |
| `basic` | `Username`, `Password` | Servidores con usuario y contraseña |
| `header` | `HeaderName`, `Token` | Servidores que quieren la clave en una cabecera propia |
| `oauth` | `[...Auth.OAuth]` | Servidores en los que inicias sesión desde el navegador |
| `oauth_client_credentials` | `[...Auth.OAuth]` | De máquina a máquina, sin que nadie inicie sesión |

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

Los tokens se guardan en `~/.config/pando/mcp-auth.json`: solo los puedes leer tú (permisos `0600`), van cifrados con AGE y se pueden usar desde varias ventanas de Pando a la vez. El inicio de sesión por navegador escucha en el puerto local `19876`.

### Certificados de empresa (mTLS)

Estas claves van en la misma sección `Auth` y sirven con cualquier `Type`.

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

| Clave | Qué hace |
|---|---|
| `ClientCert`, `ClientKey` | Tu certificado de cliente y su clave |
| `ClientKeyPassword` | Contraseña de la clave, si tiene |
| `CACert` | La autoridad de certificación de tu empresa. Por defecto se **añade** a las que tu sistema ya acepta |
| `CACertExclusive` | `true` acepta **solo** `CACert` |
| `TLSServerName` | El nombre para el que se emitió el certificado. Ponlo cuando llegas al servidor por dirección IP o por un alias interno |
| `MinTLSVersion`, `MaxTLSVersion` | `1.2` o `1.3` |
| `SkipTLSVerify` | Desactiva la comprobación de certificados. Inseguro: solo para pruebas locales con un servidor de confianza |

Formatos de clave aceptados: PEM sin cifrar, PKCS#8 cifrado (PBES2 con PBKDF2 o scrypt, lo que escribe `openssl genpkey`) y PEM cifrado antiguo (RFC 1423).

TLS 1.0 y 1.1 no se pueden activar. Están apagados a propósito (RFC 8996).

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| «MCP server requires authorization» en mitad de una conversación | Ejecuta `pando mcp login <nombre>` en una terminal. El agente detecta el inicio de sesión y reintenta solo |
| Falla el inicio de sesión por navegador | Comprueba que ningún cortafuegos bloquea el puerto local 19876. Prueba con `--no-browser` y abre el enlace a mano. El enlace tiene que volver intacto: Pando comprueba su valor `state` por seguridad |
| Falla la conexión con certificado | Comprueba que el certificado de cliente y la clave van juntos, que `ClientKeyPassword` es correcta, que `CACert` está en formato PEM, y pon `TLSServerName` si conectas por IP |
| «unsupported PBES2 algorithm» | La clave está cifrada de una forma que Pando aún no lee. Vuelve a cifrarla: `openssl pkcs8 -topk8 -in old.key -out new.key -v2 aes-256-cbc` |

## Comandos

```bash
pando mcp list                        # servers and whether each one is signed in
pando mcp login my-server             # sign in (opens the browser)
pando mcp login my-server --no-browser   # print the link instead of opening it
pando mcp login my-server --manual    # paste the redirect link by hand
pando mcp status my-server            # details for one server
pando mcp logout my-server            # forget the stored sign-in
```

`pando mcp login` espera cinco minutos por defecto; cámbialo con `--timeout`.

## Gateway

El gateway se fija en qué herramientas MCP usas de verdad y deja a mano las más frecuentes.

```toml
[MCPGateway]
Enabled            = true
FavoriteThreshold  = 3    # uses needed to become a favourite
MaxFavorites       = 10
FavoriteWindowDays = 7    # uses are counted over this many days
DecayDays          = 30   # days without use before a favourite is dropped
```
