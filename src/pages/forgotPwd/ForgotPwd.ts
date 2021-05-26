import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import store from '@/store/ForgotPwdStore';
import App from './ForgotPwd.vue';
import '@/assets/css/commons.css';
import '@/assets/fonts/iconfont.css';

createApp(App).use(store).use(ElementPlus).mount('#app');
