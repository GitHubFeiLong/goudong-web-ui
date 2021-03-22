import { createApp } from 'vue';
import App from './Regist.vue';
import router from '@/router/regist';
import store from '@/store';

import '/public/css/login.css'

createApp(App).use(store).use(router).mount('#app');