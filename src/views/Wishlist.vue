<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full">
            <h1 class="font-semibold text-xl">{{ wishlist.name }}</h1>
            <!--            <small class="block" v-if="isLoggedIn">Welcome back, {{ loggedInUser.value.email }}!</small>-->
        </div>

        <!-- Item list -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 col-span-1 w-full">
            <wishlist-list-item
                v-for="item in wishlist.items"
                v-bind:key="item.uuid"
                :item="item"
                :uuid="uuid"
                :isLoggedIn="isLoggedIn"
            ></wishlist-list-item>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import WishlistListItem from '/src/components/WishlistListItem.vue';
import wishlistJSON from '../../wishlist.json';
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default defineComponent({
    name: 'Wishlist',
    components: {WishlistListItem},
    props: ['uuid'],
    data: function () {
        const isLoggedIn = ref(false);
        const loggedInUser = ref();
        const auth = getAuth();
        const authListener = onAuthStateChanged(auth, function (user) {
            isLoggedIn.value = !!user;
            loggedInUser.value = user;
        });

        return {
            // @ts-ignore
            wishlist: wishlistJSON[this.uuid],
            isLoggedIn,
            loggedInUser,
            authListener
        };
    },
    beforeUnmount() {
        this.authListener();
    }
});
</script>

<style scoped></style>