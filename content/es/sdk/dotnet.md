---
title: SDK para .NET
weight: 4
---

El **SDK oficial de Pando para .NET** permite integrar las capacidades de IA locales de Pando en tus aplicaciones desarrolladas en C# y .NET 8 o superior.

Repositorio en GitHub: [madeindigio/pando-cshardotnet-sdk](https://github.com/madeindigio/pando-cshardotnet-sdk)

## Requisitos Previos

- **.NET 8** o superior.
- La CLI de `pando` instalada y disponible en tu `PATH` (o configurada mediante la variable de entorno `PANDO_PATH` o las opciones del cliente).

## Instalación

Instala el paquete oficial desde NuGet en tu proyecto:

```bash
dotnet add package Pando.Sdk
```

---

## 1. Modo Subproceso (`PandoClient`)

`PandoClient` está diseñado para ejecuciones rápidas y consultas de un solo turno (por ejemplo, scripts personalizados o automatización de tareas) donde se inicia `pando` como un proceso secundario y se espera recibir una respuesta única y directa.

```csharp
using Pando.Sdk;

var client = new PandoClient(new PandoClientOptions
{
    Model = "claude-sonnet-4-6",
    WorkingDirectory = "/ruta/a/tu/proyecto"
});

var result = await client.RunAsync("¿Cuál es la complejidad temporal del algoritmo quicksort?");
Console.WriteLine(result.Response);
```

---

## 2. Modo Sesión ACP (`PandoAgent`)

Para aplicaciones interactivas o flujos conversacionales de múltiples turnos, `PandoAgent` se conecta una única vez al servidor `pando --acp-server` y mantiene una sesión interactiva abierta a través de los canales de entrada/salida estándar (stdio). Soporta flujos de datos e información en tiempo real mediante eventos.

```csharp
using Pando.Sdk;
using Pando.Sdk.Events;

await using var agent = new PandoAgent(new PandoAgentOptions
{
    Model = "claude-sonnet-4-6",
    Persona = "software-engineer",
});

await agent.ConnectAsync();

await using var session = await agent.CreateSessionAsync("Refactorización de código");

await foreach (var evt in session.SendAsync("Revisa este módulo de autenticación..."))
{
    switch (evt)
    {
        case ContentDeltaEvent { Delta: var delta }:
            Console.Write(delta);
            break;
        case ResponseEvent:
            Console.WriteLine();
            break;
        case ErrorEvent { Error: var error }:
            Console.Error.WriteLine($"Error: {error}");
            break;
    }
}
```

### Método de Conveniencia: `AskAsync`
Si no necesitas recibir la respuesta de forma progresiva (streaming) y prefieres obtener únicamente el texto completo final:

```csharp
var answer = await session.AskAsync("Explica async/await en C#");
Console.WriteLine(answer);
```

---

## 3. Inyección de Dependencias

El SDK para .NET se integra de forma nativa con el contenedor de Inyección de Dependencias de Microsoft. Puedes registrar `IPandoAgent` como un servicio singleton:

```csharp
// Program.cs
builder.Services.AddPando(options =>
{
    options.WorkingDirectory = Directory.GetCurrentDirectory();
    options.Model = "claude-sonnet-4-6";
    options.Persona = "software-engineer";
});
```

A continuación, inyéctalo en tus servicios en segundo plano, controladores o clases de lógica:

```csharp
public class AIWorkflowService(IPandoAgent agent)
{
    public async Task RunAsync(CancellationToken ct)
    {
        // Recuerda conectar el agente antes de crear cualquier sesión
        await agent.ConnectAsync(ct);
        
        await using var session = await agent.CreateSessionAsync("tarea-segundo-plano", ct);
        var answer = await session.AskAsync("Encuentra todas las advertencias de obsolescencia en la solución actual", ct);
        Console.WriteLine(answer);
    }
}
```

---

## 4. Cliente HTTP REST (`PandoHttpClient`)

Cuando la aplicación de escritorio (`pando app`) o el servicio (`pando serve`) se encuentra en ejecución como un servidor HTTP local (puerto predeterminado `8765`), puedes interactuar con Pando directamente mediante peticiones HTTP:

```csharp
using Pando.Sdk;

await using var http = new PandoHttpClient(new PandoHttpClientOptions
{
    BaseUrl = "http://localhost:8765",
});

// Listar las sesiones existentes
var sessions = await http.Sessions.ListAsync();

// Crear una nueva sesión y transmitir fragmentos de la respuesta
var session = await http.Sessions.CreateAsync("Mi sesión HTTP");
await foreach (var chunk in http.Sessions.SendMessageAsync(session.Id, "Traduce este archivo de configuración a JSON"))
{
    if (chunk.Type == "content_delta")
        Console.Write(chunk.Delta);
}

// Cambiar el modelo de lenguaje activo dinámicamente
await http.Models.SetActiveAsync("copilot.gpt-5.4");

// Obtener la lista de personas de IA configuradas
var personas = await http.Personas.ListAsync();
```

---

## Manejo de Excepciones

Todas las excepciones lanzadas por el SDK de .NET heredan de la clase base `PandoException`:

| Excepción | Descripción |
|-----------|-------------|
| `PandoBinaryNotFoundException` | Se lanza cuando no se logra encontrar el ejecutable de la CLI `pando` en el sistema. |
| `PandoConnectionException` | Se lanza cuando la comunicación con el subproceso falla o el proceso finaliza de forma inesperada. |
| `PandoSessionException` | Se lanza si ocurre un error en las operaciones de la sesión o se detecta un estado no válido. |
| `PandoTimeoutException` | Se lanza cuando una operación asíncrona excede el tiempo de espera (timeout) configurado. |
| `PandoRpcException` | Se lanza cuando el servidor ACP responde con un código de error de protocolo JSON-RPC. |

```csharp
try
{
    var result = await client.RunAsync(prompt);
}
catch (PandoBinaryNotFoundException ex)
{
    Console.Error.WriteLine($"No se encontró la CLI de Pando: {ex.Message}");
}
catch (PandoConnectionException ex)
{
    Console.Error.WriteLine($"Error de comunicación con Pando: {ex.Message}");
}
```

---

## Resolución del Binario

El SDK localiza el archivo ejecutable `pando` en tu sistema siguiendo este orden de prioridad:

1. **Configuración Explícita**: La propiedad `PandoPath` definida en `PandoClientOptions` o `PandoAgentOptions`.
2. **Variable de Entorno**: El valor de la variable de entorno `PANDO_PATH`.
3. **Búsqueda en el Sistema**: Escaneando las carpetas incluidas en la variable de entorno `PATH` del sistema operativo.

Si no se puede localizar el binario, el SDK lanzará una excepción de tipo `PandoBinaryNotFoundException` detallando las rutas que fueron inspeccionadas.
