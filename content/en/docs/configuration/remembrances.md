---
title: Remembrances Configuration
weight: 30
---

The Remembrances system manages Knowledge Base, Code Index, Events, and Memory. Configure it in `.pando.toml`.

## Memory Settings

```toml
[Remembrances]
# Enable persistent memory system
MemoryEnabled = true

# Inject memories into context automatically
MemoryContextEnrichmentEnabled = true

# Max memories injected per prompt
MemoryContextMaxItems = 3

# Max characters for memory block (0 = unlimited)
MemoryContextMaxChars = 0

# Default TTL for memories in days (0 = 180 days)
MemoryDefaultTTLDays = 0

# Garbage collection interval
MemoryGCInterval = ''

# Auto-capture conversations as memories
MemoryAutoCapture = false

# Scopes exempt from garbage collection
MemoryPinnedScopes = []
```

## Knowledge Base Settings

```toml
[Remembrances]
# Sync directory for KB documents
KBPath = ''

# Number of parallel sync workers (2-8)
IndexWorkers = 4

# Enable filesystem mirror for KB documents
FilesystemMirror = false
```

## Context Enrichment Settings

```toml
[Remembrances]
# Enable automatic context enrichment
ContextEnrichmentEnabled = false

# KB search results
ContextEnrichmentKBResults = 2
ContextEnrichmentKBMaxChars = 0

# Code search results
ContextEnrichmentCodeResults = 5
ContextEnrichmentCodeProject = 'pando'
ContextEnrichmentCodeMaxChars = 0

# Events search results
ContextEnrichmentEventsResults = 5
ContextEnrichmentEventsMaxChars = 0

# Global settings
ContextEnrichmentMinScore = 0.0
ContextEnrichmentTotalMaxChars = 0

# Planner selection
ContextEnrichmentUseAgentPlanner = false
ContextEnrichmentPlannerFallbackToCoder = false
```

## Code Index Settings

```toml
[Remembrances]
# Auto-index code on startup
CodeIndexAutoStart = true

# Languages to index (empty = all)
CodeIndexLanguages = []
```

## Tool Discovery Settings

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # 'auto', 'always', or 'off'
MaxDirectTools = 64
SearchLimit = 8
NonDeferredTools = []
DeferredSources = []
```

## Browser Settings

```toml
[InternalTools]
BrowserEnabled = true
BrowserType = 'chrome'
BrowserExecutable = ''
BrowserHeadless = false
BrowserTimeout = 30
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

## Self-Improvement Settings

```toml
[evaluator]
enabled = false
model = 'ollama.qwopus:latest'
provider = 'ollama'
alphaWeight = 0.8
betaWeight = 0.2
explorationC = 1.41
minSessionsForUCB = 5
maxTokensBaseline = 50
maxSkills = 100
async = true
```

{{< callout >}}
Most Remembrances features work out of the box with sensible defaults. Enable additional features like Context Enrichment or Self-Improvement as needed.
{{< /callout >}}
