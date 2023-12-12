import { createApp } from 'vue'
import './index.css'
import vue3GoogleLogin from 'vue3-google-login'
import AppLayout from './modules/core/components/AppLayout.vue'
import router from './router/index'

const app = createApp(AppLayout);

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID
})
app.use(router);
app.mount('#app');
