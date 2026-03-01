<script setup>
import { ref, computed } from 'vue'
import { DiveMath } from '../../modules/core/DiveMath.js';
import { NitroxCalculator } from '../../modules/calculators/NitroxCalculator.js';

const activeTab = ref('mod')

// === MOD State ===
const modFo2 = ref(32)
const modPo2 = ref(1.4)
const modWater = ref('fresh')
const modResult = computed(() => {
    const rawMod = NitroxCalculator.calculateMod(modFo2.value / 100, modPo2.value)
    // Adjust for water type (fresh vs salt)
    const ataDrop = modWater.value === 'fresh' ? (10 / 10.3) : 1.0;
    return Math.floor(rawMod / ataDrop)
})

// === EAD State ===
const eadDepth = ref(30)
const eadFo2 = ref(32)
const eadResult = computed(() => {
    return Math.floor(NitroxCalculator.calculateEad(eadDepth.value, eadFo2.value / 100))
})

// === Best Mix State ===
const bmDepth = ref(30)
const bmPo2 = ref(1.4)
const bmWater = ref('fresh')
const bmResult = computed(() => {
    const fn2 = NitroxCalculator.calculateBestMix(bmDepth.value, bmPo2.value, bmWater.value === 'fresh')
    return fn2
})

// === CNS State ===
const cnsDepth = ref(30)
const cnsFo2 = ref(32)
const cnsTime = ref(40)
const cnsWater = ref('fresh')
const cnsResult = computed(() => {
    return NitroxCalculator.calculateCns(cnsDepth.value, cnsFo2.value / 100, cnsTime.value, cnsWater.value === 'fresh')
})
const safetyCheck = computed(() => {
    return NitroxCalculator.checkSafety(cnsDepth.value, cnsFo2.value / 100, cnsWater.value === 'fresh')
})
</script>

