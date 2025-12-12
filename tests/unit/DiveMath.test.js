import { DiveMath } from '../../src/modules/core/DiveMath.js';
import assert from '../lib/simple_assert.js';

console.log('🧪 Testing DiveMath...');

// Test 1: Constants
assert.strictEqual(DiveMath.CONSTANTS.GRAVITY_ACCELERATION, 9.81, 'Gravity should be 9.81');
assert.strictEqual(DiveMath.CONSTANTS.SALT_WATER_DENSITY, 1.03, 'Salt water density should be 1.03');

// Test 2: Calculate ATA (Salt Water - Default)
// Depth 0m = 1 ATA
assert.strictEqual(DiveMath.calculateATA(0), 1, 'Surface (0m) should be 1 ATA');
// Depth 10m = 2 ATA
assert.strictEqual(DiveMath.calculateATA(10), 2, '10m Salt should be 2 ATA');
// Depth 30m = 4 ATA
assert.strictEqual(DiveMath.calculateATA(30), 4, '30m Salt should be 4 ATA');

// Test 3: Calculate ATA (Fresh Water)
// Fresh water is less dense, so pressure increases slightly slower per meter (or deep equals less pressure than salt?? No, lighter water means less pressure for same depth)
// 10m fresh = 1 + (10/10 * (10/10.3)) approx 1.97
const ataFresh10 = DiveMath.calculateATA(10, true);
assert.ok(ataFresh10 < 2, '10m Fresh should be less than 2 ATA');
assert.ok(ataFresh10 > 1.9, '10m Fresh should be > 1.9 ATA');

// Test 4: Partial Pressure
// 0.21 O2 at 1 ATA = 0.21
assert.strictEqual(DiveMath.calculatePartialPressure(0.21, 1), 0.21);
// 0.21 O2 at 5 ATA = 1.05
assert.strictEqual(DiveMath.calculatePartialPressure(0.21, 5), 1.05);

console.log('✅ DiveMath Tests Passed!');
