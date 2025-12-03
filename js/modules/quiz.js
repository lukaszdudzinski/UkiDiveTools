// --- QUIZ SYSTEM LOGIC ---

let currentQuizData = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let score = 0;
let wrongAnswers = 0;
let isAnswered = false;

let quizBody;
let quizResultScreen;
let quizModal;

function startQuiz(quizData) {
    if (!quizData || quizData.length === 0) {
        console.error("Brak danych quizu!");
        return;
    }

    // Losowanie 10 pytań z puli, jeśli jest ich więcej
    if (quizData.length > 10) {
        const shuffled = [...quizData].sort(() => 0.5 - Math.random());
        currentQuizData = shuffled.slice(0, 10);
    } else {
        currentQuizData = quizData;
    }

    currentQuestionIndex = 0;
    currentScore = 0;
    score = 0;
    wrongAnswers = 0;
    isAnswered = false;

    quizBody = document.getElementById('quiz-body');
    quizResultScreen = document.getElementById('quiz-result-screen');
    quizModal = document.getElementById('quiz-modal');
    const quizCloseBtn = document.querySelector('.quiz-close-btn');
    const quizScoreCircle = document.getElementById('quiz-score-circle');
    const quizResultMessage = document.getElementById('quiz-result-message');

    // Reset UI
    if (quizBody) quizBody.style.display = 'block';
    if (quizResultScreen) quizResultScreen.style.display = 'none';
    if (quizModal) quizModal.style.display = 'flex';

    if (quizCloseBtn) {
        quizCloseBtn.onclick = () => {
            closeQuiz();
        };
    }

    renderQuestion();
}

function renderQuestion() {
    if (!quizBody) return;

    const question = currentQuizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / currentQuizData.length) * 100;

    let html = `
        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
        <div class="quiz-question-text">
            <strong>Pytanie ${currentQuestionIndex + 1}/${currentQuizData.length}:</strong><br>
            ${question.question}
        </div>
        <div class="quiz-options-container">
    `;

    question.options.forEach((option, index) => {
        // Dodajemy 1 do indexu, bo w danych correctAnswer jest 1-based (np. 1, 2, 3, 4)
        // A index tablicy jest 0-based.
        // Sprawdzamy strukturę danych: w backupie correctAnswer to np. 1.
        // Więc przycisk o indeksie 0 powinien mieć wartość 1.
        html += `<button class="quiz-option-btn" onclick="handleAnswer(${index + 1}, this)">${option}</button>`;
    });

    html += `</div>
        <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
        <div id="quiz-next-btn-container" style="margin-top: 20px; text-align: right; display: none;">
            <button class="sub-tab-button" onclick="nextQuestion()" style="width: auto; display: inline-block;">Następne Pytanie ➡</button>
        </div>
    `;

    quizBody.innerHTML = html;
    isAnswered = false;
}

function handleAnswer(selectedIndex, btnElement) {
    if (isAnswered) return;
    isAnswered = true;

    const question = currentQuizData[currentQuestionIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtnContainer = document.getElementById('quiz-next-btn-container');
    const allBtns = document.querySelectorAll('.quiz-option-btn');

    // Disable all buttons
    allBtns.forEach(btn => btn.classList.add('disabled'));

    if (selectedIndex === question.correctAnswer) {
        // Correct
        btnElement.classList.add('correct');
        score++;
        currentScore++;
        feedbackEl.innerHTML = `<strong>Dobrze!</strong> ${question.explanation}`;
        feedbackEl.className = "quiz-feedback"; // reset class
    } else {
        // Incorrect
        btnElement.classList.add('incorrect');
        wrongAnswers++;
        feedbackEl.innerHTML = `<strong>Źle.</strong> ${question.explanation}`;
        feedbackEl.className = "quiz-feedback error";

        // Highlight correct answer
        // correctAnswer is 1-based index
        if (allBtns[question.correctAnswer - 1]) {
            allBtns[question.correctAnswer - 1].classList.add('correct');
        }
    }

    feedbackEl.style.display = 'block';
    nextBtnContainer.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    if (!quizBody || !quizResultScreen) return;

    quizBody.style.display = 'none';
    quizResultScreen.style.display = 'flex';

    const percentage = Math.round((score / currentQuizData.length) * 100);
    const scoreCircle = document.getElementById('quiz-score-circle');
    const messageEl = document.getElementById('quiz-result-message');

    if (scoreCircle) scoreCircle.textContent = `${score}/${currentQuizData.length}`;

    let message = "";
    let imageSrc = "";

    if (percentage === 100) {
        message = "Perfekcyjnie! Jesteś mistrzem teorii nurkowania! 🏆🦈";
        imageSrc = "quiz_reward_diver1.jpg"; // Zakładamy, że obrazek istnieje lub placeholder
    } else if (percentage >= 80) {
        message = "Świetny wynik! Bardzo dobra wiedza. 👌";
        imageSrc = "quiz_reward_diver2.jpg";
    } else if (percentage >= 50) {
        message = "Nieźle, ale warto powtórzyć materiał. 📚";
    } else {
        message = "Musisz jeszcze sporo poczytać. Nie poddawaj się! ⚓";
    }

    if (messageEl) {
        messageEl.innerHTML = message;
        if (imageSrc) {
            // Sprawdź czy obrazek już jest, żeby nie dublować
            const existingImg = quizResultScreen.querySelector('.reward-image');
            if (existingImg) existingImg.remove();

            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = "reward-image";
            img.alt = "Nagroda";
            // Dodaj obrazek przed przyciskami
            const retryBtn = quizResultScreen.querySelector('.retry-button');
            if (retryBtn) {
                quizResultScreen.insertBefore(img, retryBtn);
            } else {
                quizResultScreen.appendChild(img);
            }
        }
    }
}

function closeQuiz() {
    if (quizModal) quizModal.style.display = 'none';
}

function showGameOver() {
    // Funkcja opcjonalna, jeśli chcemy "Game Over" przy złych odpowiedziach,
    // ale w obecnej logice po prostu zliczamy punkty.
    // Można ją zostawić pustą lub usunąć, jeśli nie używana.
}

function restartQuiz() {
    startQuiz(currentQuizData); // Restart z tym samym zestawem lub można przeładować
}

// Eksport funkcji do globalnego scope'u, aby były widoczne dla onclick w HTML
window.startQuiz = startQuiz;
window.renderQuestion = renderQuestion;
window.handleAnswer = handleAnswer;
window.nextQuestion = nextQuestion;
window.showQuizResult = showQuizResult;
window.closeQuiz = closeQuiz;
window.restartQuiz = restartQuiz;
