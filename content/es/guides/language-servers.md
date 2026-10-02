---
title: "Que Pando vea los fallos mientras escribe"
shortTitle: "Servidores de lenguaje"
description: "Comprueba que los servidores de lenguaje arrancan solos, elige cuándo se despiertan y añade uno para un lenguaje que Pando no conoce."
summary: "Un corrector para cada lenguaje en el que programas."
track: soil
level: intermediate
weight: 22
---

Un servidor de lenguaje es un corrector para un lenguaje de programación: subraya la errata, el import que falta, la función que no existe. Pando trae un corrector para cada lenguaje habitual y llama al adecuado cuando toca un fichero. Casi nadie necesita esta pantalla. Esta guía te enseña lo que hay en ella y qué cambiar cuando haga falta.

Necesitas Pando abierto en la Web UI (la aplicación de escritorio es la misma interfaz).

## Mira lo que ya está funcionando

Ve a **Configuración > LSP**. La página se llama **Language Servers (LSP)**.

{{< shot src="images/webui/pando-webui-settings-lsp.jpg" alt="Ajustes de servidores de lenguaje" >}}

Al final, abre **Built-in catalogue**. Lista los correctores que conoce Pando, más de cuarenta, y te dice de cada uno si está instalado en tu máquina.

Si ves la nota «No language server configured explicitly», es buena señal: no has tenido que configurar nada y Pando usa su catálogo.

## Elige cuándo se despierta un corrector

**On-demand activation** viene activado: un corrector arranca solo cuando hace falta, así que los de lenguajes que no usas siguen dormidos.

**Activate on** decide qué cuenta como «hace falta»:

| Opción | Un corrector arranca cuando… | Va bien para |
|---|---|---|
| **edits** (por defecto) | Pando edita un fichero | El día a día. Ligero para tu máquina |
| **reads** | Pando solo lee un fichero, o tú abres uno en el visor | Cuando quieres ver los problemas mientras exploras |
| **workspace** | Cambia cualquier fichero, también fuera de Pando | Cuando editas a la vez en otro programa |
| **off** | Nunca por su cuenta | Cuando quieres control manual total |

## Deja que Pando instale los que faltan

Con **Install servers automatically** activado, Pando descarga un corrector la primera vez que lo necesita. Vale para los muchos que se distribuyen como paquetes pequeños (Python, TypeScript, YAML, JSON, HTML, CSS, Bash, PHP…).

**Package manager** dice quién hace la descarga: **auto** usa bun si lo tienes y npm si no.

Algunos correctores vienen con las herramientas del propio lenguaje (Go, Rust, C/C++…). Esos Pando no los instala; te dice el comando exacto que tienes que ejecutar.

**Timeouts** es la paciencia de Pando: 20 segundos para que un corrector esté listo, 2 minutos si antes hay que instalarlo.

## Añade un corrector para otro lenguaje

Pulsa **Add LSP**.

{{< shot src="images/webui/pando-webui-settings-lsp-add-server.jpg" alt="Diálogo Add Language Server" >}}

1. **Language**: elige uno del catálogo y lo demás se rellena solo. Para algo tuyo, escribe un nombre.
2. **Command**: el programa que hay que ejecutar. Añade los argumentos de uno en uno con **Add**.
3. La primera caja de etiquetas es la lista de **extensiones de fichero** de las que se ocupa este corrector (`.c`, `.h`…). Añade o quita las que necesites.
4. La segunda caja es para **nombres de fichero exactos**, para ficheros cuyo nombre dice más que su extensión, como `Dockerfile`.
5. **Autostart**: activado, arranca con Pando sin esperar al primer fichero. Útil para uno que tarda en arrancar y usas a diario.
6. **Disabled**: activado, lo duerme sin borrarlo.
7. **Save**.

Con el mismo diálogo se cambia uno de los integrados: elígelo en **Language**, cambia lo que necesites y guarda. Tu versión gana.

## Comprueba que funciona

1. Abre **Chat** y pide a Pando un cambio pequeño en un fichero de código.
2. Luego pregunta: «¿hay algún error en ese fichero?». Pando contesta con lo que ha encontrado el corrector, o te dice que está limpio.
3. De vuelta en **Configuración > LSP**, el corrector de ese lenguaje aparece como instalado.

{{< under-surface >}}
Cada vez que Pando escribe en un fichero, pide una segunda opinión al corrector antes de decirte que ha terminado. Así pilla sus propios despistes sin que tú se los señales.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Un lenguaje aparece como «not installed» | Instala su servidor. Para los que vienen con las herramientas del lenguaje, Pando muestra el comando |
| Está instalado pero no informa de nada | Comprueba que la extensión del fichero está en la lista del corrector. Algunos necesitan además un fichero de proyecto, como `go.mod` en Go |
| Arrancó y luego se paró | Pando no vuelve a arrancar en la misma sesión un corrector que se ha caído. Reinicia Pando |
| La primera comprobación va lenta | El corrector se está instalando o está calentando. Las siguientes van rápidas |
| No quieres un corrector | Activa su interruptor **Disabled** |

## ¿Prefieres la terminal?

Para ver si un programa está instalado: `which gopls` (o el nombre que salga en el catálogo). Para dejarlo escrito en `.pando.toml`:

```toml
LSPActivateOn  = "reads"
LSPAutoInstall = true

[LSP.pyright]
Autostart = true

[LSP.my-custom-lsp]
Command   = 'my-lsp'
Args      = ['--stdio']
Languages = ['.mylang']
```

En la interfaz de terminal, la misma pantalla está en la configuración, **> LSP**. Todas las opciones están en la [referencia de servidores de lenguaje]({{< relref "/docs/configuration/lsp" >}}).
