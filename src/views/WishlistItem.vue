<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 items-start"
    >
      <div class="flex flex-col space-y-3">
        <div class="bg-white rounded-xl shadow-lg">
          <img
            :src="product?.picture"
            :alt="product?.name"
            class="rounded-t-xl h-64 object-scale-down mx-auto"
          />
        </div>
        <div class="bg-white rounded-xl shadow-lg p-3 flex flex-col space-y-3">
          <button
            class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white w-full"
            @click="togglePurchased"
          >
            {{
              product?.purchased
                ? "Terug op lijstje zetten"
                : "Afvinken van lijstje"
            }}
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-600 p-3 rounded shadow-lg text-white w-full"
            @click="openProductPage"
          >
            Product pagina openen
          </button>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg md:col-span-2 lg:col-span-3 p-3"
      >
        <h1 class="font-semibold break-words text-3xl">{{ product?.name }}</h1>
        <p>{{ getPriceText(product?.currency, product?.price) }}</p>
        <p v-html="product?.description"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store, { IWishlist, IWishlistItem } from "@/store";
import { Vue } from "vue-class-component";
import numeral from "numeral";

export default class Wishlist extends Vue {
  product: IWishlistItem | null = null;

  created(): void {
    this.product = store.getters.product(
      this.$route.params.uniqueId,
      this.$route.params.productName
    );
  }

  getPriceText(currency = "", price = 0.0): string {
    return `${currency} ${numeral(price).format("0,0.00")}`;
  }

  togglePurchased(): void {
    if (this.product) {
      this.product.purchased = !this.product.purchased;

      const wishlist: IWishlist = store.getters.wishlist(
        this.$route.params.uniqueId
      );
      const index = store.getters.wishlists.indexOf(wishlist);
      const productIndex = wishlist.products.indexOf(this.product);

      store.commit("setProduct", {
        index,
        productIndex,
        product: this.product,
      });

      this.$router.push(`/wishlists/${this.$route.params.uniqueId}`);
    }
  }

  openProductPage(): void {
    window.open(this.product?.url);
  }
}
</script>
