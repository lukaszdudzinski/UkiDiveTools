import { lecturesData } from '../data/LecturesData.js';
import { QuizUI } from './QuizUI.js';

export const LecturesUI = {
    init: () => {
        const lectureCardsContainer = document.getElementById('lecture-cards');
        const lecturesGridWrapper = document.querySelector('.lectures-grid-wrapper');
        const lectureViewer = document.getElementById('lecture-viewer');
        const lectureBackBtn = document.getElementById('lecture-back-btn');

        if (!lectureCardsContainer) return;

        // Render Cards
        lectureCardsContainer.innerHTML = '';
        lecturesData.forEach(lecture => {
            const card = document.createElement('li');
            card.className = 'lecture-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.dataset.lectureId = lecture.id;
            card.innerHTML = `
                <div class="card-content">
                    <h4>${lecture.title}</h4>
                    <p>${lecture.description}</p>
                </div>`;
            lectureCardsContainer.appendChild(card);
        });

        // Event Listeners for Cards (Event Delegation)
        lectureCardsContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.lecture-card[data-lecture-id]');
            if (card) {
                e.preventDefault();
                const lectureId = card.dataset.lectureId;
                const lecture = lecturesData.find(l => l.id === lectureId);
                if (lecture) {
                    LecturesUI.showLecture(lecture);
                }
            }
        });

        // Event Listener for Back Button
        if (lectureBackBtn) {
            lectureBackBtn.addEventListener('click', () => {
                if (lecturesGridWrapper) lecturesGridWrapper.hidden = false;
                if (lectureViewer) lectureViewer.hidden = true;
            });
        }

        // Initial State: Show Grid, Hide Viewer
        if (lecturesGridWrapper) lecturesGridWrapper.hidden = false;
        if (lectureViewer) lectureViewer.hidden = true;
    },

    showLecture: (lecture) => {
        const lecturesGridWrapper = document.querySelector('.lectures-grid-wrapper');
        const lectureViewer = document.getElementById('lecture-viewer');
        const lectureTitle = document.getElementById('lecture-title');
        const lectureBody = document.getElementById('lecture-body');
        const lectureToc = document.getElementById('lecture-toc');

        if (lectureTitle) lectureTitle.textContent = lecture.title;

        // Generate TOC
        const tocHtml = LecturesUI.generateToc(lecture.content);
        if (lectureToc) {
            lectureToc.innerHTML = tocHtml;
            lectureToc.hidden = !tocHtml;
        }

        // Render Content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lecture.content;
        const headings = tempDiv.querySelectorAll('h3');
        headings.forEach((h, index) => {
            h.id = `toc-${index}`;
        });

        if (lectureBody) {
            lectureBody.innerHTML = tempDiv.innerHTML;

            // Add Quiz Button
            if (lecture.quiz && lecture.quiz.length > 0) {
                const quizBtnContainer = document.createElement('div');
                quizBtnContainer.className = 'quiz-start-wrapper';
                quizBtnContainer.style.marginTop = '30px';
                quizBtnContainer.style.textAlign = 'center';

                const btn = document.createElement('button');
                btn.className = 'action-button';
                btn.textContent = 'Sprawdź Wiedzę (Quiz)';

                btn.addEventListener('click', () => {
                    QuizUI.startQuiz(lecture.quiz, lecture.id);
                });

                quizBtnContainer.appendChild(btn);
                lectureBody.appendChild(quizBtnContainer);
            }
        }

        // Switch View
        if (lecturesGridWrapper) lecturesGridWrapper.hidden = true;
        if (lectureViewer) {
            lectureViewer.hidden = false;
            lectureViewer.focus();
        }
    },

    generateToc: (content) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const headings = tempDiv.querySelectorAll('h3');
        if (headings.length < 2) return '';

        let tocHtml = '<ul>';
        headings.forEach((h, index) => {
            const id = `toc-${index}`;
            tocHtml += `<li><a href="#${id}" onclick="document.getElementById('${id}').scrollIntoView({behavior: 'smooth'}); return false;">${h.textContent}</a></li>`;
        });
        tocHtml += '</ul>';
        return tocHtml;
    }
};
