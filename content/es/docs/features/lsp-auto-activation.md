---
title: Autoactivación de LSP
weight: 19
---

Un servidor de lenguaje es un corrector para un lenguaje de programación: ve la errata, el import que falta, la llamada a algo que no existe. Pando lleva un corrector para cada lenguaje habitual y llama al adecuado en cuanto toca un fichero. Tú no configuras nada.

## Qué hace por ti

- **Pando revisa su propio trabajo.** Después de cambiar un fichero pregunta al corrector si hay problemas, y los arregla antes de decirte que ha terminado.
- **Nada que configurar.** Pando reconoce el lenguaje por el nombre del fichero y sabe qué corrector le corresponde. Su catálogo cubre más de cuarenta lenguajes.
- **Nada desperdiciado.** Un corrector arranca solo cuando aparece un fichero de su lenguaje. Si nunca abres un fichero de Rust, el de Rust no arranca nunca.
- **Los que faltan se instalan solos.** Muchos se descargan la primera vez que hacen falta. Para el resto, Pando te dice el comando.

## Cómo se nota en el día a día

Pides un cambio en un fichero de Python. Pando lo edita y al momento añade: «había un import sin usar, lo he quitado». Esa segunda mirada vino del corrector.

También ves el número de problemas en la barra de estado de la interfaz de terminal, y junto a las líneas cuando recorres un fichero en el editor.

{{< shot src="images/webui/pando-webui-settings-lsp.jpg" alt="Ajustes de servidores de lenguaje" >}}

## Cuándo usarlo

Viene activado y casi todo el mundo lo deja como está. Abre sus ajustes cuando quieras:

- añadir un corrector para un lenguaje que Pando no conoce,
- hacer que uno arranque con Pando porque tarda en calentar,
- callar uno que no quieres,
- que se informe de los problemas también cuando solo lees ficheros, no solo cuando Pando los edita.

## Conviene saber

- Si un corrector no está instalado y no se puede instalar solo, Pando lo marca como no disponible y deja de intentarlo. Sin lluvia de errores.
- Si uno se cae, Pando no lo vuelve a arrancar en la misma sesión. Reinicia Pando para reintentarlo.
- Algunos necesitan un fichero de proyecto para entender tu código, como `go.mod` en Go.
- Tus ajustes siempre ganan a los integrados.

## Siguientes pasos

- Guía: [Que Pando vea los fallos mientras escribe]({{< relref "/guides/language-servers" >}}).
- Referencia: [todas las opciones y la lista de servidores integrados]({{< relref "/docs/configuration/lsp" >}}).
