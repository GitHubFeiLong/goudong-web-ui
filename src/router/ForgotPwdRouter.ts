
/* forgotPwd.html 路由  */
import { createRouter, createWebHashHistory } from 'vue-router';
import ForgotPwd from "@/pages/forgotPwd/ForgotPwd.vue";
export const routes = [
    {
        path:'',
        component: ForgotPwd,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;



