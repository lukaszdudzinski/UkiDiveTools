<template>
  <div class="view-wrapper">
    <GasBlendingDashboard />
  </div>
</template>

<script setup>
import GasBlendingDashboard from '@/components/calculators/blending/GasBlendingDashboard.vue';
</script>

<style scoped>
.view-wrapper {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
