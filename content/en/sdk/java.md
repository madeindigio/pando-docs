---
title: Java SDK
weight: 3
---

The official **Pando Java SDK** provides full programmatic support for Java 17+ and JVM environments.

GitHub Repository: [madeindigio/pando-java-sdk](https://github.com/madeindigio/pando-java-sdk)

## Prerequisites

- **Java 17** or newer.
- The `pando` CLI installed and available on your system `PATH` (or specified via environment variable `PANDO_PATH` or client configuration).

## Installation

### Maven
Add the dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>io.pando</groupId>
  <artifactId>pando-sdk</artifactId>
  <version>0.1.0</version>
</dependency>
```

### Gradle
Add the dependency to your `build.gradle.kts`:

```kotlin
implementation("io.pando:pando-sdk:0.1.0")
```

---

## 1. Subprocess Mode (`PandoClient`)

`PandoClient` handles quick, single-turn prompts by running `pando -p` as a subprocess under the hood and capturing the results.

### Synchronous Execution
```java
import io.pando.sdk.PandoClient;
import io.pando.sdk.model.RunResult;

PandoClient client = PandoClient.builder()
    .cwd("/path/to/project")
    .model("claude-sonnet-4-6")
    .timeout(java.time.Duration.ofMinutes(5))
    .build();

RunResult result = client.run("Audit dependencies and identify security warnings");
System.out.println(result.response());
```

### Overriding Options & Async
```java
import io.pando.sdk.PandoClient.RunOptions;

// With specialized options
RunResult result = client.run("Refactor authorization", RunOptions.builder()
    .allowAllTools(true) // Automatically approve tool calls (similar to --yolo)
    .model("gpt-4o")     // Override model for this execution
    .build());

// Asynchronous execution
client.runAsync("Analyze logs")
    .thenAccept(r -> System.out.println(r.response()))
    .join();
```

---

## 2. ACP Session Mode (`PandoAgent` & `PandoSession`)

For complex applications requiring stateful, multi-turn AI interactions, `PandoAgent` connects via stdin/stdout using the JSON-RPC 2.0 based ACP protocol.

```java
import io.pando.sdk.PandoAgent;
import io.pando.sdk.PandoSession;

try (PandoAgent agent = PandoAgent.builder()
        .cwd("/path/to/project")
        .model("claude-sonnet-4-6")
        .persona("software-engineer")
        .build()) {

    agent.connect();

    PandoSession session = agent.createSession("Database refactoring");
    String response = session.ask("Provide a migration script to add email verification");
    System.out.println(response);
}
```

### Streaming Events (`Flow.Subscriber`)
The Java SDK exposes standard reactive streams using `java.util.concurrent.Flow` to subscribe to granular events during generation (e.g. streaming content deltas, tool invocations, or errors):

```java
import io.pando.sdk.events.*;
import java.util.concurrent.Flow;

session.send("Refactor codebase").subscribe(new Flow.Subscriber<AgentEvent>() {
    @Override
    public void onSubscribe(Flow.Subscription s) {
        s.request(Long.MAX_VALUE);
    }

    @Override
    public void onNext(AgentEvent event) {
        switch (event) {
            case ContentDeltaEvent e  -> System.out.print(e.delta());
            case ToolCallEvent e      -> System.out.println("\n[Tool Call] " + e.toolCall().name());
            case ToolResultEvent e    -> System.out.println("[Result] " + e.toolResult().content());
            case ResponseEvent e      -> System.out.println("\n[Done]");
            case ErrorEvent e         -> System.err.println("[Error] " + e.error());
            case SummarizeEvent e     -> System.out.println("[Context summarized]");
            default -> {}
        }
    }

    @Override
    public void onError(Throwable t) { t.printStackTrace(); }

    @Override
    public void onComplete() {}
});
```

### Custom Tool Permission Handler
Intercept and programmatically approve or deny tool calls that Pando requests:

```java
PandoAgent agent = PandoAgent.builder()
    .cwd("/project")
    .toolPermissionHandler(req -> {
        // Block dangerous operations, approve filesystem reads
        return !req.toolName().equals("bash");
    })
    .build();
```

---

## 3. HTTP REST Mode (`PandoHttpClient`)

Connects to an already running `pando serve` or `pando app` daemon over the local REST API:

```java
import io.pando.sdk.PandoHttpClient;
import io.pando.sdk.model.SessionInfo;

PandoHttpClient client = PandoHttpClient.builder()
    .baseUrl("http://localhost:8765")
    .timeout(java.time.Duration.ofSeconds(60))
    .build();

// Create and interact with sessions
SessionInfo session = client.sessions().create("API Task");
String response = client.sessions().ask(session.sessionId(), "Summarize main.go");

// List active models and change the active LLM
client.models().setActive("claude-sonnet-4-6");
```

---

## Exception Handling

All SDK exceptions are unchecked and extend the base `PandoException` class:

```
PandoException (RuntimeException)
├── PandoBinaryNotFoundException   — CLI executable not found
├── PandoConnectionException       — Process died or I/O failure
├── PandoSessionException          — Invalid session or state issues
├── PandoTimeoutException          — Invocations timed out
└── PandoRpcException              — Protocol error from JSON-RPC
```

```java
import io.pando.sdk.exception.*;

try {
    RunResult result = client.run("Optimize files");
} catch (PandoBinaryNotFoundException e) {
    System.err.println("Executable missing. Searched: " + e.getSearchedPaths());
} catch (PandoTimeoutException e) {
    System.err.println("Operation timed out: " + e.getMessage());
} catch (PandoRpcException e) {
    System.err.println("ACP Server returned RPC Error: " + e.getRpcMessage());
}
```

---

## Thread Safety

- **Thread-safe**: `PandoAgent` and `PandoClient` are fully thread-safe after construction.
- **Concurrent Transport**: The JSON-RPC transport Layer is fully thread-safe, permitting multiple `PandoSession`s to concurrent send commands through a single shared transport channel without external synchronization.
- **Reactive Publisher**: `PandoSession.send()` yields a distinct `SubmissionPublisher` instance per request.
