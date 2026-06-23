---
name: mkgs-skill
description: mkg's engineering principles — research before building, no handrolling, full no-shortcut implementations with nothing left unwired, and ask when the task is unclear. Apply to any non-trivial coding task.
---

# mkg's Skill

Engineering working agreement. Apply on every non-trivial coding task in this project.

## 1. Research before you build — never handroll

CRITICAL: Before implementing anything a library already solves, look it up.

- Use **context7** (`resolve-library-id` → `query-docs`) for current docs on a known library, framework, or API.
- Use **perplexity** (`perplexity_search` / `perplexity_ask`) to discover *which* module fits when you don't already know one.
- Reach for an existing, maintained dependency before writing your own version of auth, parsing, date math, retries, validation, crypto, HTTP, etc.

Handrolling is only correct when no module fits, the module is heavier than a few lines warrant, or the dependency is a security/maintenance liability. State which when you skip a library.

## 2. No shortcuts — full implementation, nothing left unwired

- Wire every code path end to end: callers, error handling, config, exports, types, and the call sites that consume them.
- No `TODO`, no stubbed return, no "left as an exercise", no dead branch that silently no-ops.
- If a piece genuinely can't be finished in this pass, say so explicitly and explain what's missing and why — don't hide it behind a placeholder.

## 3. Improve at will

If you spot something adjacent that's broken, fragile, or clearly wrong while doing the task, fix it. Don't ask permission for obvious, in-scope improvements — make them and note what you changed.

## 4. Ask when the task isn't clear

If anything blocks you from seeing the task or the problem clearly — ambiguous requirements, missing context, a decision only the user can make — ask before committing to an approach. A clarifying question up front beats building the wrong thing.

## Companions

Designed to run alongside [ponytail](https://github.com/DietrichGebert/ponytail) (lazy/simplest-that-works discipline) and [ECC](https://github.com/affaan-m/ECC). Where ponytail says "write the least code," this skill says "and wire all of it, with the right library, and ask if you're unsure." They don't conflict — minimal *and* complete.
