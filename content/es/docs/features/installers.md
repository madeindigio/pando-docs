---
title: Instaladores Multi-Plataforma
weight: 23
---

Pando es un solo programa, publicado ya preparado para macOS, Linux y Windows. Cada versión va firmada, que es el precinto del bote: tu sistema puede comprobar que el fichero viene de verdad del equipo de Pando y que nadie lo abrió por el camino.

## Qué hace por ti

- **Una descarga para tu máquina**, sea la que sea: Mac con Apple Silicon o Intel, Linux en procesadores habituales y ARM, Windows.
- **Una línea que lo hace todo.** Un script de instalación detecta tu sistema, descarga el fichero correcto, lo comprueba y lo coloca.
- **La app de escritorio incluida.** En macOS el instalador añade `Pando.app`; en Linux el script añade una entrada de menú y las piezas que necesita la ventana de escritorio.
- **Comprobado al llegar.** Las descargas se verifican contra la lista de huellas que se publica con cada versión.

## Cómo se nota en el día a día

En **macOS** abres un `.pkg` y sigues los pasos, como con cualquier otra app. En **Linux** y **macOS** también puedes pegar una línea en una terminal y esperar unos segundos. En **Windows** pegas una línea en PowerShell, o descomprimes y ejecutas `pando.exe`.

Volver a ejecutar el script más adelante actualiza Pando: compara lo que tienes con la última versión y lo sustituye.

## Qué usar en cada caso

| Estás… | Usa |
|---|---|
| En un Mac y te gustan los instaladores | El `.pkg` |
| En Linux, o cómodo en una terminal | El script de instalación |
| En Windows | El script de PowerShell, o el zip |
| Montando un servidor o una tarea automática sin pantalla | El script en su forma «sin escritorio» |
| Contribuyendo a Pando | Compilar desde el código |

## Conviene saber

- En Linux el script puede pedirte la contraseña, solo para instalar las piezas del sistema que necesita la ventana de escritorio. Si ese paso falla, la instalación termina igualmente.
- En Windows on ARM se instala la versión estándar, que funciona bien emulada.
- Las versiones anteriores a la lista de huellas se instalan con un aviso.

## Siguientes pasos

- Instala paso a paso, con todas las descargas y opciones: [Instala Pando]({{< relref "/guides/install" >}})
- Tabla de descargas, opciones del script y compilación desde el código: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
- Mantente al día después: [Autoactualización]({{< relref "/docs/features/self-update" >}})
- Todas las versiones: [GitHub](https://github.com/digiogithub/pando/releases/latest)