<template>
  <div class="tool-view" id="nitrox-dashboard">
    <div class="view-header">
      <h2>Kalkulator Nitrox / Trimix</h2>
      <p>Narzędzia planowania gazów mieszanych dla nurków technicznych i rekreacyjnych.</p>
    </div>

    <!-- TABS -->
    <div class="sub-tab-nav">
      <button :class="['sub-tab-btn', { active: activeTab === 'mod' }]" @click="activeTab = 'mod'">MOD</button>
      <button :class="['sub-tab-btn', { active: activeTab === 'ead' }]" @click="activeTab = 'ead'">EAD</button>
      <button :class="['sub-tab-btn', { active: activeTab === 'bestmix' }]" @click="activeTab = 'bestmix'">Best Mix</button>
      <button :class="['sub-tab-btn', { active: activeTab === 'cns' }]" @click="activeTab = 'cns'">CNS/Toksyczność</button>
    </div>

    <div class="sub-tab-content-wrapper">
      <Transition name="fade" mode="out-in">

        <!-- MOD -->
        <div v-if="activeTab === 'mod'" key="mod" class="calculator-container" style="background:transparent; border:none; padding:0; box-shadow:none;">
          <form @submit.prevent>
            <div class="two-column-form mt-20">
              <div class="input-group">
                <label>Frakcja O2 (%)</label>
                <input type="number" v-model.number="modFo2" step="1" min="21" max="100">
              </div>
              <div class="input-group">
                <label>Max PPO2 (Limit)</label>
                <select v-model.number="modPo2">
                    <option value="1.2">1.2 (Zachowawczy)</option>
                    <option value="1.4">1.4 (Standard)</option>
                    <option value="1.6">1.6 (Deko/Max)</option>
                </select>
              </div>
            </div>
            <div class="input-group mt-20">
                <label>Rodzaj Wody</label>
                <select v-model="modWater">
                    <option value="fresh">Słodka</option>
                    <option value="salt">Słona</option>
                </select>
            </div>
          </form>
          <div class="result-box highlight-box mt-20">
              <h3 style="margin-top: 0; color: #00bcd4; font-size: 1.1em; border-bottom: 1px solid rgba(0, 188, 212, 0.3); padding-bottom: 10px;">
                Maksymalna Głębokość Operacyjna
              </h3>
              <div class="result-row mt-20" style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>MOD ({{ modPo2 }} ATA):</span>
                  <strong style="color: #00bcd4; font-size: 1.8em;">
                    {{ modResult }} m
                  </strong>
              </div>
          </div>
        </div>

        <!-- EAD -->
        <div v-else-if="activeTab === 'ead'" key="ead" class="calculator-container" style="background:transparent; border:none; padding:0; box-shadow:none;">
          <form @submit.prevent>
            <div class="two-column-form mt-20">
              <div class="input-group">
                <label>Głębokość (m)</label>
                <input type="number" v-model.number="eadDepth" step="1" min="1">
              </div>
              <div class="input-group">
                <label>Frakcja O2 (%)</label>
                <input type="number" v-model.number="eadFo2" step="1" min="21" max="100">
              </div>
            </div>
          </form>
          <div class="result-box highlight-box mt-20">
              <h3 style="margin-top: 0; color: #2196f3; font-size: 1.1em; border-bottom: 1px solid rgba(33, 150, 243, 0.3); padding-bottom: 10px;">
                Ekwiwalent Powietrzny
              </h3>
              <div class="result-row mt-20" style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>EAD (Dla tabel bezdech/pow.):</span>
                  <strong style="color: #2196f3; font-size: 1.8em;">
                    {{ eadResult > 0 ? eadResult : 0 }} m
                  </strong>
              </div>
          </div>
        </div>

        <!-- BEST MIX -->
        <div v-else-if="activeTab === 'bestmix'" key="bestmix" class="calculator-container" style="background:transparent; border:none; padding:0; box-shadow:none;">
          <form @submit.prevent>
            <div class="two-column-form mt-20">
              <div class="input-group">
                <label>Głębokość docelowa (m)</label>
                <input type="number" v-model.number="bmDepth" step="1" min="1">
              </div>
              <div class="input-group">
                <label>Max PPO2 (Limit)</label>
                <select v-model.number="bmPo2">
                    <option value="1.2">1.2 (Zachowawczy)</option>
                    <option value="1.4">1.4 (Standard)</option>
                    <option value="1.6">1.6 (Deko/Max)</option>
                </select>
              </div>
            </div>
            <div class="input-group mt-20">
                <label>Rodzaj Wody</label>
                <select v-model="bmWater">
                    <option value="fresh">Słodka</option>
                    <option value="salt">Słona</option>
                </select>
            </div>
          </form>
          <div class="result-box highlight-box mt-20">
              <h3 style="margin-top: 0; color: #ff9800; font-size: 1.1em; border-bottom: 1px solid rgba(255, 152, 0, 0.3); padding-bottom: 10px;">
                Optymalny Gaz (Best Mix)
              </h3>
              <div class="result-row mt-20" style="display: flex; justify-content: space-between; align-items: baseline;">
                  <span>O2 % (Nitrox):</span>
                  <strong style="color: #ff9800; font-size: 1.8em;">
                    {{ bmResult }} %
                  </strong>
              </div>
          </div>
        </div>

        <!-- CNS -->
        <div v-else-if="activeTab === 'cns'" key="cns" class="calculator-container" style="background:transparent; border:none; padding:0; box-shadow:none;">
          
          <div class="info-banner warning-banner mt-20" v-if="safetyCheck.status !== 'SAFE'">
            <strong>OSTRZEŻENIE ({{ safetyCheck.status }}):</strong> PPO2 osiągnęło {{ safetyCheck.currentPpO2.toFixed(2) }} ATA. 
            Maksymalna bezpieczna głębokość dla tego gazu to {{ safetyCheck.maxSafeDepth }}m.
          </div>

          <form @submit.prevent>
            <div class="two-column-form mt-20">
              <div class="input-group">
                <label>Głębokość (m)</label>
                <input type="number" v-model.number="cnsDepth" step="1" min="1">
              </div>
              <div class="input-group">
                <label>Czas denny (min)</label>
                <input type="number" v-model.number="cnsTime" step="1" min="1">
              </div>
            </div>
            <div class="two-column-form mt-20">
                <div class="input-group">
                    <label>Frakcja O2 (%)</label>
                    <input type="number" v-model.number="cnsFo2" step="1" min="21" max="100">
                </div>
                <div class="input-group">
                    <label>Rodzaj Wody</label>
                    <select v-model="cnsWater">
                        <option value="fresh">Słodka</option>
                        <option value="salt">Słona</option>
                    </select>
                </div>
            </div>
          </form>
          <div class="result-box mt-20" :style="safetyCheck.status !== 'SAFE' ? 'background: rgba(255, 56, 96, 0.05); border: 1px solid rgba(255, 56, 96, 0.2);' : ''">
              <h3 style="margin-top: 0; font-size: 1.1em;" :style="{ color: safetyCheck.status !== 'SAFE' ? '#ff3860' : '#4caf50' }">
                Zegar Tlenowy (CNS) & Toksyczność
              </h3>
              
              <ul style="list-style-type: none; padding:0; margin: 15px 0;">
                <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 8px;">
                    <span>Bieżące Ciśnienie PPO2:</span>
                    <strong :style="{ color: safetyCheck.status !== 'SAFE' ? '#ff3860' : '#4caf50'}">{{ cnsResult.ppo2.toFixed(2) }} ATA</strong>
                </li>
                 <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 8px;">
                    <span>Obciążenie (na minutę):</span>
                    <strong>{{ cnsResult.cnsPerMin.toFixed(2) }} %</strong>
                </li>
                <li style="display: flex; justify-content: space-between;">
                    <span><strong>Całkowite Przyjęte CNS:</strong></span>
                    <strong style="font-size: 1.3em;" :style="{ color: cnsResult.totalCns > 80 ? '#ff3860' : '#fff' }">
                        {{ cnsResult.totalCns.toFixed(1) }} %
                    </strong>
                </li>
              </ul>
          </div>
        </div>

      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Scoped Vue Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
