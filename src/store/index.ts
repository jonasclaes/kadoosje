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
  },
  mutations: {
    setWishlists(state, data) {
      state.wishlists = data;
    },
    setWishlist(state, data: { index: number; wishlist: IWishlist }) {
      state.wishlists[data.index] = data.wishlist;
    },
    addWishlist(state, wishlist: IWishlist) {
      state.wishlists.push(wishlist);
    },
    addProduct(state, data: { index: number; product: IWishlistItem }) {
      state.wishlists[data.index].products.push(data.product);
    },
  },
  actions: {
    loadWishlists(context) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const data: IWishlist[] = require("../../wishlists.json");

      context.commit("setWishlists", data);
    },
  },
  modules: {},
});
