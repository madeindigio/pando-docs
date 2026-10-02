---
title: Sandbox de comandos
weight: 38
---

El agente de Pando escribe comandos de verdad en tu ordenador de verdad. El sandbox de comandos es un corralito alrededor de cada uno de esos comandos: el agente puede compilar, probar y ordenar dentro de tu proyecto, pero no puede irse de paseo por el resto de tu máquina. No hay contenedores ni nada que instalar. En **Linux y macOS viene activado desde el primer día**.

## Qué hace por ti

- **Tu proyecto es el único sitio donde el agente puede escribir**, además de las carpetas temporales y las cachés de descargas habituales de tus herramientas.
- **Los ajustes del propio Pando están bajo llave.** El agente no puede apagar el corralito editando un fichero.
- **Tus hooks de git están bajo llave.** Un comando no puede dejar una trampa que se dispare más tarde, fuera del corralito.
- **Tus claves quedan fuera de la vista.** Todo lo que en tu entorno parezca una clave, un token o una contraseña se esconde a los comandos del agente.
- **Las puertas del propio Pando están cerradas.** Un comando no puede llamar a los servicios internos de Pando para cambiar ajustes a tus espaldas.

## Cómo se nota en el día a día

Sobre todo notas menos interrupciones. Como un comando vallado puede hacer poco daño, Pando deja de preguntar «¿puedo ejecutar esto?» con los comandos corrientes. Sigue parando con los arriesgados, como `sudo` o borrar una carpeta del sistema.

{{< shot src="images/webui/pando-webui-settings-sandbox.jpg" alt="Ajustes del sandbox de comandos" >}}

Cuando un comando choca con la valla, al agente se le cuenta qué ha pasado y por qué, y casi siempre lo reintenta dentro del proyecto. Si de verdad necesita salir, te pide ejecutar ese único comando sin sandbox. Esa petición siempre necesita tu clic: ningún modo automático o desatendido puede concederla.

Una etiqueta pequeña en el panel de información del chat muestra el estado en todo momento.

## Cuatro alturas de valla

| Modo | En una frase |
|---|---|
| Escritura en el espacio de trabajo (por defecto) | Trabaja con libertad en el proyecto, con internet |
| Solo lectura | Mirar y no tocar |
| Estricto | Un proyecto del que aún no te fías: sin internet, y el agente ni siquiera puede leer tu carpeta personal |
| Desactivado | Sin valla |

## Cuándo usarlo

Déjalo activado. Súbelo a **Solo lectura** para revisiones y a **Estricto** cuando abras código de un desconocido. Apágalo solo para una tarea que no pueda funcionar dentro de la valla, y vuelve a encenderlo después.

Solo se vallan los comandos que escribe el agente. Los terminales que abres tú ejecutan lo que tú tecleas, sin restricciones.

## Conviene saber

- Un proyecto no puede aflojar tu sandbox. Los ajustes que vienen con un repositorio solo pueden hacerlo más estricto, así que clonar algo nunca apaga tu protección.
- Los cambios se aplican al siguiente comando. No hay que reiniciar nada.
- **Linux**: la protección completa necesita un kernel reciente (6.7 o posterior) y el pequeño paquete `bubblewrap`. Sin ellos Pando protege lo que puede, dice qué falta y sigue preguntando antes de cada comando.
- **Windows**: los comandos no se vallan. Pando sigue preguntando antes de cada uno.
- Si ejecutas los comandos dentro de Docker o Podman, la valla es el contenedor y el sandbox se hace a un lado.
- Cuando Pando trabaja dentro de un editor y el editor ejecuta el comando en su propio terminal, manda el editor.
- Los servidores de herramientas extra y los agentes delegados quedan fuera de la valla salvo que decidas incluirlos, porque suelen guardar sus ficheros en otros sitios.
- Las carpetas temporales siempre son escribibles, incluso en **Solo lectura**.

## Siguientes pasos

- Configúralo: [Sandbox y permisos]({{< relref "/guides/sandbox-and-permissions" >}})
- Todas las opciones y el detalle por plataforma: [referencia del sandbox]({{< relref "/docs/configuration/sandbox" >}})
- Aislamiento más fuerte: [Dev containers]({{< relref "/guides/dev-containers" >}})
