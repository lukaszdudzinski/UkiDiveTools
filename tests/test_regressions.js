import { BallastCalculator } from '../../src/modules/calculators/BallastCalculator.js';
import { DivePlanningCalculator } from '../../src/modules/calculators/DivePlanningCalculator.js';

// Simple Test Runner since we might not have a full framework setup
function assert(condition, message) {
    if (!condition) {
        console.error(`❌ FAIL: ${message}`);
        throw new Error(message);
    } else {
        console.log(`✅ PASS: ${message}`);
    }
}

console.log("=== Running Regression Tests ===");

// 1. Ballast Calculator Tests
console.log("\n--- Ballast Calculator ---");

// Case 1: Heavy diver (80kg), Twin 2x12, Dry Suit + Thick Undersuit, Steel Plate
// User expects much less than 8kg.
// Current Logic (as read):
// Base: 8kg
// Suit (Dry+Thick): +12kg
// Tank (Twin12): -8kg
// Plate (Steel): -2kg (if twin)
// Total: 8 + 12 - 8 - 2 = 10kg.
// User claims "nie potrzebuje zadnego balastu" (needs 0kg).
// Disclaimer: Ballast calculators are estimates, but pure math should reflect the heavy gear.
// Twin 2x12 filled is very heavy.
// 2x12L steel tanks (concave bottom) are approx -2kg to -4kg negative EACH when full?
// Actually standard faber 12L is ~14kg weight, ~12L displacement. Full (+3kg gas) => ~ -5kg buoyancy properly.
// Empty => ~ -2kg.
// Twinset with bands/manifold is heavier.
// User says he has "Jet fins" (heavy) + "Two regulators" (heavy).
// Our calculator doesn't account for regulators (+1.5kg negative approx) or Fins (+1kg negative).
// We should perhaps add "Heavy Gear" options? Or tune the twinset modifier.
// Twin 2x12 should probably be more negative than -8kg if it includes manifold and bands?
// Let's test the current output first.

try {
    const result = BallastCalculator.calculateBallast(80, 'dryTri', 'twin12_200', 'athletic', 'fresh', 'thick', 'steel');
    console.log(`User Scenario (80kg, Twin12, Dry+Thick, Steel Plate): ${result.totalBallast} kg`);
    // Ideally this should be closer to 0-4kg?
} catch (e) {
    console.error("Ballast Calc Error:", e);
}


// 2. SAC Calculator Tests
console.log("\n--- SAC Calculator ---");
const sac = DivePlanningCalculator.calculateSac(300, 4, 10); // 300L used / (4 bar pressure * 10 min) = 7.5 l/min
assert(Math.abs(sac - 7.5) < 0.1, "SAC Calculation wrong");


// 3. Rock Bottom Tests
console.log("\n--- Rock Bottom ---");
const rbParams = {
    sac: 20,
    depth: 30,
    stopDepth: 5,
    ascentRate: 10,
    stressFactor: 1, // Simple check
    divers: 1,
    emergencyTime: 1,
    volume: 15,
    safetyMargin: 0
};
// Reaction: 20 * 4ata * 1min * 1 = 80L
// Ascent: 30m -> 5m = 25m / 10 = 2.5min. Avg depth (30+5)/2 = 17.5m = 2.75ata.
// Ascent Gas: 20 * 2.75 * 2.5 * 1 = 137.5L
// Total: 217.5L
// Bar: 217.5 / 15 = 14.5 bar.
const rbResult = DivePlanningCalculator.calculateRockBottom(rbParams);
console.log(`RB Result: ${rbResult.liters} L (${rbResult.bars.toFixed(1)} bar)`);

console.log("=== Tests Finished ===");
