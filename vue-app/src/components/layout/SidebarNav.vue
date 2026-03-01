<template>
  <nav class="sidebar-nav" :class="{ 'active': isMobileMenuOpen }">
    <router-link to="/" class="sidebar-header" id="home-link-header" title="Powrót do ekranu startowego" @click="$emit('close-mobile')">
      <img src="/img/logo_uki.png" alt="Logo" class="logo-img-desktop">
      <h1>Uki's Dive Tools</h1>
    </router-link>

    <ul>
      <li class="pro-menu-item">
        <!-- Re-added PRO Area styling from old CSS -->
        <router-link to="/divemaster" @click="$emit('close-mobile')">Strefa PRO</router-link>
      </li>
      <li><router-link to="/tools/planning" @click="$emit('close-mobile')">Kalkulator SAC / Planowanie (Basic)</router-link></li>
      <li><router-link to="/tools/nitrox" @click="$emit('close-mobile')">Kalkulator Nitrox</router-link></li>
      <li><router-link to="/tools/ballast" @click="$emit('close-mobile')">Kalkulator Balastu</router-link></li>
      <li><router-link to="/divemaster" @click="$emit('close-mobile')">Narzędzia Divemastera</router-link></li>
      <li><router-link to="/knowledge" @click="$emit('close-mobile')">Wiedza Nurkowa</router-link></li>
      <li class="game-menu-item">
        <router-link to="/" @click="$emit('close-mobile')" style="color: #FFD700; font-weight: bold;">Uki's River Dive</router-link>
      </li>
      <li><router-link to="/settings" @click="$emit('close-mobile')">Ustawienia</router-link></li>
    </ul>

    <div class="sidebar-footer">
      <div class="donation-wrapper">
        <a href="https://suppi.pl/ukidives" target="_blank" rel="noopener noreferrer" id="donation-link">
          Podoba Ci się to narzędzie?
          <strong>Postaw mi kawę!</strong>
        </a>
      </div>
      <div class="emergency-wrapper" id="emergency-btn">
        <!-- Connecting the SOS Modal via the global useSOS composable -->
        <a href="#" @click.prevent="openSOS">
          🚨 WYPADEK?
          <strong>SOS / KOMORA</strong>
        </a>
      </div>
      <div class="version-info" style="text-align: center; margin-top: 30px; color: #666; font-size: 0.8em;">
        v3.0.0 (Vue)
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSOS } from '@/composables/useSOS';

defineProps({
  isMobileMenuOpen: Boolean
});
defineEmits(['close-mobile']);

const { openSOS } = useSOS();
</script>
