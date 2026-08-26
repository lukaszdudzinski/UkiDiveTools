const fs = require('fs');
const file = 'src/modules/ui/AppUI.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /updateWelcomeMessage:\s*\(\)\s*=>\s*\{[\s\S]*?(?=},\n\s*initGlobalButtons:|\}\s*;)/;
const replacement = `updateWelcomeMessage: () => {
        const nick = localStorage.getItem('userNick');
        
        // Szukamy głównego nagłówka na ekranie głównym
        const headerTitle = document.querySelector('.home-header h2');
        if (headerTitle) {
            headerTitle.textContent = nick ? \`Cześć, \${nick}! 🚀\` : "Uki's Dive Tools";
            // Jeśli element kontenera awatara został wcześniej wstrzyknięty z powodu starego kodu - usuwamy go, by zachować czystość HTML
            const oldContainer = document.getElementById('header-user-container');
            if (oldContainer) {
                oldContainer.replaceWith(headerTitle);
            }
        }
    }`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("AppUI.js patched successfully.");
} else {
    console.log("Failed to match regex in AppUI.js");
}
