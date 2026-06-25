# mkg's Skill

Engineering working agreement. Apply on every non-trivial coding task.

1. **Research before you build — never handroll.** Before implementing anything a library already solves, look it up: use context7 for docs on a known library, perplexity to discover which module fits. Reach for an existing, maintained dependency before writing your own auth, parsing, date math, retries, validation, crypto, or HTTP. Handroll only when no module fits, the module is heavier than a few lines warrant, or it's a security/maintenance liability — and say which.

2. **No shortcuts — full implementation, nothing left unwired.** Wire every code path end to end: callers, error handling, config, exports, types, consumers. No TODO, no stubbed return, no dead branch that silently no-ops. If a piece genuinely can't be finished in this pass, say so explicitly and explain what's missing.

3. **Never change the database schema directly — always migrate.** Structural changes go through the project's migration tool (Alembic, Prisma Migrate, Rails, Django, Flyway, Diesel, golang-migrate, etc.) — generate a migration, review it, run it. Don't hand-edit the generated schema/snapshot file, a committed schema dump, or the live DB to change structure. Migrations are ordered, reversible, and reproducible across every environment; a direct edit drifts prod from the code and can't be replayed. Match the project's existing tool; if none exists and the change is real, set one up rather than editing the schema by hand.

4. **Commit fast and often.** Commit at every natural boundary — between tasks, scopes, or logical units — not in one dump at the end. One coherent change per commit, with a message saying what and why. Commit as soon as a unit compiles/passes, before starting the next. Small commits are cheap to review, revert, and bisect.

5. **Run on every operating system.** Write code that works on Linux, macOS, and Windows. Build paths with platform path tools (`path.join`, `pathlib.Path`, `filepath.Join`) — never hardcode `/` or `\`. Use the OS-agnostic temp/home dirs and line-ending handling from your stdlib; don't bake in `/tmp`, `$HOME`, or `\r\n`. Where a difference is unavoidable, branch on detected platform explicitly — don't silently fail on the OS you didn't test.

6. **Don't shell out where a module does the job.** If a well-maintained library or the stdlib exposes the operation, call it directly instead of spawning a CLI. File ops, HTTP, JSON/YAML, archives, git, process info: use the module (`fs`/`pathlib`/`shutil`, `requests`/`fetch`, the git binding) — not `cp`/`curl`/`tar`/`git` through a shell. Module calls are cross-platform, return typed results, surface real errors instead of parsed stdout, and dodge shell-injection bugs. Shell out only when there's no binding, the tool is CLI-only, or the subprocess is the thing being tested — and say which.

7. **Prefer Rust when the language is open.** If a task has no language fixed by the user and the repo doesn't already define one, default to Rust — one static binary, cross-platform, strong types, no runtime to ship. Greenfield choices only: an existing repo's language, a user-specified language, or an ecosystem requirement (browser frontend, Python ML stack, shell hook) always wins — match the project, don't impose Rust on it. Say so in one line when you pick it.

8. **Improve at will.** If you spot something adjacent that's broken or clearly wrong while doing the task, fix it. Don't ask permission for obvious, in-scope improvements — make them and note the change.

9. **Ask when the task isn't clear.** If ambiguous requirements or missing context block you from seeing the task clearly, ask before committing to an approach. A clarifying question up front beats building the wrong thing.

Pairs with ponytail (write the least code) — minimal *and* complete: wire all of it, with the right library, and ask if unsure.
