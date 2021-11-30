<template>
    <div v-if="!loading">
        <div class="grid grid-cols-1 gap-3 justify-items-start" v-if="getWishlist">
            <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full">
                <h1 class="font-semibold text-xl">{{ getWishlist.name }}</h1>
                <router-link
                    v-if="!!getAccount"
                    :to="{ name: 'CreateWishlistItem', params: { documentId } }"
                    class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">
                    Add a new item
                </router-link>
            </div>

            <!-- Item list -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 col-span-1 w-full">
                <wishlist-list-item
                    v-for="wishlistItem in getWishlist.items"
                    :item="wishlistItem"
                    :documentId="documentId"
                    :isLoggedIn="!!getAccount"
                ></wishlist-list-item>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from "vuex";
import WishlistListItem from '/src/components/WishlistListItem.vue';

export default defineComponent({
    name: 'Wishlist',
    components: {WishlistListItem},
    props: ['documentId'],
    data: function () {
        return {
            loading: true
        }
    },
    computed: {
        ...mapGetters(['getAccount', 'getWishlist', 'getWishlistItems']),
    },
    methods: {
        ...mapActions(['fetchWishlist', 'fetchWishlistItems', 'fetchAccount']),
    },
    async created() {
        if (!this.getAccount) await this.fetchAccount();
        await this.fetchWishlist({documentId: this.documentId});
        this.loading = false;
    },
});
</script>

<style scoped></style>