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
        path: '/w/:documentId',
        name: 'Wishlist',
        component: () => import('../views/Wishlist.vue'),
        props: true,
    },
    // {
    //     path: '/w/create',
    //     name: 'CreateWishlist',
    //     component: () => import('../views/CreateWishlist.vue'),
    // },
    {
        path: '/w/:documentId/item/:itemDocumentId',
        name: 'WishlistItem',
        component: () => import('../views/WishlistItem.vue'),
        props: true,
    },
    {
        path: '/w/:documentId/item/create',
        name: 'CreateWishlistItem',
        component: () => import('../views/CreateWishlistItem.vue'),
        props: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
