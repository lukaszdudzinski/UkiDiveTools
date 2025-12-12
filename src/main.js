import { AppUI } from './modules/ui/AppUI.js';
import { DivemasterUI } from './modules/ui/DivemasterUI.js';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    AppUI.init();
    DivemasterUI.init();

    console.log("Uki's Dive Tools Initialized (Module System)");
});
