---
title: "Let Pando pick the right model for each message"
shortTitle: "Auto mode"
description: "Set up a tiny receptionist that sends hard work to your best model and quick questions to a cheap one."
summary: "Hard work to the strong model, quick questions to the cheap one."
track: roots
level: intermediate
weight: 15
---

At the end of this guide you will have **Auto** in the model list. When you choose it, Pando reads each message and sends it to the model you decided for that kind of work. You need at least two models configured (see [Connect your AI accounts]({{< relref "/guides/setup-providers-models" >}})) and [Ollama](https://ollama.com) 0.35 or later.

## Hire the receptionist

The one who reads each message and decides is a very small, very fast model called the *decision model*. It runs on your machine and has [its own guide]({{< relref "/guides/decision-model" >}}), with its other uses. Download it once from a terminal:

```bash
ollama pull tev1:0.8b
```

Pando does not install Ollama for you. The model can also be downloaded from the settings page of the next step, with the **Pull** button.

## Tell Pando where the receptionist sits

Open **Settings > Decision model**.

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Decision model settings: provider, model and connection test" >}}

1. In **Provider** choose **Ollama (local)**.
2. Leave **Base URL** empty unless your Ollama lives somewhere unusual.
3. Under **Decision model**, press **Load models** and choose **tev1:0.8b**.
4. Press **Test connection**. Every line of the report should be green.

**Keep alive** is how long the receptionist stays at the desk between messages (30 minutes is fine). **Timeout (ms)** is how long Pando waits for a decision before giving up; `0` uses a sensible default. Save.

## Switch Auto mode on

Open **Settings > Auto mode**.

{{< shot src="images/webui/pando-webui-settings-auto-mode.jpg" alt="Auto mode settings with the two main switches and the decision model status" >}}

- **Enable Auto mode** adds **Auto** as the first entry of every model list.
- **Use Auto by default** makes new sessions start with Auto already chosen.

The **Decision model** box should say **Healthy**. If not, **Configure** takes you back to the previous step.

## Describe your kinds of work

Scroll to **Routes**. A route is a rule: "this kind of message goes to this model". Press **Add route**, or **Add starter routes** to begin from a ready-made set.

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes.jpg" alt="Two routes, each with a name, a description, a primary model and a fallback" >}}

For each route:

1. Give it a short name: `quick`, `implementation`, `planning`.
2. Describe the work in one sentence, with verbs: "Write, modify or fix code in one or more files, including tests."
3. Choose the **Primary model**.

Three to five routes are plenty. The receptionist decides better between a few clearly different doors than between twenty similar ones. The arrows change the order, which only matters in a tie, and the switch next to the name parks a route without deleting it.

## Add a plan B

Under each route, **Add fallback** lets you name up to two spare models. If the first one is busy, down or over its limit, Pando retries the same message on the next and tells you.

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes-fallbacks.jpg" alt="A route with a fallback model" >}}

## Rehearse before the show

At the bottom is the **Playground**. Type a message as you would in the chat and press **Route**. Nothing is sent to a chat model, so it costs nothing.

{{< shot src="images/webui/pando-webui-settings-auto-mode-playground-result.jpg" alt="Playground result: the winning route and the score of each one" >}}

The bars show how sure the receptionist is of each route. If the winner is the one you expected, good. If two routes score close, their descriptions overlap: rewrite them so they are clearly different.

Press **Save**.

## Use Auto in the chat

Open the model list in the chat box and choose **Auto**. Send a message. While Pando works, the list shows `Auto · <model picked>` and a line in the chat tells you the choice:

```
Auto: implementation → anthropic.claude-sonnet-4 (p=0.93, 38 ms via ollama/tev1:0.8b)
```

Choosing a concrete model switches Auto off for that session until you select it again.

## Check it works

Send two very different messages in an Auto session: a quick question ("what does this error mean?") and a real job ("add tests for this function"). The line in the chat should name a different route for each.

{{< under-surface >}}
The choice is made once per message. While Pando works through its steps for that message, the model does not change. If no route fits clearly, the message goes to your usual coding model.
{{< /under-surface >}}

## If something goes wrong

| What you see | What to do |
|---|---|
| Everything goes to your usual model | Open the playground. If the best route scores low, sharpen the descriptions or lower **Threshold** under **Routing tuning** |
| "Upgrade Ollama to >= 0.35" | Update Ollama |
| The decision model list is empty | Run `ollama pull tev1:0.8b` and press **Load models** |
| The first message is slow | The receptionist is waking up. The next ones are fast |
| "route has no usable model" | The models of that route are unknown, disabled or too small for the conversation |
| Short replies like "ok, go on" match no route | That is expected; they stay on your usual model |

## Prefer the terminal?

In the terminal interface, **Auto** is the first entry of the model dialog. In editors connected through ACP it is the first model of the list. `pando doctor` checks that the decision model answers and that every route points to a model that exists.

The routes can also be written by hand in the config file. See the [Auto mode reference]({{< relref "/docs/configuration/auto-mode" >}}), and [Model Auto Mode]({{< relref "/docs/features/model-auto-mode" >}}) for the idea behind it.
