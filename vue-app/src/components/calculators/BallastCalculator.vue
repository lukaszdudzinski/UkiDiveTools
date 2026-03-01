<script setup>
import { ref, computed } from 'vue'

const weight = ref(75)
const bodyType = ref('average')
const suitType = ref('foam7')
const vestType = ref('none')
const warmerType = ref('thin')
const tankType = ref('steel12') 
const plateType = ref('steel')
const waterType = ref('fresh')

const tanks = {
    'alu11': { n: "Alu 11L (S80)", v: 2 },
    'alu7': { n: "Alu 7L", v: 1 },
    'steel7': { n: "Stal 7L (232)", v: -1 },
    'steel10': { n: "Stal 10L (232)", v: -2 },
    'steel12': { n: "Stal 12L (232)", v: -2 },
    'steel15': { n: "Stal 15L (232)", v: -3 },
    'steel10_300': { n: "Stal 10L (300)", v: -3 },
    'steel12_300': { n: "Stal 12L (300)", v: -4.5 },
    'twin7_232': { n: "Twin 2x7L (232)", v: -5 },
    'twin7_300': { n: "Twin 2x7L (300)", v: -10 },
    'twin85_232': { n: "Twin 2x8.5L (232)", v: -6 },
    'twin85_300': { n: "Twin 2x8.5L (300)", v: -11 },
    'twin10_232': { n: "Twin 2x10L (232)", v: -7 },
    'twin10_300': { n: "Twin 2x10L (300)", v: -13 },
    'twin12_232': { n: "Twin 2x12L (232)", v: -10 },
    'twin12_300': { n: "Twin 2x12L (300)", v: -14 },
    'twin15_232': { n: "Twin 2x15L (232)", v: -12 },
    'twin15_300': { n: "Twin 2x15L (300)", v: -17 },
}

const isDrySuit = computed(() => suitType.value.startsWith('dry'))
const isTwin = computed(() => tankType.value.startsWith('twin') || tankType.value.startsWith('double'))

const result = computed(() => {
    let w = typeof weight.value === 'string' ? parseFloat(weight.value) || 0 : weight.value;
    let baseBallast = w * 0.10;

    if (bodyType.value === 'slim') baseBallast -= 1;
    if (bodyType.value === 'athletic') baseBallast -= 3;
    if (bodyType.value === 'overweight') baseBallast += 2;

    let suitMod = 0;
    let suitName = "";

    switch (suitType.value) {
        case 'foam3': suitMod = 1; suitName = "Pianka 3mm"; break;
        case 'foam5': suitMod = 3; suitName = "Pianka 5mm"; break;
        case 'foam7': suitMod = 5; suitName = "Pianka 7mm"; break;
        case 'dryTri':
        case 'dryCrash':
        case 'dryNeo':
            suitName = "Suchy Skafander";
            suitMod = 6; 
            if (suitType.value === 'dryNeo') suitMod = 8; 
            if (suitType.value === 'dryCrash') suitMod = 3; 
            if (warmerType.value === 'thick') { suitMod += 5; suitName += " (Gruby Ocieplacz)"; }
            else { suitName += " (Cienki Ocieplacz)"; }
            break;
    }

    if (vestType.value === 'vest') {
        suitMod += 2;
        suitName += " + Docieplenie";
    }

    let waterMod = 0;
    if (waterType.value === 'salt') { waterMod = 2.5; }

    let tankMod = 0;
    let tankName = "";

    const selTank = tanks[tankType.value] || { n: "Nieznana butla", v: 0 };
    tankMod = selTank.v;
    tankName = selTank.n;

    if (isTwin.value) {
        baseBallast = baseBallast * 0.8;
        if (plateType.value === 'steel') {
            tankMod -= 2.5; 
            tankName += " + Płyta Stal";
        } else if (plateType.value === 'alu') {
            tankMod -= 0.5;
            tankName += " + Płyta Alu";
        }
        tankMod -= 1.5; 
    }

    const totalBallast = Math.max(0, Math.round((baseBallast + suitMod + waterMod + tankMod) * 2) / 2);
    const minBallast = Math.max(0, Math.floor(totalBallast - 1));
    const maxBallast = Math.ceil(totalBallast + 1.5);

    return {
        baseBallast,
        suitMod,
        suitName,
        waterMod,
        tankMod,
        tankName,
        totalBallast,
        minBallast,
        maxBallast
    };
})
</script>

