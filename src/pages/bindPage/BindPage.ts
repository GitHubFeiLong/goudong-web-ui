import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from './BindPage.vue'

import '/public/css/login.css'
import '@/assets/fonts/iconfont.css'

createApp(App).use(ElementPlus).mount('#app');
