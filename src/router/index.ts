import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wishlists",
    name: "Wishlists",
    // route level code-splitting
    // this generates a separate chunk (wishlists.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "wishlists" */ "../views/Wishlists.vue"),
  },
  {
    path: "/wishlists/addWishlist",
    name: "AddWishlist",
    // route level code-splitting
    // this generates a separate chunk (addWishlist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "addWishlist" */ "../views/AddWishlist.vue"),
  },
  {
    path: "/wishlists/:uniqueId",
    name: "Wishlist",
    // route level code-splitting
    // this generates a separate chunk (wishlist.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "wishlist" */ "../views/Wishlist.vue"),
  },
  {
    path: "/wishlists/:uniqueId/addProduct",
    name: "AddProduct",
    // route level code-splitting
    // this generates a separate chunk (addProduct.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "addProduct" */ "../views/AddProduct.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
