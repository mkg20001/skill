#!/usr/bin/env node
// Verifies the skill's rule sources stay consistent:
//  - SKILL.md (expanded) and .agents/rules (compact) list the same principles, same order
//  - AGENTS.md points at an existing SKILL.md
//  - every manifest (incl. package.json) shares one version and references files that exist
//  - the session hook references an existing rule file
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));

// Normalize a principle title: drop bold, trailing period, collapse space, lowercase.
const norm = (s) => s.replace(/\*\*/g, '').replace(/\.\s*$/, '').replace(/\s+/g, ' ').trim().toLowerCase();

function titles(text, re) {
  const out = [];
  for (const m of text.matchAll(re)) out.push(norm(m[1]));
  return out;
}

// 1. Principle titles match between the expanded skill and the compact rule.
const skill = read('.agents/skills/mkgs-skill/SKILL.md');
const rules = read('.agents/rules/mkgs-skill.md');
const skillTitles = titles(skill, /^##\s+\d+\.\s+(.+?)\s*$/gm);
const ruleTitles = titles(rules, /^\d+\.\s+\*\*(.+?)\*\*/gm);

if (skillTitles.length === 0) errors.push('SKILL.md: no numbered principles found');
if (skillTitles.length !== ruleTitles.length) {
  errors.push(`principle count mismatch: SKILL.md has ${skillTitles.length}, rules has ${ruleTitles.length}`);
}
const n = Math.max(skillTitles.length, ruleTitles.length);
for (let i = 0; i < n; i++) {
  if (skillTitles[i] !== ruleTitles[i]) {
    errors.push(`principle ${i + 1} differs:\n  SKILL: ${skillTitles[i] ?? '(missing)'}\n  rules: ${ruleTitles[i] ?? '(missing)'}`);
  }
}

// 2. AGENTS.md links to an existing SKILL.md.
const agents = read('AGENTS.md');
const link = agents.match(/\((\.\/[^)]*SKILL\.md)\)/);
if (!link) errors.push('AGENTS.md: no link to a SKILL.md found');
else if (!exists(link[1])) errors.push(`AGENTS.md: links to missing file ${link[1]}`);

// 3. Plugin manifests: same version, referenced paths exist.
const manifests = ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json', 'package.json'];
const versions = manifests.map((m) => {
  const j = JSON.parse(read(m));
  for (const key of ['skills', 'hooks']) {
    if (j[key] && !exists(j[key])) errors.push(`${m}: "${key}" -> ${j[key]} does not exist`);
  }
  return { m, v: j.version };
});
for (const { m, v } of versions.slice(1)) {
  if (v !== versions[0].v) errors.push(`version mismatch: ${versions[0].m}=${versions[0].v} vs ${m}=${v}`);
}

// 4. Hook references an existing rule file.
const hook = read('hooks/claude-codex-hooks.json');
const hookRef = hook.match(/\$\{CLAUDE_PLUGIN_ROOT\}\/([^"\\\s]+)/);
if (!hookRef) errors.push('hook: no ${CLAUDE_PLUGIN_ROOT}/<file> reference found');
else if (!exists(hookRef[1])) errors.push(`hook: references missing file ${hookRef[1]}`);

// 5. Hermes manifest: same version, entrypoint exists, declared skills exist.
const yaml = read('plugin.yaml');
const yamlVersion = yaml.match(/^version:\s*(\S+)\s*$/m)?.[1];
if (!yamlVersion) errors.push('plugin.yaml: no version found');
else if (yamlVersion !== versions[0].v) {
  errors.push(`version mismatch: plugin.yaml=${yamlVersion} vs ${versions[0].m}=${versions[0].v}`);
}
if (!exists('__init__.py')) errors.push('plugin.yaml: entrypoint __init__.py is missing');
// provides_skills entries must each have a skill dir. Grab the block, then its `- name` items.
const skillsBlock = yaml.match(/^provides_skills:\n((?:\s*-\s*\S+\s*\n?)+)/m)?.[1] ?? '';
for (const m of skillsBlock.matchAll(/-\s*(\S+)/g)) {
  if (!exists(`.agents/skills/${m[1]}`)) {
    errors.push(`plugin.yaml: provides_skills -> ${m[1]} has no .agents/skills/${m[1]}/`);
  }
}

if (errors.length) {
  console.error('check-sync FAILED:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`check-sync OK (${skillTitles.length} principles, version ${versions[0].v}, plugin.yaml in sync)`);
