import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { inject } from '@vercel/analytics'
 
import Toast from 'vue-toastification'
import { POSITION } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'

import App from './App.vue'
import router from './router'


// Assets
import './assets/main.css'

// Vue toastification: https://github.com/Maronato/vue-toastification#usage
const options: PluginOptions = {
    position: POSITION.BOTTOM_CENTER,
    transition: 'Vue-Toastification__fade',
    maxToasts: 3,
    newestOnTop: true,
    timeout: 2500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
}
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
inject(); // Vercel Analytics