import { describe, it, expect, beforeEach } from 'vitest';
import { useQuiz } from '../../../composables/useQuiz';

describe('useQuiz Composable', () => {
    let quizManager;

    // Mock Quiz Data
    const mockQuizData = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        question: `Question ${i}`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0
    }));

    beforeEach(() => {
        // Reset localStorage mock
        localStorage.clear();
        quizManager = useQuiz();
    });

    it('should initialize with up to 10 questions for first time', () => {
        quizManager.initQuiz(mockQuizData, 'test-lecture-1');

        expect(quizManager.quizState.value).toBe('RUNNING');
        expect(quizManager.currentQuizData.value.length).toBe(10);
        expect(quizManager.currentQuestionIndex.value).toBe(0);
        expect(quizManager.currentScore.value).toBe(0);
        expect(localStorage.getItem('quiz_completed_test-lecture-1')).toBeNull();
    });

    it('should handle correct answers and update score', () => {
        quizManager.initQuiz(mockQuizData);

        // Answer correctly
        const result = quizManager.answerCurrentQuestion(0); // 0 is always correct in mock

        expect(result.isCorrect).toBe(true);
        expect(quizManager.currentScore.value).toBe(1);
        expect(quizManager.wrongAnswers.value).toBe(0);
        expect(quizManager.isAnswered.value).toBe(true);
    });

    it('should handle wrong answers and trigger game over after 3 mistakes', () => {
        quizManager.initQuiz(mockQuizData);

        // Mistake 1
        quizManager.answerCurrentQuestion(1);
        quizManager.nextQuestion();
        expect(quizManager.wrongAnswers.value).toBe(1);
        expect(quizManager.quizState.value).toBe('RUNNING');

        // Mistake 2
        quizManager.answerCurrentQuestion(1);
        quizManager.nextQuestion();
        expect(quizManager.wrongAnswers.value).toBe(2);

        // Mistake 3 -> Game Over
        quizManager.answerCurrentQuestion(1);
        quizManager.nextQuestion();

        expect(quizManager.wrongAnswers.value).toBe(3);
        expect(quizManager.isGameOver.value).toBe(true);
        expect(quizManager.quizState.value).toBe('GAMEOVER');
    });

    it('should finish quiz and save to localStorage on success', () => {
        // Init with only 2 questions for quick test
        quizManager.initQuiz(mockQuizData.slice(0, 2), 'test-lecture-2');

        // Question 1
        quizManager.answerCurrentQuestion(0);
        quizManager.nextQuestion();

        // Question 2
        quizManager.answerCurrentQuestion(0);
        quizManager.nextQuestion();

        expect(quizManager.isFinished.value).toBe(true);
        expect(quizManager.quizState.value).toBe('FINISHED');
        expect(quizManager.percentageScore.value).toBe(100);

        // Verify it marked as completed
        expect(localStorage.getItem('quiz_completed_test-lecture-2')).toBe('true');
    });

    it('should retry properly after game over', () => {
        quizManager.initQuiz(mockQuizData);

        // Force Game Over
        quizManager.answerCurrentQuestion(1); quizManager.nextQuestion();
        quizManager.answerCurrentQuestion(1); quizManager.nextQuestion();
        quizManager.answerCurrentQuestion(1); quizManager.nextQuestion();

        expect(quizManager.quizState.value).toBe('GAMEOVER');

        // Retry
        quizManager.retryQuiz();

        expect(quizManager.quizState.value).toBe('RUNNING');
        expect(quizManager.currentQuestionIndex.value).toBe(0);
        expect(quizManager.currentScore.value).toBe(0);
        expect(quizManager.wrongAnswers.value).toBe(0);
        expect(quizManager.isAnswered.value).toBe(false);
    });
});
