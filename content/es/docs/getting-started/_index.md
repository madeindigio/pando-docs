---
title: Primeros Pasos
weight: 1
---

## Instalación

### Con Go

Si tienes Go instalado (1.21 o superior):

```bash
go install github.com/digiogithub/pando@latest
```

### Compilando desde el código fuente

```bash
git clone https://github.com/digiogithub/pando.git
cd pando
cd web-ui && bun install && bun run build:embedded && cd ..
go build -o pando
./pando
```

## Inicio rápido

Una vez instalado, inicia Pando con:

```bash
pando
```

Esto abrirá la interfaz TUI interactiva en tu terminal.

### Opciones de inicio

```bash
# Iniciar en un directorio específico
pando -c /ruta/al/proyecto

# Modo no interactivo (una sola consulta)
pando -p "Explica el uso de context en Go"

# Respuesta en formato JSON
pando -p "Explica el uso de context en Go" -f json

# Activar debug
pando -d
```

## Próximos pasos

{{< cards >}}
  {{< card link="../configuration" title="Configuración" icon="adjustments" subtitle="Configura proveedores de IA y opciones avanzadas" >}}
  {{< card link="../features" title="Características" icon="star" subtitle="Explora todas las funcionalidades de Pando" >}}
{{< /cards >}}
