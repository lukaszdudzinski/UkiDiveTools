import { ref, computed } from 'vue';

export function useQuiz() {
    const currentQuizData = ref([]);
    const currentQuestionIndex = ref(0);
    const currentScore = ref(0);
    const wrongAnswers = ref(0);
    const isAnswered = ref(false);
    const currentLectureId = ref(null);
    const quizState = ref('IDLE'); // 'IDLE', 'RUNNING', 'GAMEOVER', 'FINISHED'

    const currentQuestion = computed(() => {
        if (currentQuestionIndex.value < currentQuizData.value.length) {
            return currentQuizData.value[currentQuestionIndex.value];
        }
        return null;
    });

    const isGameOver = computed(() => wrongAnswers.value >= 3);
    const isFinished = computed(() => currentQuestionIndex.value >= currentQuizData.value.length && currentQuizData.value.length > 0);

    const percentageScore = computed(() => {
        if (currentQuizData.value.length === 0) return 0;
        return (currentScore.value / currentQuizData.value.length) * 100;
    });

    function initQuiz(quizData, lectureId = null) {
        if (!quizData || quizData.length === 0) {
            console.error("No quiz data provided");
            return;
        }

        let selectedQuestions;
        if (lectureId) {
            const isCompleted = localStorage.getItem('quiz_completed_' + lectureId);
            if (!isCompleted) {
                // First time: Standard up to 10 questions
                selectedQuestions = quizData.slice(0, 10);
            } else {
                // Subsequent times: Random up to 10
                const shuffled = [...quizData].sort(() => 0.5 - Math.random());
                selectedQuestions = shuffled.slice(0, 10);
            }
        } else {
            // Fallback for logic without IDs
            const shuffled = [...quizData].sort(() => 0.5 - Math.random());
            selectedQuestions = shuffled.slice(0, 10);
        }

        currentLectureId.value = lectureId;
        currentQuizData.value = selectedQuestions;
        currentQuestionIndex.value = 0;
        currentScore.value = 0;
        wrongAnswers.value = 0;
        isAnswered.value = false;
        quizState.value = 'RUNNING';
    }

    function answerCurrentQuestion(selectedIndex) {
        if (isAnswered.value || quizState.value !== 'RUNNING') return;

        isAnswered.value = true;
        const correctIndex = currentQuestion.value.correctAnswer;

        if (selectedIndex === correctIndex) {
            currentScore.value++;
        } else {
            wrongAnswers.value++;
        }

        return {
            isCorrect: selectedIndex === correctIndex,
            correctAnswerIndex: correctIndex
        };
    }

    function nextQuestion() {
        if (isGameOver.value) {
            quizState.value = 'GAMEOVER';
        } else {
            currentQuestionIndex.value++;
            isAnswered.value = false;

            if (isFinished.value) {
                quizState.value = 'FINISHED';
                if (currentLectureId.value) {
                    localStorage.setItem('quiz_completed_' + currentLectureId.value, 'true');
                }
            }
        }
    }

    function resetQuiz() {
        quizState.value = 'IDLE';
        currentQuizData.value = [];
        currentLectureId.value = null;
    }

    function retryQuiz() {
        if (currentQuizData.value.length > 0) {
            currentQuestionIndex.value = 0;
            currentScore.value = 0;
            wrongAnswers.value = 0;
            isAnswered.value = false;
            quizState.value = 'RUNNING';
        }
    }

    return {
        quizState,
        currentQuizData,
        currentQuestionIndex,
        currentQuestion,
        currentScore,
        wrongAnswers,
        isAnswered,
        isGameOver,
        isFinished,
        percentageScore,
        initQuiz,
        answerCurrentQuestion,
        nextQuestion,
        resetQuiz,
        retryQuiz
    };
}
