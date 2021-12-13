<template>
  <div>
    <h1 class="font-semibold text-3xl">{{ wishlist?.name }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <button
        class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white"
        @click="openAddProduct(wishlist?.uniqueId)"
      >
        Nieuw product
      </button>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2"
    >
      <div
        class="bg-white rounded-xl shadow-lg"
        v-for="product in wishlist?.products"
        :key="product.name"
      >
        <img
          :src="product.picture"
          :alt="product.name"
          class="rounded-t-xl h-64 object-scale-down mx-auto"
        />
        <div class="p-3">
          <p class="font-semibold break-words">{{ product.name }}</p>
          <p>{{ getPriceText(product.currency, product.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store, { IWishlist } from "@/store";
import { Vue } from "vue-class-component";
import numeral from "numeral";

export default class Wishlist extends Vue {
  wishlist: IWishlist | null = null;

  created(): void {
    this.wishlist = store.getters.wishlist(this.$route.params.uniqueId);
  }

  getAmountOfProductsText(amountOfProducts: number): string {
    if (amountOfProducts === 1) return "Er staat 1 product op dit wenslijstje.";
    if (amountOfProducts > 1)
      return `Er staan ${amountOfProducts} producten op dit wenslijstje.`;
    return "Er staan geen producten op dit wenslijstje.";
  }

  getPriceText(currency: string, price: number): string {
    return `${currency} ${numeral(price).format("0,0.00")}`;
  }

  openAddProduct(uniqueId = ""): void {
    this.$router.push(`/wishlists/${uniqueId}/addProduct`);
  }
}
</script>
