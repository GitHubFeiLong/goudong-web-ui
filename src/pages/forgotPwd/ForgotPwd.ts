import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from './ForgotPwd.vue'
import store from "@/store/ForgotPwdStore";

import '/public/css/login.css'
import '@/assets/fonts/iconfont.css'

createApp(App).use(store).use(ElementPlus).mount('#app');
