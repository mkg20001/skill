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

Codex reads the `.codex-plugin/plugin.json` manifest. Clone the repo into your Codex plugins directory:

```sh
git clone https://github.com/mkg20001/skill ~/.codex/plugins/mkgs-skill
```

### Hermes Agent

The repo is a Hermes plugin (`plugin.yaml` + `__init__.py`). It registers the bundled skill and an always-on `pre_llm_call` hook that injects the rules before every LLM turn. Clone it into your Hermes plugins directory:

```sh
git clone https://github.com/mkg20001/skill <hermes-plugins-dir>/mkgs-skill
```

Then enable `mkgs-skill` in your Hermes config if your setup doesn't auto-load plugins.

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
