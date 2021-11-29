<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="col-span-full w-full">
            <h1 class="font-semibold text-xl" v-if="isLoggedIn">Welkom terug, {{ loggedInUser.email }}!</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full" v-if="isLoggedIn">
            <h1 class="font-semibold text-xl">Jouw verlanglijstjes:</h1>
            <div v-if="wishlists.length > 0" class="grid grid-cols-2 gap-3 mt-2">
                <router-link
                    v-for="wishlist in wishlists"
                    v-bind:key="wishlist.id"
                    :to="{ name: 'Wishlist', params: { uuid: wishlist.data().uniqueId } }"
                    class="bg-white rounded-lg shadow border border-gray-100 p-4 cursor-pointer">
                    <h2>{{ wishlist.data().name }}</h2>
                    <small class="block">Unieke code: {{ wishlist.data().uniqueId }}</small>
                </router-link>
            </div>
            <router-link
                :to="{ name: 'CreateWishlist' }"
                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">
                Create new wishlist
            </router-link>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {getWishlists, isLoggedIn, loggedInUser} from "../common";

export default defineComponent({
    name: 'Home',
    data: function () {
        return {
            isLoggedIn,
            loggedInUser,
            wishlists: []
        }
    },
    created() {
        this.getWishlists();
    },
    watch: {
        '$route': 'getWishlists'
    },
    methods: {
        getWishlists: async function () {
            const wishlists = await getWishlists(loggedInUser.value.uid);
            wishlists.forEach(doc => {
                this.wishlists.push(doc);
            });
        }
    }
});
</script>

<style scoped></style>
