import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

let routes: Array<RouteRecordRaw> = [
];

// routes = routes.concat((IndexRoutes as Array<Object>));
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
