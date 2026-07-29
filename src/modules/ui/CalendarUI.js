import { CalendarDB } from '../data/CalendarDB.js';

export const CalendarUI = {
    async init() {
        console.log("Initializing Calendar UI...");
        
        // Czekamy na to, aż zakładka zostanie pokazana (dla wydajności możemy pobrać dane od razu lub podczas wejścia w zakładkę)
        // Podpinamy się pod zdarzenie zmiany tabu, ale na razie wystarczy jednorazowe załadowanie.
        await this.renderEvents();
        
        // Odświeżanie kalendarza po powrocie do zakładki (jeśli w przyszłości dodasz zdarzenia dla switchTab)
    },

    async renderEvents() {
        const listContainer = document.getElementById('calendar-entries');
        if (!listContainer) return;

        try {
            const events = await CalendarDB.getEvents();
            
            // Filtrowanie - pokazujemy tylko nadchodzące wydarzenia (opcjonalnie) i sortujemy po dacie
            const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

            if (sortedEvents.length === 0) {
                listContainer.innerHTML = `
                    <div style="text-align: center; color: #888; padding: 40px;">
                        <h3>Brak zaplanowanych wydarzeń</h3>
                        <p>Zajrzyj tu ponownie wkrótce!</p>
                    </div>
                `;
                return;
            }

            let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">';

            sortedEvents.forEach(event => {
                let badgeColor = '#42b883'; // default green (szkolenie)
                if (event.category === 'wyjazd') badgeColor = '#00d1b2'; // turkusowy
                if (event.category === 'nurkowanie') badgeColor = '#3273dc'; // niebieski
                
                // Numer telefonu i mail z zadania
                const phone = '883929303';
                const email = 'nurkujniebiegaj@gmail.com';
                const subject = encodeURIComponent(\`Zapytanie o \${event.title} (\${event.date})\`);
                const smsBody = encodeURIComponent(\`Cześć, proszę o info dotyczące \${event.title} z dnia \${event.date}.\`);

                html += \`
                    <div class="dashboard-card" style="text-align: left; position: relative; padding: 20px;">
                        <div style="position: absolute; top: 15px; right: 15px; font-size: 0.8em; padding: 4px 8px; border-radius: 4px; background: \${badgeColor}; color: #111; font-weight: bold; text-transform: uppercase;">
                            \${event.category}
                        </div>
                        <h3 style="margin-bottom: 5px; color: #fff; padding-right: 70px;">\${event.title}</h3>
                        <p style="color: #00d1b2; font-size: 0.95em; margin-bottom: 15px;">
                            <strong>📅 \${event.date}</strong><br>
                            📍 \${event.location || 'Brak lokalizacji'}
                        </p>
                        
                        <div style="font-size: 0.9em; color: #ccc; margin-bottom: 20px; min-height: 40px;">
                            \${event.description || ''}
                        </div>
                        
                        <div style="display: flex; gap: 5px; margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; justify-content: space-between;">
                            <a href="tel:+48\${phone}" style="flex:1; text-decoration: none; text-align: center; background: rgba(255,255,255,0.1); color: #fff; padding: 10px 5px; border-radius: 6px; font-size: 0.85em; transition: 0.2s;">
                                📞 Zadzwoń
                            </a>
                            <a href="sms:+48\${phone}?body=\${smsBody}" style="flex:1; text-decoration: none; text-align: center; background: rgba(255,255,255,0.1); color: #fff; padding: 10px 5px; border-radius: 6px; font-size: 0.85em; transition: 0.2s;">
                                💬 SMS
                            </a>
                            <a href="mailto:\${email}?subject=\${subject}" style="flex:1; text-decoration: none; text-align: center; background: rgba(255,255,255,0.1); color: #fff; padding: 10px 5px; border-radius: 6px; font-size: 0.85em; transition: 0.2s;">
                                ✉️ Email
                            </a>
                        </div>
                    </div>
                \`;
            });

            html += '</div>';
            listContainer.innerHTML = html;

            // Add hover effects for buttons dynamically
            listContainer.querySelectorAll('a').forEach(btn => {
                btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(255,255,255,0.2)');
                btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(255,255,255,0.1)');
            });

        } catch (error) {
            console.error("Error fetching calendar events:", error);
            listContainer.innerHTML = \`<div class="result-error" style="color:#ff3860;">Nie udało się wczytać kalendarza. Sprawdź połączenie z internetem.</div>\`;
        }
    }
};
