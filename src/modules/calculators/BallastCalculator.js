export const BallastCalculator = {
    calculateBallast: (weight, suitType, tankType, bodyType, waterType, warmerType, plateType) => {
        let baseBallast = weight * 0.10;

        if (bodyType === 'slim') baseBallast -= 1;
        if (bodyType === 'overweight') baseBallast += 1;

        let suitMod = 0;
        let suitName = "";
        switch (suitType) {
            case 'foam3': suitMod = 1; suitName = "Pianka 3mm"; break;
            case 'foam5': suitMod = 3; suitName = "Pianka 5mm"; break;
            case 'foam7': suitMod = 5; suitName = "Pianka 7mm"; break;
            case 'dryTri':
            case 'dryCrash':
            case 'dryNeo':
                suitName = "Suchy Skafander";
                suitMod = 8;
                if (warmerType === 'thick') { suitMod += 4; suitName += " (Gruby)"; }
                else { suitName += " (Cienki)"; }
                break;
        }

        let waterMod = 0;
        if (waterType === 'salt') { waterMod = 2.5; }

        let tankMod = 0;
        let tankName = "";
        switch (tankType) {
            case 'alu11': tankMod = 2; tankName = "Alu 11L (S80)"; break;
            case 'steel12': tankMod = -2; tankName = "Stal 12L"; break;
            case 'steel15': tankMod = -3; tankName = "Stal 15L"; break;
            case 'twin7_200': tankMod = -4; tankName = "Twin 2x7L"; break;
            case 'twin12_200': tankMod = -8; tankName = "Twin 2x12L"; break;
        }

        if (tankType.includes('twin')) {
            if (plateType === 'steel') { tankMod -= 2; tankName += " + Płyta Stal"; }
        }

        const totalBallast = Math.max(0, Math.round((baseBallast + suitMod + waterMod + tankMod) * 2) / 2);

        return {
            baseBallast,
            suitMod,
            suitName,
            waterMod,
            tankMod,
            tankName,
            totalBallast
        };
    }
};
