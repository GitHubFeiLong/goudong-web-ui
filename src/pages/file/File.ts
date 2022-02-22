import { createApp } from 'vue';

import App from './File.vue';
import ElementPlus from 'element-plus'
//@ts-ignore
import uploader from 'vue-simple-uploader'
import 'element-plus/dist/index.css'
const app = createApp(App);

app.use(ElementPlus)
  .use(uploader)
  .mount('#app');
