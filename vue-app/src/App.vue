<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useSettings } from '@/composables/useSettings';
import SidebarNav from '@/components/layout/SidebarNav.vue';
import AppHeader from '@/components/layout/AppHeader.vue';

const { isDarkTheme } = useSettings();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

onMounted(() => {
    // Synchronize body class for global Vanilla CSS scoping
    watchEffect(() => {
        if (isDarkTheme.value) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
});
</script>

<template>
  <!-- Background Overlay from original app -->
  <div class="overlay" :class="{ 'dark-theme': isDarkTheme }"></div>

  <div class="app-wrapper" :class="{ 'dark-theme': isDarkTheme }">
    <!-- Sidebar Navigation -->
    <SidebarNav 
      :is-mobile-menu-open="isMobileMenuOpen" 
      @close-mobile="closeMobileMenu"
    />

    <!-- Main Content Area -->
    <main class="app-content">
      <AppHeader @toggle-mobile-menu="toggleMobileMenu" />
      
      <div class="tab-content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
/* Vue Specific Transitions that overlay on top of original CSS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
