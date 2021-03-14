import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { login } from './login';


let routes: Array<RouteRecordRaw> = [
  ...login,
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;
