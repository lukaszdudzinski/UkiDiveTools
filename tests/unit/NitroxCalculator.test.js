import { NitroxCalculator } from '../../src/modules/calculators/NitroxCalculator.js';
import assert from '../lib/simple_assert.js';

console.log('🧪 Testing NitroxCalculator...');

// Test 1: MOD Calculation
// MOD = ((PO2 / FO2) - 1) * 10
// EAN32, PO2 1.4 => ((1.4 / 0.32) - 1) * 10 = (4.375 - 1) * 10 = 33.75m
const mod32 = NitroxCalculator.calculateMod(0.32, 1.4);
assert.ok(Math.abs(mod32 - 33.75) < 0.01, `EAN32 MOD should be ~33.75m, got ${mod32}`);

// EAN21 (Air), PO2 1.4 => ((1.4 / 0.21) - 1) * 10 = (6.66 - 1) * 10 = 56.6m
const modAir = NitroxCalculator.calculateMod(0.21, 1.4);
assert.ok(modAir > 56, 'Air MOD should be > 56m');

// Test 2: Best Mix Calculation
// Depth 30m = 4 ATA. Limit 1.4. Best Mix = 1.4 / 4 = 0.35 (EAN35)
const bestMix30m = NitroxCalculator.calculateBestMix(30, 1.4);
assert.strictEqual(bestMix30m, 35, 'Best mix for 30m @ 1.4 should be EAN35');

// Test 3: EAD Calculation
// EAN32 at 30m.
// FN2 = 0.68.
// EAD = ((30 + 10) * (0.68 / 0.79)) - 10
// EAD = (40 * 0.8607) - 10 = 34.43 - 10 = 24.43m
const ead32 = NitroxCalculator.calculateEad(30, 0.32);
assert.ok(ead32 < 30, 'EAD for EAN32 should be shallower than actual depth');
assert.ok(ead32 > 20, 'EAD should be reasonable');

console.log('✅ NitroxCalculator Tests Passed!');
