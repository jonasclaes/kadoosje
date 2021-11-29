<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <h1 class="font-semibold text-xl">Register</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
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
                @click="register"
                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">
                Registreren
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

const email = ref('');
const password = ref('');

export default defineComponent({
    name: "Register",
    setup: function () {
        return {
            email,
            password
        }
    },
    methods: {
        register: function () {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then(userCredential => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error.code, error.message);
                    alert(error.message);
                });
        }
    }
});
</script>

<style scoped>

</style>