<template>
  <div class="ballast-calculator">
    <h3>Kalkulator Balastu</h3>
    <p class="subtitle">Oblicz sugerowany punkt startowy dla Twojego obciążenia.</p>

    <div class="form-grid">
      <div class="form-column">
        <div class="input-group">
          <label>Waga (kg)</label>
          <input type="number" v-model="weight" min="30" max="250" />
        </div>

        <div class="input-group">
          <label>Budowa</label>
          <select v-model="bodyType">
            <option value="slim">Szczupła</option>
            <option value="athletic">Atletyczna</option>
            <option value="average">Średnia</option>
            <option value="overweight">Nadwaga</option>
          </select>
        </div>

        <div class="input-group">
          <label>Skafander</label>
          <select v-model="suitType">
            <option value="foam3">Pianka 3mm</option>
            <option value="foam5">Pianka 5mm</option>
            <option value="foam7">Pianka 7mm</option>
            <option value="dryTri">Suchy (Trylaminat)</option>
            <option value="dryCrash">Suchy (Crash Neo)</option>
            <option value="dryNeo">Suchy (Neopren)</option>
          </select>
        </div>

        <div class="input-group">
          <label>Dodatki</label>
          <select v-model="vestType">
            <option value="none">Brak</option>
            <option value="vest">Kamizelka (Docieplenie)</option>
          </select>
        </div>

        <div class="input-group" v-if="isDrySuit">
          <label>Ocieplacz (Suchy)</label>
          <select v-model="warmerType">
            <option value="thin">Cienki (do 200g)</option>
            <option value="thick">Gruby (400g+)</option>
          </select>
        </div>
      </div>

      <div class="form-column">
        <div class="input-group">
          <label>Butla</label>
          <select v-model="tankType">
            <option v-for="(tank, key) in tanks" :key="key" :value="key">
              {{ tank.n }}
            </option>
          </select>
        </div>

        <div class="input-group" v-if="isTwin">
          <label>Płyta</label>
          <select v-model="plateType">
            <option value="alu">Alu</option>
            <option value="steel">Stal</option>
          </select>
        </div>

        <div class="input-group">
          <label>Woda</label>
          <select v-model="waterType">
            <option value="salt">Słona</option>
            <option value="fresh">Słodka</option>
          </select>
        </div>
      </div>
    </div>

    <div class="result-container">
      <div class="result-container-header">
        <h4>Sugerowany Balast</h4>
      </div>
      
      <div class="calculation-details">
        <p>Baza (Ciało): {{ result.baseBallast.toFixed(1) }} kg</p>
        <p>Skafander: {{ result.suitMod.toFixed(1) }} kg</p>
        <p>Sprzęt (Butla/Płyta): {{ result.tankMod.toFixed(1) }} kg</p>
        <p>Woda: {{ result.waterMod.toFixed(1) }} kg</p>
      </div>

      <div class="result-section">
        <p class="result-label">Całkowita waga ołowiu:</p>
        <p class="result-value-main">{{ result.totalBallast.toFixed(1) }} <span class="unit">kg</span></p>
      </div>
      
      <div class="result-section warning-section">
        <p class="result-label">Sugerowany balast do zabrania:</p>
        <p class="result-value-sub">
            ~ {{ result.minBallast }} - {{ result.maxBallast }} kg
        </p>
      </div>

      <div class="result-section alert">
        <p>⚠️ Wynik orientacyjny. Wykonaj wyważenie w wodzie!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ballast-calculator {
  background: rgba(30, 30, 40, 0.7);
  padding: 24px;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
}

h3 {
  margin-top: 0;
  margin-bottom: 5px;
  color: #42b883;
}

.subtitle {
  color: #b0b0b0;
  font-size: 0.9em;
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-size: 0.85em;
  margin-bottom: 6px;
  color: #e0e0e0;
}

.input-group input,
.input-group select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.2);
  color: white;
  font-size: 1em;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #42b883;
}

.result-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgba(66, 184, 131, 0.3);
}

.result-container-header h4 {
  margin: 0 0 15px 0;
  color: #42b883;
  text-align: center;
}

.calculation-details {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 0.9em;
  color: #ccc;
}

.calculation-details p {
  margin: 0;
}

.result-section {
  text-align: center;
  margin-bottom: 15px;
}

.result-label {
  color: #b0b0b0;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.result-value-main {
  font-size: 2.5em;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.result-value-sub {
  font-size: 1.5em;
  color: #e0e0e0;
  margin: 0;
  font-weight: bold;
}

.unit {
  font-size: 0.5em;
  color: #888;
}

.warning-section {
  margin-top: 20px;
}

.alert {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: #ffd700;
  font-size: 0.9em;
  text-align: center;
}
</style>
