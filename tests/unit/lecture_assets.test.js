import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { lecturesData } from '../../src/modules/data/LecturesData.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const ASSET_KEYS = new Set(['src', 'audioSrc', 'presentationSrc', 'image']);

function collectAssetPaths(node, out = new Set()) {
  if (Array.isArray(node)) {
    for (const item of node) collectAssetPaths(item, out);
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (ASSET_KEYS.has(key) && typeof value === 'string') out.add(value);
      else collectAssetPaths(value, out);
    }
  }
  return out;
}

test('każdy lokalny zasób wykładów jest w repozytorium (wielkość liter ma znaczenie)', () => {
  const tracked = new Set(
    execFileSync('git', ['ls-files', '-z'], { cwd: root, maxBuffer: 64 * 1024 * 1024 })
      .toString('utf8')
      .split('\0')
      .filter(Boolean)
      .map((p) => p.normalize('NFC'))
  );

  const local = [...collectAssetPaths(lecturesData)]
    .filter((p) => !/^https?:/.test(p))
    .map((p) => p.replace(/^\.\//, '').normalize('NFC'));

  assert.ok(local.length > 0, 'powinien istnieć co najmniej jeden lokalny zasób wykładów');

  const missing = [...new Set(local)].filter((p) => !tracked.has(p)).sort();
  assert.deepEqual(missing, []);
});
