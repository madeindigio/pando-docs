---
title: Agent Delegation & Orchestration
weight: 11
---

One agent is a single pair of hands. **Mesnada** gives Pando a crew: helpers, called subagents, that each take a job, work in the background at the same time and come back with a report. Pando becomes the foreman: it splits the work, hands it out and gathers the results.

## What it does for you

- **Work in parallel.** Three modules to review are three helpers working at once, not one after another.
- **A clean main conversation.** Each helper works in its own separate conversation. Yours only receives the conclusions.
- **The right helper for each job.** Some helpers may only look and not touch, which is ideal for exploring. A helper can use a different model, or even a different assistant you have installed.
- **Jobs in order.** A job can wait for others to finish and start from their results.
- **Across projects.** A helper can be sent to another of your projects.
- **Jobs on a schedule.** A task can repeat every morning by itself.

## How it feels in practice

Often you just ask: "use one subagent per service and give me one summary". Pando hands out the jobs and carries on. When the helpers finish, their reports arrive in your conversation by themselves, and if Pando had already stopped, it wakes up to read them and continue.

{{< shot src="images/webui/pando-webui-orchestrator-tasks.jpg" alt="Orchestrator view with the list of Mesnada tasks" >}}

The Orchestrator view is the foreman's board: every job, running or finished, with its result. You can also create a job there by hand, or schedule one.

## When to use it

Delegate work that can be split into parts that do not step on each other: reading different areas of the code, writing tests for separate modules, researching several questions. Do not delegate two jobs that edit the same file; that is two people writing on the same sheet.

## Good to know

- Helpers start in your project folder with your settings, but they do not see your conversation. They only know what the job description says.
- More helpers means more speed and more spending. There is a limit on how many work at once.
- Guard rails keep things sane: a limit on helpers hiring their own helpers, a fact-check that downgrades a report mentioning files that do not exist, and a breaker that stops relaunching a job that keeps failing.
- If a project is already open in another Pando window, a helper can use that window instead of starting from cold.
- Reports are written down before they are delivered, so a restart in the middle does not lose them.
- You can define your own kinds of helper to drive other command-line assistants.

## Next steps

- Guide: [Delegate to subagents with Mesnada]({{< relref "/guides/mesnada" >}}).
- Reference: [Delegation and Mesnada configuration]({{< relref "/docs/configuration/delegation" >}}), including the tools the agent uses to delegate.
- Related: [Project workspaces]({{< relref "/docs/features/project-workspaces" >}}), [Inter-process communication]({{< relref "/docs/features/ipc" >}}).
