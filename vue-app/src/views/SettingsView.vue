<template>
  <div class="view-wrapper">
    <SettingsPanel @open-pro-modal="isProModalOpen = true" />
    <BuyCoffeePro :is-open="isProModalOpen" @close="isProModalOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SettingsPanel from '@/components/settings/SettingsPanel.vue';
import BuyCoffeePro from '@/components/shared/BuyCoffeePro.vue';

const isProModalOpen = ref(false);
</script>

<style scoped>
.view-wrapper {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
