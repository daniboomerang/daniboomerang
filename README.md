<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&height=190&color=020202&text=Daniel%20Estevez&fontColor=EEEEEE&fontSize=46&fontAlignY=36&desc=AI%20Systems%20Engineer%20%C2%B7%20I%20build%20the%20harness%20that%20makes%20coding%20agents%20trustworthy&descSize=15&descAlignY=58&descColor=FF6900&animation=fadeIn">
    <img src="https://capsule-render.vercel.app/api?type=waving&height=190&color=FCFAF6&text=Daniel%20Estevez&fontColor=020202&fontSize=46&fontAlignY=36&desc=AI%20Systems%20Engineer%20%C2%B7%20I%20build%20the%20harness%20that%20makes%20coding%20agents%20trustworthy&descSize=15&descAlignY=58&descColor=CA3500&animation=fadeIn" alt="Daniel Estevez — AI Systems Engineer" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://vinaya.attalabs.dev"><picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=17&duration=3200&pause=900&color=FF6900&center=true&vCenter=true&width=720&lines=Agents+plan%2C+build+and+review.+Code+decides+what+counts.;A+planner%2C+a+developer%2C+two+independent+reviewers%2C+deterministic+gates.;Every+run%2C+check+and+verdict+recorded.+Then+the+loop+closes.;I+don't+ship+code+I+don't+understand+because+an+agent+wrote+it.">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=17&duration=3200&pause=900&color=CA3500&center=true&vCenter=true&width=720&lines=Agents+plan%2C+build+and+review.+Code+decides+what+counts.;A+planner%2C+a+developer%2C+two+independent+reviewers%2C+deterministic+gates.;Every+run%2C+check+and+verdict+recorded.+Then+the+loop+closes.;I+don't+ship+code+I+don't+understand+because+an+agent+wrote+it." alt="Typing summary" >
  </picture></a>
</p>

<p align="center">
  <a href="https://vinaya.attalabs.dev"><img alt="Vinaya" src="https://img.shields.io/badge/Vinaya-vinaya.attalabs.dev-EE601A?style=for-the-badge&labelColor=020202"></a>
  <a href="https://zerion.attalabs.dev/dev-stats"><img alt="Live results" src="https://img.shields.io/badge/Live%20results-dev--stats-EE601A?style=for-the-badge&labelColor=020202"></a>
  <a href="https://herald.attalabs.dev/daniboomerang"><img alt="CV" src="https://img.shields.io/badge/CV-herald.attalabs.dev-EE601A?style=for-the-badge&labelColor=020202"></a>
  <a href="https://www.linkedin.com/in/estevezdani/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-estevezdani-EE601A?style=for-the-badge&logo=linkedin&logoColor=FFFFFF&labelColor=020202"></a>
</p>

---

## Vinaya: a pipeline of AI agents a human can trust

Agents write code fast, but they fail all the time: they stall, misreport, and claim work they didn't do. On a team they quietly pile up code nobody understands. **[Vinaya](https://vinaya.attalabs.dev)** runs the whole engineering workflow as a pipeline of agents, and in it an agent never decides a fact. Code computes it, gates enforce it, the event log records it, and a human approves what matters.

<!-- PORTAL-ANIMATION: animated GIF/SVG from vinaya.attalabs.dev goes here -->

**What's under the hood**
- **Two execution backends:** a standalone driver, and **Atta Engine**, my workflow engine. It's a YAML compiler that runs LangGraph and executes my own drivers, with checkpoints, pause and resume, stop conditions and tools enforced in code.
- **Agents in OS sandboxes** (macOS Seatbelt, Linux bubblewrap). Each role gets exactly its own tools.
- **Verdicts bound to the exact change they judged**, so an approval can't outlive what it approved.
- **A typed, append-only event log**, delivered live through Cloudflare Workers and Durable Objects.
- **Agent evals on Harbor**, the harness behind Terminal-Bench: each role runs in an isolated container trial against hidden tests.

