<template>
  <div class="mobile-header">
    <button id="mobile-menu-toggle" aria-label="Otwórz menu" @click="$emit('toggle-mobile-menu')">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <img src="/img/logo_uki.png" alt="Logo" class="logo-img">
    <h2 v-if="isMobile">Uki's Dive Tools</h2>
    <h2 v-else>{{ currentRouteTitle }}</h2>
    
    <!-- SOS Modal instance injected globally -->
    <SosModal />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import SosModal from '@/components/shared/SosModal.vue';

const emit = defineEmits(['toggle-mobile-menu']);
const route = useRoute();

const currentRouteTitle = computed(() => route.meta.title || "Uki's Dive Tools");

// Basic window resize tracking for responsive logo display
const isMobile = ref(window.innerWidth <= 768);

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>
