import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from './BindPage.vue';

import '@/assets/css/commons.css';
import '@/assets/fonts/iconfont.css';

createApp(App).use(ElementPlus).mount('#app');
