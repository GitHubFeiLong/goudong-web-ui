import { createApp } from 'vue';
import App from './Login.vue';
import router from '../../router/login';
import store from '../../store/loginStore';

import '/public/css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

 const app = createApp(App);
 
 app.use(store).use(router).mount('#login-app');