---
title: Certificados HTTPS Automáticos
weight: 28
---

Cuando abres Pando en un navegador, la conversación entre los dos viaja en sobre cerrado (HTTPS), aunque ambos extremos estén en tu propia máquina o en tu propia red. Pando fabrica el sello él solo la primera vez que arranca. No compras, pides ni configuras nada.

## Qué hace por ti

- **Privado desde el primer segundo.** Todo lo que va entre el navegador y Pando está cifrado, incluidos tus prompts y tus claves.
- **Nada que configurar.** Pando crea el certificado en tu máquina y lo renueva por su cuenta.
- **Un sello para todos los proyectos.** Vive en tu perfil de Pando, así que todos tus proyectos lo comparten.
- **Funciona desde otros dispositivos.** Cubre `localhost` y las direcciones locales de tu ordenador, así que puedes abrir Pando desde el móvil en la misma red e instalarlo allí como app.

## Cómo se nota en el día a día

Arrancas la Web UI y la dirección empieza por `https://`. Como el sello es casero y no lo emite una autoridad pública, un navegador que lo ve por primera vez muestra un aviso, igual que un portero te pregunta quién eres la primera vez que entras. Dile una vez a ese dispositivo que se fíe del certificado de Pando y el aviso no vuelve.

## Cuándo usarlo

Siempre; es automático. Trae tu propio certificado solo si tu organización los emite o si publicas Pando en una dirección pública.

## Conviene saber

- El certificado se fabrica en tu ordenador y no sale de él.
- Es casero («autofirmado»). Para cualquier cosa expuesta a internet, usa un certificado de una autoridad reconocida.
- Las direcciones públicas de internet quedan fuera de lo que cubre el certificado casero.

## Siguientes pasos

- Abre Pando desde otro dispositivo: [Acceso remoto]({{< relref "/guides/remote-access" >}})
- Comandos, ubicación de los ficheros y cómo usar tu propio certificado: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
- Quién puede entrar: [Acceso a la WebUI]({{< relref "/docs/features/webui-access" >}})
