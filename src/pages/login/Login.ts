import { createApp } from 'vue';

import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/dist/index.css'
import router from '@/router/LoginRouter';
import store from '@/store/loginStore';
import App from './Login.vue';
import '@/assets/css/commons.css';
import '@/assets/fonts/iconfont.css';

const app = createApp(App);

app.use(store).use(router).use(ElementPlus).mount('#login-app');
