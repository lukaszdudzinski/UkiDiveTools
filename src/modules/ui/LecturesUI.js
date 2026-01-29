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

        // Audio Player Implementation
        // We look for existing audio player or create one in a designated container
        // To be safe, we will prepend it to lectureBody or use a specific container if we added one to HTML.
        // For now, let's inject it into the body start if it exists.

        let audioHtml = '';
        if (lecture.audioSrc) {
            audioHtml = `
                <div class="lecture-audio-wrapper" style="margin: 0 0 20px 0; text-align: center; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
                    <p style="margin-bottom: 8px; font-weight: bold; color: var(--color-text-primary);">🎧 Posłuchaj wykładu:</p>
                    <audio controls style="width: 100%; max-width: 400px; height: 40px;">
                        <source src="${lecture.audioSrc}" type="audio/mp4">
                        Twoja przeglądarka nie obsługuje elementu audio.
                    </audio>
                </div>
            `;
        }

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
            lectureBody.innerHTML = audioHtml + tempDiv.innerHTML;

            // Presentation Button (Instructor Materials)
            if (lecture.presentationSrc) {
                const instructorSection = document.createElement('div');
                instructorSection.className = 'instructor-materials';
                instructorSection.style.cssText = `
                    margin-top: 40px;
                    padding: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    text-align: center;
                `;

                // Icon in style of Screenshot 2 (Glass square with icon)
                const pdfIcon = `
                    <div style="
                        display: inline-flex; align-items: center; justify-content: center;
                        width: 40px; height: 40px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        margin-right: 12px;
                        flex-shrink: 0;
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                `;

                instructorSection.innerHTML = `
                    <h4 style="margin-bottom: 20px; color: var(--color-text-muted); font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;">Strefa Instruktora</h4>
                    <button id="open-presentation-btn" class="action-button" style="
                        display: inline-flex; align-items: center; justify-content: center;
                        background: var(--color-bg-card); 
                        border: 1px solid var(--color-primary); 
                        padding: 12px 24px;
                        color: var(--color-text-primary);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                        transition: transform 0.2s;
                        width: auto;
                        max-width: 100%;
                    ">
                        ${pdfIcon}
                        <span style="font-weight: 600; text-align: left;">Otwórz Prezentację (PDF)</span>
                    </button>
                    <p style="font-size: 0.8em; margin-top: 15px; color: #666;">Dostępne dla instruktorów i divemasterów.</p>
                `;
                lectureBody.appendChild(instructorSection);

                const openPdfBtn = instructorSection.querySelector('#open-presentation-btn');
                openPdfBtn.addEventListener('click', () => {
                    LecturesUI.openPdfModal(lecture.presentationSrc, lecture.title);
                });
            }

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

            // Lightbox Logic for Infographics
            const infographics = lectureBody.querySelectorAll('.lecture-infographic');
            infographics.forEach(img => {
                img.addEventListener('click', () => {
                    // Create or get lightbox modal
                    let lightbox = document.getElementById('lightbox-modal');
                    if (!lightbox) {
                        lightbox = document.createElement('div');
                        lightbox.id = 'lightbox-modal';
                        lightbox.className = 'lightbox-modal';
                        lightbox.innerHTML = `
                            <div class="lightbox-close-btn">&times;</div>
                            <img class="lightbox-content" src="" alt="Full Screen Image">
                        `;
                        document.body.appendChild(lightbox);

                        // Close events
                        const closeBtn = lightbox.querySelector('.lightbox-close-btn');
                        closeBtn.addEventListener('click', () => {
                            lightbox.classList.remove('active');
                        });
                        lightbox.addEventListener('click', (e) => {
                            if (e.target === lightbox) {
                                lightbox.classList.remove('active');
                            }
                        });
                    }

                    const contentImg = lightbox.querySelector('.lightbox-content');
                    contentImg.src = img.src;
                    lightbox.classList.add('active');
                });
            });
        }

        // Switch View
        if (lecturesGridWrapper) lecturesGridWrapper.hidden = true;
        if (lectureViewer) {
            lectureViewer.hidden = false;
            lectureViewer.focus();
        }
    },

    openPdfModal: (src, title) => {
        // ALWAYS use Modal Embed (Both Desktop & Mobile) to prevent PWA exit
        let modal = document.getElementById('pdf-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pdf-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `;

            modal.innerHTML = `
                <div style="width: 100%; height: 100%; background: #1e1e1e; position: relative; display: flex; flex-direction: column;">
                    <div style="
                        padding: 15px; 
                        background: rgba(30, 30, 30, 0.95); 
                        color: #fff; 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                        flex-shrink: 0;
                    ">
                        <h4 style="margin: 0; font-size: 1.1em; max-width: 80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" id="pdf-modal-title">Prezentacja</h4>
                        <button id="pdf-modal-close" style="
                            background: rgba(255, 56, 96, 0.2); 
                            border: 1px solid #ff3860; 
                            color: #ff3860;
                            border-radius: 50%;
                            width: 36px; height: 36px;
                            padding: 0;
                            cursor: pointer;
                            display: flex; align-items: center; justify-content: center;
                            transition: all 0.2s ease;
                        ">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div id="pdf-container" style="flex: 1; background: #333; overflow: hidden; position: relative;">
                        <!-- Embed goes here -->
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('#pdf-modal-close').addEventListener('click', () => {
                modal.style.display = 'none';
                modal.querySelector('#pdf-container').innerHTML = ''; // Clear to stop loading
            });
        }

        const modalTitle = modal.querySelector('#pdf-modal-title');
        if (modalTitle) modalTitle.textContent = title || "Prezentacja";

        const container = modal.querySelector('#pdf-container');

        // Use Google Docs Viewer for mobile compatibility without downloading? 
        // Or simple object/iframe. 
        // For local files in PWA, specific viewers might be tricky.
        // Let's try standard object first, but add a clear DOWNLOAD button as fallback inside the viewer.

        container.innerHTML = `
            <object data="${src}" type="application/pdf" width="100%" height="100%" style="border: none;">
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100%; 
                    flex-direction: column; 
                    color: #e0e0e0; 
                    padding: 20px; 
                    text-align: center;
                ">
                    <p style="margin-bottom: 20px;">Twoja przeglądarka może nie obsługiwać podglądu PDF w trybie pełnoekranowym.</p>
                    <a href="${src}" target="_blank" class="action-button" style="
                        background: var(--color-primary); 
                        color: #fff; 
                        text-decoration: none; 
                        padding: 12px 24px; 
                        border-radius: 8px;
                        font-weight: bold;
                    ">Pobierz / Otwórz PDF</a>
                    <button onclick="document.getElementById('pdf-modal').style.display='none'" style="
                        margin-top: 20px;
                        background: none;
                        border: 1px solid #666;
                        color: #aaa;
                        padding: 8px 16px;
                        border-radius: 4px;
                    ">Zamknij podgląd</button>
                </div>
            </object>
        `;

        modal.style.display = 'flex';
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
