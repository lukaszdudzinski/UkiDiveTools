<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toggleMenu = () => {
    // Prosta obsługa menu bocznego na mobile
    const sidebar = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.overlay');
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}
</script>

<template>
  <div class="mobile-header">
      <button id="mobile-menu-toggle" aria-label="Otwórz menu" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
      </button>
      <img src="/img/logo.jpg" alt="Logo" class="logo-img" @click="router.push('/')" style="cursor: pointer;">
      <h2 @click="router.push('/')" style="cursor: pointer;">Uki's Dive Tools</h2>
  </div>
</template>

<style scoped>
/* Scoped css usunięte na rzecz globalnych z Vanilla CSS */
</style>
