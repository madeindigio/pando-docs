---
title: Context Enrichment
weight: 13
---

Context enrichment automatically searches across your Knowledge Base, code index, and past session events to inject relevant information into every prompt, giving the AI agent deeper project awareness without manual intervention.

## How It Works

When enabled, Pando enriches each user message before sending it to the LLM:

1. **Query Planning** - A planner (heuristic or LLM-based) analyzes the user message
2. **Parallel Search** - Searches KB, code index, and events simultaneously
3. **Score Filtering** - Results below the minimum score threshold are discarded
4. **Context Injection** - Relevant results are prepended to the user message

## Configuration

```toml
[Remembrances]
ContextEnrichmentEnabled = true

# KB enrichment
ContextEnrichmentKBResults = 2
ContextEnrichmentKBMaxChars = 0

# Code enrichment
ContextEnrichmentCodeResults = 5
ContextEnrichmentCodeProject = 'pando'
ContextEnrichmentCodeMaxChars = 0

# Events enrichment
ContextEnrichmentEventsResults = 5
ContextEnrichmentEventsMaxChars = 0

# Global settings
ContextEnrichmentMinScore = 0.0
ContextEnrichmentTotalMaxChars = 0

# Planner selection
ContextEnrichmentUseAgentPlanner = false
ContextEnrichmentPlannerFallbackToCoder = false
```

## Enrichment as an agent loop

Instead of a single round of searches, Pando can run enrichment as a **small dedicated agent** that iteratively queries memory, the knowledge base, past events and the code index until it has what it needs. The main agent never sees those searches — it only receives the finished context block.

The loop runs on its own model, independent of the one you chose for coding, so you can use a cheap fast model for it:

```toml
[Agents.context-enricher]
Model = 'openrouter.some-cheap-model'

[Remembrances]
ContextEnrichmentAgentLoopEnabled        = true
ContextEnrichmentAgentLoopTimeoutSeconds = 60      # bound for one run
ContextEnrichmentAgentLoopMaxChars       = 6000    # cap on the injected context
ContextEnrichmentAgentLoopEveryMessage   = false   # true = every turn, not only session start
```

What you will notice:

- **By default it runs only on the first message of a session**, which is where the value is: it is the moment the agent knows nothing about your project. Set `ContextEnrichmentAgentLoopEveryMessage = true` for per-turn enrichment.
- **You see it working.** The chat shows `🧠 Context enrichment agent gathering project context...` and then how much context it added, the same way compaction reports itself.
- **The run appears as a child session** of your chat, so you can open it and read exactly what it searched and found. Its cost is added to the parent session.
- **It falls back** to the classic single-shot search if it times out or comes back empty, so enabling it cannot leave you with less context than before.
- **No cold start.** The enrichment agent is prepared in the background while Pando boots, so the first prompt does not wait for it.

Configurable from TOML, from the TUI (Remembrances → Context Enrichment) and from the WebUI settings.

## Planners

### Heuristic Planner (Default)

Analyzes the user message using keyword extraction and pattern matching to determine which search sources to query. Fast and deterministic.

### LLM-Based Planner

Uses a cheap LLM call to analyze the message and select optimal search strategies. More accurate but adds latency and token cost.

```toml
ContextEnrichmentUseAgentPlanner = true
```

## Context Profile

The context-aware trimmer classifies each user message to optimize prompt composition:

```json
{
  "task_type": "code|debug|refactor|explain|test|search|general",
  "relevant_tool_names": ["tool1", "tool2"],
  "skip_sections": ["capabilities/web_search"],
  "confidence": 0.85
}
```

This allows Pando to skip irrelevant prompt sections, saving tokens and improving response quality.

{{< callout >}}
Context enrichment works silently in the background. Enable it with `ContextEnrichmentEnabled = true` and configure result counts based on your project size.
{{< /callout >}}
