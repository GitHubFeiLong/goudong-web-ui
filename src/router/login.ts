
/* login.html 路由  */
import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Login from '@/pages/login/Login.vue';
export const login = [
    {
        path:'/login',
        name:"登录页",
        children:[
            {
                path:'/ui/login/QRCode',
                name:'QRCode',
                component: () => import("@/pages/login/components/QRCode.vue"),
            },
            {
                path:'/ui/login/Account',
                name:'Account',
                component: () => import("@/pages/login/components/Account.vue"),
            }
        ]
    },
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    login,
  });
  
  export default router;



