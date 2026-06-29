---
title: Self-Improvement System
weight: 25
---

Pando includes an evaluation loop using LLM-as-Judge to assess session quality, with UCB1-based skill selection and reward optimization.

## How It Works

1. **Session Evaluation**: After each session, an LLM judge evaluates quality
2. **Skill Selection**: UCB1 algorithm balances exploration vs exploitation
3. **Reward Optimization**: Tracks task success and token efficiency
4. **Continuous Improvement**: Skills with higher rewards are used more frequently

## Configuration

```toml
[evaluator]
enabled = true
model = 'ollama.qwopus:latest'
provider = 'ollama'
alphaWeight = 0.8          # Importance of task success
betaWeight = 0.2           # Importance of token efficiency
explorationC = 1.41        # UCB1 exploration factor
minSessionsForUCB = 5
maxTokensBaseline = 50
maxSkills = 100
judgePromptTemplate = ''
async = true

[[evaluator.taskPatterns]]
pattern = 'fix|bug|error|crash'
taskType = 'debug'
```

## MCP Exposure

When running as MCP server, evaluator tools are exposed:

```toml
[MCPServer.SelfImprovement]
Enabled = true
```

This exposes evaluator stats, skills, and evaluation triggers as MCP tools.

## Metrics

The system tracks:

- **Task success rate** per skill
- **Token efficiency** per skill
- **UCB1 scores** for exploration/exploitation balance
- **Session quality** ratings

{{< callout >}}
The self-improvement system is opt-in and runs asynchronously. It helps Pando learn which approaches work best for different task types over time.
{{< /callout >}}
