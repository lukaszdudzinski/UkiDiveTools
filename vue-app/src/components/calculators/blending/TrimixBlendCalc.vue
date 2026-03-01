<template>
  <div class="trimix-blend-calc">
    <div class="form-grid">
      <div class="input-group">
        <label>Startowe ciśnienie (bar)</label>
        <input type="number" v-model.number="startBar" min="0" />
      </div>
      <div class="input-group">
        <label>Docelowe ciśnienie (bar)</label>
        <input type="number" v-model.number="targetBar" min="0" />
      </div>
      <div class="input-group">
        <label>Docelowe O2 (%)</label>
        <input type="number" v-model.number="targetO2" min="1" max="100" />
      </div>
      <div class="input-group">
        <label>Docelowe He (%)</label>
        <input type="number" v-model.number="targetHe" min="0" max="100" />
      </div>
    </div>

    <div v-if="result" class="result-section">
      <div v-if="totalFractionError" class="error-msg">
        Błąd: Suma O2 i He nie może przekraczać 100%!
      </div>
      <div v-else-if="!result.isValid" class="error-msg">
        <span v-if="targetO2 < 16">Błąd: Zawartość tlenu musi być ≥ 16% (minimalna frakcja do oddychania).</span>
        <span v-else-if="targetBar <= startBar">Błąd: Ciśnienie docelowe musi być wyższe niż początkowe.</span>
        <span v-else>Nieprawidłowe parametry mieszanki.</span>
      </div>
      <div v-else>
        <div class="result-step">
          <h4>Krok 1: Dodaj 100% Hel (He)</h4>
          <p class="value he">+{{ result.heBar.toFixed(1) }} bar</p>
          <p class="sub-value">Ciśnienie pośrednie: {{ result.pressureAfterHe.toFixed(1) }} bar</p>
        </div>
        <div class="result-step">
          <h4>Krok 2: Dodaj 100% Tlen (O2)</h4>
          <p class="value o2">+{{ result.o2Bar.toFixed(1) }} bar</p>
          <p class="sub-value">Ciśnienie pośrednie: {{ result.pressureAfterO2.toFixed(1) }} bar</p>
        </div>
        <div class="result-step">
          <h4>Krok 3: Dopełnij Powietrzem (21%)</h4>
          <p class="value air">+{{ result.airBar.toFixed(1) }} bar</p>
          <p class="sub-value">Do ciśnienia: {{ targetBar }} bar</p>
        </div>
        <div class="result-step final-mix">
          <h4>Końcowa Mieszanka</h4>
          <p class="value mix-name">Trimix {{ targetO2.toFixed(0) }}/{{ targetHe.toFixed(0) }}</p>
          <p class="sub-value">O₂: {{ targetO2 }}% | He: {{ targetHe }}% | N₂: {{ result.n2Percent.toFixed(1) }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGasBlending } from '@/composables/useGasBlending';

const { calculateTrimixBlend } = useGasBlending();

const startBar = ref(0);
const targetBar = ref(200);
const targetO2 = ref(21);
const targetHe = ref(35);

const totalFractionError = computed(() => {
  return (targetO2.value + targetHe.value) > 100;
});

const result = computed(() => {
  if (startBar.value == null || targetBar.value == null || targetO2.value == null || targetHe.value == null) return null;
  
  if (totalFractionError.value) return null;

  return calculateTrimixBlend(
    startBar.value,
    targetBar.value,
    targetO2.value,
    targetHe.value
  );
});
</script>

<style scoped>
.trimix-blend-calc {
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
.value.he {
  color: #e0e0e0;
  font-size: 1.5rem;
  font-weight: bold;
}
.value.o2 {
  color: #00d1b2;
  font-size: 1.5rem;
  font-weight: bold;
}
.value.air {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}
.value.mix-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}
.sub-value {
  color: #aaa;
  font-size: 0.9rem;
}
.final-mix {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 1rem;
  margin-top: 1rem;
}
</style>
