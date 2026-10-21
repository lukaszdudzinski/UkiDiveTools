import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (rel) => fs.readFileSync(new URL(rel, import.meta.url), 'utf8');

function extract(source, regex, label) {
    const match = source.match(regex);
    assert.ok(match, `Nie znaleziono wersji: ${label}`);
    return match[1];
}

test('ta sama wersja w AppUI.js, main.js, index.html, sw.js i CHANGELOG.json', () => {
    const versions = [
        extract(read('../../src/modules/ui/AppUI.js'), /export const APP_VERSION = '(.*?)';/, 'AppUI.js'),
        extract(read('../../src/main.js'), /export const APP_VERSION = '(.*?)';/, 'main.js'),
        extract(read('../../index.html'), /<meta name="app-version" content="(.*?)"/, 'index.html'),
        extract(read('../../sw.js'), /const CACHE_NAME = 'ukis-dive-tools-(.*?)';/, 'sw.js'),
        JSON.parse(read('../../CHANGELOG.json'))[0].version
    ];

    assert.equal(new Set(versions).size, 1, `Rozjazd wersji: ${versions.join(' | ')}`);
    assert.match(versions[0], /^v\d{4}\.\d{1,2}\.\d{1,2}\.\d{2}$/);
});
