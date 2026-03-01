<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div id="welcome-screen" class="tab-content active-tab" style="display: block;">
      <div class="home-header">
          <img src="/img/logo.jpg" alt="Logo" class="home-logo">
          <h2>Uki's Dive Tools</h2>
          <p>Wybierz narzędzie z menu</p>
      </div>

      <div class="dashboard-grid">
          <div class="dashboard-card" @click="router.push('/sac')">
              <h4>Kalkulator SAC</h4>
              <p>Zużycie gazu. Podstawa planowania.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/nitrox')">
              <h4>Kalkulator Nitrox</h4>
              <p>MOD, EAD, Best Mix, CNS %.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/planning')">
              <h4>Planowanie Gazu</h4>
              <p>Symulacja zużycia i rezerwy.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/ballast')">
              <h4>Kalkulator Balastu</h4>
              <p>Dobierz ołów do konfiguracji.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/divemaster')">
              <h4>Narzędzia DM</h4>
              <p>Checklisty odpraw i pakowania.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/divemaster')" style="border-color: #00d1b2;">
              <h4>Strefa PRO</h4>
              <p>Zaawansowane narzędzia techniczne.</p>
          </div>
          <div class="dashboard-card" @click="router.push('/knowledge')">
              <h4>Wiedza</h4>
              <p>Teoria i wzory nurkowe.</p>
          </div>
          <div class="dashboard-card">
              <h4>Uki's River Dive</h4>
              <p>Zagraj w wolnej chwili!</p>
          </div>

          <div class="tile-special-row">
              <div class="dashboard-card tile-coffee" @click="window.open('https://suppi.pl/ukidives', '_blank')">
                  <h4 style="color: #4CAF50; text-shadow: 0 0 10px rgba(76, 175, 80, 0.6);">☕ Postaw Kawę
                  </h4>
                  <p>Wsparcie projektu</p>
              </div>
              <div class="dashboard-card tile-sos">
                  <h4 style="color: #FF5252; text-shadow: 0 0 10px rgba(255, 82, 82, 0.6);">🚨 SOS /
                      Awaria</h4>
                  <p>Procedury ratunkowe</p>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
</style>
