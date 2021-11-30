<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <h1 class="font-semibold text-xl">Register</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <div>
                <form @submit="handleRegister">
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" placeholder="John Doe" v-model="name" id="name"
                               class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                        <small>Please enter your name here.</small>
                    </div>
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
                        Register
                    </button>
                </form>
                <span class="mt-2 block">Already have an account? Click <router-link :to="{ name: 'Login' }"
                                                                                     class="text-blue-500">here</router-link>.</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions} from "vuex";

export default defineComponent({
    name: "Register",
    data: function () {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(["signup"]),
        handleRegister: async function (e: any) {
            e.preventDefault();

            console.log("Signing up ", this.email, this.password, this.name);

            await this.signup({
                email: this.email,
                password: this.password,
                name: this.name
            });

            await this.$router.push('/');
        }
    }
});
</script>

<style scoped>

</style>