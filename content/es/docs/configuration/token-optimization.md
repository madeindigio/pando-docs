---
title: Optimización de Tokens
weight: 12
---

La Optimización de Tokens te ayuda a reducir la cantidad de tokens que Pando usa durante las conversaciones. Menos tokens significan respuestas más rápidas y menores costes con tu proveedor de IA. Estas configuraciones son seguras de usar — las lecturas comprimidas nunca cuestan más que las lecturas completas, y los valores por defecto preservan el comportamiento estándar.

Puedes configurar estas opciones en la sección **Ajustes > Optimización de tokens** de la Web UI, o directamente en tu archivo de configuración `.pando.toml`.

## Optimización de Lectura de Archivos

Cuando Pando lee archivos, envía el contenido al modelo de IA como tokens. Estas configuraciones controlan cuánto detalle se incluye.

### Modo de Lectura por Defecto

Controla cuánto de un archivo muestra Pando a la IA cuando lo lee.

| Valor | Qué hace | Cuándo usarlo |
|-------|----------|---------------|
| **Completo** (por defecto) | Muestra el contenido del archivo tal como está almacenado | Mejor para archivos pequeños o cuando necesitas que la IA vea todo |
| **Auto** | Elige automáticamente el mejor modo según el tamaño y tipo del archivo | Opción general buena que equilibra detalle y eficiencia |
| **Firmas** | Muestra solo nombres de funciones/clases y sus firmas | Ideal para archivos grandes donde solo necesitas la estructura |
| **Mapa** | Muestra imports y declaraciones de nivel superior únicamente | Útil para entender la organización de un archivo rápidamente |

**Recomendación**: Empieza con **Completo** (el por defecto). Cambia a **Auto** si trabajas con archivos grandes y quieres ahorrar tokens automáticamente.

### Deduplicar Relecturas Sin Cambios

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Activado** | Sí | Cuando Pando lee la misma sección de un archivo otra vez sin cambios, envía una referencia corta en lugar del contenido completo |

**Recomendación**: Mantén esto **activado**. Ahorra tokens sin ningún inconveniente — si el archivo no ha cambiado, la IA recibe la misma información con menos tokens.

### Aprendizaje Adaptativo del Modo Auto

Cuando configuras el Modo de Lectura en **Auto**, Pando usa un rastreador de rebotes para aprender de la experiencia — observa cuando las lecturas comprimidas no dan suficiente detalle a la IA y escala automáticamente a lecturas más completas para archivos o tipos de archivo que lo necesitan.

Un "rebote" ocurre cuando Pando lee un archivo en modo comprimido (firmas o mapa) y luego inmediatamente lo relee en modo completo — la IA necesitaba más detalle que la vista comprimida proporcionaba. El rastreador de rebotes cuenta estos eventos por ruta de archivo y por extensión. Si un archivo o extensión rebota frecuentemente, la siguiente lectura Auto escala automáticamente hacia modo completo.

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Desactivado** | Sí | El rastreador de rebotes sigue funcionando (protegiéndote de mala compresión), pero Pando no usa aprendizaje estadístico para predecir qué archivos necesitan más detalle. El rastreador escala puramente basándose en conteos duros de rebotes. |
| **Activado** | No | Activa una capa de aprendizaje estadístico (posterior Beta) que puede predecir, basándose en patrones de extensión, cuándo escalar incluso antes de que ocurra un rebote. Usa esto si quieres que el modo Auto sea más agresivo en el aprendizaje. |

**Recomendación**: Mantén esto **desactivado** a menos que notes que el modo auto comprime archivos que necesitan detalle completo. Cuando se activa, aprende de la experiencia pero ocasionalmente puede equivocarse. El rastreador de rebotes siempre está activo en modo Auto — esta configuración solo controla la capa extra de aprendizaje estadístico.

{{< callout type="info" >}}
El rastreador de rebotes solo se aplica cuando usas el modo **Auto**. Si usas Completo, Firmas o Mapa explícitamente, no ocurre aprendizaje.
{{< /callout >}}

## Optimización de Salida de Shell (RTK)

Cuando Pando ejecuta comandos de shell (como `git status`, `npm test` o `cargo build`), la salida puede ser muy verbosa. La compresión RTK elimina ruido innecesario manteniendo la información importante.

### Activar Compresión de Salida

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Activado** | Sí | Comprime la salida de comandos de shell eliminando cabeceras repetidas, formateo y texto repetitivo, preservando códigos de salida y errores |

**Recomendación**: Mantén esto **activado**. Reduce significativamente los tokens de la salida de comandos sin perder información útil.

### Ficheros de Filtro Adicionales

Añade archivos TOML de filtro personalizados para extender las reglas de compresión integradas. Esto es para usuarios avanzados que quieren personalizar cómo se comprimen comandos específicos.

**Recomendación**: Mantén esto **vacío** a menos que tengas necesidades específicas de compresión para herramientas personalizadas.

## Grafo de Código

