import { describe, it, expect } from 'vitest';
import { useGasBlending } from '../../../composables/useGasBlending';

describe('Gas Blending Calculator', () => {
    const { calculateNitroxTopUp, calculateTrimixBlend } = useGasBlending();

    describe('calculateNitroxTopUp', () => {
        it('should correctly calculate top-up for 50 bar 21% -> 200 bar 32%', () => {
            const result = calculateNitroxTopUp(50, 0.21, 200, 0.32);
            expect(result.possible).toBe(true);

            expect(result.oxygenToAdd).toBeCloseTo(27.848, 2);
            expect(result.pressureAfterO2).toBeCloseTo(50 + 27.848, 2);
            expect(result.airTopUp).toBeCloseTo(200 - (50 + 27.848), 2);
        });

        it('should return possible=false if start O2 is too high for target', () => {
            // 50 bar of 50% O2, want to reach 100 bar of 32%
            const result = calculateNitroxTopUp(50, 0.50, 100, 0.32);
            expect(result.possible).toBe(false);
            expect(result.oxygenToAdd).toBeLessThan(0);
        });

        it('should return possible=false if pressureAfterO2 exceeds targetBar', () => {
            // 190 bar of 21%, want 200 bar of 50%.
            const result = calculateNitroxTopUp(190, 0.21, 200, 0.50);
            expect(result.possible).toBe(false);
            expect(result.pressureAfterO2).toBeGreaterThan(200);
        });
    });

    describe('calculateTrimixBlend', () => {
        it('should correctly calculate trimix blend for 0 bar -> 200 bar 21/35', () => {
            const result = calculateTrimixBlend(0, 200, 21, 35);
            expect(result.isValid).toBe(true);

            expect(result.heBar).toBeCloseTo(70, 1); // 200 * 0.35 = 70
            expect(result.o2Bar).toBeCloseTo(42, 1); // 200 * 0.21 = 42
            expect(result.airBar).toBeCloseTo(200 - 70 - 42, 1); // 88
            expect(result.n2Percent).toBe(44); // 100 - 21 - 35
        });

        it('should return isValid=false if sum of O2 and He exceeds 100%', () => {
            const result = calculateTrimixBlend(0, 200, 50, 60);
            expect(result.isValid).toBe(false);
        });

        it('should return isValid=false if O2 is less than 16% on surface', () => {
            const result = calculateTrimixBlend(0, 200, 15, 50);
            expect(result.isValid).toBe(false);
        });

        it('should return isValid=false if targetBar is not strictly greater than startBar', () => {
            const result1 = calculateTrimixBlend(200, 200, 21, 35);
            expect(result1.isValid).toBe(false);

            const result2 = calculateTrimixBlend(200, 100, 21, 35);
            expect(result2.isValid).toBe(false);
        });
    });
});
