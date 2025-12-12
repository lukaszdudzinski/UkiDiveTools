export const QuizUI = {
    state: {
        currentQuizData: [],
        currentQuestionIndex: 0,
        currentScore: 0,
        isAnswered: false,
        elementCACHE: {}
    },

    init: () => {
        // Cache elements
        QuizUI.state.elementCACHE = {
            quizModal: document.getElementById('quiz-modal'),
            quizBody: document.getElementById('quiz-body'),
            quizResultScreen: document.getElementById('quiz-result-screen'),
            quizScoreCircle: document.getElementById('quiz-score-circle'),
            quizResultMessage: document.getElementById('quiz-result-message'),
            closeBtn: document.querySelector('.close-quiz'),
            retryBtn: document.getElementById('restart-quiz-btn'),
            closeResultBtn: document.getElementById('close-quiz-result-btn')
        };

        const els = QuizUI.state.elementCACHE;

        // Event Listeners
        if (els.closeBtn) {
            els.closeBtn.addEventListener('click', QuizUI.closeQuiz);
        }
        if (els.retryBtn) {
            els.retryBtn.addEventListener('click', QuizUI.restartQuiz);
        }
        if (els.closeResultBtn) {
            els.closeResultBtn.addEventListener('click', QuizUI.closeQuiz);
        }

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === els.quizModal) {
                QuizUI.closeQuiz();
            }
        });

        // Global exports if necessary for inline onclick handlers (e.g. handleAnswer)
        // Alternatively, we generate buttons with event listeners
        window.handleQuizAnswer = QuizUI.handleAnswer;
    },

    startQuiz: (quizData) => {
        if (!quizData || quizData.length === 0) {
            console.error("No quiz data provided");
            return;
        }
        QuizUI.state.currentQuizData = quizData;
        QuizUI.state.currentQuestionIndex = 0;
        QuizUI.state.currentScore = 0;
        QuizUI.state.isAnswered = false;

        const els = QuizUI.state.elementCACHE;
        if (els.quizModal) els.quizModal.style.display = 'flex';
        if (els.quizBody) els.quizBody.style.display = 'block';
        if (els.quizResultScreen) els.quizResultScreen.style.display = 'none';

        QuizUI.renderQuestion();
    },

    renderQuestion: () => {
        const { currentQuestionIndex, currentQuizData } = QuizUI.state;
        const els = QuizUI.state.elementCACHE;

        if (currentQuestionIndex < currentQuizData.length) {
            const questionData = currentQuizData[currentQuestionIndex];

            let html = `<h3>${questionData.question}</h3><div class="options">`;
            questionData.options.forEach((option, index) => {
                html += `<button class="quiz-option" onclick="handleQuizAnswer(${index})">${option}</button>`;
            });
            html += '</div>';

            if (els.quizBody) els.quizBody.innerHTML = html;
            QuizUI.state.isAnswered = false;
        } else {
            QuizUI.showResult();
        }
    },

    handleAnswer: (selectedIndex) => {
        if (QuizUI.state.isAnswered) return;
        QuizUI.state.isAnswered = true;

        const { currentQuestionIndex, currentQuizData } = QuizUI.state;
        const correctAnswerIndex = currentQuizData[currentQuestionIndex].correctAnswer;

        const options = document.querySelectorAll('.quiz-option');
        if (options[selectedIndex]) {
            if (selectedIndex === correctAnswerIndex) {
                QuizUI.state.currentScore++;
                options[selectedIndex].classList.add('correct');
            } else {
                options[selectedIndex].classList.add('wrong');
                if (options[correctAnswerIndex]) options[correctAnswerIndex].classList.add('correct');
            }
        }

        // Delay to next question
        setTimeout(() => {
            QuizUI.state.currentQuestionIndex++;
            QuizUI.renderQuestion();
        }, 1500);
    },

    showResult: () => {
        const { currentScore, currentQuizData } = QuizUI.state;
        const els = QuizUI.state.elementCACHE;

        const percentage = (currentScore / currentQuizData.length) * 100;

        if (els.quizScoreCircle) els.quizScoreCircle.innerText = `${currentScore}/${currentQuizData.length}`;

        let message = '';
        if (percentage === 100) message = 'Gratulacje! Perfekcyjny wynik!';
        else if (percentage >= 70) message = 'Świetna robota!';
        else message = 'Możesz poprawić wynik!';

        if (els.quizResultMessage) els.quizResultMessage.innerText = message;

        if (els.quizBody) els.quizBody.style.display = 'none';
        if (els.quizResultScreen) els.quizResultScreen.style.display = 'block';
    },

    restartQuiz: () => {
        QuizUI.state.currentQuestionIndex = 0;
        QuizUI.state.currentScore = 0;
        const els = QuizUI.state.elementCACHE;
        if (els.quizBody) els.quizBody.style.display = 'block';
        if (els.quizResultScreen) els.quizResultScreen.style.display = 'none';
        QuizUI.renderQuestion();
    },

    closeQuiz: () => {
        const els = QuizUI.state.elementCACHE;
        if (els.quizModal) els.quizModal.style.display = 'none';
    }
};
