// Czekaj, aż cała strona się załaduje
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Kalkulatora SAC ---
    const sacForm = document.getElementById("sacForm");
    const sacResultDiv = document.getElementById("result");

    // Sprawdź, czy formularz SAC istnieje (na wypadek błędu)
    if (sacForm) {
        sacForm.addEventListener("submit", (e) => {
            e.preventDefault();
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

            sacResultDiv.innerHTML = `
                <p>Twoje powierzchniowe zużycie gazu (SAC):</p>
                <span>${sacRounded} l/min</span>
            `;
            sacResultDiv.style.display = "block";
        });
    }

    // --- Logika Kalkulatora MOD ---
    const modForm = document.getElementById("modForm");
    const modResultDiv = document.getElementById("modResult");

    if (modForm) {
        modForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const o2 = parseFloat(document.getElementById("modO2").value) / 100;
            const po2 = parseFloat(document.getElementById("modPO2").value);

            const pAbs = po2 / o2;
            const mod = (pAbs - 1) * 10;
            const modRounded = mod.toFixed(1);

            modResultDiv.innerHTML = `
                <p>Maksymalna Głębokość Operacyjna (MOD):</p>
                <span>${modRounded} m</span>
            `;
            modResultDiv.style.display = "block";
        });
    }

    // --- Logika Kalkulatora EAD ---
    const eadForm = document.getElementById("eadForm");
    const eadResultDiv = document.getElementById("eadResult");

    if (eadForm) {
        eadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const o2 = parseFloat(document.getElementById("eadO2").value) / 100;
            const depth = parseFloat(document.getElementById("eadDepth").value);

            const fN2 = 1 - o2;
            const ead = ((fN2 / 0.79) * (depth + 10)) - 10;
            
            const eadRounded = ead < 0 ? 0 : ead.toFixed(1);

            eadResultDiv.innerHTML = `
                <p>Równoważna Głębokość Powietrzna (EAD):</p>
                <span>${eadRounded} m</span>
            `;
            eadResultDiv.style.display = "block";
        });
    }


    // --- Logika Przełączania Zakładek (Głównych) ---
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const targetTabId = button.getAttribute("data-tab");
            tabContents.forEach(content => {
                content.classList.remove("active-tab");
            });
            document.getElementById(targetTabId).classList.add("active-tab");
        });
    });

    // --- Logika Przełączanie Pod-zakładek (dla Nitrox) ---
    const subTabButtons = document.querySelectorAll(".sub-tab-button");
    const subTabContents = document.querySelectorAll(".sub-tab-content");

    subTabButtons.forEach(button => {
        button.addEventListener("click", () => {
            subTabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const targetSubTabId = button.getAttribute("data-subtab");
            subTabContents.forEach(content => {
                content.classList.remove("active-sub-tab");
            });
            document.getElementById(targetSubTabId).classList.add("active-sub-tab");
        });
    });


    // --- Logika Dark Mode ---
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