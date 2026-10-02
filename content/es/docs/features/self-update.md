---
title: Auto-Actualización
weight: 19
---

Pando se actualiza solo: descarga una versión desde GitHub y reemplaza su propio binario.

## Uso

```bash
# Actualizar a la última versión estable
pando update

# Solo comprobar si existe una versión más reciente
pando update --check

# Instalar una versión concreta
pando update v1.2.6
```

## Instalar una versión concreta o volver atrás

Pasa una versión a `pando update` para instalar exactamente esa, aunque sea anterior a la que tienes. Sirve para volver atrás después de una actualización que no te funciona, o para reinstalar la versión actual.

```bash
pando update v1.1.1      # volver a la 1.1.1
pando update 1.2.6       # la "v" es opcional
```

Pando te dice lo que va a hacer: `Installing`, `Downgrading` o `Reinstalling`.

## Dónde ves que hay una actualización

- **Terminal**: al arrancar, Pando muestra un aviso cuando hay una versión más reciente.

  ```
  A newer version of Pando is available: v1.2.3 (current: v1.2.2)
  Run 'pando update' to upgrade.
  ```

- **Web UI y escritorio**: el panel de información del chat y **Ajustes > General > Diagnóstico** muestran tu versión y te avisan cuando existe una más nueva.

## Cómo funciona

1. Busca la versión en GitHub (`digiogithub/pando`)
2. Elige el fichero de tu sistema operativo y arquitectura
3. Lo descarga y extrae el binario
4. Reemplaza el ejecutable en marcha en un solo paso

## Notas

- Necesitas permiso de escritura en la carpeta donde está el binario `pando`.
- Es seguro ejecutarlo mientras Pando está en uso.
- El reemplazo es atómico: o el binario nuevo queda instalado del todo o se queda el anterior.
- En macOS, si instalaste con el `.pkg`, usa un `.pkg` nuevo para actualizar `Pando.app`. Consulta [Instaladores Multi-Plataforma]({{< relref "/docs/features/installers" >}}).
