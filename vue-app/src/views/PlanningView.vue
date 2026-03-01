<template>
  <div class="view-wrapper">
    <!-- Wrap standard SGC & Rock Bottom inside DivePlanningDashboard -->
    <!-- Assuming we have a unified dashboard or we render them side-by-side -->
    <div class="planning-dashboard">
      <div class="dashboard-header">
        <h2>Planowanie Nurkowania</h2>
        <p class="subtitle">Kalkulator Zużycia Gazu (SGC) i Rock Bottom (Rezerwa)</p>
      </div>
      
      <div class="calculators-grid">
        <SacCalculator />
        <RockBottomCalc />
      </div>
    </div>
  </div>
</template>

<script setup>
import SacCalculator from '@/components/calculators/SacCalculator.vue';
import RockBottomCalc from '@/components/calculators/gas/RockBottomCalc.vue';
import GasConsumptionCalc from '@/components/calculators/gas/GasConsumptionCalc.vue';
</script>

<style scoped>
.view-wrapper {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
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
.calculators-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
/* Optional Layout adjustments if we want them side-by-side on large screens */
@media (min-width: 1024px) {
  .calculators-grid {
    grid-template-columns: 1fr 1fr;
    max-width: 100%;
  }
}
</style>
