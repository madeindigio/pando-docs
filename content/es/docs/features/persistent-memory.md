---
title: Sistema de Memoria Persistente
weight: 12
---

Pando incluye un sistema de memoria persistente construido sobre el backend de la Base de Conocimiento (KB). Las memorias sobreviven entre sesiones, se inyectan automáticamente en el contexto cuando son relevantes y soportan ranking ponderado por importancia con expiración TTL.

## Herramientas Principales

### Almacenar una Memoria

Usa la herramienta `remember` para almacenar o actualizar una memoria:

```json
{
  "content": "El usuario prefiere TypeScript sobre JavaScript para proyectos nuevos",
  "key": "user.preferred_lang",
  "scope": "user/",
  "importance": 0.8
}
```

| Parámetro | Descripción |
|-----------|-------------|
| `content` | El hecho o preferencia a recordar |
| `key` | Clave de upsert opcional (misma clave reemplaza memoria anterior) |
| `scope` | Prefijo opcional: `user/`, `project/`, `session/` |
| `importance` | Peso para ranking de inyección, 0.0–1.0 (predeterminado 0.5) |
| `ttl_days` | Sobreescribir TTL predeterminado (predeterminado 180 días) |

### Recuperar Memorias

Busca memorias almacenadas con la herramienta `recall`:

```json
{
  "query": "preferencia de lenguaje del usuario",
  "scope": "user/",
  "limit": 5
}
```

Las memorias se clasifican por relevancia, recencia y frecuencia de acceso. Cada recuperación incrementa automáticamente el contador de hits y extiende el TTL.

### Eliminar una Memoria

Usa la herramienta `forget` para eliminar una memoria:

```json
{
  "key": "user.preferred_lang"
}
```

## Inyección Automática de Contexto

Las memorias se inyectan automáticamente en el system prompt como un bloque XML `<memories>` cuando son relevantes para la conversación actual. La inyección se clasifica por:

1. **Recencia** - memorias más nuevas puntúan más alto
2. **Relevancia** - similitud semántica con el contexto actual
3. **Frecuencia de acceso** - memorias frecuentemente recuperadas se priorizan
4. **Importancia** - el peso configurado impulsa el ranking

## Configuración

```toml
[Remembrances]
MemoryEnabled = true
MemoryContextEnrichmentEnabled = true
MemoryContextMaxItems = 3          # Máximas memorias inyectadas por prompt
MemoryContextMaxChars = 0          # 0 = sin límite
MemoryDefaultTTLDays = 0           # 0 = predeterminado 180 días
MemoryGCInterval = ''              # Intervalo de recolección de basura
MemoryAutoCapture = false          # Auto-capturar conversaciones
MemoryPinnedScopes = []            # Scopes exentos de GC
```

## Expuesto como Servidor MCP

Las herramientas de memoria (`remember`, `recall`, `forget`) se exponen al ejecutar como servidor MCP:

```bash
pando mcp-server
```

Agentes externos pueden usar estas herramientas a través del protocolo MCP.

## Recolección de Basura

Un recolector de basura en segundo plano elimina automáticamente las memorias expiradas según el TTL. Las memorias con mayor conteo de hits tienen su TTL extendido en cada recuperación.

{{< callout >}}
Usa claves descriptivas como `user/preferences/language` o `project/architecture/decisions` para organizar las memorias. Las memorias con scope (prefijadas con `user/`, `project/`) permiten búsquedas dirigidas.
{{< /callout >}}
