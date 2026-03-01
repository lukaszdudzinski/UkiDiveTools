<script setup>
import { ref } from 'vue'

const activeTab = ref('consumption')
</script>

<template>
  <div class="tool-view" id="gas-planning-calculator">
      <div class="view-header">
          <h2>Planowanie Gazu (Basic)</h2>
          <p>Oszacuj zużycie i podstawowe rezerwy (Rock Bottom) na nurkowanie rekreacyjne bez zmian gazu.</p>
      </div>

      <div class="sub-tab-nav">
          <button :class="['sub-tab-btn', { active: activeTab === 'consumption' }]" @click="activeTab = 'consumption'">Zużycie (Bieżące)</button>
          <button :class="['sub-tab-btn', { active: activeTab === 'rockbottom' }]" @click="activeTab = 'rockbottom'">Rock Bottom</button>
      </div>

      <div class="sub-tab-content-wrapper">
          <Transition name="fade" mode="out-in">
              <div v-if="activeTab === 'consumption'" key="consumption" class="result-box mt-20" style="text-align: center; padding: 40px;">
                  <h3>Kalkulator Zużycia Gazu</h3>
                  <p>Moduł w trakcie przywracania z pamięci podręcznej.</p>
              </div>

              <div v-else-if="activeTab === 'rockbottom'" key="rockbottom" class="result-box mt-20" style="text-align: center; padding: 40px; border-color: #ff3860; background: rgba(255, 56, 96, 0.05);">
                  <h3 style="color: #ff3860;">Rock Bottom (Rezerwa Awaryjna)</h3>
                  <p>Moduł w trakcie przywracania z pamięci podręcznej.</p>
              </div>
          </Transition>
      </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
