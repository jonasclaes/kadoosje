<!--<template>-->
<!--    <router-link :to="{ name: 'Wishlist', params: { uuid: uuid } }">-->
<!--        <div-->
<!--            class="bg-gray-700 hover:bg-gray-800 transition-colors duration-300 px-9 py-3 mb-3 text-white rounded inline-flex justify-center items-center"-->
<!--        >-->
<!--            Back-->
<!--        </div>-->
<!--    </router-link>-->
<!--    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-items-start items-start" v-if="item">-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-full w-full">-->
<!--            <h1 class="font-semibold text-xl">{{ wishlist.name }}</h1>-->
<!--        </div>-->

<!--        &lt;!&ndash; Item view &ndash;&gt;-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 w-full break-all">-->
<!--            <img :src="imageLocation" alt="Picture" class="max-h-60 object-contain object-center w-full"/>-->
<!--        </div>-->
<!--        <div class="bg-white rounded-lg shadow-lg p-4 col-span-1 md:col-span-3 w-full break-all">-->
<!--            <h2 class="text-lg">{{ item.name }}</h2>-->
<!--            <small class="block">{{ item.currency }}: {{ formattedPrice }}</small>-->
<!--            <small class="block">{{ item.description }}</small>-->
<!--            <div class="grid gap-3 mt-2">-->
<!--                <a-->
<!--                    class="transition-colors duration-300 px-3 py-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded flex justify-center items-center text-center"-->
<!--                    :href="item.url"-->
<!--                    target="_blank"-->
<!--                >-->
<!--                    Bekijken in de winkel-->
<!--                </a>-->
<!--                <a class="transition-colors duration-300 px-3 py-2 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded flex justify-center items-center text-center cursor-pointer"-->
<!--                   @click=" togglePurchased">-->
<!--                    {{ item.purchased ? 'Terug op lijstje zetten' : 'Afvinken van lijstje' }}-->
<!--                </a>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {defineComponent} from 'vue';-->
<!--import numeral from 'numeral';-->
<!--import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";-->
<!--import {db} from "../common";-->

<!--export default defineComponent({-->
<!--    name: 'WishlistItem',-->
<!--    props: ['uuid', 'itemUuid'],-->
<!--    data: function () {-->
<!--        return {-->
<!--            wishlistId: null,-->
<!--            wishlist: {-->
<!--                name: ""-->
<!--            },-->
<!--            item: {-->
<!--                type: "",-->
<!--                uuid: "",-->
<!--                name: "",-->
<!--                description: "",-->
<!--                currency: "",-->
<!--                price: 0.0,-->
<!--                url: "",-->
<!--                picture: "",-->
<!--                purchased: false-->
<!--            },-->
<!--            itemId: null-->
<!--        };-->
<!--    },-->
<!--    created() {-->
<!--        this.getWishlist();-->
<!--    },-->
<!--    methods: {-->
<!--        getWishlist: async function () {-->
<!--            const q = query(collection(db, '/wishlists'), where('uniqueId', '==', this.uuid));-->
<!--            const wishlist = await getDocs(q);-->

<!--            if (wishlist.size > 0) {-->
<!--                // @ts-ignore-->
<!--                this.wishlistId = wishlist.docs[0].id;-->
<!--                // @ts-ignore-->
<!--                this.wishlist = wishlist.docs[0].data();-->

<!--                await this.getWishlistItem();-->
<!--            }-->
<!--        },-->
<!--        getWishlistItem: async function () {-->
<!--            const q = query(collection(db, '/wishlistItems'), where('uuid', '==', this.itemUuid));-->
<!--            const wishlistItems = await getDocs(q);-->

<!--            if (wishlistItems.size > 0) {-->
<!--                // @ts-ignore-->
<!--                this.item = wishlistItems.docs[0].data();-->

<!--                // @ts-ignore-->
<!--                this.itemId = wishlistItems.docs[0].id;-->
<!--            }-->
<!--        },-->
<!--        togglePurchased: function () {-->
<!--            // @ts-ignore-->
<!--            this.item.purchased = !this.item.purchased-->

<!--            // @ts-ignore-->
<!--            updateDoc(doc(collection(db, '/wishlistItems'), this.itemId), {-->
<!--                // @ts-ignore-->
<!--                purchased: this.item.purchased-->
<!--            });-->
<!--        },-->
<!--    },-->
<!--    computed: {-->
<!--        formattedPrice: function () {-->
<!--            // @ts-ignore-->
<!--            return numeral(this.item.price).format('0.00');-->
<!--        },-->
<!--        imageLocation: function () {-->
<!--            // return `/assets/img/${this.item.picture}`;-->
<!--            // @ts-ignore-->
<!--            return `${this.item.picture}`;-->
<!--        },-->
<!--    },-->
<!--});-->
<!--</script>-->

<!--<style scoped></style>-->