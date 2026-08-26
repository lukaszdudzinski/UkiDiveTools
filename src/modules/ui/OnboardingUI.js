export const OnboardingUI = {
    init: () => {
        // Pokaż tylko jeśli nie ma jeszcze zapisanego nicku
        if (!localStorage.getItem('userNick')) {
            OnboardingUI.showGlobalWelcome();
        }
    },
    showGlobalWelcome: () => {
        let existing = document.getElementById('onboarding-modal');
        if (existing) existing.remove();
        const savedNick = localStorage.getItem('userNick') || '';
        const modal = document.createElement('div');
        modal.id = 'onboarding-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; justify-content: center; align-items: center; padding: 20px;';
        
        modal.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 35px; border-radius: 25px; max-width: 450px; width: 100%; border: 1px solid rgba(0, 209, 178, 0.3); text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.5);">
                <div style="font-size: 3.5em; margin-bottom: 5px; text-shadow: 0 0 15px rgba(255,255,255,0.3);">🤿</div>
                <h2 style="color: #fff; margin-top: 0; margin-bottom: 15px; font-weight: 600; letter-spacing: 1px;">Witaj w Uki's Dive Tools!</h2>
                <p style="color: #eee; line-height: 1.6; margin-bottom: 25px; font-size: 1.05em; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">
                    Cześć! Zanim zanurkujemy, spersonalizuj swój profil. 
                    <br>Jak mamy się do Ciebie zwracać?
                </p>
                
                <!-- Sekcja Awatara -->
                <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 25px;">
                    <div id="onboarding-avatar-preview" style="width: 100px; height: 100px; border-radius: 50%; background: #333; border: 3px solid #00d1b2; overflow: hidden; display: flex; justify-content: center; align-items: center; background-size: cover; background-position: center; margin-bottom: 15px; box-shadow: 0 0 15px rgba(0, 209, 178, 0.4);">
                        <span style="color: #666; font-size: 2.5em;">👤</span>
                    </div>
                    <label class="action-button" style="background-color: #222; border: 1px solid #00d1b2; color: #00d1b2; cursor: pointer; padding: 8px 15px; border-radius: 8px; font-size: 0.9em; font-weight: bold; transition: all 0.3s;">
                        Wgraj swoje zdjęcie
                        <input type="file" id="onboarding-avatar-upload" accept="image/*" style="display: none;">
                    </label>
                </div>
                <!-- Sekcja Imienia -->
                <input type="text" id="onboarding-nick-input" placeholder="Wpisz swoje imię lub nick..." value="${savedNick}" style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.3); color: #fff; font-size: 1.1em; text-align: center; box-sizing: border-box; margin-bottom: 25px; outline: none; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);">
                
                <button id="onboarding-save-btn" class="action-button pulse" style="width: 100%; background: linear-gradient(135deg, #00d1b2, #009688); border: none; padding: 15px; border-radius: 30px; font-size: 1.1em; font-weight: bold; cursor: pointer; color: #fff; box-shadow: 0 4px 15px rgba(0, 209, 178, 0.4); transition: transform 0.2s;">
                    Zapisz i Zaczynamy! ➔
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        // Obsługa wczytywania awatara (Base64)
        let selectedAvatarBase64 = null;
        document.getElementById('onboarding-avatar-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    selectedAvatarBase64 = event.target.result;
                    const preview = document.getElementById('onboarding-avatar-preview');
                    preview.style.backgroundImage = `url(${selectedAvatarBase64})`;
                    preview.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        });
        // Obsługa zapisywania
        const closeModal = () => {
            const nick = document.getElementById('onboarding-nick-input').value.trim();
            if (nick) {
                localStorage.setItem('userNick', nick);
                if (selectedAvatarBase64) {
                    localStorage.setItem('uki-avatar', selectedAvatarBase64);
                }
                
                // Odśwież powitanie w menu głównym
                if (window.AppUI && window.AppUI.updateWelcomeMessage) {
                    window.AppUI.updateWelcomeMessage();
                }
                
                // Opcjonalnie zaktualizuj panel profilu jeśli jest załadowany
                const settingsPreview = document.getElementById('profile-avatar-preview');
                if (settingsPreview && selectedAvatarBase64) {
                    settingsPreview.style.backgroundImage = `url(${selectedAvatarBase64})`;
                    settingsPreview.innerHTML = '';
                }
                const nickInput = document.getElementById('profile-nick-input');
                if (nickInput) {
                    nickInput.value = nick;
                }
            }
            
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        document.getElementById('onboarding-save-btn').addEventListener('click', closeModal);
    }
};
