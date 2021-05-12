
/* login.html 路由  */
import { createRouter, createWebHashHistory } from 'vue-router';
import QRCode from "@/pages/login/components/QRCode.vue";
import Account from "@/pages/login/components/Account.vue";
export const loginRouter = [
    {
        path:'',
        redirect:'/QRCode',
    },
    {
        path:'/QRCode',
        name:'QRCode',
        component: QRCode,
    },
    {
        path:'/Account',
        name:'Account',
        component: Account,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: loginRouter,
});

  export default router;



