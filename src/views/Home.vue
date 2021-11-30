<template>
    <div class="grid grid-cols-1 gap-3 justify-items-start">
        <div class="col-span-full w-full">
            <h1 class="font-semibold text-xl" v-if="getAccount">Welkom terug, {{ getAccount.name }}!</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full" v-if="!getAccount">
            <h1 class="font-semibold text-xl md:text-3xl">Welcome to Kadoosje!</h1>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full" v-if="getAccount">
            <h1 class="font-semibold text-xl">Jouw verlanglijstjes:</h1>
            <div v-if="getWishlists.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <router-link
                    v-for="wishlist in getWishlists"
                    :key="wishlist['$id']"
                    :to="{ name: 'Wishlist', params: { documentId: wishlist['$id'] } }"
                    class="bg-white rounded-lg shadow border border-gray-100 p-4 cursor-pointer">
                    <h2>{{ wishlist.name }}</h2>
                    <small class="block">Unieke code: {{ wishlist['$id'] }}</small>
                </router-link>
            </div>
            <!--            <router-link-->
            <!--                :to="{ name: 'CreateWishlist' }"-->
            <!--                class="transition-colors duration-300 px-3 py-2 mt-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded inline-flex justify-center items-center text-center">-->
            <!--                Create new wishlist-->
            <!--            </router-link>-->
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";

export default defineComponent({
    name: 'Home',
    computed: mapGetters(['getAccount', 'getWishlists']),
    methods: {
        ...mapActions(['fetchWishlists', 'fetchAccount']),
    },
    async created() {
        if (!this.getAccount) await this.fetchAccount();
        await this.fetchWishlists({});
        console.log(this.getAccount);
    }
});
</script>

<style scoped></style>
