import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const unitDir = path.join(__dirname, 'unit');

console.log('🚀 Running Tests...');

fs.readdir(unitDir, (err, files) => {
    if (err) {
        console.error('Could not list test files', err);
        process.exit(1);
    }

    const testFiles = files.filter(f => f.endsWith('.test.js'));
    let passed = 0;
    let failed = 0;

    const runNext = (index) => {
        if (index >= testFiles.length) {
            console.log('\n========================');
            console.log(`Summary: ${passed} passed, ${failed} failed.`);
            if (failed > 0) process.exit(1);
            else process.exit(0);
        }

        const file = testFiles[index];
        console.log(`\n📄 Running ${file}...`);

        const p = spawn('node', [path.join(unitDir, file)], { stdio: 'inherit' });

        p.on('close', (code) => {
            if (code === 0) {
                passed++;
            } else {
                failed++;
                console.error(`❌ ${file} FAILED`);
            }
            runNext(index + 1);
        });
    };

    runNext(0);
});