El grafo de código rastrea relaciones entre archivos (imports, llamadas a funciones, referencias). Esto potencia funciones como el análisis de impacto y sugerencias de archivos relacionados.

### Construir Grafo de Propiedades del Código

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Activado** | Sí | Extrae relaciones entre archivos durante la indexación de código para habilitar el análisis de impacto |

**Recomendación**: Mantén esto **activado** si usas la indexación de código. Habilita funciones útiles como "¿qué afectará este cambio?"

### Sugerencia de Ficheros Relacionados

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Desactivado** | No | Añade una lista de archivos relacionados al final de las lecturas de archivos y resultados de búsqueda |

**Recomendación**: Activa esto si a menudo necesitas entender cómo se conectan los archivos. Añade una pequeña cantidad de tokens pero puede ahorrarte buscar archivos relacionados manualmente.

## Registro de Ahorros

### Registrar Libro de Ahorro de Tokens

| Configuración | Por defecto | Qué hace |
|---------------|-------------|----------|
| **Activado** | Sí | Rastrea cuántos tokens ahorra cada función de optimización, mostrado en el widget de Ahorros |

**Recomendación**: Mantén esto **activado** para ver cuánto te está ahorrando Pando. El seguimiento tiene un impacto mínimo.

### Ver Tus Ahorros

El widget de **Ahorros** en los ajustes de Optimización de tokens muestra:
- Total de tokens ahorrados
- Porcentaje de reducción
- Desglose por fuente (lecturas de archivos, salida de shell, deduplicación)

También puedes ver los ahorros desde la línea de comandos:

```bash
# Mostrar resumen acumulado de ahorros
pando gain

# Mostrar ahorros de los últimos 30 días
pando gain --days 30

# Estimar ahorro en coste (precio por millón de tokens)
pando gain --price 3

# Salida en JSON (para scripts)
pando gain --json
```

### Ahorros vía MCP

La herramienta `pando_stats` está disponible para los agentes durante las conversaciones. Reporta los mismos datos de ahorro — tokens ahorrados, porcentaje de reducción y desglose por fuente — para que la IA pueda referenciar sus propias estadísticas de optimización cuando sea relevante. Usa `pando_stats` con un parámetro opcional `days` para limitar el período de reporte.

## Archivo de Configuración

Todas las configuraciones se pueden ajustar en `.pando.toml`:

```toml
[TokenOptimization]
# Modo de lectura: "full" (por defecto), "auto", "signatures", "map"
ReadModeDefault = "full"

# Deduplicar relecturas sin cambios (por defecto: true)
ReadDedupDisabled = false

# Aprendizaje adaptativo para modo auto (por defecto: false)
ReadModeLearning = false

# Construir grafo de propiedades del código (por defecto: true)
BuildCodeGraph = true

# Mostrar archivos relacionados en resultados (por defecto: false)
RelatedFilesHint = false

# Registrar ahorro de tokens (por defecto: true)
SavingsLedgerDisabled = false
```

También puedes sobrescribir el modo de lectura con una variable de entorno:

```bash
# Forzar modo auto para todas las sesiones
PANDO_READ_MODE_DEFAULT=auto pando serve
```

O en `.pando.json`:

```json
{
  "tokenOptimization": {
    "readModeDefault": "full",
    "readDedupDisabled": false,
    "readModeLearning": false,
    "buildCodeGraph": true,
    "relatedFilesHint": false,
    "savingsLedgerDisabled": false
  }
}
```

## Referencia Rápida

| Característica | Por defecto | Recomendado | Ahorro de Tokens |
|----------------|-------------|-------------|------------------|
| Modo de Lectura | Completo | Completo o Auto | Medio-Alto |
| Deduplicación | Activado | Activado | Medio |
| Aprendizaje Adaptativo | Desactivado | Desactivado | Bajo |
| Compresión de Salida | Activado | Activado | Alto |
| Grafo de Código | Activado | Activado | Habilita funciones |
| Archivos Relacionados | Desactivado | Opcional | Bajo |
| Registro de Ahorros | Activado | Activado | Ninguno (solo seguimiento) |

**Comandos de línea de comandos:**
| Comando | Descripción |
|---------|-------------|
| `pando gain` | Mostrar resumen acumulado de ahorros de tokens |
| `pando gain --days 30` | Mostrar ahorros de un período de tiempo |
| `pando gain --price 3` | Estimar ahorro en coste USD |
| `pando gain --json` | Salida JSON para scripts |

{{< callout >}}
Todas las funciones de optimización son aditivas y a prueba de fallos. Las lecturas comprimidas nunca cuestan más que las lecturas completas — si la compresión produce más tokens que el contenido crudo, Pando vuelve automáticamente a la lectura completa. Puedes experimentar con diferentes configuraciones sin preocuparte — si algo no funciona bien, simplemente cámbialo. Los valores por defecto preservan el comportamiento estándar de Pando.
{{< /callout >}}
