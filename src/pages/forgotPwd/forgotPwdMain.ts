import { createApp } from 'vue'
import App from './ForgotPwd.vue'
import store from "@/store/ForgotPwdStore";

import '/public/css/login.css'

createApp(App).use(store).mount('#app');
