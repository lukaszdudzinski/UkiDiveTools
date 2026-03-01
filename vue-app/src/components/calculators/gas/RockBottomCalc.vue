<script setup>
import { ref, computed, watch } from 'vue'
import { TANK_DEFINITIONS, getTankVolume } from '../../../data/TankData.js'
import { useGasPlanning } from '../../../composables/useGasPlanning.js'
import { useUserSettingsStore } from '../../../stores/userSettings.js'

const userSettings = useUserSettingsStore()
const { calculateRockBottom } = useGasPlanning()

// SAC from Store
const sac = ref(parseFloat(userSettings.userSac) || 20)
watch(() => userSettings.userSac, (newVal) => {
  if (newVal) sac.value = parseFloat(newVal)
})

// Parameters
const depth = ref(30)
const stopDepth = ref(15) // Deepest stop or direct ascent depth 
const tankId = ref('steel12')
const ascentRate = ref(10)
const stressFactor = ref(1.5)
const divers = ref(2)
const emergencyTime = ref(1) // Reaction time on bottom
const safetyMargin = ref(10) // additional bars
const waterType = ref('fresh')

const isFreshWater = computed(() => waterType.value === 'fresh')
const tankVolume = computed(() => getTankVolume(tankId.value))

const showDetails = ref(false)

const calculationParams = computed(() => ({
  sac: sac.value,
  depth: depth.value,
  stopDepth: stopDepth.value,
  ascentRate: ascentRate.value,
  stressFactor: stressFactor.value,
  divers: divers.value,
  emergencyTime: emergencyTime.value,
  volume: tankVolume.value,
  safetyMargin: safetyMargin.value,
  isFreshWater: isFreshWater.value
}))

const result = computed(() => {
    return calculateRockBottom(calculationParams.value)
})

const toggleDetails = () => {
    showDetails.value = !showDetails.value
}
</script>

