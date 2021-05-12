import { createApp } from 'vue';
import App from './Login.vue';
import router from '@/router/LoginRouter';
import store from '@/store/loginStore';

import '@/assets/css/commons.css'
const app = createApp(App);

app.use(store).use(router).mount('#login-app');
