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
            <!--            <wishlist-list-item-->
            <!--                v-for="item in wishlistItems"-->
            <!--                :item="item"-->
            <!--                :uuid="uuid"-->
            <!--                :isLoggedIn="isLoggedIn"-->
            <!--            ></wishlist-list-item>-->
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import WishlistListItem from '/src/components/WishlistListItem.vue';

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
        };
    },
    created() {
        this.getWishlist();
    },
    methods: {
        getWishlist: async function () {

        },
        getWishlistItems: async function () {
            
        }
    }
});
</script>

<style scoped></style>