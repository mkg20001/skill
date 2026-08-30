#!/usr/bin/env node
// Bumps the plugin version in every manifest in lockstep.
// Usage: node scripts/bump-version.js [major|minor|patch|x.y.z]   (default: patch)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifests = ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json', 'package.json'];
const arg = (process.argv[2] || 'patch').trim();

function nextVersion(current, bump) {
  if (/^\d+\.\d+\.\d+$/.test(bump)) return bump;
  const m = current.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) throw new Error(`current version "${current}" is not x.y.z`);
  const [major, minor, patch] = m.slice(1).map(Number);
  if (bump === 'major') return `${major + 1}.0.0`;
  if (bump === 'minor') return `${major}.${minor + 1}.0`;
  if (bump === 'patch') return `${major}.${minor}.${patch + 1}`;
  throw new Error(`unknown bump "${bump}" — use major|minor|patch|x.y.z`);
}

const current = JSON.parse(fs.readFileSync(path.join(root, manifests[0]), 'utf8')).version;
const next = nextVersion(current, arg);

for (const rel of manifests) {
  const file = path.join(root, rel);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  j.version = next;
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n');
}

// Hermes manifest is YAML — rewrite just the `version:` line.
const yamlFile = path.join(root, 'plugin.yaml');
const yaml = fs.readFileSync(yamlFile, 'utf8');
fs.writeFileSync(yamlFile, yaml.replace(/^version:\s*\S+\s*$/m, `version: ${next}`));

console.log(`bumped version ${current} -> ${next} in ${manifests.length} manifests + plugin.yaml`);
