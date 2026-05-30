---
title: .NET SDK
weight: 4
---

The official **Pando .NET SDK** enables integration of Pando's developer-focused AI features into C# and .NET 8+ applications.

GitHub Repository: [madeindigio/pando-cshardotnet-sdk](https://github.com/madeindigio/pando-cshardotnet-sdk)

## Prerequisites

- **.NET 8** or later.
- The `pando` CLI installed and available on your `PATH` (or specified via environment variable `PANDO_PATH` or client options).

## Installation

Add the official NuGet package to your project:

```bash
dotnet add package Pando.Sdk
```

---

## 1. Subprocess Mode (`PandoClient`)

`PandoClient` is designed for fast, single-turn prompts (e.g., custom scripts, task automation) where you spawn `pando` as a child process and expect a single consolidated response.

```csharp
using Pando.Sdk;

var client = new PandoClient(new PandoClientOptions
{
    Model = "claude-sonnet-4-6",
    WorkingDirectory = "/path/to/project"
});

var result = await client.RunAsync("What is the time complexity of quicksort?");
Console.WriteLine(result.Response);
```

---

## 2. ACP Session Mode (`PandoAgent`)

For interactive or multi-turn applications (e.g. bots, complex assistants), `PandoAgent` connects to `pando --acp-server` once and keeps a persistent stdin/stdout session open. It supports real-time event-based streaming.

```csharp
using Pando.Sdk;
using Pando.Sdk.Events;

await using var agent = new PandoAgent(new PandoAgentOptions
{
    Model = "claude-sonnet-4-6",
    Persona = "software-engineer",
});

await agent.ConnectAsync();

await using var session = await agent.CreateSessionAsync("Refactoring codebase");

await foreach (var evt in session.SendAsync("Review this authentication module..."))
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

### Convenience Method: `AskAsync`
If you do not need real-time streaming and just want the final completed text response:

```csharp
var answer = await session.AskAsync("Explain async/await in C#");
Console.WriteLine(answer);
```

---

## 3. Dependency Injection

The .NET SDK integrates natively with the Microsoft Dependency Injection container. You can register `IPandoAgent` as a singleton:

```csharp
// Program.cs
builder.Services.AddPando(options =>
{
    options.WorkingDirectory = Directory.GetCurrentDirectory();
    options.Model = "claude-sonnet-4-6";
    options.Persona = "software-engineer";
});
```

Then inject it into your background services, controllers, or handlers:

```csharp
public class AIWorkflowService(IPandoAgent agent)
{
    public async Task RunAsync(CancellationToken ct)
    {
        // Remember to connect the agent before creating a session!
        await agent.ConnectAsync(ct);
        
        await using var session = await agent.CreateSessionAsync("background-task", ct);
        var answer = await session.AskAsync("Find all deprecation warnings in the current solution", ct);
        Console.WriteLine(answer);
    }
}
```

---

## 4. HTTP REST Client (`PandoHttpClient`)

When `pando app` or `pando serve` is running as a local HTTP service (the default port is `8765`), you can connect directly over HTTP:

```csharp
using Pando.Sdk;

await using var http = new PandoHttpClient(new PandoHttpClientOptions
{
    BaseUrl = "http://localhost:8765",
});

// List existing sessions
var sessions = await http.Sessions.ListAsync();

// Create a new session and stream message chunks
var session = await http.Sessions.CreateAsync("My session");
await foreach (var chunk in http.Sessions.SendMessageAsync(session.Id, "Translate this config file to JSON"))
{
    if (chunk.Type == "content_delta")
        Console.Write(chunk.Delta);
}

// Dynamically change the active LLM
await http.Models.SetActiveAsync("copilot.gpt-5.4");

// List available personas
var personas = await http.Personas.ListAsync();
```

---

## Exception Handling

All exceptions thrown by the SDK inherit from `PandoException`:

| Exception | Description |
|-----------|-------------|
| `PandoBinaryNotFoundException` | Thrown when the `pando` binary cannot be located on the system. |
| `PandoConnectionException` | Thrown when the underlying subprocess fails to start or exits unexpectedly. |
| `PandoSessionException` | Thrown when a session operation fails or invalid state is encountered. |
| `PandoTimeoutException` | Thrown when an asynchronous invocation exceeds the configured timeout limits. |
| `PandoRpcException` | Thrown when the ACP server returns a JSON-RPC protocol error response. |

```csharp
try
{
    var result = await client.RunAsync(prompt);
}
catch (PandoBinaryNotFoundException ex)
{
    Console.Error.WriteLine($"Pando CLI binary not found: {ex.Message}");
}
catch (PandoConnectionException ex)
{
    Console.Error.WriteLine($"Failed to communicate with Pando: {ex.Message}");
}
```

---

## Binary Resolution & Pathing

The SDK locates the `pando` executable binary on your system using the following precedence:

1. **Explicit Setting**: The `PandoPath` property in `PandoClientOptions` or `PandoAgentOptions`.
2. **Environment Variable**: The `PANDO_PATH` environment variable.
3. **System Search**: Scanning each folder listed in the standard OS `PATH` environment variable.

If the executable cannot be located, a `PandoBinaryNotFoundException` is thrown, indicating the searched paths to assist in troubleshooting.
