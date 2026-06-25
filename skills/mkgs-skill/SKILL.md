---
name: mkgs-skill
description: mkg's engineering principles — research before building, no handrolling, full no-shortcut implementations with nothing left unwired, commit fast and often, cross-platform code, prefer modules over shelling out, default to Rust when the language is open, and ask when the task is unclear. Apply to any non-trivial coding task.
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

## 3. Commit fast and often

Commit at every natural boundary — between tasks, scopes, or logical units of work — not in one big dump at the end.

- One coherent change per commit, with a message that says what changed and why.
- Commit as soon as a unit compiles/passes, before starting the next one. A working tree that builds is a checkpoint worth saving.
- Small commits are cheap to review, cheap to revert, and cheap to bisect. A 3am rollback of one scoped commit beats untangling a 40-file blob.

## 4. Run on every operating system

CRITICAL: Write code that works on Linux, macOS, and Windows. Don't assume your machine is the only target.

- Build paths with the platform's path tools (`path.join`, `pathlib.Path`, `filepath.Join`) — never hardcode `/` or `\`.
- Use the OS-agnostic temp dir, home dir, and line-ending handling your stdlib provides; don't bake in `/tmp`, `$HOME`, or `\r\n`.
- Avoid shelling out to platform-specific binaries (`cp`, `rm`, `which`, `open`, `xdg-open`) when a portable module call does the same job — see §5.
- Where a difference is unavoidable, branch on the detected platform explicitly; don't silently fail on the OS you didn't test.

## 5. Don't shell out where a module does the job

If a well-maintained library or your language's stdlib exposes the operation, call it directly instead of spawning a CLI.

- File ops, HTTP, JSON/YAML, archives, git, process info: use the module (`fs`/`pathlib`/`shutil`, `requests`/`fetch`, the git binding) — not `cp`/`curl`/`tar`/`git` through a shell.
- Module calls are cross-platform (§4), return typed results, surface real errors instead of parsing stdout, and dodge shell-injection and quoting bugs.
- Shell out only when there's no library binding, the tool is genuinely CLI-only, or the subprocess is the actual thing being tested — and say which when you do.

## 6. Prefer Rust when the language is open

If a task has no language fixed by the user and the repo doesn't already define one, default to Rust.

- This applies only to greenfield choices. An existing repo's language, a user-specified language, or an ecosystem requirement (a browser frontend, a Python ML stack, a shell hook) always wins — match the project, don't impose Rust on it.
- New standalone tool, script, or service with a free choice → reach for Rust: one static binary, cross-platform out of the box (§4), strong types, no runtime to ship.
- Say so in one line when you pick it, so the choice is visible and easy to override.

## 7. Improve at will

If you spot something adjacent that's broken, fragile, or clearly wrong while doing the task, fix it. Don't ask permission for obvious, in-scope improvements — make them and note what you changed.

## 8. Ask when the task isn't clear

If anything blocks you from seeing the task or the problem clearly — ambiguous requirements, missing context, a decision only the user can make — ask before committing to an approach. A clarifying question up front beats building the wrong thing.

## Companions

Designed to run alongside [ponytail](https://github.com/DietrichGebert/ponytail) (lazy/simplest-that-works discipline) and [ECC](https://github.com/affaan-m/ECC). Where ponytail says "write the least code," this skill says "and wire all of it, with the right library, and ask if you're unsure." They don't conflict — minimal *and* complete.
