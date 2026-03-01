<template>
  <div class="gas-blending-dashboard">
    <div class="dashboard-header">
      <h2>Kalkulator Blendingu Gazów</h2>
      <p class="subtitle">Wybierz tryb mieszania poniżej</p>
    </div>

    <div class="mode-selector">
      <button 
        class="mode-btn" 
        :class="{ active: activeTab === 'nitrox' }" 
        @click="activeTab = 'nitrox'"
      >
        Nitrox Top-Up
      </button>
      <button 
        class="mode-btn" 
        :class="{ active: activeTab === 'trimix' }" 
        @click="activeTab = 'trimix'"
      >
        Trimix Blend
      </button>
    </div>

    <div class="calc-container">
      <NitroxTopUpCalc v-if="activeTab === 'nitrox'" />
      <TrimixBlendCalc v-if="activeTab === 'trimix'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NitroxTopUpCalc from './NitroxTopUpCalc.vue';
import TrimixBlendCalc from './TrimixBlendCalc.vue';

const activeTab = ref('nitrox');
</script>

<style scoped>
.gas-blending-dashboard {
  max-width: 600px;
  margin: 0 auto;
}
.dashboard-header {
  text-align: center;
  margin-bottom: 1.5rem;
}
.dashboard-header h2 {
  margin: 0;
  color: #00d1b2;
}
.subtitle {
  color: #888;
  margin-top: 5px;
}
.mode-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}
.mode-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid #00d1b2;
  background: transparent;
  color: #00d1b2;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}
.mode-btn:hover {
  background: rgba(0, 209, 178, 0.1);
}
.mode-btn.active {
  background: #00d1b2;
  color: #121212;
  font-weight: bold;
}
.calc-container {
  background: #242424;
  border-radius: 8px;
  overflow: hidden;
}
</style>
