<script setup>
import { ref, computed, watch } from 'vue'
import { TANK_DEFINITIONS, getTankVolume } from '../../../data/TankData.js'
import { useGasPlanning } from '../../../composables/useGasPlanning.js'
import { useUserSettingsStore } from '../../../stores/userSettings.js'

// Inicjalizacja Pinia
const userSettings = useUserSettingsStore()
const { calculateGasConsumption } = useGasPlanning()

// Automatyczne pobieranie SAC ze store
const sac = ref(parseFloat(userSettings.userSac) || 20)

// Zaktualizuj lokalny SAC, jeśli zmieni się w Pinia
watch(() => userSettings.userSac, (newVal) => {
  if (newVal) sac.value = parseFloat(newVal)
})

// Stany formularza
const depth = ref(20)
const bottomTime = ref(30)
const tankId = ref('steel12')
const reservePressure = ref(50)
const descentRate = ref(20)
const ascentRate = ref(10)
const stopDepth = ref(5)
const stopTime = ref(3)
const startPressure = ref(200)
const waterType = ref('fresh')
const isFreshWater = computed(() => waterType.value === 'fresh')

// Referencje UI
const showDetails = ref(false)

const tankVolume = computed(() => getTankVolume(tankId.value))

const calculationParams = computed(() => ({
  sac: sac.value,
  depth: depth.value,
  bottomTime: bottomTime.value,
  descentRate: descentRate.value,
  ascentRate: ascentRate.value,
  stopDepth: stopDepth.value,
  stopTime: stopTime.value,
  tankSize: tankVolume.value,
  startPressure: startPressure.value,
  isFreshWater: isFreshWater.value
}))

const result = computed(() => {
    return calculateGasConsumption(calculationParams.value)
})

