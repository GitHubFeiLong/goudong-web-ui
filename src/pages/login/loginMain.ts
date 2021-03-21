import { createApp } from 'vue';
import App from './Login.vue';
import router from '../../router/login';
import store from '../../store/loginStore';

import '/public/css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

 // 引入工具ts
 import * as Tools from '../../utils/notDone'; // 使用 Tools.notDone

 const app = createApp(App);
 
 app.config.globalProperties.$me=Tools;

 app.use(store).use(router).mount('#login-app');