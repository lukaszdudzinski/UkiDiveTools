<template>
  <div class="nitrox-top-up-calc">
    <div class="form-grid">
      <div class="input-group">
        <label>Startowe ciśnienie (bar)</label>
        <input type="number" v-model.number="startBar" min="0" />
      </div>
      <div class="input-group">
        <label>Startowe O2 (%)</label>
        <input type="number" v-model.number="startO2" min="21" max="100" />
      </div>
      <div class="input-group">
        <label>Docelowe ciśnienie (bar)</label>
        <input type="number" v-model.number="targetBar" min="0" />
      </div>
      <div class="input-group">
        <label>Docelowe O2 (%)</label>
        <input type="number" v-model.number="targetO2" min="21" max="100" />
      </div>
    </div>
    
    <div v-if="result" class="result-section">
      <div v-if="!result.possible" class="error-msg">
        Nie można uzyskać pożądanej mieszanki z podanymi parametrami.
        <span v-if="result.oxygenToAdd < 0">Zbyt dużo tlenu w butli startowej.</span>
        <span v-else-if="result.pressureAfterO2 > targetBar">Przekroczono ciśnienie docelowe.</span>
      </div>
      <div v-else>
        <div class="result-step">
          <h4>Krok 1: Dodaj 100% Tlenu</h4>
          <p class="value primary">+{{ result.oxygenToAdd.toFixed(1) }} bar</p>
          <p class="sub-value">Ciśnienie pośrednie: {{ result.pressureAfterO2.toFixed(1) }} bar</p>
        </div>
        <div class="result-step">
          <h4>Krok 2: Dopełnij Powietrzem (21%)</h4>
          <p class="value secondary">+{{ result.airTopUp.toFixed(1) }} bar</p>
          <p class="sub-value">Do ciśnienia: {{ targetBar }} bar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGasBlending } from '@/composables/useGasBlending';

const { calculateNitroxTopUp } = useGasBlending();

const startBar = ref(50);
const startO2 = ref(21);
const targetBar = ref(200);
const targetO2 = ref(32);

const result = computed(() => {
  if (startBar.value == null || startO2.value == null || targetBar.value == null || targetO2.value == null) return null;
  
  return calculateNitroxTopUp(
    startBar.value, 
    startO2.value / 100, 
    targetBar.value, 
    targetO2.value / 100
  );
});
</script>

<style scoped>
.nitrox-top-up-calc {
  padding: 1rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}
.input-group {
  display: flex;
  flex-direction: column;
}
.input-group label {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.input-group input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #2a2a2a;
  color: white;
}
.result-section {
  padding: 1rem;
  background: #1a1a1a;
  border-radius: 8px;
}
.error-msg {
  color: #ff4444;
  font-weight: bold;
}
.result-step {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
}
.result-step:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.value.primary {
  color: #00d1b2;
  font-size: 1.5rem;
  font-weight: bold;
}
.value.secondary {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}
.sub-value {
  color: #aaa;
  font-size: 0.9rem;
}
</style>
