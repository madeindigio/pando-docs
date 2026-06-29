---
title: GitHub Copilot Authentication
weight: 34
---

Pando integrates with GitHub Copilot, allowing you to use Copilot models through the LLM Proxy and agent system.

## Login

```bash
# Device flow login (opens browser)
pando auth copilot login

# For GitHub Enterprise
pando auth copilot login --enterprise-url https://github.mycompany.com

# Print URL/code without opening browser
pando auth copilot login --no-browser
```

## Status

```bash
pando auth copilot status
```

## Logout

```bash
pando auth copilot logout
```

## Using Copilot Models

Once authenticated, Copilot models are available as:

```bash
# In agent mode
pando --model copilot.gpt-4.1 -p "Explain this code"

# In LLM Proxy
pando llm-proxy
# Connect tools to http://localhost:8765/v1
```

## Model Availability

Copilot models depend on your subscription tier:

| Tier | Available Models |
|------|------------------|
| Free | Limited models |
| Pro | GPT-4, GPT-4o |
| Pro+ | Extended model access |
| Business/Enterprise | Organization models |

## Configuration

Copilot authentication is stored in your Pando profile. No additional configuration needed after login.

{{< callout >}}
The Copilot OAuth flow uses GitHub's device flow. Your Copilot credentials never leave your machine—they're used locally to obtain tokens.
{{< /callout >}}
