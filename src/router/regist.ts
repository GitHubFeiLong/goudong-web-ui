
/* regist.html 路由  */
import { createRouter, createWebHashHistory } from 'vue-router';
import Regist from "@/pages/regist/Regist.vue";
export const routes = [
    {
        path:'',
        component: Regist,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
  
  export default router;



