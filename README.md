# mkg's Skill

mkg's engineering principles — research-first, no-shortcut engineering. Canonical rules live in [.agents/skills/mkgs-skill/SKILL.md](./.agents/skills/mkgs-skill/SKILL.md); everything else in this repo is a thin adapter for a specific agent runtime.

Pairs well with [ponytail](https://github.com/DietrichGebert/ponytail) and [ECC](https://github.com/affaan-m/ECC/).

## Installation

### Claude Code

```
# Add marketplace
/plugin marketplace add https://github.com/mkg20001/skill

# Install plugin
/plugin install mkgs-skill@mkgs-skill
```

### Codex

```sh
# Add this repo as a marketplace source (one-time setup)
codex plugin marketplace add mkg20001/skill

# Install the plugin
codex plugin add mkgs-skill@mkgs-skill
```

### Hermes Agent

The repo is a Hermes plugin (`plugin.yaml` + `__init__.py`) — it registers the bundled skill and an always-on `pre_llm_call` hook that injects the rules before every LLM turn.

```sh
hermes plugins install mkg20001/skill --enable
```

### Any other agent (generic)

Everything an agent needs is in the vendor-neutral layout — no manifest required:

- `AGENTS.md` — root instructions, points at the canonical skill
- `.agents/skills/mkgs-skill/SKILL.md` — the skill itself
- `.agents/rules/mkgs-skill.md` — condensed rules for always-on injection

Clone the repo (or vendor those files) into your project, or point your agent's skill/rules discovery at `.agents/`:

```sh
git clone https://github.com/mkg20001/skill
```

If your agent supports startup hooks, inject `.agents/rules/mkgs-skill.md` at session start (see `hooks/claude-codex-hooks.json` for the Claude/Codex example).
