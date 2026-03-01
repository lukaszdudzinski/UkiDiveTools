<template>
  <div v-if="isOpen" class="coffee-modal-overlay" @click.self="$emit('close')">
    <div class="coffee-modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      
      <div v-if="!successMessage">
        <div class="modal-header">
          <span class="coffee-icon">☕</span>
          <h2>Wsparcie Projektu</h2>
        </div>

        <div class="modal-body">
          <p class="description">
            Uki's Dive Tools to projekt rozwijany po godzinach, z myślą o społeczności nurkowej.
            Odblokuj <strong>Strefę PRO</strong> (Logbook, Zaawansowany Kalkulator Blendingu i Statystyki),
            stawiając mi symboliczną wirtualną kawę!
          </p>

          <div class="action-box">
            <a href="https://buycoffee.to/ukidivetools" target="_blank" class="buy-link heartbeat">
              👉 Kup wirtualną kawę (buycoffee.to)
            </a>
            <p class="hint">W wiadomości zwrotnej otrzymasz kod dostępu ważny przez 30 dni.</p>
          </div>

          <div class="unlock-form">
            <label for="pro-code">Masz już kod?</label>
            <div class="input-group">
              <input 
                type="text" 
                id="pro-code" 
                v-model="inputCode" 
                placeholder="Wpisz kod tutaj..."
                @keyup.enter="handleUnlock"
              >
              <button class="unlock-btn" @click="handleUnlock" :disabled="!inputCode">
                Odblokuj
              </button>
            </div>
            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
          </div>
        </div>
      </div>

      <!-- Success Screen -->
      <div v-else class="success-screen">
        <div class="success-icon">🎉</div>
        <h2>Dziękuję za wsparcie!</h2>
        <p class="success-desc">
          Strefa PRO została pomyślnie uruchomiona.<br>
          Twój dostęp jest aktywny przez 30 dni.
        </p>
        <p class="expiry-date">
          Wygasa: <strong>{{ successMessage }}</strong>
        </p>
        <button class="continue-btn" @click="$emit('close')">
          Zakończ i kontynuuj aplikację
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSettings } from '@/composables/useSettings';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const { activatePro } = useSettings();

const inputCode = ref('');
const errorMsg = ref('');
const successMessage = ref('');

// Simplistic mock validation mimicking ProAccess.js fallback logic
const handleUnlock = async () => {
    errorMsg.value = '';
    const code = inputCode.value.trim().toUpperCase();
    
    // In production this would call Supabase or an API endpoint.
    // For now we preserve the hardcoded values found in ProAccess.js 
    // (We assume "VUE3MIGRATION" or "DIVEPRO2026" as testing defaults)
    const validCodes = ['DIVEPRO2026', 'DEBUG', 'UKI2024'];
    
    // Simulate slight network delay
    await new Promise(r => setTimeout(r, 600));

    if (validCodes.includes(code)) {
        const expiryDate = activatePro(30);
        const dateStr = expiryDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        successMessage.value = dateStr;
    } else {
        errorMsg.value = 'Błędny kod odblokowujący. Spróbuj ponownie.';
    }
};
</script>

<style scoped>
.coffee-modal-overlay {
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
.coffee-modal-content {
  background: var(--color-bg-card, #242424);
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 209, 178, 0.3);
  border: 1px solid rgba(0, 209, 178, 0.2);
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;
}
.close-btn:hover { color: #fff; }

.modal-header {
  padding: 2rem 1.5rem 1rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,0,0,0.1);
}
.coffee-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(255, 152, 0, 0.5);
}
.modal-header h2 {
  margin: 0;
  color: #00d1b2;
}

.modal-body {
  padding: 1.5rem;
  text-align: center;
}
.description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}
.description strong {
  color: #fff;
}

.action-box {
  background: rgba(0, 209, 178, 0.05);
  border: 1px dashed rgba(0, 209, 178, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.buy-link {
  display: inline-block;
  background: #ff813f; /* buycoffee orange */
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s;
}
.heartbeat {
  animation: heartbeat 2s infinite;
}
@keyframes heartbeat {
  0% { transform: scale(1); }
  10% { transform: scale(1.05); box-shadow: 0 0 15px rgba(255, 129, 63, 0.5); }
  20% { transform: scale(1); }
  30% { transform: scale(1.05); box-shadow: 0 0 15px rgba(255, 129, 63, 0.5); }
  40% { transform: scale(1); box-shadow: none; }
}
.buy-link:hover {
  background: #ff9157;
  animation: none;
  transform: translateY(-2px);
}
.hint {
  font-size: 0.8rem;
  color: #888;
  margin-top: 1rem;
}

.unlock-form {
  text-align: left;
}
.unlock-form label {
  display: block;
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.input-group {
  display: flex;
  gap: 0.5rem;
}
.input-group input {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.2);
  background: #111;
  color: #fff;
  font-size: 1rem;
  font-family: monospace;
  letter-spacing: 1px;
}
.input-group input:focus {
  outline: none;
  border-color: #00d1b2;
}
.unlock-btn {
  background: #00d1b2;
  color: #121212;
  border: none;
  padding: 0 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.unlock-btn:hover:not(:disabled) {
  background: #00e6c4;
}
.unlock-btn:disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}
.error-msg {
  color: #ff3860;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* Success */
.success-screen {
  padding: 3rem 2rem;
  text-align: center;
}
.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.success-screen h2 {
  color: #00d1b2;
  margin-bottom: 1rem;
}
.success-desc {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.expiry-date {
  color: #00d1b2;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  background: rgba(0, 209, 178, 0.1);
  padding: 0.5rem;
  border-radius: 6px;
}
.continue-btn {
  background: transparent;
  color: #00d1b2;
  border: 1px solid #00d1b2;
  padding: 0.8rem 2rem;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}
.continue-btn:hover {
  background: rgba(0, 209, 178, 0.1);
}
</style>
