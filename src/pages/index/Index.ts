import { createApp } from 'vue';
import router from '@/router/IndexRouter';
import store from '@/store/IndexStore';
import ElementPlus from 'element-plus';
import App from './Index.vue';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/css/commons.css';
import '@/assets/fonts/iconfont.css';

createApp(App).use(store).use(router).use(ElementPlus)
  .mount('#app');
