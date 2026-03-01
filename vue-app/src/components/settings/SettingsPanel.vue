<script setup>
import { ref } from 'vue';
const isDarkTheme = ref(true);
</script>

<template>
  <div class="tool-view" id="settings-dashboard">
    <div class="view-header">
      <h2>Ustawienia Aplikacji</h2>
      <p>Zarządzaj wyglądem i preferencjami systemowymi</p>
    </div>
    
    <div class="two-column-form mt-20">
      <div class="input-group">
        <label>Motyw Wizualny</label>
        <button class="btn btn-secondary" @click="isDarkTheme = !isDarkTheme" style="width: 100%;">
          Przełącz na {{ isDarkTheme ? 'Jasny' : 'Ciemny' }} Motyw
        </button>
      </div>
    </div>
    
    <div class="result-box mt-20" style="text-align: center;">
      <h3 style="color: #ccc;">Zarządzanie Pamięcią i Logbook (Wkrótce)</h3>
      <p style="color: #888; font-size: 0.9em;">Supabase Sync oraz import/eksport historii z pamięci podręcznej.</p>
    </div>
  </div>
</template>

<style scoped>
</style>
