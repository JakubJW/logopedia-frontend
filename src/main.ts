import { createApp } from 'vue'
import './index.css'
import vue3GoogleLogin from 'vue3-google-login'
import AppLayout from './modules/core/components/AppLayout.vue'
import router from './router/index'

const app = createApp(AppLayout);

app.use(vue3GoogleLogin, {
    clientId: '578799494219-imu1uk729apse7air2fo2en0s7jmkn3r.apps.googleusercontent.com'
})
app.use(router);
app.mount('#app');
