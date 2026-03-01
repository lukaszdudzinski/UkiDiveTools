<script setup>
import { ref, defineAsyncComponent, createVNode, render } from 'vue'

const GasConsumptionCalc = defineAsyncComponent(() => import('./gas/GasConsumptionCalc.vue'))
const RockBottomCalc = defineAsyncComponent(() => import('./gas/RockBottomCalc.vue'))

const activeTab = ref('consumption')

const setActiveTab = (tab) => {
    activeTab.value = tab
}
</script>

<template>
  <div class="gas-dashboard">
    <div class="dashboard-header text-center mb-8">
      <h2 style="margin-bottom: 5px; color: white;">Planowanie Gazu (Zużycie i Rezerwa)</h2>
      <p style="color: #bbb; max-width: 600px; margin: 0 auto;">
        Przewiduj zużycie gazu, kontroluj swoje rezerwy z Rock Bottom. Oba kalkulatory bazują na Twoim indywidualnym parametrze SAC (z menu narzędzi SAC).
      </p>
    </div>

    <div class="tabs-container">
      <button 
        :class="['tab-btn', { active: activeTab === 'consumption' }]" 
        @click="setActiveTab('consumption')">
        1. Zużycie Gazu (Plan)
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'rockbottom' }]" 
        @click="setActiveTab('rockbottom')">
        2. Rock Bottom (Rezerwa)
      </button>
    </div>

    <!-- Przejściowy kontener na kalkulatory -->
    <div class="calculator-wrapper mt-30">
      <Transition name="fade" mode="out-in">
        <GasConsumptionCalc v-if="activeTab === 'consumption'" key="consumption" />
        <RockBottomCalc v-else-if="activeTab === 'rockbottom'" key="rockbottom" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.gas-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-30 {
  margin-top: 30px;
}

/* TABS STYLING */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.tab-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ddd;
}

.tab-btn.active {
  background-color: #00d1b2;
  color: #111;
  border-color: #00d1b2;
  box-shadow: 0 4px 15px rgba(0, 209, 178, 0.3);
}

/* VUE ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
