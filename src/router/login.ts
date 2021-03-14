
/* login.html 路由  */
export const login = [
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



