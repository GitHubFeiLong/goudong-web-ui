
/* regist.html 路由  */
import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
    // {
    //     path:'',
    //     redirect:'/QRCode',
    // },
    // {
    //     path:'/QRCode',
    //     name:'QRCode',
    //     component: QRCode,
    // },
    // {
    //     path:'/Account',
    //     name:'Account',
    //     component: Account,
    // }
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes,
});
  
  export default router;



