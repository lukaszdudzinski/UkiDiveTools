const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '../');
const requiredFiles = [
    'index.html',
    'src/main.js',
    'src/modules/ui/AppUI.js',
    'style.css'
];

const requiredStrings = {
    'index.html': [
        'id="emergency-btn"',
        'id="emergency-content"',
        'id="donation-link"',
        'href="tel:112"' // Verify SOS fix is present
    ],
    'src/modules/ui/AppUI.js': [
        'initGlobalButtons',
        'initMobileMenu'
    ]
};

let errors = [];

console.log('🔍 Starting UI Integrity Check...');

requiredFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) {
        errors.push(`❌ Missing File: ${file}`);
    } else {
        const content = fs.readFileSync(filePath, 'utf8');
        if (requiredStrings[file]) {
            requiredStrings[file].forEach(str => {
                if (!content.includes(str)) {
                    errors.push(`❌ Missing Code in ${file}: "${str}"`);
                }
            });
        }
    }
});

if (errors.length > 0) {
    console.error('\n⚠️ Critical Integrity Issues Found:');
    errors.forEach(e => console.error(e));
    process.exit(1);
} else {
    console.log('\n✅ All Critical Safety Checks Passed!');
    console.log('   - Core files present');
    console.log('   - SOS functionality detected');
    console.log('   - Critical JS modules detected');
    process.exit(0);
}
