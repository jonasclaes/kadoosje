<template>
  <div>
    <h1 class="font-semibold text-3xl">Nieuw product</h1>
    <form @submit="handleWishlistForm" id="wishlistForm">
      <div class="grid grid-cols-1 gap-3 mt-2">
        <div class="flex flex-col">
          <label for="name">Naam:</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="wishlist.name"
            class="border-none bg-gray-200 rounded-md"
          />
          <small>Vul hier de naam van je verlanglijstje in.</small>
        </div>
        <button
          class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white"
          type="submit"
        >
          Verlanglijstje toevoegen
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import store, { IWishlist } from "@/store";
import { Vue } from "vue-class-component";

export default class AddProduct extends Vue {
  wishlist: IWishlist = {
    created_at: new Date(),
    updated_at: new Date(),
    name: "",
    uniqueId: this.generateRandomString(8),
    products: [],
  };

  async handleWishlistForm(event: Event): Promise<void> {
    event.preventDefault();

    store.commit("addWishlist", this.wishlist);

    this.openWishlist(this.wishlist.uniqueId);
  }

  openWishlist(uniqueId: string): void {
    this.$router.push(`/wishlists/${uniqueId}`);
  }

  generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
</script>
