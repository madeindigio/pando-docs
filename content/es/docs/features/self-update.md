---
title: Auto-Actualización
weight: 19
---

Pando puede actualizarse a sí mismo descargando la última versión desde GitHub y reemplazando el binario en ejecución.

## Uso

```bash
# Actualizar a la última versión estable
pando update

# Verificar si existe una versión más reciente (sin cambio)
pando update --check
```

## Cómo Funciona

1. Consulta la API de GitHub para la última release de `digiogithub/pando`
2. Verifica tu arquitectura (x64/arm64) y SO
3. Descarga el archivo zip y extrae el binario de pando
4. Reemplaza atómicamente el ejecutable en ejecución
5. Verifica permisos de escritura antes de intentar la actualización

## Verificación de Actualización en Segundo Plano

Al iniciar, Pando ejecuta una verificación en segundo plano (timeout de 2 segundos) y muestra un aviso en stderr si hay una versión más reciente disponible:

```
Una versión más reciente de Pando está disponible: v1.2.3 (actual: v1.2.2)
Ejecuta 'pando update' para actualizar.
```

## Notas

- Requiere permisos de escritura en la ubicación del binario de pando
- Resuelve symlinks antes de reemplazar
- Seguro de ejecutar mientras Pando está en uso
- Las actualizaciones se obtienen del repositorio GitHub `digiogithub/pando`

{{< callout >}}
Ejecuta `pando update` regularmente para obtener las últimas funcionalidades y correcciones de errores. El proceso de actualización es atómico—o el nuevo binario se instala completamente o el anterior permanece.
{{< /callout >}}
