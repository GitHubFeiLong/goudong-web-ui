import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './Regist.vue';
import router from '@/router/regist';

import '/public/css/login.css'

createApp(App).use(router).use(ElementPlus).mount('#app');
