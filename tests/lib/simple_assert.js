export default {
    strictEqual: (actual, expected, message) => {
        if (actual !== expected) {
            const msg = message || `Expected ${expected} but got ${actual}`;
            console.error(`❌ FAIL: ${msg}`);
            throw new Error(msg);
        } else {
            console.log(`✅ PASS: ${message || 'Value match'}`);
        }
    },
    ok: (value, message) => {
        if (!value) {
            const msg = message || `Expected truthy value`;
            console.error(`❌ FAIL: ${msg}`);
            throw new Error(msg);
        } else {
            console.log(`✅ PASS: ${message || 'Condition met'}`);
        }
    }
};
