/* 
    login.html 路由 
*/
import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
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
];

//决定路由模式
const isPro: boolean = process.env.NODE_ENV === "prodution";
const router = createRouter({
    //history是路由模式(线上线下)
    // history: createWebHashHistory(),
    history: createWebHashHistory(),
    routes
});

export default router;

