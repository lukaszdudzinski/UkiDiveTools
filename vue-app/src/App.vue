<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import SidebarNav from './components/layout/SidebarNav.vue'
import SosModal from './components/layout/SosModal.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.body.classList.add('dark-theme')
})
</script>

<template>
  <div class="overlay" id="blur-overlay"></div>
  <div class="app-wrapper">
    <AppHeader />
    <SidebarNav />
    <main class="app-content">
      <h1 style="display: none;">Uki's Dive Tools</h1>
      <div class="tab-content-wrapper">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>
    <SosModal />
  </div>
</template>

<style>
/* Globalne tło i wyrównania dla Vue Router i starych divów */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
