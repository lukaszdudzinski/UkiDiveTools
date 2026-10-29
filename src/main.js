import { OnboardingUI } from './modules/ui/OnboardingUI.js';
import { AppUI } from './modules/ui/AppUI.js';
import { DivemasterUI } from './modules/ui/DivemasterUI.js';
import { LogbookUI } from './modules/ui/LogbookUI.js';
import { CalendarUI } from './modules/ui/CalendarUI.js';
import { DatabaseManager } from './modules/db/DatabaseManager.js';
import { DiagnosticsUI } from './modules/ui/DiagnosticsUI.js';
import { ChangelogUI } from './modules/ui/ChangelogUI.js';

export const APP_VERSION = 'v2026.10.29.01';

window.ukiLogError = (msg, stack) => {
    let logs = [];
    try { logs = JSON.parse(localStorage.getItem('uki_error_logs') || '[]'); } catch(e) {}
    logs.unshift({ time: new Date().toISOString(), msg, stack, version: window.APP_VERSION || 'Nieznana' });
    if(logs.length > 50) logs.length = 50;
    localStorage.setItem('uki_error_logs', JSON.stringify(logs));
};

window.onerror = function(message, source, lineno, colno, error) {
    const stack = error ? error.stack : '';
    window.ukiLogError(`Global Error: ${message} at ${source}:${lineno}:${colno}`, stack);
    return false;
};

window.addEventListener('unhandledrejection', function(event) {
    const msg = event.reason ? event.reason.message || event.reason : 'Unhandled Promise Rejection';
    const stack = event.reason ? event.reason.stack || '' : '';
    window.ukiLogError(`Promise Rejection: ${msg}`, stack);
});

// Expose for DiagnosticsUI and PWA updater
window.DatabaseManager = DatabaseManager;
window.APP_VERSION = APP_VERSION;

// Initialize Application
const initApp = () => {
    console.log("Starting App Initialization...");
    AppUI.init();
    OnboardingUI.init();

    DivemasterUI.init();
    LogbookUI.init();
    CalendarUI.init();
    DiagnosticsUI.init();
    ChangelogUI.init();

    console.log("Uki's Dive Tools Initialized (Module System)");
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
