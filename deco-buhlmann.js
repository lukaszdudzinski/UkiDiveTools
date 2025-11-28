// ============================================================
// DECO PLANNER - BÜHLMANN ZHL-16C ALGORITHM DATA
// ============================================================

/**
 * Bühlmann ZHL-16C Compartment Data for Nitrogen (N2)
 * Based on: "Tauchmedizin" by Albert A. Bühlmann
 * 
 * Each compartment represents theoretical tissue with different
 * half-times for nitrogen absorption/elimination.
 * 
 * a = M-value coefficient (bar)
 * b = M-value coefficient (dimensionless)
 * M-value formula: M = (P_amb / b) - a
 */
const BUHLMANN_N2 = [
    { halfTime: 4.0, a: 1.2599, b: 0.5050 },  // Compartment 1  - Blood/Lungs
    { halfTime: 8.0, a: 1.0000, b: 0.6514 },  // Compartment 2  - Fast tissues
    { halfTime: 12.5, a: 0.8618, b: 0.7222 },  // Compartment 3  - Brain
    { halfTime: 18.5, a: 0.7562, b: 0.7825 },  // Compartment 4
    { halfTime: 27.0, a: 0.6667, b: 0.8126 },  // Compartment 5  - Muscles
    { halfTime: 38.3, a: 0.5933, b: 0.8434 },  // Compartment 6
    { halfTime: 54.3, a: 0.5282, b: 0.8693 },  // Compartment 7
    { halfTime: 77.0, a: 0.4701, b: 0.8910 },  // Compartment 8
    { halfTime: 109.0, a: 0.4187, b: 0.9092 },  // Compartment 9
    { halfTime: 146.0, a: 0.3798, b: 0.9222 },  // Compartment 10
    { halfTime: 187.0, a: 0.3497, b: 0.9319 },  // Compartment 11
    { halfTime: 239.0, a: 0.3223, b: 0.9403 },  // Compartment 12 - Fat
    { halfTime: 305.0, a: 0.2971, b: 0.9477 },  // Compartment 13
    { halfTime: 390.0, a: 0.2737, b: 0.9544 },  // Compartment 14
    { halfTime: 498.0, a: 0.2523, b: 0.9602 },  // Compartment 15
    { halfTime: 635.0, a: 0.2327, b: 0.9653 }   // Compartment 16 - Bones
];

/**
 * Bühlmann ZHL-16C Compartment Data for Helium (He)
 * Used for Trimix calculations
 */
const BUHLMANN_HE = [
    { halfTime: 1.51, a: 1.7424, b: 0.4245 },  // Compartment 1
    { halfTime: 3.02, a: 1.3830, b: 0.5747 },  // Compartment 2
    { halfTime: 4.72, a: 1.1919, b: 0.6527 },  // Compartment 3
    { halfTime: 6.99, a: 1.0458, b: 0.7223 },  // Compartment 4
    { halfTime: 10.21, a: 0.9220, b: 0.7582 },  // Compartment 5
    { halfTime: 14.48, a: 0.8205, b: 0.7957 },  // Compartment 6
    { halfTime: 20.53, a: 0.7305, b: 0.8279 },  // Compartment 7
    { halfTime: 29.11, a: 0.6502, b: 0.8553 },  // Compartment 8
    { halfTime: 41.20, a: 0.5950, b: 0.8757 },  // Compartment 9
    { halfTime: 55.19, a: 0.5545, b: 0.8903 },  // Compartment 10
    { halfTime: 70.69, a: 0.5333, b: 0.8997 },  // Compartment 11
    { halfTime: 90.34, a: 0.5189, b: 0.9073 },  // Compartment 12
    { halfTime: 115.29, a: 0.5181, b: 0.9122 }, // Compartment 13
    { halfTime: 147.42, a: 0.5176, b: 0.9171 }, // Compartment 14
    { halfTime: 188.24, a: 0.5172, b: 0.9217 }, // Compartment 15
    { halfTime: 240.03, a: 0.5119, b: 0.9267 }  // Compartment 16
];

/**
 * Deco planner configuration constants
 */
const DECO_CONFIG = {
    // Descent/Ascent rates (meters per minute)
    descentRate: 10,      // Standard safe descent
    ascentRate: 10,       // Maximum safe ascent

    // Deco stop intervals
    stopInterval: 3,      // Stops every 3 meters

    // Default Gradient Factors
    defaultGFLow: 30,     // Conservative first stop
    defaultGFHigh: 85,    // Conservative surfacing

    // Atmospheric pressure
    atmPressure: 1.01325, // bar (sea level)

    // Water pressure gradient
    waterPressurePerMeter: 0.1,  // bar/meter for freshwater
    // Use 0.1025 for saltwater

    // Minimum surface interval safety stop
    safetyStopDepth: 5,   // meters
    safetyStopTime: 3,    // minutes

    // Gas fractions in air
    airO2: 0.21,
    airN2: 0.79,
    airHe: 0.00
};

