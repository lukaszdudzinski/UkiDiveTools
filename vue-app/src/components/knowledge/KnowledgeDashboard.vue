<template>
  <div class="knowledge-dashboard">
    <!-- View Switcher -->
    <transition name="fade" mode="out-in">
      <LecturesDashboard 
        v-if="!activeLecture" 
        key="dashboard"
      />
      <LectureViewer 
        v-else 
        key="viewer"
        :lecture="activeLecture" 
        @go-back="clearSelection"
        @start-quiz="handleStartQuiz"
      />
    </transition>

    <!-- Quiz Overlay -->
    <QuizModal 
      :is-open="isQuizOpen" 
      :quiz-manager="quizManager"
      @close="isQuizOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLectures } from '@/composables/useLectures';
import { useQuiz } from '@/composables/useQuiz';

import LecturesDashboard from './LecturesDashboard.vue';
import LectureViewer from './LectureViewer.vue';
import QuizModal from './QuizModal.vue';

const { activeLecture, clearSelection } = useLectures();

// Initialize Quiz State Machine
const quizManager = useQuiz();
const isQuizOpen = ref(false);

const handleStartQuiz = (quizData, lectureId) => {
    quizManager.initQuiz(quizData, lectureId);
    isQuizOpen.value = true;
};
</script>

<style scoped>
.knowledge-dashboard {
  width: 100%;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
