<template>
  <div class="divemaster-dashboard">
    <div class="dashboard-header">
      <h2>Narzędzia Divemastera</h2>
      <p class="subtitle">Checklisty i pomoc w organizacji nurkowania</p>
    </div>

    <!-- Sub-tab Navigation -->
    <div class="sub-tab-navigation">
      <button 
        class="sub-tab-btn" 
        :class="{ active: activeTab === 'briefing' }"
        @click="activeTab = 'briefing'"
      >
        Briefing
      </button>
      <button 
        class="sub-tab-btn" 
        :class="{ active: activeTab === 'equipment' }"
        @click="activeTab = 'equipment'"
      >
        Obieg Sprzętu
      </button>
      <button 
        class="sub-tab-btn" 
        :class="{ active: activeTab === 'emergency' }"
        @click="activeTab = 'emergency'"
      >
        Zarządzanie Awaryjne
      </button>
    </div>

    <!-- Active Checklist Content -->
    <div class="checklist-content">
      <div v-if="activeTab === 'briefing'" class="checklist-section fade-in">
        <h3>Punkty Briefingu (SEABAG)</h3>
        <p class="section-desc">Kluczowe elementy odprawy przed nurkowaniem.</p>
        <div class="checkbox-list">
          <label class="checkbox-item" v-for="item in briefingItems" :key="item.id">
            <input 
              type="checkbox" 
              :checked="isChecked(item.id)" 
              @change="toggleItem(item.id)"
            >
            <span class="checkmark"></span>
            <span class="label-text"><strong>{{ item.title }}</strong>: {{ item.desc }}</span>
          </label>
        </div>
      </div>

      <div v-else-if="activeTab === 'equipment'" class="checklist-section fade-in">
        <h3>Obieg Sprzętu na Łodzi</h3>
        <p class="section-desc">Procedura kontroli wydawanego sprzętu.</p>
        <div class="checkbox-list">
          <label class="checkbox-item" v-for="item in equipmentItems" :key="item.id">
            <input 
              type="checkbox" 
              :checked="isChecked(item.id)" 
              @change="toggleItem(item.id)"
            >
            <span class="checkmark"></span>
            <span class="label-text">{{ item.title }}</span>
          </label>
        </div>
      </div>

      <div v-else-if="activeTab === 'emergency'" class="checklist-section fade-in">
        <h3>Zarządzanie Sytuacją Awaryjną (DSO)</h3>
        <p class="section-desc">Kolejność działań ratowniczych.</p>
        <div class="checkbox-list">
          <label class="checkbox-item" v-for="item in emergencyItems" :key="item.id">
            <input 
              type="checkbox" 
              :checked="isChecked(item.id)" 
              @change="toggleItem(item.id)"
            >
            <span class="checkmark"></span>
            <span class="label-text">{{ item.title }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Global Reset Button -->
    <div class="reset-wrapper">
      <button class="reset-btn pulse" @click="handleReset">
        <span class="icon">🔄</span> Wyczyść zaznaczenia aktualnej zakładki
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useChecklist } from '@/composables/useChecklist';

// Differentiate localstorage keys based on active tab so they don't overwrite each other 
// or keep a single giant object. We use a single hook instance parameterized by the active tab dynamically.

const activeTab = ref('briefing');

// Define static checklist structures based on generic divemaster protocols
const briefingItems = [
    { id: 'b_site', title: 'Site Assessment', desc: 'Warunki, prądy, widoczność.' },
    { id: 'b_env', title: 'Environmental', desc: 'Lokalne zasady, ochrona fauny.' },
    { id: 'b_act', title: 'Action Plan', desc: 'Trasa, maksymalna głębokość i czas.' },
    { id: 'b_bud', title: 'Buddy Procedures', desc: 'Zasady utraty partnera, sygnały.' },
    { id: 'b_air', title: 'Air & Comms', desc: 'Początkowy gaz, ciśnienie powrotu, rezerwa.' },
    { id: 'b_gear', title: 'Gear Assembly', desc: 'Kontrola sprzętu przed wejściem (BWRAF).' }
];

const equipmentItems = [
    { id: 'e_tanks', title: 'Liczenie i przypięcie butli.' },
    { id: 'e_weights', title: 'Dystrybucja i sprawdzenie balastu.' },
    { id: 'e_bc', title: 'Analiza BCD u kursantów i gości.' },
    { id: 'e_regs', title: 'Podpięcie i test ciśnienia automatów.' },
    { id: 'e_suits', title: 'Skrzyneczka ratunkowa i tlen na pokładzie (O2).' },
    { id: 'e_count', title: 'Finalne liczenie nurków przed zejściem do wody.' },
    { id: 'e_count2', title: 'Odbiór nurków na lódce i weryfikacja headcountu.' }
];

const emergencyItems = [
    { id: 'em_rec', title: 'Rozpoznanie problemu (Recognize).' },
    { id: 'em_ass', title: 'Ocena sytuacji i bezpieczeństwa (Assess).' },
    { id: 'em_act', title: 'Przystąp do akcji (Act) - Wyznaczenie ról.' },
    { id: 'em_comm', title: 'Komunikacja (Communicate) - Powiadomienie służb (VHF / SOS).' },
    { id: 'em_o2', title: 'Aplikacja Tlenu ratunkowego 100% O2.' },
    { id: 'em_doc', title: 'Zanotowanie parametrów nurkowania i danych poszkodowanego dla Rescue/DAN.' }
];

// Composable instance
const { checklistState, toggleItem, isChecked, resetChecklist } = useChecklist('divemaster_tools');

const handleReset = () => {
    // We only want to reset items relevant to the ACTIVE tab to mimic the old Vanilla behavior
    let itemsToClear = [];
    if (activeTab.value === 'briefing') itemsToClear = briefingItems;
    if (activeTab.value === 'equipment') itemsToClear = equipmentItems;
    if (activeTab.value === 'emergency') itemsToClear = emergencyItems;

    itemsToClear.forEach(item => {
        checklistState.value[item.id] = false;
    });
};
</script>

<style scoped>
.divemaster-dashboard {
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

/* Tabs */
.sub-tab-navigation {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.sub-tab-btn {
  background: transparent;
  color: #aaa;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}
.sub-tab-btn:hover {
  border-color: #00d1b2;
  color: #fff;
}
.sub-tab-btn.active {
  background: #00d1b2;
  color: #121212;
  border-color: #00d1b2;
}

/* Checklist Details */
.checklist-section {
  background: var(--color-bg-card, #242424);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.checklist-section h3 {
  color: #fff;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}
.section-desc {
  color: #888;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Custom Checkboxes */
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.checkbox-item {
  display: flex;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1.05rem;
  color: #e0e0e0;
  user-select: none;
  align-items: center;
  min-height: 25px;
}
.checkbox-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  transition: all 0.2s;
}
.checkbox-item:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.2);
}
.checkbox-item input:checked ~ .checkmark {
  background-color: #00d1b2;
  border-color: #00d1b2;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-item input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-item .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid #121212;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.label-text {
  line-height: 1.4;
}

.reset-wrapper {
  margin-top: 3rem;
  text-align: center;
}
.reset-btn {
  background: transparent;
  color: #ff3860;
  border: 1px solid #ff3860;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.reset-btn:hover {
  background: rgba(255, 56, 96, 0.1);
  box-shadow: 0 0 15px rgba(255, 56, 96, 0.4);
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
