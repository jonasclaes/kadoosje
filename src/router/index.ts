import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/w/:uuid',
        name: 'Wishlist',
        component: () => import('../views/Wishlist.vue'),
        props: true,
    },
    {
        path: '/w/create',
        name: 'CreateWishlist',
        component: () => import('../views/CreateWishlist.vue'),
    },
    {
        path: '/w/:uuid/item/:itemUuid',
        name: 'WishlistItem',
        component: () => import('../views/WishlistItem.vue'),
        props: true,
    },
    {
        path: '/w/:uuid/item/create',
        name: 'CreateWishlistItem',
        component: () => import('../views/CreateWishlistItem.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