<template>
  <div class="calculator-container form-container">
    <div class="form-header">
      <div class="header-with-icon">
        <h3 style="margin-top:0;">Rock Bottom</h3>
         <button class="icon-button tooltip-trigger" @click="toggleDetails" title="Pokaż/Ukryj szczegóły obliczeń">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>
      <p style="font-size: 0.85em; color: #bbb;">Oblicz minimalną, nienaruszalną rezerwę gazową (w barach). Jeśli Twoje ciśnienie osiągnie ten punkt - bezwzględnie zacznij wracać.</p>
    </div>

    <div class="form-group row-group">
      <div style="flex: 1;">
        <label for="rb-sac">Twój SAC (l/min)</label>
        <input id="rb-sac" type="number" v-model.number="sac" step="0.1" min="1">
      </div>
      <div style="flex: 1;">
        <label for="rb-tank">Butla</label>
        <select id="rb-tank" v-model="tankId">
          <optgroup v-for="group in TANK_DEFINITIONS" :key="group.group" :label="group.group">
            <option v-for="opt in group.options" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="form-group row-group">
      <div style="flex: 1;">
        <label for="rb-depth">Głębokość (m)</label>
        <input id="rb-depth" type="number" v-model.number="depth" step="1" min="1">
      </div>
       <div style="flex: 1;">
        <label for="rb-stop-depth">Głęb. przyst. (m)</label>
        <input id="rb-stop-depth" type="number" v-model.number="stopDepth" step="1" min="0">
      </div>
    </div>
    
    <div class="advanced-params" style="margin-top: 20px; padding: 15px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">
        <h4 style="margin-top: 0; font-size: 0.9em; color: #ccc;">Sytuacja Awaryjna</h4>
        <div class="form-group row-group">
             <div style="flex: 1;">
                <label for="rb-divers">Liczba nurków</label>
                <input id="rb-divers" type="number" v-model.number="divers" step="1" min="1" max="5">
            </div>
            <div style="flex: 1;">
                <label for="rb-stress">Stres (mnożnik SAC)</label>
                <input id="rb-stress" type="number" v-model.number="stressFactor" step="0.1" min="1.0">
            </div>
        </div>
        <div class="form-group row-group">
            <div style="flex: 1;">
                <label for="rb-emergency">Czas reakcji (min)</label>
                <input id="rb-emergency" type="number" v-model.number="emergencyTime" step="0.5" min="0.5">
            </div>
            <div style="flex: 1;">
                <label for="rb-margin">Margines bezp. (bar)</label>
                <input id="rb-margin" type="number" v-model.number="safetyMargin" step="5" min="0">
            </div>
        </div>
         <div class="form-group row-group">
            <div style="flex: 1;">
               <label for="rb-ascent">Wynurzanie (m/min)</label>
               <input id="rb-ascent" type="number" v-model.number="ascentRate" step="1" min="1">
            </div>
            <div style="flex: 1;">
                <label for="rb-water">Woda</label>
                <select id="rb-water" v-model="waterType">
                    <option value="fresh">Słodka</option>
                    <option value="salt">Słona</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Wynik -->
    <div class="result-box mt-10">
      <div class="flex justify-between items-center">
        <div>
          <p class="result-label">Rock Bottom (Czerwona Linia)</p>
          <p class="result-value-main" style="color:#ff3860 !important; font-size:2em; font-weight:bold; margin: 10px 0;">
            {{ result.roundedBars }} <span class="unit" style="font-size:0.4em; color:#fff;">bar</span>
          </p>
        </div>
      </div>
      <p class="result-disclaimer" style="color: #ff3860; font-size: 0.85em; margin-top: 5px;">
           Wymagane minimum na manometrze, żeby zacząć powrót.
      </p>

      <!-- Detale -->
      <div v-if="showDetails" class="formula-box-small" style="background: rgba(0,0,0,0.2); padding: 15px; border-radius:8px; font-size: 0.85em; margin-top: 15px;">
        <h5 style="color:#ff3860; margin-top:0; margin-bottom:8px;">Kalkulacja Awaryjna</h5>
        <p style="font-size: 0.9em; margin-bottom: 5px; color:#aaa;">Udostępnianie gazu dla {{ divers }} nurków. SAC Stres: {{ result.details.SAC_stressed.toFixed(1) }} l/min.</p>
        <ul style="list-style-type: none; padding:0; line-height:1.6; margin-bottom:10px; border-left: 2px solid #555; padding-left: 10px;">
            <li><strong>Reakcja:</strong> {{ result.details.Gas_reaction.toFixed(0) }} litrów <br> <span style="color:#888;">(Czas na rozwiązanie problemu na głębokości {{ depth }}m)</span></li>
            <li style="margin-top: 8px;"><strong>Wynurzenie:</strong> {{ result.details.Gas_ascent.toFixed(0) }} litrów <br> <span style="color:#888;">(Pokonanie dystansu z {{ depth }}m na {{ stopDepth }}m)</span></li>
            <li style="margin-top: 8px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 5px;">
                <strong>Suma Gazów L:</strong> {{ result.details.TotalGasLiters.toFixed(0) }} litrów
            </li>
            <li style="color:#888;">Podział na butlę {{ tankVolume }}L: {{ (result.details.TotalGasLiters / tankVolume).toFixed(1) }} bar</li>
        </ul>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; color:#ff3860; font-weight: bold;">
            Główny wymóg + Margines: {{ result.bars.toFixed(1) }} bar
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.calculator-container {
    background-color: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    max-width: 600px;
    margin: 0 auto;
}

.header-with-icon {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.icon-button {
    background: none;
    border: none;
    color: #bbb;
    cursor: pointer;
    padding: 5px;
    transition: color 0.3s;
}

.icon-button:hover {
    color: #00d1b2;
}

.info-icon {
    width: 24px;
    height: 24px;
}

.row-group {
    display: flex;
    gap: 15px;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 5px;
    font-size: 0.9em;
    color: #e0e0e0;
}

.form-group input,
.form-group select {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #555;
    background-color: #2a2a2a;
    color: #fff;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
}

.result-box {
    background: rgba(255, 56, 96, 0.05); /* Subtle deep red tint */
    border: 1px solid rgba(255, 56, 96, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-top: 25px;
}

.mt-10 { margin-top: 25px; }
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
</style>