**A real result:** *Onchain Rewind*, a weekend experiment built entirely through Vinaya to test its telemetry ([demo](https://zerion.attalabs.dev) · [results](https://zerion.attalabs.dev/dev-stats)):

```text
32 / 33   tickets merged
34 min    median developer + reviewer time per ticket
103       problems caught by reviewers before merge
18,508    automated check runs across 39 checks
```

## Why I built it

I've used AI daily since late 2022, and in the IDE on a production team at Game7 since 2024. Pair-programming with AI there got me exactly the code and architecture I'd have written, only faster. It was also dangerous: dependencies I'd never have installed, PRs too big to review, and a team that stopped learning from each other because the agent made the decisions. Vinaya is my answer. Keep the speed, and keep the ownership.

## The rest of the lab

| | |
|---|---|
| **[Vāda](https://vada.attalabs.dev)** | Multi-agent deliberation on LangGraph, with routing across Claude, Gemini, GPT and Grok, cost and quality fallback, and a hosted MCP server (bearer auth, envelope-encrypted keys) |
| **[Herald](https://herald.attalabs.dev)** | Forensic hiring audits: matches a candidate to a job description with evidence, not vibes |
| **[AttaLabs](https://github.com/atta-labs/attalabs)** | The monorepo where it all runs, governed by Vinaya end to end. The code is public and source-available, so read it. |

## Before AI: 18 years of craft

Eighteen years in software, with frontend at the centre since 2016. I've worked on embedded firmware, a core booking engine at Amadeus, multi-tenant SaaS at Game7, a cross-platform Electron launcher at Elixir, and real-time multiplayer and Web3 across several chains.

**[My old portfolio](https://daniboomerang.attalabs.dev)** is still one of my favourite things I've made. It's built in Angular 1.2, with a three-layer CSS parallax and animations everywhere. I drew every SVG in it by hand, one by one, over four months. It's ten years old and still runs smoothly.

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-020202?style=flat-square&logo=typescript&logoColor=FF6900">
  <img alt="React" src="https://img.shields.io/badge/React-020202?style=flat-square&logo=react&logoColor=FF6900">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-020202?style=flat-square&logo=nextdotjs&logoColor=FF6900">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-020202?style=flat-square&logo=nodedotjs&logoColor=FF6900">
  <img alt="Bun" src="https://img.shields.io/badge/Bun-020202?style=flat-square&logo=bun&logoColor=FF6900">
  <img alt="Postgres" src="https://img.shields.io/badge/Postgres-020202?style=flat-square&logo=postgresql&logoColor=FF6900">
  <img alt="Cloudflare" src="https://img.shields.io/badge/Cloudflare-020202?style=flat-square&logo=cloudflare&logoColor=FF6900">
  <img alt="three.js" src="https://img.shields.io/badge/three.js-020202?style=flat-square&logo=threedotjs&logoColor=FF6900">
</p>
<p>
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude%20Code-EE601A?style=flat-square&logo=anthropic&logoColor=020202">
  <img alt="Codex" src="https://img.shields.io/badge/Codex-EE601A?style=flat-square&logo=openai&logoColor=020202">
  <img alt="LangGraph" src="https://img.shields.io/badge/LangGraph-EE601A?style=flat-square&logo=langchain&logoColor=020202">
  <img alt="Model Context Protocol" src="https://img.shields.io/badge/Model%20Context%20Protocol-EE601A?style=flat-square">
  <img alt="Harbor evals" src="https://img.shields.io/badge/Evals-Harbor-EE601A?style=flat-square">
  <img alt="Vercel AI SDK" src="https://img.shields.io/badge/Vercel%20AI%20SDK-EE601A?style=flat-square&logo=vercel&logoColor=020202">
</p>

## Activity

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/daniboomerang/daniboomerang/output/snake-dark.svg">
    <img alt="Contribution snake" src="https://raw.githubusercontent.com/daniboomerang/daniboomerang/output/snake.svg" width="100%">
  </picture>
</p>
<p align="center">
  <img src="https://ghchart.rshah.org/CA3500/daniboomerang" alt="GitHub contribution chart" width="100%">
</p>
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com/?user=daniboomerang&background=020202&ring=FF6900&fire=FF6900&currStreakLabel=EEEEEE&currStreakNum=EEEEEE&sideNums=EEEEEE&sideLabels=8A8380&dates=8A8380&stroke=2a2a2a&hide_border=true">
    <img src="https://streak-stats.demolab.com/?user=daniboomerang&background=FCFAF6&ring=CA3500&fire=CA3500&currStreakLabel=020202&currStreakNum=020202&sideNums=020202&sideLabels=5C5855&dates=5C5855&stroke=E7E2DA&hide_border=true" alt="GitHub streak" height="165">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&height=90&color=020202&section=footer">
    <img src="https://capsule-render.vercel.app/api?type=waving&height=90&color=FCFAF6&section=footer" alt="" width="100%">
  </picture>
</p>
