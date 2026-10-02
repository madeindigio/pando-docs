---
title: Acceso a la WebUI (Basic Auth)
weight: 20
---

El acceso a la WebUI es la cerradura de la puerta principal de Pando. Mientras Pando solo escucha a tu propio ordenador, la puerta está cerrada y no hace falta cerradura. En cuanto dejas entrar a otros dispositivos, tu móvil o el portátil de una compañera, Pando pide a cada visitante un usuario y una contraseña.

## Qué hace por ti

- **Deja fuera a los desconocidos.** Sin ella, cualquiera en la misma wifi podría abrir tu Pando, leer tu código y ejecutar comandos. Con la cerradura puesta, se encuentran una ventana de inicio de sesión.
- **Se cuida sola.** La cerradura solo importa con la puerta abierta, y Pando sabe distinguirlo. No tienes que acordarte de ponerla y quitarla.
- **Sin huecos.** Abrir Pando a la red y exigir la contraseña ocurren en el mismo instante. No hay un momento en que esté accesible y sin protección.
- **Una llave por persona.** Da un usuario a cada persona y quita uno sin molestar al resto.
- **Sin reiniciar.** Un interruptor en la barra inferior abre y cierra la puerta con Pando en marcha.

## Cómo se vive

En tu ordenador no cambia nada: Pando se abre como siempre. Añades un usuario, activas el **acceso externo** en la barra inferior y Pando muestra la dirección que hay que usar desde fuera. En el móvil abres esa dirección, Pando enseña su propia ventana de inicio de sesión (no el aviso soso del navegador), escribes la contraseña y ya estás viendo tus sesiones.

En la página de ajustes una nota te dice cómo estás: inactivo mientras Pando es solo local, activo cuando es accesible desde la red. Ver «inactivo» no es un fallo. Significa que no hay nadie fuera a quien preguntar.

## Cuándo usarlo

- Quieres vigilar un trabajo largo desde el sofá.
- Tienes Pando en una máquina sin pantalla y lo usas desde el portátil.
- Un equipo pequeño comparte un Pando.

Si solo usas Pando en la máquina donde funciona, no necesitas nada de esto.

## Conviene saber

- Cuando Pando está abierto a la red, todo el mundo inicia sesión, incluido el navegador del mismo ordenador.
- No se puede activar la cerradura sin al menos un usuario, y al borrar el último se desactiva. No puedes quedarte fuera.
- Las contraseñas se guardan cifradas en tu fichero de configuración, igual que tus API keys, y viajan por una conexión cifrada.
- Esto protege el acceso dentro de tu red. No convierte a Pando en algo seguro para exponer a internet.

## Siguientes pasos

- Guía: [Usa Pando desde el móvil u otro ordenador]({{< relref "/guides/remote-access" >}}).
- Referencia: [opciones del servidor y del acceso]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}), [Cifrado AGE]({{< relref "/docs/configuration/age-encryption" >}}).
