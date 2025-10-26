// Czekaj, aż cała strona się załaduje
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Kalkulatora SAC (bez zmian) ---
    const form = document.getElementById("sacForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // ... (cała logika obliczeń SAC pozostaje bez zmian) ...
        const p1 = parseFloat(document.getElementById("p1").value);
        const p2 = parseFloat(document.getElementById("p2").value);
        const vb = parseFloat(document.getElementById("vb").value);
        const depth = parseFloat(document.getElementById("depth").value);
        const time = parseFloat(document.getElementById("time").value);
        const waterType = document.getElementById("waterType").value;

        if (p1 <= p2) {
            alert("Ciśnienie początkowe musi być większe niż końcowe.");
            return;
        }
        if (depth <= 0 || time <= 0 || vb <= 0) {
            alert("Wszystkie wartości muszą być dodatnie.");
            return;
        }

        const pressurePerMeter = (waterType === 'salt') ? 10.0 : 10.3;
        const pAbs = (depth / pressurePerMeter) + 1;
        const pressureUsed = p1 - p2;
        const gasVolumeAtSurface = pressureUsed * vb;
        const sac = gasVolumeAtSurface / (time * pAbs);
        const sacRounded = sac.toFixed(1);

        resultDiv.innerHTML = `
            <p>Twoje powierzchniowe zużycie gazu (SAC):</p>
            <span>${sacRounded} l/min</span>
        `;
        resultDiv.style.display = "block";
    });

    // --- NOWA LOGIKA: Przełączanie Zakładek ---

    // 1. Znajdź wszystkie przyciski zakładek
    const tabButtons = document.querySelectorAll(".tab-button");
    // 2. Znajdź wszystkie kontenery z treścią zakładek
    const tabContents = document.querySelectorAll(".tab-content");

    // 3. Dodaj "nasłuchiwanie" na kliknięcie do każdego przycisku
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            
            // A. Usuń klasę 'active' ze WSZYSTKICH przycisków
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // B. Dodaj klasę 'active' tylko do KLIKNIĘTEGO przycisku
            button.classList.add("active");

            // C. Pobierz docelowy ID treści z atrybutu "data-tab"
            const targetTabId = button.getAttribute("data-tab"); // np. "nitrox-calculator"

            // D. Ukryj WSZYSTKIE treści zakładek
            tabContents.forEach(content => {
                content.classList.remove("active-tab");
            });

            // E. Pokaż tylko tę treść, która pasuje do ID
            const activeTab = document.getElementById(targetTabId);
            activeTab.classList.add("active-tab");
        });
    });
    // --- KONIEC LOGIKI ZAKŁADEK ---


    // --- Logika Dark Mode (bez zmian) ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.checked = true;
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            themeToggle.checked = false;
        }
    }

    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === "dark") {
        setTheme(true);
    } else if (savedTheme === "light") {
        setTheme(false);
    } else if (userPrefersDark) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggle.addEventListener("change", () => {
        setTheme(themeToggle.checked);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem("theme")) { 
            setTheme(e.matches);
        }
    });
});