<template>
  <div>
    <h1 class="font-semibold text-3xl">Nieuw product</h1>
    <form @submit="handleScraperForm" v-if="step === 1" id="scraperForm">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <div class="flex flex-col">
          <label for="url">Productlink:</label>
          <input type="url" name="url" id="url" />
          <small>Vul hier een link in van een product.</small>
        </div>
        <button
          class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white"
          type="submit"
        >
          Gegevens ophalen
        </button>
      </div>
    </form>
    <form @submit="handleProductForm" v-if="step === 2" id="productForm">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <div class="flex flex-col">
          <label for="name">Naam:</label>
          <input type="text" name="name" id="name" v-model="newProduct.name" />
          <small>Vul hier de product naam in.</small>
        </div>
        <div class="flex flex-col">
          <label for="description">Omschrijving:</label>
          <input
            type="text"
            name="description"
            id="description"
            v-model="newProduct.description"
          />
          <small>Vul hier de product omschrijving in.</small>
        </div>
        <div class="flex flex-col">
          <label for="currency">Munteenheid:</label>
          <input
            type="text"
            name="currency"
            id="currency"
            v-model="newProduct.currency"
          />
          <small>Vul hier de product munteenheid in.</small>
        </div>
        <div class="flex flex-col">
          <label for="price">Prijs:</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            v-model="newProduct.price"
          />
          <small>Vul hier de product prijs in.</small>
        </div>
        <div class="flex flex-col">
          <label for="url">Link:</label>
          <input type="url" name="url" id="url" v-model="newProduct.url" />
          <small>Vul hier de product link in.</small>
        </div>
        <div class="flex flex-col">
          <label for="picture">Foto:</label>
          <input
            type="url"
            name="picture"
            id="picture"
            v-model="newProduct.picture"
          />
          <small>Vul hier een link naar de productfoto in.</small>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
        <button
          class="bg-green-500 hover:bg-green-600 p-3 rounded shadow-lg text-white"
          type="submit"
        >
          Toevoegen aan lijstje
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Scraper } from "@/providers/scraper";
import store, { IWishlist, IWishlistItem } from "@/store";
import { Vue } from "vue-class-component";

export default class AddProduct extends Vue {
  step = 1;
  wishlist: IWishlist | null = null;

  newProduct: IWishlistItem = {
    created_at: new Date(),
    updated_at: new Date(),
    name: "",
    description: "",
    currency: "",
    price: 0.0,
    url: "",
    picture: "",
    purchased: false,
  };

  created(): void {
    this.wishlist = store.getters.wishlist(this.$route.params.uniqueId);
  }

  async handleScraperForm(event: Event): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    const scrapedData = await Scraper.scrape(data.get("url") as string);

    if (scrapedData.title) this.newProduct.name = scrapedData.title;
    if (scrapedData.description)
      this.newProduct.description = scrapedData.description;
    if (scrapedData.image) this.newProduct.picture = scrapedData.image;
    if (scrapedData.url) this.newProduct.url = scrapedData.url;
    if (scrapedData.currency) this.newProduct.currency = scrapedData.currency;
    if (scrapedData.price) this.newProduct.price = scrapedData.price;

    this.step = 2;
  }

  async handleProductForm(event: Event): Promise<void> {
    event.preventDefault();

    // console.log(this.newProduct);
    store.commit("addProduct", {
      index: store.getters.wishlists.indexOf(this.wishlist),
      product: this.newProduct,
    });

    this.$router.push(`/wishlists/${this.wishlist?.uniqueId}`);
  }

  openWishlist(uniqueId: string): void {
    this.$router.push(`/wishlists/${uniqueId}`);
  }
}
</script>
