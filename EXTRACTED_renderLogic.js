
    const lectureCardsContainer = document.getElementById('lecture-cards');
    const lectureViewer = document.getElementById('lecture-viewer');
    const lectureTitle = document.getElementById('lecture-title');
    const lectureBody = document.getElementById('lecture-body');
    const lectureToc = document.getElementById('lecture-toc');
    const lectureBackBtn = document.getElementById('lecture-back-btn');
    const lecturesGridWrapper = document.querySelector('.lectures-grid-wrapper');

    function generateToc(content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const headings = tempDiv.querySelectorAll('h3');
        if (headings.length < 2) return ''; // Don't generate ToC for less than 2 headings
        let tocHtml = '<ul>';
        headings.forEach((h, index) => {
            const id = `toc-${index}`;
            h.id = id;
            tocHtml += `<li><a href="#${id}">${h.textContent}</a></li>`;
        });
        tocHtml += '</ul>';
        return tocHtml;
    }

    function showLecture(lecture) {
        if (lectureTitle) {
            lectureTitle.textContent = lecture.title;
        }
        const tocHtml = generateToc(lecture.content);
        if (lectureToc) {
            lectureToc.innerHTML = tocHtml;
            lectureToc.hidden = !tocHtml;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lecture.content;
        const headings = tempDiv.querySelectorAll('h3');
        headings.forEach((h, index) => {
            h.id = `toc-${index}`;
        });
        if (lectureBody) {
            lectureBody.innerHTML = tempDiv.innerHTML;

            // --- QUIZ INTEGRATION ---
            if (lecture.quiz && lecture.quiz.length > 0) {
                const quizBtnContainer = document.createElement('div');
                quizBtnContainer.className = 'quiz-start-wrapper';
                quizBtnContainer.innerHTML = `<button class="quiz-start-btn-elegant">Sprawdź Wiedzę</button>`;

                quizBtnContainer.addEventListener('click', () => {
                    startQuiz(lecture.quiz);
                });

                lectureBody.appendChild(quizBtnContainer);
            }
        }

        if (lecturesGridWrapper) {
            lecturesGridWrapper.hidden = true;
        }
        if (lectureViewer) {
            lectureViewer.hidden = false;
            lectureViewer.focus();
        }
    }

    function hideLecture() {
        if (lecturesGridWrapper) {
            lecturesGridWrapper.hidden = false;
        }
        if (lectureViewer) {
            lectureViewer.hidden = true;
        }
    }

    function initLectures() {
        if (!lectureCardsContainer || !lecturesData) return;
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

        if (lectureCardsContainer) {
            lectureCardsContainer.addEventListener('click', (e) => {
                if (e.target) {
                    const card = e.target.closest('.lecture-card[data-lecture-id]');
                    if (card) {
                        e.preventDefault();
                        const lectureId = card.dataset.lectureId;
                        const lecture = lecturesData.find(l => l.id === lectureId);
                        if (lecture) {
                            showLecture(lecture);
                        }
                    }
                }
            });

            lectureCardsContainer.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (e.target) {
                        const card = e.target.closest('.lecture-card[data-lecture-id]');
                        if (card) {
                            e.preventDefault();
                            const lectureId = card.dataset.lectureId;
                            const lecture = lecturesData.find(l => l.id === lectureId);
                            if (lecture) {
                                showLecture(lecture);
                            }
                        }
                    }
                }
            });
        }

        if (lectureBackBtn) {
            if (lectureBackBtn) {
                lectureBackBtn.addEventListener('click', hideLecture);
            }
        }

        if (lectureToc) {
            if (lectureToc) {
                lectureToc.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A') {
                        e.preventDefault();
                        const targetId = e.target.getAttribute('href');
                        const targetElement = lectureBody.querySelector(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }
        }

        hideLecture(); // Set initial state
    }

    initLectures();

    // --- PRZYCISK WYCZYŚĆ LISTĘ (CHECKLISTY) ---
    const checklistResetBtn = document.getElementById('global-checklist-reset-btn');
    if (checklistResetBtn) {
        checklistResetBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Znajdź aktywną pod-zakładkę checklisty
            const activeChecklist = document.querySelector('#divemaster-tools .sub-tab-content.active-sub-tab');

            if (activeChecklist) {
                // Znajdź wszystkie zaznaczone checkboxy w aktywnej zakładce
                const checkboxes = activeChecklist.querySelectorAll('input[type="checkbox"]:checked');

                // Odznacz wszystkie checkboxy
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Opcjonalna informacja wizualna (krótka animacja)
                const wrapper = checklistResetBtn.closest('.global-reset-wrapper');
                if (wrapper) {
                    wrapper.style.animation = 'none';
                    setTimeout(() => {
                        wrapper.style.animation = 'pulse-glow-dark 3s infinite ease-in-out';
                    }, 10);
                }
            }
        });
    }
});
