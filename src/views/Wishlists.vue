<template>
  <div>
    <h1 class="font-semibold text-3xl">Wishlists</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <button
        class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white"
        @click="addWishlist"
      >
        Create wishlist
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
      <div
        class="bg-white p-3 rounded-xl shadow-lg cursor-pointer"
        v-for="wishlist in wishlists"
        :key="wishlist.name"
        @click="openWishlist(wishlist.uniqueId)"
      >
        <h2 class="text-lg font-semibold">{{ wishlist.name }}</h2>
        <h3>{{ getAmountOfProductsText(wishlist.products.length) }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store, { IWishlist } from "@/store";
import { Vue } from "vue-class-component";

export default class Wishlists extends Vue {
  wishlists: IWishlist[] = [];

  created(): void {
    this.wishlists = store.getters.wishlists;
  }

  getAmountOfProductsText(amountOfProducts: number): string {
    if (amountOfProducts === 1) return "Er staat 1 product op dit wenslijstje.";
    if (amountOfProducts > 1)
      return `Er staan ${amountOfProducts} producten op dit wenslijstje.`;
    return "Er staan geen producten op dit wenslijstje.";
  }

  openWishlist(uniqueId: string): void {
    this.$router.push(`/wishlists/${uniqueId}`);
  }

  addWishlist(): void {
    this.$router.push(`/wishlists/addWishlist`);
  }
}
</script>
