<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isActive = (path) => route.path === path

const closeMenu = () => {
    const sidebar = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

const navigate = (path) => {
    router.push(path)
    closeMenu()
}
</script>

<template>
  <nav class="sidebar-nav">
      <div class="sidebar-header" id="home-link-header" title="Powrót do ekranu startowego" @click="navigate('/')" style="cursor: pointer;">
          <img src="/img/logo.jpg" alt="Logo" class="logo-img-desktop">
          <h1>Uki's Dive Tools</h1>
      </div>

      <ul>
          <li class="pro-menu-item" :class="{ 'active': isActive('/divemaster') }">
            <a href="#" @click.prevent="navigate('/divemaster')">Strefa PRO</a>
          </li>
          <li :class="{ 'active': isActive('/sac') }"><a href="#" @click.prevent="navigate('/sac')">Kalkulator SAC</a></li>
          <li :class="{ 'active': isActive('/nitrox') }"><a href="#" @click.prevent="navigate('/nitrox')">Kalkulator Nitrox</a></li>
          <li :class="{ 'active': isActive('/planning') }"><a href="#" @click.prevent="navigate('/planning')">Planowanie Gazu (Basic)</a></li>
          <li :class="{ 'active': isActive('/ballast') }"><a href="#" @click.prevent="navigate('/ballast')">Kalkulator Balastu</a></li>
          <li :class="{ 'active': isActive('/divemaster') }"><a href="#" @click.prevent="navigate('/divemaster')">Narzędzia Divemastera</a></li>
          <li :class="{ 'active': isActive('/knowledge') }"><a href="#" @click.prevent="navigate('/knowledge')">Wiedza Nurkowa</a></li>
          <li class="game-menu-item"><a href="#" style="color: #FFD700; font-weight: bold;">Uki's River Dive</a></li>
          <li :class="{ 'active': isActive('/settings') }"><a href="#" @click.prevent="navigate('/settings')">Ustawienia</a></li>
      </ul>

      <div class="sidebar-footer">
          <div class="donation-wrapper">
              <a href="https://suppi.pl/ukidives" target="_blank" rel="noopener noreferrer" id="donation-link">
                  Podoba Ci się to narzędzie?
                  <strong>Postaw mi kawę!</strong>
              </a>
          </div>
          <div class="emergency-wrapper" id="emergency-btn">
              <a href="#" @click.prevent="() => {}">
                  🚨 WYPADEK?
                  <strong>SOS / KOMORA</strong>
              </a>
          </div>
          <div class="version-info" style="text-align: center; margin-top: 30px; color: #666; font-size: 0.8em;">
              v2026.1 (Vue 3)
          </div>
      </div>
  </nav>
</template>

<style scoped>
/* Style globalne layout.css przejmują kontrolę */
.sidebar-nav ul li.active a {
    background-color: rgba(0, 209, 178, 0.15);
    color: #00d1b2;
    border-left: 3px solid #00d1b2;
}
</style>
