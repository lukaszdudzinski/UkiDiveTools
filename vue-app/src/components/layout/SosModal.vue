<script setup>
import { ref } from 'vue'

const isVisible = ref(false)

const closeModal = () => {
    isVisible.value = false
}

// Global window event as a fallback if needed by legacy code
window.openSOS = () => {
    isVisible.value = true
}
</script>

<template>
  <div class="modal" id="sos-modal" :class="{'active': isVisible}">
      <div class="modal-content sos-content">
          <span class="close-modal" @click="closeModal">&times;</span>
          <h2 style="color: #FF5252; text-align: center;">🚨 PROCEDURA AWARYJNA 🚨</h2>

          <div class="emergency-steps">
              <div class="step-card pulse-danger">
                  <a href="tel:112" class="emergency-link">
                      <span class="icon">📞</span> Zadzwoń: 112
                  </a>
              </div>
              
              <div class="step-card">
                  <a href="https://maps.google.com/?q=Komora+Dekomprymacyjna+Gdynia" target="_blank" class="emergency-link nav-link">
                      <span class="icon">🏥</span> Nawiguj: Krajowy Ośrodek Medycyny Hiperbarycznej w Gdyni (UCMMiT)
                  </a>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
/* Scoped css removed */
</style>
