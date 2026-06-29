---
title: Habilidad Ponytail (Modo YAGNI)
weight: 16
---

Ponytail es un conjunto de instrucciones de "desarrollador senior perezoso" que aplica principios YAGNI (You Aren't Gonna Need It - No Lo Vas a Necesitar). Hace que el agente escriba código más conciso, prefiera soluciones de la biblioteca estándar y cuestione la complejidad innecesaria.

## Activación

Usa el comando slash `/ponytail`:

```
/ponytail lite      # Construye lo solicitado, nombra la alternativa más perezosa
/ponytail full      # Aplica "La Escala" - stdlib primero, diff más corto
/ponytail ultra     # Extremista YAGNI: eliminación antes que adición
/ponytail off       # Desactivar (predeterminado para sesiones nuevas)
```

## Modos

| Modo | Comportamiento |
|------|----------------|
| `lite` | Construye lo solicitado, nombra la alternativa más perezosa |
| `full` | Aplica stdlib primero, diff más corto, explicación más corta |
| `ultra` | Extremista YAGNI: eliminación antes de adición, cuestiona el requisito |
| `off` | Desactivado (predeterminado) |

## La Escala (Modo Full)

Cuando el modo `full` está activo, el agente sigue "La Escala":

1. **Biblioteca estándar primero** - Usa stdlib existente antes de buscar dependencias
2. **Diff más corto** - Haz el cambio mínimo que resuelve el problema
3. **Explicación más corta** - Explica solo lo necesario

## Configuración

```toml
[Ponytail]
DefaultMode = ''   # 'lite', 'full', 'ultra', o '' (off)
```

O a través de variable de entorno:

```bash
PANDO_PONYTAIL_DEFAULT_MODE=full
```

## Ejemplo

Sin ponytail, el agente podría crear una nueva función de utilidad con tests, documentación y abstracciones. Con ponytail en modo `full`:

1. Verifica si stdlib ya resuelve el problema
2. Usa la implementación más simple posible
3. Omite abstracciones prematuras
4. Escribe tests mínimos

{{< callout >}}
Ponytail está inspirado en la habilidad ponytail de Dietrich Gebert (licencia MIT). Es particularmente útil para sesiones de refactorización donde quieres reducir la complejidad.
{{< /callout >}}
