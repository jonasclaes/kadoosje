<!--<template>-->
<!--    <div class="grid grid-cols-1 gap-3 justify-items-start">-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">-->
<!--            <h1 class="font-semibold text-xl">Add a new item</h1>-->
<!--        </div>-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">-->
<!--            <div>-->
<!--                <label for="name">Name:</label>-->
<!--                <input type="text" placeholder="Coolio productio" v-model="name" id="name"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a name here.</small>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="description">Description:</label>-->
<!--                <input type="text" placeholder="It's a very cool product." v-model="description" id="description"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a description here.</small>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="currency">Currency:</label>-->
<!--                <input type="text" placeholder="EUR" v-model="currency" id="currency"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a currency here.</small>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="price">Price:</label>-->
<!--                <input type="number" placeholder="10.0" v-model="price" id="price"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a price here.</small>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="url">URL:</label>-->
<!--                <input type="url" placeholder="https://kadoosje.net" v-model="url" id="url"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a URL here.</small>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="picture">Picture:</label>-->
<!--                <input type="text" placeholder="https://kadoosje.net/picture" v-model="picture" id="picture"-->
<!--                       class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">-->
<!--                <small>Please enter a picture URL here.</small>-->
<!--            </div>-->
<!--            <button-->
<!--                @click="createWishlistItem"-->
<!--                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">-->
<!--                Add item-->
<!--            </button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {defineComponent, ref} from 'vue';-->
<!--import {v4 as uuidv4} from 'uuid';-->

<!--const name = ref('');-->
<!--const description = ref('');-->
<!--const currency = ref('');-->
<!--const price = ref(0.0);-->
<!--const url = ref('');-->
<!--const picture = ref('');-->

<!--export default defineComponent({-->
<!--    name: 'CreateWishlistItem',-->
<!--    props: ['uuid'],-->
<!--    data: function () {-->
<!--        return {-->
<!--            name,-->
<!--            description,-->
<!--            currency,-->
<!--            price,-->
<!--            url,-->
<!--            picture,-->
<!--            isLoggedIn,-->
<!--            loggedInUser-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        createWishlistItem: async function () {-->
<!--            await createWishlistItem(-->
<!--                this.uuid,-->
<!--                "item",-->
<!--                uuidv4(),-->
<!--                name.value,-->
<!--                description.value,-->
<!--                currency.value,-->
<!--                price.value,-->
<!--                url.value,-->
<!--                picture.value,-->
<!--                false-->
<!--            )-->
<!--            ;-->
<!--            await this.$router.back();-->
<!--        }-->
<!--    }-->
<!--});-->
<!--</script>-->

<!--<style scoped></style>-->