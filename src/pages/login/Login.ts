import { createApp } from 'vue';
import App from './Login.vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from '@/router/LoginRouter';
import store from '@/store/loginStore';

import '@/assets/css/commons.css'
const app = createApp(App);

app.use(store).use(router).use(ElementPlus).mount('#login-app');
