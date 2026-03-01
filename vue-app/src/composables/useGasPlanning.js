import { DiveMath } from '../modules/core/DiveMath.js';

export function useGasPlanning() {

    /**
     * Zwraca precyzyjne ATA na bazie głębokości i wybranego środowiska (słodka/słona).
     * Zakłada, że do DiveMath trafia flaga isFreshWater, albo liczy w locie.
     * Woda słodka 10m = 1 ATA | Woda słona 10m = 1.03 ATA -> ATA całkowite
     */
    const getATA = (depth, isFreshWater = false) => {
        return DiveMath.calculateATA(depth, isFreshWater);
    };

    /**
     * Kalkulator Zużycia Gazu na Planowane Nurkowanie
     */
    const calculateGasConsumption = (params) => {
        const {
            sac, depth, bottomTime, descentRate, ascentRate,
            stopDepth, stopTime, tankSize, startPressure,
            isFreshWater = false
        } = params;

        const P_surface = 1.0;
        const P_bottom = getATA(depth, isFreshWater);
        const P_stop = getATA(stopDepth, isFreshWater);

        const P_avg_descent = (P_surface + P_bottom) / 2;
        const P_avg_ascent_to_stop = (P_bottom + P_stop) / 2;
        const P_avg_ascent_to_surface = (P_stop + P_surface) / 2;

        const T_descent = depth / descentRate;
        const T_bottom = bottomTime;
        const T_ascent_to_stop = (depth - stopDepth) / ascentRate;
        const T_stop = stopTime;
        const T_ascent_to_surface = stopDepth / ascentRate;

        const L_descent = sac * P_avg_descent * T_descent;
        const L_bottom = sac * P_bottom * T_bottom;
        const L_ascent_to_stop = sac * P_avg_ascent_to_stop * T_ascent_to_stop;
        const L_stop = sac * P_stop * T_stop;
        const L_ascent_to_surface = sac * P_avg_ascent_to_surface * T_ascent_to_surface;

        const totalDemandLiters = L_descent + L_bottom + L_ascent_to_stop + L_stop + L_ascent_to_surface;
        const totalDemandBars = totalDemandLiters / tankSize;
        const totalSupplyLiters = tankSize * startPressure;
        const totalSupplyBars = startPressure;

        return {
            totalDemandLiters,
            totalDemandBars,
            totalSupplyLiters,
            totalSupplyBars,
            breakdown: {
                T_descent, L_descent, P_avg_descent,
                T_bottom, L_bottom, P_bottom,
                T_ascent_to_stop, L_ascent_to_stop, P_avg_ascent_to_stop,
                T_stop, L_stop, P_stop,
                T_ascent_to_surface, L_ascent_to_surface, P_avg_ascent_to_surface
            }
        };
    };

    /**
     * Kalkulator Rezerwy Gazowej Rock Bottom
     */
    const calculateRockBottom = (params) => {
        const {
            sac, depth, stopDepth, ascentRate,
            stressFactor, divers, emergencyTime,
            volume, safetyMargin, isFreshWater = false
        } = params;

        const P_depth = getATA(depth, isFreshWater);
        const P_stop = getATA(stopDepth, isFreshWater);
        const P_avg_ascent = (P_depth + P_stop) / 2;

        const T_ascent = (depth - stopDepth) / ascentRate;
        const SAC_stressed = sac * stressFactor;

        // Ilość wymaganego gazu od momentu awarii do rozpoczęcia wynurzenia
        const Gas_reaction = SAC_stressed * P_depth * emergencyTime * divers;

        // Ilość wymaganego gazu na czas podróży do przystanku (często bezpośrednio pow.)
        const Gas_ascent = SAC_stressed * P_avg_ascent * T_ascent * divers;

        const TotalGasLiters = Gas_reaction + Gas_ascent;
        const RB_pressure = TotalGasLiters / volume;
        const FinalRB = RB_pressure + safetyMargin;

        return {
            liters: (FinalRB * volume),
            bars: FinalRB,
            roundedBars: Math.ceil(FinalRB),
            details: {
                SAC_stressed, Gas_reaction, Gas_ascent, TotalGasLiters,
                P_depth, P_avg_ascent, T_ascent
            }
        };
    };

    return {
        calculateGasConsumption,
        calculateRockBottom,
        getATA
    };
}
