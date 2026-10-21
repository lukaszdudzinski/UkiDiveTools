import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('bramka wydania w deploy.yml', () => {
    const yml = fs.readFileSync(new URL('../../.github/workflows/deploy.yml', import.meta.url), 'utf8');
    assert.match(yml, /pull_request:/);
    assert.match(yml, /node-version:\s*22/);
    assert.match(yml, /npm run test:unit/);
    assert.match(yml, /npx playwright install --with-deps chromium webkit/);
    assert.match(yml, /needs:\s*test/);
    assert.match(yml, /if:\s*github\.ref == 'refs\/heads\/main' && github\.event_name != 'pull_request'/);
    assert.match(yml, /path:\s*'\.'/); // publikowana zawartość bez zmian (podprojekt 2)
    assert.equal(fs.existsSync(new URL('../../.github/workflows/playwright.yml', import.meta.url)), false);
    assert.match(yml.slice(yml.indexOf('\n  deploy:')), /permissions:[\s\S]*?contents:\s*read/); // job-level permissions zastępują workflow-level
});

test('wzorce zrzutów nigdy nie działają na main (update-snapshots.yml)', () => {
    const yml = fs.readFileSync(new URL('../../.github/workflows/update-snapshots.yml', import.meta.url), 'utf8');
    assert.match(yml, /github\.ref_name != 'main'/);
});
