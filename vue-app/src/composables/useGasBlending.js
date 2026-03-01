import { DiveMath } from '../modules/core/DiveMath.js';

export function useGasBlending() {
    function calculateNitroxTopUp(startBar, startO2, targetBar, targetO2) {
        const topUpO2 = DiveMath.CONSTANTS.AIR_O2; // Usually 0.21
        const o2InAirFraction = 1.0 - topUpO2;

        const numerator = (targetBar * (targetO2 - topUpO2)) - (startBar * (startO2 - topUpO2));
        const oxygenToAdd = numerator / o2InAirFraction;

        const pressureAfterO2 = startBar + oxygenToAdd;
        const airTopUp = targetBar - pressureAfterO2;

        return {
            oxygenToAdd,
            pressureAfterO2,
            airTopUp,
            possible: oxygenToAdd >= 0 && pressureAfterO2 <= targetBar
        };
    }

    function calculateTrimixBlend(startBar, targetBar, targetO2, targetHe) {
        const heBar = (targetHe / 100) * targetBar;
        const o2Bar = (targetO2 / 100) * targetBar;
        const totalHeO2 = heBar + o2Bar;
        const airBar = targetBar - totalHeO2;
        const n2Percent = 100 - targetO2 - targetHe;

        const pressureAfterHe = startBar + heBar;
        const pressureAfterO2 = pressureAfterHe + o2Bar;

        return {
            heBar,
            o2Bar,
            airBar,
            n2Percent,
            pressureAfterHe,
            pressureAfterO2,
            isValid: (targetO2 + targetHe <= 100) && (targetO2 >= 16) && (targetBar > startBar)
        };
    }

    return {
        calculateNitroxTopUp,
        calculateTrimixBlend
    };
}
