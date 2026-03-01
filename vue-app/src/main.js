import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// Import starego Vanilla CSS w odpowiedniej kolejności kaskady
import './assets/styles/base.css'
import './assets/styles/layout.css'
import './assets/styles/components/forms.css'
import './assets/styles/components/cards.css'
import './assets/styles/components/modals.css'
import './assets/styles/themes.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
