<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start" v-if="wishlist">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full">
            <h1 class="font-semibold text-xl">{{ wishlist.name }}</h1>
            <router-link
                v-if="isLoggedIn"
                :to="{ name: 'CreateWishlistItem' }"
                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">
                Add a new item
            </router-link>
        </div>

        <!-- Item list -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 col-span-1 w-full">
            <wishlist-list-item
                v-for="item in wishlistItems"
                :item="item"
                :uuid="uuid"
                :isLoggedIn="isLoggedIn"
            ></wishlist-list-item>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import WishlistListItem from '/src/components/WishlistListItem.vue';
import {db, isLoggedIn, loggedInUser} from "../common";
import {collection, getDocs, query, where} from "firebase/firestore";

export default defineComponent({
    name: 'Wishlist',
    components: {WishlistListItem},
    props: ['uuid'],
    data: function () {
        return {
            wishlistId: null,
            wishlist: {
                name: ""
            },
            wishlistItems: [],
            isLoggedIn,
            loggedInUser
        };
    },
    created() {
        this.getWishlist();
    },
    methods: {
        getWishlist: async function () {
            const q = query(collection(db, '/wishlists'), where('uniqueId', '==', this.uuid));
            const wishlist = await getDocs(q);

            if (wishlist.size > 0) {
                // @ts-ignore
                this.wishlistId = wishlist.docs[0].id;
                // @ts-ignore
                this.wishlist = wishlist.docs[0].data();

                await this.getWishlistItems();
            }
        },
        getWishlistItems: async function () {
            const q = query(collection(db, '/wishlistItems'), where('wishlistUniqueId', '==', this.uuid));
            const wishlistItems = await getDocs(q);

            wishlistItems.forEach(doc => {
                const data = doc.data();
                // @ts-ignore
                this.wishlistItems.push(data);
            });
        }
    }
});
</script>

<style scoped></style>