import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './Register.vue';
import RegisterRouter from '@/router/RegisterRouter';
import RegisterStore from '@/store/RegisterStore';

import '/public/css/login.css'

createApp(App).use(RegisterRouter).use(ElementPlus).use(RegisterStore).mount('#app');
