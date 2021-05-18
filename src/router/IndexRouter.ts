import {
  createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // ...login,
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
