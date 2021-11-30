<!--<template>-->
<!--    <div class="grid grid-cols-1 gap-3 justify-items-start">-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">-->
<!--            <h1 class="font-semibold text-xl">Create wishlist</h1>-->
<!--        </div>-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">-->
<!--            <div>-->
<!--                <label for="name">Name:</label>-->
<!--                <input type="text" placeholder="John's wishlist" v-model="name" id="name"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a name for your wishlist here.</small>-->
<!--            </div>-->
<!--            <button-->
<!--                @click="createWishlist"-->
<!--                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">-->
<!--                Create new wishlist-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {defineComponent, ref} from 'vue';-->
<!--import {createWishlist, generateRandomString, isLoggedIn, loggedInUser} from "../common";-->

<!--const name = ref('');-->

<!--export default defineComponent({-->
<!--    name: 'CreateWishlist',-->
<!--    data: function () {-->
<!--        return {-->
<!--            name,-->
<!--            isLoggedIn,-->
<!--            loggedInUser-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        createWishlist: async function () {-->
<!--            await createWishlist(name.value, generateRandomString(10), loggedInUser.value.uid);-->
<!--            await this.$router.push('/');-->
<!--        }-->
<!--    }-->
<!--});-->
<!--</script>-->

<!--<style scoped></style>-->