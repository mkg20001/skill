"""Hermes plugin for mkg's Skill.

Registers the bundled skill and a single always-on hook that injects mkg's
engineering rules before every LLM turn — the Hermes analogue of the
SessionStart hook that other agents load from hooks/claude-codex-hooks.json.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
SKILLS_DIR = ROOT / ".agents" / "skills"
RULE_FILE = ROOT / ".agents" / "rules" / "mkgs-skill.md"

# Used only if the canonical rule file can't be read (e.g. partial install).
_FALLBACK = (
    "mkg's Skill ACTIVE — apply on every non-trivial coding task.\n\n"
    "Research before building (never handroll what a maintained library solves). "
    "Full implementations, nothing left unwired. Schema changes only via migrations. "
    "Commit fast and often. Cross-platform code. Prefer modules over shelling out. "
    "Default to Rust when the language is open. Improve adjacent breakage at will. "
    "Ask when the task is unclear. Use generic agent conventions (AGENTS.md, .agents/skills)."
)


def build_injected_context() -> str:
    """Return mkg's engineering rules injected before each LLM turn."""
    try:
        return RULE_FILE.read_text(encoding="utf-8").strip()
    except OSError:
        return _FALLBACK


def _pre_llm_call(**_: Any) -> dict[str, str] | None:
    context = build_injected_context()
    return {"context": context} if context else None


def register(ctx: Any) -> None:
    """Register mkg's Skill hooks and skills with Hermes."""
    for child in sorted(SKILLS_DIR.iterdir() if SKILLS_DIR.exists() else []):
        skill_md = child / "SKILL.md"
        if child.is_dir() and skill_md.exists():
            ctx.register_skill(child.name, skill_md)

    ctx.register_hook("pre_llm_call", _pre_llm_call)