const requiredReserveLiters = computed(() => tankVolume.value * reservePressure.value)
const remainingLiters = computed(() => result.value.totalSupplyLiters - result.value.totalDemandLiters)
const remainingBars = computed(() => remainingLiters.value / tankVolume.value)
const isSafe = computed(() => remainingLiters.value >= requiredReserveLiters.value)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<template>
  <div class="calculator-container form-container">
    <div class="form-header">
      <div class="header-with-icon">
        <h3 style="margin-top:0;">Gas Consumption</h3>
        <button class="icon-button tooltip-trigger" @click="toggleDetails" title="Pokaż/Ukryj szczegóły obliczeń">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>
      <p style="font-size: 0.85em; color: #bbb;">Oblicz zapotrzebowanie na gaz (w litrach i barach) dla poszczególnych etapów nurkowania.</p>
    </div>

    <!-- Dane do kalkulacji -->
    <div class="form-group row-group">
      <div style="flex: 1;">
        <label for="gc-sac">Twój SAC (l/min)</label>
        <input id="gc-sac" type="number" v-model.number="sac" step="0.1" min="1">
      </div>
      <div style="flex: 1;">
        <label for="gc-tank">Butla</label>
        <select id="gc-tank" v-model="tankId">
          <optgroup v-for="group in TANK_DEFINITIONS" :key="group.group" :label="group.group">
            <option v-for="opt in group.options" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="form-group row-group">
      <div style="flex: 1;">
        <label for="gc-depth">Głębokość (m)</label>
        <input id="gc-depth" type="number" v-model.number="depth" step="1" min="1">
      </div>
      <div style="flex: 1;">
        <label for="gc-time">Czas na dnie (min)</label>
        <input id="gc-time" type="number" v-model.number="bottomTime" step="1" min="1">
      </div>
    </div>
    
    <div class="form-group row-group">
      <div style="flex: 1;">
        <label for="gc-start-pressure">Ciśn. startowe (bar)</label>
        <input id="gc-start-pressure" type="number" v-model.number="startPressure" step="10" min="50">
      </div>
      <div style="flex: 1;">
        <label for="gc-reserve">Rezerwa min. (bar)</label>
        <input id="gc-reserve" type="number" v-model.number="reservePressure" step="10" min="0">
      </div>
    </div>

    <div class="advanced-params" style="margin-top: 20px; padding: 15px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">
        <h4 style="margin-top: 0; font-size: 0.9em; color: #ccc;">Parametry zaawansowane</h4>
        <div class="form-group row-group">
             <div style="flex: 1;">
                <label for="gc-descent">Opadanie (m/min)</label>
                <input id="gc-descent" type="number" v-model.number="descentRate" step="1" min="1">
            </div>
            <div style="flex: 1;">
                <label for="gc-ascent">Wynurzanie (m/min)</label>
                <input id="gc-ascent" type="number" v-model.number="ascentRate" step="1" min="1">
            </div>
        </div>
        <div class="form-group row-group">
            <div style="flex: 1;">
                <label for="gc-stop-depth">Głęb. przyst. (m)</label>
                <input id="gc-stop-depth" type="number" v-model.number="stopDepth" step="1" min="0">
            </div>
            <div style="flex: 1;">
                <label for="gc-stop-time">Czas przyst. (min)</label>
                <input id="gc-stop-time" type="number" v-model.number="stopTime" step="1" min="0">
            </div>
        </div>
         <div class="form-group">
            <label for="gc-water">Woda</label>
            <select id="gc-water" v-model="waterType">
                <option value="fresh">Słodka (Jeziora 1.0 kg/l)</option>
                <option value="salt">Słona (Oceany 1.03 kg/l)</option>
            </select>
        </div>
    </div>


    <!-- Pudełko z Wynikiem -->
    <div class="result-box mt-10">
      <div class="result-container-header"><h4 style="margin-top: 0;">Raport Zużycia Gazu</h4></div>
      
      <div class="flex justify-between items-center mb-4">
        <div class="result-section">
          <p class="result-label">Zapotrzebowanie (Plan)</p>
          <p class="result-value-main" style="color:#00d1b2; font-size:1.8em; font-weight:bold;">
            {{ result.totalDemandLiters.toFixed(0) }} <span class="unit" style="font-size:0.5em; color:#fff;">l</span>
            <span style="font-size: 0.5em; color: #bbb; margin-left:10px;">(~{{ result.totalDemandBars.toFixed(0) }} bar)</span>
          </p>
        </div>
      </div>

       <div class="flex justify-between items-center mb-4">
        <div class="result-section">
          <p class="result-label">Zapas po wynurzeniu</p>
          <p class="result-value-main" :style="{ color: isSafe ? '#00d1b2' : '#ff3860', fontSize: '1.5em', fontWeight: 'bold' }">
            {{ remainingLiters.toFixed(0) }} <span class="unit" style="font-size:0.5em; color:#fff;">l</span>
            <span style="font-size: 0.5em; color: #bbb; margin-left:10px;">(~{{ remainingBars.toFixed(0) }} bar)</span>
          </p>
        </div>
      </div>

      <div :class="['status-badge', isSafe ? 'safe' : 'danger']">
          {{ isSafe ? 'Plan Bezpieczny' : 'RYZYKO (Naruszenie Rezerwy)' }}
      </div>

      <!-- Rozwinięcie szczegółów  -->
      <div v-if="showDetails" class="formula-box-small" style="background: rgba(0,0,0,0.2); padding: 15px; border-radius:8px; font-size: 0.85em; margin-top: 15px;">
        <h5 style="color:#00d1b2; margin-top:0; margin-bottom:8px;">Etapy zużycia gazu</h5>
        <p style="font-size:0.9em; margin-bottom:10px; color: #aaa;">SAC: {{ sac }} l/min, Woda: {{ isFreshWater ? 'Słodka' : 'Słona' }}</p>
        <ul style="list-style-type: none; padding:0; line-height:1.6; margin-bottom:10px; border-left: 2px solid #555; padding-left: 10px;">
          <li><strong>Zanurzenie:</strong> {{ depth }}m / {{ descentRate }}m/min = {{ result.breakdown.T_descent.toFixed(1) }} min<br>
              <span style="color:#888;">Powietrze: {{ result.breakdown.L_descent.toFixed(0) }} l (śr. {{ result.breakdown.P_avg_descent.toFixed(2) }} ATA)</span>
          </li>
          <li style="margin-top: 8px;"><strong>Pobyt na dnie:</strong> {{ bottomTime }} min @ {{ depth }}m<br>
              <span style="color:#888;">Powietrze: {{ result.breakdown.L_bottom.toFixed(0) }} l ({{ result.breakdown.P_bottom.toFixed(2) }} ATA)</span>
          </li>
          <li style="margin-top: 8px;"><strong>Wynurzanie do {{ stopDepth }}m:</strong> {{ (depth - stopDepth).toFixed(1) }}m<br>
              <span style="color:#888;">Powietrze: {{ result.breakdown.L_ascent_to_stop.toFixed(0) }} l (śr. {{ result.breakdown.P_avg_ascent_to_stop.toFixed(2) }} ATA)</span>
          </li>
          <li style="margin-top: 8px;"><strong>Przystanek:</strong> {{ stopTime }} min @ {{ stopDepth }}m<br>
              <span style="color:#888;">Powietrze: {{ result.breakdown.L_stop.toFixed(0) }} l ({{ result.breakdown.P_stop.toFixed(2) }} ATA)</span>
          </li>
          <li style="margin-top: 8px;"><strong>Ostatnie metry:</strong> {{ stopDepth }}m do powierzchni<br>
              <span style="color:#888;">Powietrze: {{ result.breakdown.L_ascent_to_surface.toFixed(0) }} l (śr. {{ result.breakdown.P_avg_ascent_to_surface.toFixed(2) }} ATA)</span>
          </li>
        </ul>
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; color:#00d1b2; font-weight: bold;">
          Całkowite zapotrzebowanie: {{ result.totalDemandLiters.toFixed(0) }} l / {{ (result.totalDemandLiters/tankVolume).toFixed(1) }} bar
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
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 20px;
    margin-top: 25px;
}

.status-badge {
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
}

.status-badge.safe {
    background-color: rgba(0, 209, 178, 0.2);
    color: #00d1b2;
    border: 1px solid #00d1b2;
}

.status-badge.danger {
    background-color: rgba(255, 56, 96, 0.2);
    color: #ff3860;
    border: 1px solid #ff3860;
}


.mt-10 { margin-top: 25px; }
.mb-4 { margin-bottom: 16px; }
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
</style>
