---
title: Seguridad con Cifrado AGE
weight: 3
---

Tu fichero de configuración suele guardar las llaves de tus cuentas de IA. En texto normal son la llave de casa debajo del felpudo: quien vea el fichero las tiene. Pando puede cambiar cada clave por una versión revuelta que solo tu ordenador sabe leer.

## Qué ganas

- **Se puede compartir**: puedes subir `.pando.toml` a Git. Las partes sensibles son ilegibles sin la clave privada de tu máquina.
- **Nada que recordar**: al arrancar, Pando descifra los valores en memoria. Nunca se vuelven a escribir en claro en el disco.
- **La app lo hace por ti**: las claves que escribes en **Configuración > Proveedores** y las contraseñas de **Configuración > Acceso WebUI** se guardan cifradas.

## Cifra un valor a mano

```bash
pando secret "your-secret-key-here"
```

Imprime un texto que empieza por `age1:`. Pégalo donde estaba el secreto:

```toml
[mcpServers.database-server]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
env = { DB_PASSWORD = "age1:…" }
```

Pando reconoce el prefijo y le entrega la contraseña real a la herramienta de base de datos cuando la arranca.

## Siguientes pasos

- Todos los comandos y dónde se guardan las claves: [Cifrado AGE]({{< relref "/docs/configuration/age-encryption" >}})
- Los demás mandos de seguridad: [Sandbox y permisos]({{< relref "/guides/sandbox-and-permissions" >}})
