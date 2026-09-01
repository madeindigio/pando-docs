---
title: Acceso WebUI (Basic Auth)
weight: 20
---

Cuando la Web UI de Pando es accesible desde otros dispositivos en tu red (no solo tu computadora), la Autenticación Básica la protege con un nombre de usuario y contraseña. Esto impide el acceso no autorizado a tu instancia de Pando.

## ¿Cuándo Se Necesita Basic Auth?

| Dirección de Bind | Desde la Misma Máquina | Desde Otros Dispositivos | ¿Se Necesita Auth? |
|-------------------|------------------------|-------------------------|---------------------|
| `localhost` o `127.0.0.1` | Sí | No (no accesible) | No |
| `0.0.0.0` o IP específica | Sí | Sí | **Sí** |

**Ejemplos:**

- Ejecutar `pando serve` en tu portátil y acceder solo localmente → **No se necesita auth**
- Ejecutar `pando serve --host 0.0.0.0` para acceder desde tu móvil u otro ordenador → **Se necesita auth**

## Configurar Basic Auth

### Vía Web UI (Recomendado)

1. Abre la Web UI de Pando y ve a **Ajustes > Acceso WebUI**
2. Añade al menos un usuario (nombre de usuario + contraseña)
3. Activa **"Exigir usuario y contraseña"**

El panel de ajustes muestra si la autenticación está **activa** o **inerte** (porque el servidor está vinculado a localhost).

### Vía Archivo de Configuración

Añade a tu `.pando.toml`:

```toml
[Server]
Host = "0.0.0.0"    # o tu IP de red

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "admin"
Password = "tu-contraseña-segura"
```

O en `.pando.json`:

```json
{
  "server": {
    "host": "0.0.0.0",
    "basicAuth": {
      "enabled": true,
      "users": [
        { "username": "admin", "password": "tu-contraseña-segura" }
      ]
    }
  }
}
```

## Activar el acceso externo sin reiniciar

Ya no hace falta reiniciar Pando con `--host 0.0.0.0` para llegar a él desde otro dispositivo. El **pie de la Web UI tiene un interruptor** que cambia la instancia en marcha entre solo-local y accesible por red, en caliente:

1. Abre la Web UI (o la aplicación de escritorio) y mira el pie.
2. Activa **Acceso externo**.
3. El pie muestra la URL que deben usar los demás dispositivos.

Funciona en `pando serve`, `pando app` y la aplicación de escritorio, y pueden conectarse varios clientes a la vez. Al desactivarlo, la instancia vuelve inmediatamente a ser solo local.

{{< callout type="warning" >}}
La autenticación básica pasa a aplicarse en el mismo instante en que activas el acceso externo — sin reinicio y sin una ventana de tiempo con la instancia abierta y desprotegida. Si aún no has configurado ningún usuario, hazlo antes: el interruptor te lo pedirá.
{{< /callout >}}

## Cómo Funciona

### Protección Automática

Pando detecta automáticamente cuándo se necesita protección:

1. **Vínculo a localhost** → No se necesita auth (seguro por defecto)
2. **Vínculo que no es localhost** → Auth activada si hay usuarios configurados
3. **Peticiones desde tu máquina** → Siempre permitidas (incluso con vínculo que no es localhost)

### Flujo de Login

Cuando accedes a la Web UI desde otro dispositivo:

1. La Web UI detecta que se requiere auth
2. Aparece un diálogo de inicio de sesión (no el prompt nativo del navegador)
3. Introduce tu nombre de usuario y contraseña
4. Quedas autenticado para la sesión

### Seguridad de Contraseñas

- Las contraseñas se almacenan **cifradas** en tu archivo de configuración (usando cifrado AGE)
- Solo se descifran en memoria cuando Pando arranca
- La Web UI puede revelar contraseñas bajo demanda (para usuarios autenticados)
- Nunca se envían en texto plano por la red (se usa HTTPS)

## Gestionar Usuarios

### Añadir un Usuario

**Web UI:** Ajustes > Acceso WebUI > Añadir usuario

**API:**
```bash
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users \
  -H "Content-Type: application/json" \
  -d '{"username": "nuevousuario", "password": "contraseñasegura"}'
```

### Eliminar un Usuario

**Web UI:** Ajustes > Acceso WebUI > Haz clic en eliminar en el usuario

**API:**
```bash
curl -X DELETE http://localhost:3939/api/v1/config/api-server/basic-auth/users/username
```

{{< callout type="warning" >}}
Eliminar el último usuario desactiva automáticamente basic auth. Esto evita bloquearte fuera.
{{< /callout >}}

### Revelar una Contraseña

**Web UI:** Ajustes > Acceso WebUI > Haz clic en revelar en el usuario

**API:**
```bash
curl -X POST http://localhost:3939/api/v1/config/api-server/basic-auth/users/username/reveal
```

## Referencia de Configuración

| Configuración | Ubicación | Descripción |
|---------------|-----------|-------------|
| `Server.Host` | `.pando.toml` | Dirección de vínculo (`localhost` solo local, `0.0.0.0` para red) |
| `Server.BasicAuth.Enabled` | `.pando.toml` | Activar/desactivar basic auth |
| `Server.BasicAuth.Users` | `.pando.toml` | Lista de pares usuario/contraseña |

## Casos de Uso Comunes

### Acceso desde Móvil/Tableta

```bash
# Iniciar Pando accesible desde tu red
pando serve --host 0.0.0.0

# Luego activar basic auth desde los Ajustes de la Web UI
```

### Acceso de Equipo

```toml
[Server]
Host = "0.0.0.0"

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "alice"
Password = "contraseña-alice"

[[Server.BasicAuth.Users]]
Username = "bob"
Password = "contraseña-bob"
```

### Desarrollo (Sin Auth)

```bash
# Acceso local solamente - no se necesita auth
pando serve
# o
pando serve --host localhost
```

## Solución de Problemas

### "Se requiere basic auth" pero no lo configuré

Estás accediendo a Pando desde otro dispositivo. Opciones:
- Vincula a localhost: `pando serve --host localhost`
- Configura basic auth como se describe arriba

### No puedo activar auth sin usuarios

Debes añadir al menos un usuario antes de activar basic auth. El sistema impide activar auth sin credenciales.

### Auth es "inerte" en ajustes

El servidor está vinculado a localhost, por lo que auth no se exige. Esto es normal y seguro — auth solo se activa cuando el servidor es accesible por la red.

{{< callout >}}
Basic auth protege la superficie de la API. Las peticiones localhost y los servidores vinculados a loopback nunca se desafían, manteniendo los flujos de trabajo de desarrollo fluidos.
{{< /callout >}}
