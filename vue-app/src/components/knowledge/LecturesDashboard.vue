<template>
  <div class="lectures-dashboard">
    <div class="dashboard-header">
      <h2>Baza Wiedzy</h2>
      <p class="subtitle">Wybierz wykład, aby rozpocząć naukę</p>
    </div>

    <div class="lectures-grid">
      <div 
        v-for="lecture in lectures" 
        :key="lecture.id" 
        class="lecture-card"
        @click="selectLecture(lecture.id)"
      >
        <div class="card-content">
          <h4>{{ lecture.title }}</h4>
          <p>{{ lecture.description || 'Kliknij, aby poznać szczegóły' }}</p>
        </div>
        <div class="card-footer" v-if="isQuizCompleted(lecture.id)">
            <span class="quiz-badge">Quiz rozwiązany ✓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLectures } from '@/composables/useLectures';

const { lectures, selectLecture } = useLectures();

const isQuizCompleted = (id) => {
    return localStorage.getItem('quiz_completed_' + id) === 'true';
};
</script>

<style scoped>
.lectures-dashboard {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}
.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}
.dashboard-header h2 {
  color: #00d1b2;
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #888;
}
.lectures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.lecture-card {
  background: var(--color-bg-card, #242424);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.lecture-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 209, 178, 0.5);
}
.card-content h4 {
  margin-top: 0;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.card-content p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}
.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.quiz-badge {
  font-size: 0.8rem;
  color: #00d1b2;
  background: rgba(0, 209, 178, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
