<template>
    <div class="grid grid-cols-6 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <h1 class="font-semibold text-xl">Login</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full md:col-span-2 w-full self-start">
            <h1 class="font-semibold text-xl">External:</h1>
            <button
                @click="handlePartnerLogin('google')"
                class="px-3 py-2 mt-2 text-white bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md inline-flex justify-center items-center text-center w-full shadow-lg">
                <font-awesome-icon :icon="['fab', 'google']" class="mr-2"></font-awesome-icon>
                Login with Google
            </button>
            <button
                @click="handlePartnerLogin('github')"
                class="px-3 py-2 mt-2 text-white bg-gradient-to-br from-gray-500 to-gray-800 rounded-md inline-flex justify-center items-center text-center w-full shadow-lg">
                <font-awesome-icon :icon="['fab', 'github']" class="mr-2"></font-awesome-icon>
                Login with GitHub
            </button>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full md:col-span-4 w-full">
            <h1 class="font-semibold text-xl">Login:</h1>
            <div>
                <form @submit="handleLogin">
                    <div>
                        <label for="email">E-mail:</label>
                        <input type="email" placeholder="john@example.com" v-model="email" id="email"
                               class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                        <small>Please enter your e-mail address here.</small>
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="password" v-model="password" id="password"
                               class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                        <small>Please enter your password here.</small>
                    </div>
                    <button
                        type="submit"
                        class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center w-full">
                        Login
                    </button>
                </form>
                <span class="mt-2 block">Don't have an account yet? Click <router-link :to="{ name: 'Register' }"
                                                                                       class="text-blue-500">here</router-link>.</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions} from "vuex";
import api from "../api";

export default defineComponent({
    name: "Login",
    data: function () {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(["login"]),
        handleLogin: async function (e: any) {
            e.preventDefault();

            await this.login({
                email: this.email,
                password: this.password
            });
            await this.$router.push('/');
        },
        handlePartnerLogin: function (provider: string) {
            api.createOAuth2Session({
                provider: provider,
                success: 'http://localhost:3000/'
            });
        },
    }
});
</script>

<style scoped>

</style>