import { createApp } from 'vue';
import App from './Login.vue';
import router from '../../router';
import store from '../../store';

import '/public/css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(store).use(router).mount('#login-app');
