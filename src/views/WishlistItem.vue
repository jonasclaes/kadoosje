<template>
    <div v-if="!loading">
        <router-link :to="{ name: 'Wishlist', params: { documentId } }">
            <div
                class="bg-gray-700 hover:bg-gray-800 transition-colors duration-300 px-9 py-3 mb-3 text-white rounded inline-flex justify-center items-center"
            >
                Back
            </div>
        </router-link>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-items-start items-start">
            <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">
                <h1 class="font-semibold text-xl">{{ getWishlist.name }}</h1>
            </div>

            <!-- Item view -->
            <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full break-all">
                <img :src="imageLocation" alt="Picture" class="max-h-60 object-contain object-center w-full"/>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 md:col-span-3 w-full break-all">
                <h2 class="text-lg">{{ getWishlistItem.name }}</h2>
                <small class="block">{{ getWishlistItem.currency }}: {{ formattedPrice }}</small>
                <small class="block">{{ getWishlistItem.description }}</small>
                <div class="grid gap-3 mt-2">
                    <a
                        class="transition-colors duration-300 px-3 py-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded flex justify-center items-center text-center"
                        :href="getWishlistItem.url"
                        target="_blank"
                    >
                        Bekijken in de winkel
                    </a>
                    <a class="transition-colors duration-300 px-3 py-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded flex justify-center items-center text-center cursor-pointer"
                       @click="handleTogglePurchased">
                        {{ getWishlistItem.purchased ? 'Terug op lijstje zetten' : 'Afvinken van lijstje' }}
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import numeral from 'numeral';
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    name: 'WishlistItem',
    props: ['documentId', 'itemDocumentId'],
    data: function () {
        return {
            loading: true
        }
    },
    computed: {
        ...mapGetters(['getAccount', 'getWishlist', 'getWishlistItem']),
        formattedPrice: function () {
            return numeral(this.getWishlistItem.price).format('0.00');
        },
        imageLocation: function () {
            return `${this.getWishlistItem.picture}`;
        },
    },
    methods: {
        ...mapActions(['fetchWishlist', 'fetchWishlistItem', 'fetchAccount', 'updateWishlistItem']),
        handleTogglePurchased: async function (e: any) {
            e.preventDefault();

            await this.updateWishlistItem({
                documentId: this.itemDocumentId,
                data: {
                    purchased: !this.getWishlistItem.purchased
                },
                read: ['*'],
                write: ['*']
            });
        }
    },
    async created() {
        if (!this.getAccount) await this.fetchAccount();
        await this.fetchWishlist({documentId: this.documentId});
        await this.fetchWishlistItem({documentId: this.itemDocumentId});
        this.loading = false;
    },
});
</script>

<style scoped></style>