<template>
  <div class="lecture-viewer" v-if="lecture">
    <div class="header-nav">
      <button class="back-btn" @click="$emit('go-back')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Wróć do listy
      </button>
    </div>

    <div class="lecture-content">
      <h2 class="main-title">{{ lecture.title }}</h2>

      <!-- Hero Image / Main Infographic -->
      <div v-if="lecture.image" class="hero-image-container">
        <img :src="lecture.image" alt="Infografika" @click="handleImageClick(lecture.image)" class="hero-image">
      </div>

      <!-- Audio Player -->
      <div v-if="lecture.audioSrc" class="audio-banner">
        <p class="audio-label">🎧 Posłuchaj wykładu:</p>
        <audio controls class="audio-player">
          <source :src="lecture.audioSrc" type="audio/mp4">
          Twoja przeglądarka nie obsługuje elementu audio.
        </audio>
        <p class="audio-disclaimer">Podcast stworzony z pomocą AI.</p>
      </div>

      <!-- Main Body -->
      <LectureContentRenderer 
        :content="lecture.content" 
        @image-click="handleImageClick" 
      />

      <!-- PDF Presentation -->
      <div v-if="lecture.presentationSrc" class="presentation-section">
        <h4>Strefa Instruktora</h4>
        <button class="presentation-btn" @click="openPdf(lecture.presentationSrc)">
          <span class="icon">📄</span> Otwórz Prezentację (PDF)
        </button>
        <p class="hint">Dostępne dla instruktorów i divemasterów.</p>
      </div>

      <!-- Quiz Button -->
      <div v-if="lecture.quiz && lecture.quiz.length > 0" class="quiz-section">
        <button class="quiz-btn" @click="$emit('start-quiz', lecture.quiz, lecture.id)">
          Sprawdź Wiedzę (Quiz)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import LectureContentRenderer from './LectureContentRenderer.vue';

const props = defineProps({
  lecture: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['go-back', 'start-quiz']);

const handleImageClick = (src) => {
  // Normally triggers a Lightbox. Since we defer global routing, emit an event or simple window.open for now
  // For a robust SPA, we'd use a generic Lightbox modal in App.vue
  window.open(src, '_blank');
};

const openPdf = (src) => {
  window.open(src, '_blank');
};
</script>

<style scoped>
.lecture-viewer {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.header-nav {
  margin-bottom: 2rem;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #00d1b2;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}
.back-btn:hover {
  opacity: 0.8;
}
.main-title {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}
.hero-image-container {
  text-align: center;
  margin-bottom: 2rem;
}
.hero-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  cursor: pointer;
}
.audio-banner {
  background: rgba(0,0,0,0.2);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid rgba(255,255,255,0.05);
}
.audio-label {
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 0.8rem;
}
.audio-player {
  width: 100%;
  max-width: 400px;
  height: 40px;
  outline: none;
}
.audio-disclaimer {
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.8rem;
  font-style: italic;
}
.presentation-section {
  margin-top: 3rem;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}
.presentation-section h4 {
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
}
.presentation-btn {
  background: var(--color-bg-card, #242424);
  border: 1px solid #00d1b2;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}
.presentation-btn:hover {
  background: rgba(0, 209, 178, 0.1);
  transform: translateY(-2px);
}
.hint {
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
}
.quiz-section {
  margin-top: 3rem;
  text-align: center;
}
.quiz-btn {
  background: #00d1b2;
  color: #121212;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(0, 209, 178, 0.3);
}
.quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 209, 178, 0.5);
  background: #00e6c4;
}
</style>
