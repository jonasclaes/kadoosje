<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <h1 class="font-semibold text-xl">Login</h1>
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
            <small v-if="errorMessage" class="block text-red-600 font-semibold">Error! {{ errorMessage }}</small>
            <button
                @click="login"
                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">
                Inloggen
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const email = ref('');
const password = ref('');
const errorMessage = ref();

export default defineComponent({
    name: "Login",
    setup: function () {
        return {
            email,
            password,
            errorMessage
        }
    },
    methods: {
        login: function () {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then(userCredential => {
                    this.$router.push('/');
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            errorMessage.value = 'Invalid email.'
                            break;

                        case 'auth/user-not-found':
                            errorMessage.value = 'No account with that e-mail was found.'
                            break;

                        case 'auth/wrong-password':
                            errorMessage.value = 'Incorrect password.'
                            break;

                        default:
                            errorMessage.value = 'E-mail or password was incorrect.'
                            break;
                    }
                });
        }
    }
});
</script>

<style scoped>

</style>