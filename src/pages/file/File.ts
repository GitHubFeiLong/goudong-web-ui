import { createApp } from 'vue';

import App from './File.vue';
import ElementPlus from 'element-plus'
//@ts-ignore

const app = createApp(App);

app.use(ElementPlus)
  .mount('#app');
