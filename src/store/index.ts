import API from "@/providers/api";
import { createStore } from "vuex";

export type IWishlistItem = {
  created_at: Date;
  updated_at: Date;
  name: string;
  description?: string;
  currency: string;
  price: number;
  url: string;
  picture: string;
  purchased: boolean;
};

export type IWishlist = {
  created_at: Date;
  updated_at: Date;
  name: string;
  uniqueId: string;
  products: IWishlistItem[];
};

const wishlists: IWishlist[] = [];

export default createStore({
  state: {
    wishlists,
  },
  getters: {
    wishlists(state) {
      return state.wishlists;
    },
    wishlist: (state) => (uniqueId: string) => {
      const results = state.wishlists.filter(
        (wishlist: IWishlist) => wishlist.uniqueId === uniqueId
      );

      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    },
    product: (state) => (uniqueId: string, productName: string) => {
      const results = state.wishlists.filter(
        (wishlist: IWishlist) => wishlist.uniqueId === uniqueId
      );

      if (results.length > 0) {
        const products = results[0].products.filter(
          (product: IWishlistItem) => product.name === productName
        );

        if (products.length > 0) {
          return products[0];
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  mutations: {
    setWishlists(state, data) {
      state.wishlists = data;
    },
    async setWishlist(state, data: { index: number; wishlist: IWishlist }) {
      const oldWishlist = state.wishlists[data.index];

      state.wishlists[data.index] = data.wishlist;

      await API.updateWishlist(
        oldWishlist.uniqueId,
        state.wishlists[data.index]
      );
    },
    async setProduct(
      state,
      data: { index: number; productIndex: number; product: IWishlistItem }
    ) {
      const oldWishlist = state.wishlists[data.index];

      state.wishlists[data.index].products[data.productIndex] = data.product;

      await API.updateWishlist(
        oldWishlist.uniqueId,
        state.wishlists[data.index]
      );
    },
    async addWishlist(state, wishlist: IWishlist) {
      state.wishlists.push(wishlist);

      await API.createWishlist(wishlist);
    },
    async addProduct(state, data: { index: number; product: IWishlistItem }) {
      const oldWishlist = state.wishlists[data.index];

      state.wishlists[data.index].products.push(data.product);

      await API.updateWishlist(
        oldWishlist.uniqueId,
        state.wishlists[data.index]
      );
    },
  },
  actions: {
    async loadWishlists(context) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // const data: IWishlist[] = require("../../wishlists.json");
      const data: IWishlist[] = await API.getWishlists();

      context.commit("setWishlists", data);
    },
  },
  modules: {},
});