/**
 * Helper: Calculate rate constant k from half-time
 * k = ln(2) / half-time
 */
function getK(halfTime) {
    return Math.LN2 / halfTime;
}

/**
 * Helper: Get ambient pressure at depth
 * P_amb = P_atm + (depth × water_pressure_gradient)
 */
function getAmbientPressure(depth, saltwater = false) {
    const gradient = saltwater ? 0.1025 : 0.1;
    return DECO_CONFIG.atmPressure + (depth * gradient);
}

/**
 * Helper: Get inspired gas pressure for a compartment
 * P_insp = (P_amb - P_water_vapor) × FiGas
 * 
 * Simplification: P_water_vapor ≈ 0 (ignored for deco calculations)
 * P_insp = P_amb × FiGas
 */
function getInspiredPressure(ambientPressure, gasFreaction) {
    return ambientPressure * gasFreaction;
}

/**
 * Schreiner Equation - Calculate tissue loading over time
 * 
 * P_tissue(t) = P_insp + R × (t - 1/k) - [P_insp - P_initial - R/k] × e^(-k×t)
 * 
 * Where:
 * - P_tissue = tissue pressure after time t
 * - P_insp = inspired gas pressure (constant during interval)
 * - P_initial = initial tissue pressure
 * - R = rate of change of ambient pressure (bar/min)
 * - k = ln(2) / half-time
 * - t = time interval (minutes)
 * 
 * For constant depth (R = 0):
 * P_tissue(t) = P_initial + (P_insp - P_initial) × (1 - e^(-k×t))
 */
function schreinerEquation(P_initial, P_insp, k, t, R = 0) {
    if (R === 0) {
        // Simplified for constant depth
        return P_initial + (P_insp - P_initial) * (1 - Math.exp(-k * t));
    } else {
        // Full equation for changing depth
        return P_insp + R * (t - 1 / k) - (P_insp - P_initial - R / k) * Math.exp(-k * t);
    }
}

/**
 * Calculate M-value (maximum tolerated tissue pressure) for a compartment
 * 
 * M-value = (P_amb / b) - a
 * 
 * With Gradient Factors:
 * M-value_GF = M-value_0 + GF × (M-value - M-value_0)
 * 
 * Where M-value_0 is M-value at surface (1 bar)
 */
function getMValue(compartmentIndex, ambientPressure, gf = 100, useHelium = false) {
    const data = useHelium ? BUHLMANN_HE[compartmentIndex] : BUHLMANN_N2[compartmentIndex];
    const { a, b } = data;

    // M-value at current depth
    const mValue = (ambientPressure / b) - a;

    // M-value at surface
    const mValue0 = (DECO_CONFIG.atmPressure / b) - a;

    // Apply Gradient Factor
    if (gf === 100) {
        return mValue;
    } else {
        return mValue0 + (gf / 100) * (mValue - mValue0);
    }
}

/**
 * Calculate ceiling depth (minimum depth where tissue pressure is safe)
 * 
 * Returns the shallowest depth (in meters) where tissue loading
 * doesn't exceed the allowed M-value with given Gradient Factor.
 * 
 * Returns 0 if can surface directly.
 */
function getCeilingDepth(tissuePressure, compartmentIndex, gf, useHelium = false) {
    const data = useHelium ? BUHLMANN_HE[compartmentIndex] : BUHLMANN_N2[compartmentIndex];
    const { a, b } = data;

    // M-value at surface
    const mValue0 = (DECO_CONFIG.atmPressure / b) - a;

    // If tissue pressure is already below surface M-value, can surface
    if (tissuePressure <= mValue0) {
        return 0;
    }

    // Solve for ambient pressure where tissue equals M-value with GF
    // P_tissue = M-value_GF
    // P_tissue = M-value_0 + GF × ((P_amb/b - a) - M-value_0)
    // 
    // Rearranging: P_amb = b × (P_tissue + a × (1 - GF/100) + a × GF/100)
    //            = b × (P_tissue + a)

    // Simplified: assuming GF linear interpolation
    const pAmb = b * (tissuePressure + a);

    // Convert ambient pressure to depth
    const depth = (pAmb - DECO_CONFIG.atmPressure) / DECO_CONFIG.waterPressurePerMeter;

    return Math.max(0, depth);
}
