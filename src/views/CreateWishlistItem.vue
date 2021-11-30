<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <h1 class="font-semibold text-xl">Add a new item</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
            <form @submit="handleCreate" class="grid grid-cols-2 gap-3">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" placeholder="Coolio productio" v-model="name" id="name"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a name here.</small>
                </div>
                <div>
                    <label for="description">Description:</label>
                    <input type="text" placeholder="It's a very cool product." v-model="description" id="description"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a description here.</small>
                </div>
                <div>
                    <label for="currency">Currency:</label>
                    <input type="text" placeholder="EUR" v-model="currency" id="currency"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a currency here.</small>
                </div>
                <div>
                    <label for="price">Price:</label>
                    <input type="number" placeholder="10.0" step="0.01" v-model="price" id="price"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a price here.</small>
                </div>
                <div>
                    <label for="url">URL:</label>
                    <input type="url" placeholder="https://kadoosje.net" v-model="url" id="url"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a URL here.</small>
                </div>
                <div>
                    <label for="picture">Picture:</label>
                    <input type="text" placeholder="https://kadoosje.net/picture" v-model="picture" id="picture"
                           class="block border-0 bg-gray-100 rounded focus:ring-2 w-full">
                    <small>Please enter a picture URL here.</small>
                </div>
                <button
                    type="submit"
                    class="transition-colors duration-300 px-9 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center col-span-full">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from "vuex";
import api from "../api";
import {Server} from "../utils/config";

export default defineComponent({
    name: 'CreateWishlistItem',
    props: ['documentId'],
    data: function () {
        return {
            name: "",
            description: "",
            currency: "",
            price: 0.0,
            url: "",
            picture: "",
        };
    },
    async created() {
        if (!this.getAccount) await this.fetchAccount();
        await this.fetchWishlist({documentId: this.documentId});
    },
    methods: {
        ...mapActions(['addWishlistItem', 'fetchWishlist', 'fetchAccount']),
        handleCreate: async function (e: any) {
            e.preventDefault();

            const timeString = new Date().toISOString();

            await api.provider().database.createDocument(
                Server.collections.wishlistItems,
                {
                    created_at: timeString,
                    updated_at: timeString,
                    name: this.name,
                    description: this.description,
                    currency: this.currency,
                    price: this.price,
                    url: this.url,
                    picture: this.picture,
                },
                ['*'],
                ['*'],
                this.documentId,
                'items',
                'append'
            )
            await this.$router.back();
        },
    },
    computed: {
        ...mapGetters(['getWishlist', 'getAccount'])
    }
});
</script>

<style scoped></style>