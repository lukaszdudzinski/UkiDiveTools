
import { scienceContent } from '../data/ScienceData.js';
import { QuizUI } from './QuizUI.js';
import { nitroxQuiz } from '../data/lectures/nitrox-quiz.js';

export const ScienceUI = {
    init: () => {
        ScienceUI.renderContent('sac');
        ScienceUI.renderContent('nitrox');
        ScienceUI.renderContent('gas');
        ScienceUI.renderContent('ballast');

        // Re-attach listeners after rendering
        ScienceUI.attachListeners();
    },

    renderContent: (key) => {
        const data = scienceContent[key];
        if (!data) return;

        const container = document.getElementById(data.id);
        if (container) {
            container.innerHTML = data.content;
        }
    },

    attachListeners: () => {
        // Nitrox Quiz Button
        const nitroxQuizBtn = document.getElementById('start-nitrox-quiz-btn');
        if (nitroxQuizBtn) {
            nitroxQuizBtn.addEventListener('click', () => {
                QuizUI.startQuiz(nitroxQuiz, 'nitrox-science-quiz');
            });
        }
    }
};
