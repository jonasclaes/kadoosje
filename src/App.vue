<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div class="bg-gray-200 min-h-screen w-full">
        <div class="bg-gray-800 shadow-lg">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex space-x-4 px-2">
                        <div>
                            <a href="/" class="flex items-center h-full">
                                <img src="./assets/kadoosje.svg" alt="Logo" class="h-2/3 mr-2">
                                <span class="font-semibold text-white text-lg">Kadoosje</span>
                            </a>
                        </div>
                        <div class="hidden sm:flex items-center space-x-1">
                            <router-link
                                :to="{ name: 'Home' }"
                                class="h-full flex items-center px-2 text-white font-semibold hover:text-gray-400 transition duration-300"
                                :class="$route.name === 'Home' ? 'border-b-4 border-red-400 text-red-400 hover:text-red-600' : ''">
                                Home
                            </router-link>
                            <router-link
                                to="/"
                                class="h-full flex items-center px-2 text-white font-semibold hover:text-gray-400 transition duration-300"
                                :class="$route.name === 'Wishlist' ? 'border-b-4 border-red-400 text-red-400 hover:text-red-600' : 'hidden'">
                                Wishlist
                            </router-link>
                        </div>
                    </div>
                    <div class="hidden sm:flex items-center space-x-1 px-2">
                        <router-link
                            v-if="!isLoggedIn"
                            :to="{ name: 'Register' }"
                            class="h-full flex items-center px-2 text-white font-semibold hover:text-gray-400 transition duration-300"
                            :class="$route.name === 'Register' ? 'border-b-4 border-red-400 text-red-400 hover:text-red-600' : ''">
                            Register
                        </router-link>
                        <router-link
                            v-if="!isLoggedIn"
                            :to="{ name: 'Login' }"
                            class="h-full flex items-center px-2 text-white font-semibold hover:text-gray-400 transition duration-300"
                            :class="$route.name === 'Login' ? 'border-b-4 border-red-400 text-red-400 hover:text-red-600' : ''">
                            Login
                        </router-link>
                        <button
                            v-if="isLoggedIn"
                            @click="logout"
                            class="h-full flex items-center px-2 text-white font-semibold hover:text-gray-400 transition duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mx-auto px-6 py-3 max-w-6xl">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

export default defineComponent({
    name: "App",
    data: function () {
        const isLoggedIn = ref(false);
        const auth = getAuth();

        onAuthStateChanged(auth, function (user) {
            isLoggedIn.value = !!user;
        });

        return {
            isLoggedIn
        }
    },
    methods: {
        logout: function () {
            const auth = getAuth();
            signOut(auth);
            this.$router.push('/');
        }
    }
});
</script>
