<template>
  <div class="sos-container">
    <!-- Global Sticky Button (Optional: can be placed in App.vue header instead) -->
    <!-- Usually this component manages its own button or exposes the modal via v-if -->

    <div v-if="isSosModalOpen" class="sos-modal-overlay" @click.self="closeSOS">
      <div class="sos-modal-content emergency-modal">
        <button class="close-btn" @click="closeSOS">&times;</button>
        
        <div class="modal-header">
          <span class="emergency-icon">🚨</span>
          <h2>AWARIA / SOS</h2>
        </div>

        <div class="emergency-section">
          <h3>Komora Dekompresyjna Gdynia</h3>
          <p class="phone-number">
            <a href="tel:+48586998590" class="tel-link">
              <span class="icon">📞</span> +48 58 699 85 90
            </a>
          </p>
          <p class="hint">Adres: Grudzińska 4, 81-103 Gdynia</p>
          <a href="https://maps.app.goo.gl/9QZJQJ3QZJQJ3QZJ7" target="_blank" class="map-link">
            Pokaż na mapie
          </a>
        </div>

        <div class="emergency-section">
          <h3>Twoja Lokalizacja (GPS)</h3>
          
          <button 
            v-if="!position && !isLocating" 
            class="action-btn gps-btn" 
            @click="getGPSLocation"
          >
            Pobierz koordynaty z satelity
          </button>
          
          <div v-if="isLocating" class="loading-state">
            ⏳ Trwa szukanie sygnału GPS...
          </div>
          
          <div v-if="locationError" class="error-msg">
            ❌ {{ locationError }}
          </div>

          <div v-if="position" class="gps-result">
            <div class="coords">{{ position.lat }}, {{ position.lon }}</div>
            <div class="acc">(Dokładność: {{ position.acc }}m)</div>
            <a :href="position.mapLink" target="_blank" class="map-link mt-2">
              🗺️ Otwórz w Google Maps
            </a>
            
            <button class="action-btn share-btn" @click="shareLocation">
              📤 Udostępnij Pozycję / Wyślij SMS
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useSOS } from '@/composables/useSOS';
import { watch } from 'vue';

const { 
  isSosModalOpen, 
  isLocating, 
  locationError, 
  position, 
  closeSOS, 
  getGPSLocation, 
  shareLocation 
} = useSOS();

// Prevent body scroll when modal is open
watch(isSosModalOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
</script>

<style scoped>
.sos-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
  padding: 1rem;
}
.sos-modal-content {
  background: #1e1e1e;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(220, 20, 60, 0.5);
  border: 1px solid rgba(255, 56, 96, 0.3);
}
.emergency-modal {
  animation: pulse-border 2s infinite;
}
@keyframes pulse-border {
  0% { border-color: rgba(255, 56, 96, 0.3); box-shadow: 0 0 15px rgba(255, 56, 96, 0.3); }
  50% { border-color: rgba(255, 56, 96, 0.8); box-shadow: 0 0 30px rgba(255, 56, 96, 0.6); }
  100% { border-color: rgba(255, 56, 96, 0.3); box-shadow: 0 0 15px rgba(255, 56, 96, 0.3); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}
.modal-header {
  background: rgba(255, 56, 96, 0.1);
  padding: 1.5rem;
  text-align: center;
  border-bottom: 2px solid rgba(255, 56, 96, 0.5);
}
.emergency-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
  animation: spin 3s linear infinite;
}
@keyframes spin { 
  100% { transform: rotate(360deg); } 
}
.modal-header h2 {
  color: #ff3860;
  margin: 0;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

.emergency-section {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  text-align: center;
}
.emergency-section:last-child {
  border-bottom: none;
}
.emergency-section h3 {
  color: #e0e0e0;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.phone-number {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
}
.tel-link {
  color: #ff3860;
  text-decoration: none;
  background: rgba(255, 56, 96, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}
.tel-link:hover {
  background: rgba(255, 56, 96, 0.2);
  transform: scale(1.05);
}
.hint {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.map-link {
  color: #00d1b2;
  text-decoration: underline;
  font-size: 0.9rem;
}

/* GPS Styles */
.action-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
}
.gps-btn {
  background: #333;
  border: 1px solid #555;
}
.gps-btn:hover {
  background: #444;
}
.share-btn {
  background: #ff3860;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(255, 56, 96, 0.4);
}
.share-btn:hover {
  background: #ff476d;
  transform: translateY(-2px);
}
.loading-state, .error-msg {
  padding: 1rem;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
  margin-top: 1rem;
}
.error-msg {
  color: #ff3860;
}
.gps-result {
  margin-top: 1rem;
  background: rgba(0,0,0,0.3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 209, 178, 0.3);
}
.coords {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d1b2;
  letter-spacing: 1px;
}
.acc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.mt-2 {
  display: inline-block;
  margin-top: 0.5rem;
}
</style>
