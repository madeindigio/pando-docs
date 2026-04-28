---
title: Command line
weight: 1
---

## Interfaz de Línea de Comandos (CLI)

Pando se puede ejecutar completamente desde la terminal, proporcionando una experiencia de usuario fluida e interactiva sin necesidad de interfaces gráficas. La CLI de Pando es el núcleo de la experiencia, permitiendo a los usuarios interactuar con sus proyectos, gestionar sesiones, ejecutar comandos y acceder a herramientas directamente desde la línea de comandos.

Este modo permite ser utilizado en scripts y automatizaciones, así como en entornos sin acceso a interfaces gráficas, manteniendo toda la potencia de Pando accesible desde cualquier terminal.

El modo cli permite trabajar en modo agente autónomo con un prompt y todas las capacidades de las tools de Pando, pudiendo leer ficheros, ejecutar comandos, navegar por la web, escribir código y ejecutarlo, etc...

```bash
pando --quiet --yolo --model copilot.gpt-4.1 -p "Escribe un script de python que imprima 'Hola Mundo' y ejecútalo"
```

También puedes generar la salida en formato JSON para integrarla con otras herramientas o scripts:

```bash
pando --quiet --yolo --model copilot.gpt-4.1 -p "Escribe un script de python que imprima 'Hola Mundo' y ejecútalo" --output-format json
```

## Asistente de comandos

Puedes pedir a pando ayuda en lenguaje natural para generar comandos de terminal. Por ejemplo:

```bash
pando cli-assist "¿Cómo puedo listar los archivos en el directorio actual?"
```

{{< asciinema file="https://asciinema.org/a/62CCiqfws8mDbL5U.cast" >}}