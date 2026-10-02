---
title: "Usa Pando desde el móvil u otro ordenador"
shortTitle: "Acceso remoto"
description: "Pando accesible desde otros dispositivos de tu red, detrás de un usuario y una contraseña."
summary: "Abre la puerta, pero antes ponle cerradura."
track: surface
level: intermediate
weight: 7
---

Por defecto Pando solo escucha al ordenador en el que funciona, como una casa con la puerta cerrada. Esta guía abre la puerta a los demás dispositivos de tu red (el móvil en el sofá, un portátil en otra habitación) y antes le pone cerradura. Necesitas Pando en marcha como Web UI (`pando app`) o como app de escritorio.

## Primero la cerradura: añade un usuario

Ve a **Configuración > Acceso WebUI**. En **Usuarios**, escribe un **Usuario** y una **Contraseña** y pulsa **Añadir usuario**.

{{< shot src="images/webui/pando-webui-settings-webui-access.jpg" alt="Ajustes de Acceso WebUI" >}}

Después activa **Exigir usuario y contraseña**.

El aviso de arriba dice de momento que está inactivo. Es normal: mientras Pando solo escucha a tu propio ordenador no hay a quién pedirle nada. La cerradura empieza a funcionar en cuanto abres la puerta.

## Abre la puerta

Mira la barra inferior de la ventana y haz clic en **acceso externo desactivado**.

Pando empieza a escuchar a la red al instante, sin reiniciar, y en ese mismo sitio pasa a poner **acceso externo activo**. Pasa el ratón por encima para ver las direcciones que deben usar los otros dispositivos.

Si te saltaste el paso anterior, Pando te recuerda que añadas un usuario antes de abrirse.

## Conéctate desde el otro dispositivo

En el móvil o en el otro ordenador, conectado a la misma red, abre la dirección que te mostró Pando. Empieza por `https://`.

1. El navegador avisa de que no conoce el certificado. Pando fabrica su propio certificado para cifrar la conexión, como quien se hace una copia de la llave de casa. Acéptalo, o confía en él de una vez por todas como se explica en [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}).
2. Pando muestra su propia ventana de inicio de sesión. Escribe usuario y contraseña.
3. Ya estás dentro: mismas sesiones, mismos proyectos.

Puede haber varios dispositivos conectados a la vez.

## Instálalo como una app

En el móvil, abre el menú del navegador y elige **Añadir a pantalla de inicio** o **Instalar aplicación**. En un ordenador, busca **Instalar** en la barra de direcciones. Pando tendrá su propio icono y se abrirá sin el marco del navegador.

## Gestiona quién entra

De vuelta en **Configuración > Acceso WebUI**:

- Crea un usuario por persona, así puedes quitar a uno sin cambiar la contraseña de todos.
- **Mostrar** enseña una contraseña que olvidaste. **Eliminar** quita un usuario al momento.
- Al borrar el último usuario la cerradura se desactiva sola, así que nunca te quedas fuera.

Las contraseñas se guardan cifradas en tu fichero de configuración, igual que tus API keys.

## Cierra la puerta

Haz clic en **acceso externo activo** en la barra inferior. Pando vuelve a escuchar solo a tu ordenador, al instante.

## El servidor API (para otros programas)

No tiene que ver con tu móvil, pero vive al lado: **Configuración > Servidor API** controla la dirección y el puerto con los que otros programas hablan con Pando, y **Require authentication** les pide un token. Los cambios ahí requieren reiniciar Pando.

{{< shot src="images/webui/pando-webui-settings-api-server.jpg" alt="Ajustes del servidor API" >}}

## Comprueba que funciona

Desde el segundo dispositivo: aparece la ventana de inicio de sesión, acepta tu contraseña y ves tus sesiones. Desde un dispositivo con la contraseña equivocada: no se entra.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| El interruptor se niega y pide un usuario | Añade antes un usuario en **Configuración > Acceso WebUI** |
| La página no carga en el móvil | Comprueba que los dos dispositivos están en la misma red y que un cortafuegos del ordenador no bloquea el puerto |
| «Exigir usuario y contraseña» no se activa | Aún no hay usuarios. Añade uno |
| La página de ajustes dice que está inactivo | Pando solo escucha a este ordenador y la cerradura no hace falta. Pasa a activo cuando el acceso externo está encendido |
| El navegador sigue avisando del certificado | Confía una vez en el certificado de Pando en ese dispositivo |

## ¿Prefieres la terminal?

Arranca Pando ya abierto a la red:

```bash
pando app --host 0.0.0.0
```

O déjalo escrito en el fichero de configuración:

```toml
[Server]
Host = "0.0.0.0"

[Server.BasicAuth]
Enabled = true

[[Server.BasicAuth.Users]]
Username = "admin"
Password = "your-secure-password"
```

Todas las claves y la API de gestión de usuarios están en la [referencia]({{< relref "/docs/configuration/webui" >}}).
