<template>
  <div id="welcome-screen" class="tab-content active-tab" style="display: block;">
    <!-- Standard Header (Sidebar Mode) -->
    <div class="home-header">
      <img src="/img/logo_uki.png" alt="Logo" class="home-logo">
      <h2>Uki's Dive Tools</h2>
      <p>Wybierz narzędzie z menu</p>
    </div>

    <!-- Dashboard Grid (Smart View: Hidden on Desktop, Visible on Mobile via CSS) -->
    <div class="dashboard-grid" style="display: grid !important;">

      <router-link to="/tools/planning" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Kalkulator SAC</h4>
          <p>Zużycie gazu. Podstawa planowania.</p>
        </div>
      </router-link>

      <router-link to="/tools/nitrox" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Kalkulator Nitrox</h4>
          <p>MOD, EAD, Best Mix, CNS %.</p>
        </div>
      </router-link>

      <router-link to="/tools/planning" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Planowanie Gazu</h4>
          <p>Symulacja zużycia i rezerwy.</p>
        </div>
      </router-link>

      <router-link to="/tools/ballast" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Kalkulator Balastu</h4>
          <p>Dobierz ołów do konfiguracji.</p>
        </div>
      </router-link>

      <router-link to="/divemaster" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Narzędzia DM</h4>
          <p>Checklisty odpraw i pakowania.</p>
        </div>
      </router-link>

      <router-link to="/divemaster" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate" style="border-color: #00d1b2;">
          <h4>Strefa PRO</h4>
          <p>Zaawansowane narzędzia techniczne.</p>
        </div>
      </router-link>

      <router-link to="/knowledge" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Wiedza</h4>
          <p>Teoria i wzory nurkowe.</p>
        </div>
      </router-link>

      <!-- GAME TILE -->
      <router-link to="/" custom v-slot="{ navigate }">
        <div class="dashboard-card" @click="navigate">
          <h4>Uki's River Dive</h4>
          <p>Zagraj w wolnej chwili!</p>
        </div>
      </router-link>

      <!-- Special Row: Coffee & SOS (Bottom) -->
      <div class="tile-special-row">
        <div class="dashboard-card tile-coffee" @click="openLink('https://suppi.pl/ukidives')">
          <h4 style="color: #4CAF50; text-shadow: 0 0 10px rgba(76, 175, 80, 0.6);">☕ Postaw Kawę</h4>
          <p>Wsparcie projektu</p>
        </div>
        
        <div class="dashboard-card tile-sos" @click="openSOS">
          <h4 style="color: #FF5252; text-shadow: 0 0 10px rgba(255, 82, 82, 0.6);">🚨 SOS / Awaria</h4>
          <p>Procedury ratunkowe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSOS } from '@/composables/useSOS';
const { openSOS } = useSOS();

const openLink = (url) => {
    window.open(url, '_blank');
};
</script>
