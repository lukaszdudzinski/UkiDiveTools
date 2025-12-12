import { lecturesData } from '../data/LecturesData.js';
import { QuizUI } from './QuizUI.js';

export const LecturesUI = {
    init: () => {
        const lecturesContainer = document.getElementById('lectures-list');
        if (!lecturesContainer) return;

        let html = '';
        lecturesData.forEach((lecture, index) => {
            html += `
                <div class="lecture-item">
                    <div class="lecture-header" onclick="toggleLecture(${index})">
                        <h4>${lecture.title}</h4>
                        <span class="lecture-toggle-icon">+</span>
                    </div>
                    <div class="lecture-content" id="lecture-content-${index}">
                        ${lecture.content}
                        <button class="start-quiz-btn" onclick="startQuizForLecture(${index})">Rozpocznij Quiz</button>
                    </div>
                </div>
            `;
        });
        lecturesContainer.innerHTML = html;

        // Expose global helpers for inline onclicks (could also use event delegation)
        window.toggleLecture = LecturesUI.toggleLecture;
        window.startQuizForLecture = (index) => {
            QuizUI.startQuiz(lecturesData[index].quiz);
        };
    },

    toggleLecture: (index) => {
        const content = document.getElementById(`lecture-content-${index}`);
        const header = content.previousElementSibling;
        const icon = header.querySelector('.lecture-toggle-icon');

        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.innerText = '+';
            header.classList.remove('active');
        } else {
            // Close all others? Original script didn't seem to enforce single open.
            content.style.display = 'block';
            icon.innerText = '-';
            header.classList.add('active');
        }
    }
};
