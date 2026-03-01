<template>
  <div v-if="isOpen" class="quiz-modal-overlay" @click.self="closeModal">
    <div class="quiz-modal-content">
      <button class="close-btn" @click="closeModal">&times;</button>
      
      <!-- RUNNING STATE -->
      <div v-if="quizState === 'RUNNING' && currentQuestion" class="quiz-body">
        <div class="quiz-progress-bar">
          <div class="progress" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <div class="quiz-progress-text">
          Pytanie {{ currentQuestionIndex + 1 }} z {{ currentQuizData.length }}
        </div>
        
        <h3 class="question-text">{{ currentQuestion.question }}</h3>
        
        <div class="options-container" :class="{ 'disabled': isAnswered }">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="option-btn"
            :class="getOptionClass(index)"
            @click="handleAnswer(index)"
            :disabled="isAnswered"
          >
            {{ option }}
          </button>
        </div>
        
        <div class="mistakes-counter" v-if="wrongAnswers > 0">
          Błędy: <span class="warning-text">{{ wrongAnswers }}/3</span>
        </div>
      </div>

      <!-- GAME OVER STATE -->
      <div v-else-if="quizState === 'GAMEOVER'" class="result-screen game-over">
        <div class="skull-icon">☠️</div>
        <h2 class="game-over-title">GAME OVER !!!</h2>
        <p class="game-over-subtitle">Trzy błędne odpowiedzi!</p>
        <p class="game-over-warning">Nie wchodź do wody!!!</p>
        
        <div class="action-buttons">
          <button class="retry-btn primary" @click="retryQuiz">Spróbuj Ponownie</button>
          <button class="close-action-btn secondary" @click="closeModal">Zamknij</button>
        </div>
      </div>

      <!-- FINISHED STATE -->
      <div v-else-if="quizState === 'FINISHED'" class="result-screen success">
        <div class="score-circle">
          {{ currentScore }}/{{ currentQuizData.length }}
        </div>
        <h3 class="success-title">{{ resultMessage }}</h3>
        
        <div v-if="percentageScore === 100" class="reward-container">
          <img :src="`/img/rewards/reward${rewardId}.jpg`" alt="Nagroda" class="reward-img">
        </div>
        
        <div class="action-buttons">
          <button class="retry-btn primary" @click="retryQuiz">Spróbuj Ponownie</button>
          <button class="close-action-btn secondary" @click="closeModal">Zamknij</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  quizManager: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

// Destructure from useQuiz instance passed via props
const { 
  quizState, 
  currentQuizData, 
  currentQuestionIndex, 
  currentQuestion, 
  currentScore, 
  wrongAnswers, 
  isAnswered, 
  percentageScore,
  answerCurrentQuestion,
  nextQuestion,
  retryQuiz,
  resetQuiz
} = props.quizManager;

// Local UI state for showing correct/incorrect before advancing
const localSelection = ref(null);
const correctAnswerForView = ref(null);

const rewardId = computed(() => Math.floor(Math.random() * 5) + 1);

const progressPercentage = computed(() => {
  if (currentQuizData.value.length === 0) return 0;
  return ((currentQuestionIndex.value) / currentQuizData.value.length) * 100;
});

const resultMessage = computed(() => {
  if (percentageScore.value === 100) return 'Gratulacje! Perfekcyjny wynik!';
  if (percentageScore.value >= 70) return 'Świetna robota!';
  return 'Możesz poprawić wynik!';
});

const handleAnswer = (index) => {
  if (isAnswered.value) return;
  localSelection.value = index;
  
  const result = answerCurrentQuestion(index);
  correctAnswerForView.value = result.correctAnswerIndex;

  setTimeout(() => {
      localSelection.value = null;
      correctAnswerForView.value = null;
      nextQuestion();
  }, 1500);
};

const getOptionClass = (index) => {
  if (!isAnswered.value) return '';
  if (index === correctAnswerForView.value) return 'correct';
  if (index === localSelection.value && index !== correctAnswerForView.value) return 'wrong';
  return '';
};

const closeModal = () => {
  resetQuiz();
  emit('close');
};

// Handle body scroll locking
watch(() => props.isOpen, (newVal) => {
    if (newVal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
});
</script>

<style scoped>
.quiz-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  padding: 1rem;
}
.quiz-modal-content {
  background: #1e1e1e;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
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
.quiz-body {
  padding: 2rem;
}
.quiz-progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.quiz-progress-bar .progress {
  height: 100%;
  background: #00d1b2;
  transition: width 0.3s ease;
}
.quiz-progress-text {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.5rem;
  text-align: right;
}
.question-text {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #fff;
  line-height: 1.4;
}
.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.options-container.disabled {
  pointer-events: none;
}
.option-btn {
  background: #2a2a2a;
  border: 2px solid transparent;
  color: #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.option-btn:hover:not(:disabled) {
  background: #333;
  border-color: rgba(0, 209, 178, 0.5);
}
.option-btn.correct {
  background: rgba(0, 209, 178, 0.1);
  border-color: #00d1b2;
  color: #00d1b2;
}
.option-btn.wrong {
  background: rgba(255, 56, 96, 0.1);
  border-color: #ff3860;
  color: #ff3860;
}
.mistakes-counter {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
}
.warning-text {
  color: #ff3860;
  font-weight: bold;
}
.result-screen {
  padding: 3rem 2rem;
  text-align: center;
}
.game-over {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.skull-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(255, 56, 96, 0.8));
}
.game-over-title {
  color: #ff3860;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 56, 96, 0.5);
}
.game-over-subtitle {
  color: #ccc;
  margin-bottom: 0.5rem;
}
.game-over-warning {
  color: #ff3860;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.score-circle {
  width: 80px;
  height: 80px;
  line-height: 74px;
  border-radius: 50%;
  border: 3px solid #00d1b2;
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d1b2;
  margin: 0 auto 1rem auto;
  box-shadow: 0 0 15px rgba(0, 209, 178, 0.3);
  background: rgba(0,0,0,0.3);
}
.success-title {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.reward-container {
  margin-bottom: 2rem;
}
.reward-img {
  max-width: 80%;
  max-height: 200px;
  border-radius: 12px;
  border: 2px solid #00d1b2;
  box-shadow: 0 0 20px rgba(0, 209, 178, 0.4);
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}
.action-buttons button {
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.action-buttons .primary {
  background: rgba(0, 209, 178, 0.1);
  border: 1px solid #00d1b2;
  color: #00d1b2;
}
.action-buttons .primary:hover {
  background: rgba(0, 209, 178, 0.2);
  transform: translateY(-2px);
}
.action-buttons .secondary {
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
}
.action-buttons .secondary:hover {
  border-color: #fff;
  color: #fff;
}
</style>
