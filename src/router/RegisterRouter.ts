/* register.html 路由  */
import {createRouter, createWebHashHistory} from 'vue-router';
import Register from "@/pages/regist/Register.vue";

export const routes = [
  {
    path: '',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;



