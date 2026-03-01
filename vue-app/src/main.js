import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';

import App from './App.vue';

// Uki's Dive Tools - Vanilla CSS Framework
import './assets/styles/base.css';
import './assets/styles/themes.css';
import './assets/styles/components/forms.css';
import './assets/styles/components/cards.css';
import './assets/styles/components/formulas.css';
import './assets/styles/components/modals.css';
import './assets/styles/layout.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
