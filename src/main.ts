import '@/styles/reset.scss';
import '@/styles/globals.scss';
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
