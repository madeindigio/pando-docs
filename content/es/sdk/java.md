---
title: SDK para Java
weight: 3
---

El **SDK oficial de Pando para Java** proporciona soporte de desarrollo completo para Java 17 o superior y entornos basados en la Máquina Virtual de Java (JVM).

Repositorio en GitHub: [madeindigio/pando-java-sdk](https://github.com/madeindigio/pando-java-sdk)

## Requisitos Previos

- **Java 17** o superior.
- La CLI de `pando` instalada y disponible en la variable `PATH` de tu sistema (o configurada mediante la variable de entorno `PANDO_PATH` o en la configuración del cliente).

## Instalación

### Maven
Añade la siguiente dependencia en el archivo `pom.xml` de tu proyecto:

```xml
<dependency>
  <groupId>io.pando</groupId>
  <artifactId>pando-sdk</artifactId>
  <version>0.1.0</version>
</dependency>
```

### Gradle
Añade la dependencia en el archivo `build.gradle.kts`:

```kotlin
implementation("io.pando:pando-sdk:0.1.0")
```

---

## 1. Modo Subproceso (`PandoClient`)

`PandoClient` gestiona consultas rápidas de un solo turno invocando `pando -p` en un proceso secundario y capturando los resultados resultantes.

### Ejecución Síncrona
```java
import io.pando.sdk.PandoClient;
import io.pando.sdk.model.RunResult;

PandoClient client = PandoClient.builder()
    .cwd("/ruta/a/tu/proyecto")
    .model("claude-sonnet-4-6")
    .timeout(java.time.Duration.ofMinutes(5))
    .build();

RunResult result = client.run("Audita las dependencias del proyecto e identifica alertas de seguridad");
System.out.println(result.response());
```

### Opciones Adicionales y Modo Asíncrono
```java
import io.pando.sdk.PandoClient.RunOptions;

// Utilizando opciones de ejecución avanzadas
RunResult result = client.run("Refactorizar autenticación", RunOptions.builder()
    .allowAllTools(true) // Aprueba de forma automática todos los permisos de herramientas (similar a --yolo)
    .model("gpt-4o")     // Sobrescribe el modelo para esta ejecución en específico
    .build());

// Ejecución asíncrona
client.runAsync("Analizar registros de errores")
    .thenAccept(r -> System.out.println(r.response()))
    .join();
```

---

## 2. Modo Sesión ACP (`PandoAgent` y `PandoSession`)

Para flujos interactivos de múltiples turnos y gestión de estados de IA, `PandoAgent` se conecta de forma persistente a través de stdin/stdout usando el protocolo de comunicación ACP basado en JSON-RPC 2.0.

```java
import io.pando.sdk.PandoAgent;
import io.pando.sdk.PandoSession;

try (PandoAgent agent = PandoAgent.builder()
        .cwd("/ruta/a/tu/proyecto")
        .model("claude-sonnet-4-6")
        .persona("software-engineer")
        .build()) {

    agent.connect();

    PandoSession session = agent.createSession("Refactorización de base de datos");
    String response = session.ask("Genera un script de migración de SQL para añadir verificación por correo");
    System.out.println(response);
}
```

### Transmisión de Eventos en Tiempo Real (`Flow.Subscriber`)
El SDK para Java expone flujos reactivos mediante la API estándar `java.util.concurrent.Flow` para suscribirse y procesar de manera progresiva los eventos intermedios de la IA (tales como texto en streaming, llamadas a herramientas o errores):

```java
import io.pando.sdk.events.*;
import java.util.concurrent.Flow;

session.send("Refactorizar código").subscribe(new Flow.Subscriber<AgentEvent>() {
    @Override
    public void onSubscribe(Flow.Subscription s) {
        s.request(Long.MAX_VALUE);
    }

    @Override
    public void onNext(AgentEvent event) {
        switch (event) {
            case ContentDeltaEvent e  -> System.out.print(e.delta());
            case ToolCallEvent e      -> System.out.println("\n[Herramienta Invocada] " + e.toolCall().name());
            case ToolResultEvent e    -> System.out.println("[Resultado] " + e.toolResult().content());
            case ResponseEvent e      -> System.out.println("\n[Completado]");
            case ErrorEvent e         -> System.err.println("[Error] " + e.error());
            case SummarizeEvent e     -> System.out.println("[Contexto resumido automáticamente]");
            default -> {}
        }
    }

    @Override
    public void onError(Throwable t) { t.printStackTrace(); }

    @Override
    public void onComplete() {}
});
```

### Control de Permisos de Herramientas Personalizado
Permite interceptar e inspeccionar de manera programática las solicitudes de herramientas que realiza Pando antes de ser ejecutadas:

```java
PandoAgent agent = PandoAgent.builder()
    .cwd("/mi-proyecto")
    .toolPermissionHandler(req -> {
        // Bloquear llamadas peligrosas de bash y aprobar operaciones de lectura del sistema
        return !req.toolName().equals("bash");
    })
    .build();
```

---

## 3. Modo Cliente HTTP REST (`PandoHttpClient`)

Se conecta de forma directa a un demonio local que ejecute `pando serve` o `pando app` mediante la API REST local:

```java
import io.pando.sdk.PandoHttpClient;
import io.pando.sdk.model.SessionInfo;

PandoHttpClient client = PandoHttpClient.builder()
    .baseUrl("http://localhost:8765")
    .timeout(java.time.Duration.ofSeconds(60))
    .build();

// Crear una sesión de trabajo e interactuar con ella
SessionInfo session = client.sessions().create("Tarea API REST");
String response = client.sessions().ask(session.sessionId(), "Resume la estructura de main.go");

// Consultar modelos disponibles y cambiar el LLM activo de forma global
client.models().setActive("claude-sonnet-4-6");
```

---

## Manejo de Excepciones

Todas las excepciones del SDK son de tipo "unchecked" (no comprobadas) y extienden de la clase base común `PandoException`:

```
PandoException (RuntimeException)
├── PandoBinaryNotFoundException   — No se encuentra el binario ejecutable
├── PandoConnectionException       — Error de comunicación o caída de subproceso
├── PandoSessionException          — Errores de estado en la sesión de trabajo
├── PandoTimeoutException          — Exceso de tiempo de espera límite
└── PandoRpcException              — Errores devueltos en llamadas JSON-RPC
```

```java
import io.pando.sdk.exception.*;

try {
    RunResult result = client.run("Optimizar módulos");
} catch (PandoBinaryNotFoundException e) {
    System.err.println("No se encontró el ejecutable. Rutas buscadas: " + e.getSearchedPaths());
} catch (PandoTimeoutException e) {
    System.err.println("Se superó el tiempo límite de espera: " + e.getMessage());
} catch (PandoRpcException e) {
    System.err.println("El servidor ACP de JSON-RPC arrojó un error: " + e.getRpcMessage());
}
```

---

## Seguridad de Subprocesos (Thread Safety)

- **Diseño Seguro**: Las clases `PandoAgent` y `PandoClient` son completamente seguras para su uso concurrente tras ser inicializadas.
- **Canal Compartido**: El motor de transporte JSON-RPC subyacente soporta el envío de peticiones simultáneas desde diferentes hilos a través de varias instancias de `PandoSession` de manera segura y sin bloqueos.
- **Publicador de Eventos**: La función `PandoSession.send()` inicializa y devuelve una instancia independiente de `SubmissionPublisher` por cada flujo de solicitud.
