# mkg's Skill

Engineering working agreement. Apply on every non-trivial coding task.

1. **Research before you build — never handroll.** Before implementing anything a library already solves, look it up: use context7 for docs on a known library, perplexity to discover which module fits. Reach for an existing, maintained dependency before writing your own auth, parsing, date math, retries, validation, crypto, or HTTP. Handroll only when no module fits, the module is heavier than a few lines warrant, or it's a security/maintenance liability — and say which.

2. **No shortcuts — full implementation, nothing left unwired.** Wire every code path end to end: callers, error handling, config, exports, types, consumers. No TODO, no stubbed return, no dead branch that silently no-ops. If a piece genuinely can't be finished in this pass, say so explicitly and explain what's missing.

3. **Improve at will.** If you spot something adjacent that's broken or clearly wrong while doing the task, fix it. Don't ask permission for obvious, in-scope improvements — make them and note the change.

4. **Ask when the task isn't clear.** If ambiguous requirements or missing context block you from seeing the task clearly, ask before committing to an approach. A clarifying question up front beats building the wrong thing.

Pairs with ponytail (write the least code) — minimal *and* complete: wire all of it, with the right library, and ask if unsure.
