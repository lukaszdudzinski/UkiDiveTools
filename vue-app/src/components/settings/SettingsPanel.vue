<template>
  <div class="settings-panel">
    <div class="dashboard-header">
      <h2>Ustawienia Aplikacji</h2>
      <p class="subtitle">Dostosuj Uki's Dive Tools do swoich potrzeb</p>
    </div>

    <!-- Appearance -->
    <div class="settings-section">
      <h3><span class="icon">🎨</span> Wygląd i Motyw</h3>
      <div class="setting-row">
        <label>
          <span class="setting-name">Dark Mode</span>
          <span class="setting-desc">Ciemny motyw oszczędza baterię na lodzi.</span>
        </label>
        <div class="toggle-switch">
          <input type="checkbox" v-model="isDarkTheme">
          <span class="slider"></span>
        </div>
      </div>
    </div>

    <!-- Dive Defaults -->
    <div class="settings-section">
      <h3><span class="icon">🌊</span> Domyślne Parametry Nurkowe</h3>
      
      <div class="setting-row">
        <label>
          <span class="setting-name">Typ Wody</span>
          <span class="setting-desc">Wpływa na obliczenia gęstości w kalkulatorach (np. Balast, Rock Bottom).</span>
        </label>
        <select v-model="globalWaterType" class="modern-select">
          <option value="fresh">Słodka (1.0 kg/l)</option>
          <option value="salt">Słona (1.03 kg/l)</option>
        </select>
      </div>

      <div class="setting-row">
        <label>
          <span class="setting-name">Domyślna Butla</span>
          <span class="setting-desc">Podpowiadana wielkość we wszystkich narzędziach gazowych.</span>
        </label>
        <select v-model="defaultTank" class="modern-select">
          <optgroup label="Pojedyncze Butle (Stal)">
              <option value="steel10">10L Stal (Szeroka)</option>
              <option value="steel12">12L Stal (Długa)</option>
              <option value="steel15">15L Stal</option>
          </optgroup>
          <optgroup label="Pojedyncze Butle (Aluminium)">
              <option value="alu11">11.1L Alu (S80)</option>
              <option value="alu5">5.7L Alu (S40)</option>
          </optgroup>
          <optgroup label="Twinset (Zestawy dwubutlowe)">
              <option value="twin7">Twinset 2x7L</option>
              <option value="twin12">Twinset 2x12L</option>
          </optgroup>
        </select>
      </div>
    </div>

    <!-- User Data -->
    <div class="settings-section">
      <h3><span class="icon">🫁</span> Moje Dane (SAC)</h3>
      <div class="setting-row">
        <label>
          <span class="setting-name">Zapisane zużycie gazu</span>
          <span class="setting-desc">Pobierane kalkulatorem SAC i trzymane w pamięci urządzenia.</span>
        </label>
        <div class="data-display">
          <span class="sac-value" :class="{ 'has-data': hasSavedSac }">
            {{ hasSavedSac ? savedSacRate + ' L/min' : 'Brak danych' }}
          </span>
          <button v-if="hasSavedSac" class="action-btn danger" @click="handleResetSac">
            Usuń
          </button>
        </div>
      </div>
    </div>

    <!-- PRO Status -->
    <div class="settings-section pro-section">
      <h3><span class="icon">⭐</span> Licencja PRO</h3>
      <div class="setting-row">
        <label>
          <span class="setting-name">Status Odblokowania</span>
          <span class="setting-desc">Dostęp do Kalkulatora Blendingu, Logbooka i szczegółów obliczeń.</span>
        </label>
        <div class="data-display">
          <span class="pro-status" :class="isProActive ? 'active' : 'locked'">
            {{ isProActive ? 'AKTYWNY' : 'ZABLOKOWANY' }}
          </span>
          <button v-if="!isProActive" class="action-btn primary" @click="$emit('open-pro-modal')">
            Odblokuj (Kod)
          </button>
          <button v-else class="action-btn secondary" @click="handleDeactivatePro">
            Dezaktywuj (Test)
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSettings } from '@/composables/useSettings';

const { 
  isDarkTheme, 
  globalWaterType, 
  defaultTank, 
  hasSavedSac, 
  isProActive, 
  resetSac, 
  deactivatePro 
} = useSettings();

defineEmits(['open-pro-modal']);

// Retrieve the actual SAC value dynamically just for display purposes
const savedSacRate = computed(() => {
    if (hasSavedSac.value) {
        return localStorage.getItem('uki-user-sac');
    }
    return null;
});

const handleResetSac = () => {
    if(confirm('Cz chcesz wyczyścić swoje zapisane zużycie gazu (SAC)?')) {
        resetSac();
    }
};

const handleDeactivatePro = () => {
    if(confirm('Zablokować funkcje PRO do celów testowych?')) {
        deactivatePro();
    }
};
</script>

<style scoped>
.settings-panel {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}
.dashboard-header h2 {
  color: #00d1b2;
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #888;
}

.settings-section {
  background: var(--color-bg-card, #242424);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
}
.settings-section h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 0.8rem;
}
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
.setting-row:last-child {
  margin-bottom: 0;
}
.setting-row label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}
.setting-name {
  color: #e0e0e0;
  font-weight: bold;
  font-size: 1.05rem;
}
.setting-desc {
  color: #888;
  font-size: 0.85rem;
  line-height: 1.3;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #555;
  transition: .4s;
  border-radius: 28px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #00d1b2;
}
input:checked + .slider:before {
  transform: translateX(22px);
}

/* Form Elements */
.modern-select {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: #333;
  color: #fff;
  font-size: 1rem;
  min-width: 180px;
  outline: none;
}
.modern-select:focus {
  border-color: #00d1b2;
}

.data-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.sac-value {
  font-family: monospace;
  font-size: 1.1rem;
  color: #888;
}
.sac-value.has-data {
  color: #00d1b2;
  font-weight: bold;
}
.pro-status {
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
.pro-status.active {
  background: rgba(0, 209, 178, 0.1);
  color: #00d1b2;
}
.pro-status.locked {
  background: rgba(255, 56, 96, 0.1);
  color: #ff3860;
}

/* Actions */
.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.action-btn.danger {
  background: rgba(255, 56, 96, 0.1);
  color: #ff3860;
  border: 1px solid #ff3860;
}
.action-btn.danger:hover {
  background: rgba(255, 56, 96, 0.2);
}
.action-btn.primary {
  background: #00d1b2;
  color: #121212;
}
.action-btn.primary:hover {
  background: #00e6c4;
}
.action-btn.secondary {
  background: transparent;
  color: #ccc;
  border: 1px solid #666;
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .setting-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
