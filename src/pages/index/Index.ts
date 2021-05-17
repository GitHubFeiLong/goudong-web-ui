import { createApp } from 'vue';
import App from './Index.vue';
import router from '@/router/IndexRouter';
import store from '@/store/IndexStore';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/css/commons.css'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
