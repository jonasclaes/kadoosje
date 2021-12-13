import { IWishlist } from "@/store";
import config from "./config";

export default class API {
  static async getWishlists(): Promise<IWishlist[]> {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/wishlists`);
      const json = await response.json();

      return json.wishlists;
    } catch (error) {
      return [];
    }
  }

  static async getWishlist(uniqueId: string): Promise<IWishlist[]> {
    try {
      const response = await fetch(
        `${config.API_ENDPOINT}/api/wishlists/${uniqueId}`
      );
      const json = await response.json();

      return json.wishlist;
    } catch (error) {
      return [];
    }
  }

  static async createWishlist(wishlist: IWishlist): Promise<boolean> {
    try {
      await fetch(`${config.API_ENDPOINT}/api/wishlists`, {
        body: JSON.stringify({
          wishlist,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  static async updateWishlist(
    uniqueId: string,
    wishlist: IWishlist
  ): Promise<boolean> {
    try {
      await fetch(`${config.API_ENDPOINT}/api/wishlists/${uniqueId}`, {
        body: JSON.stringify({
          wishlist,
        }),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  static async deleteWishlist(uniqueId: string): Promise<boolean> {
    try {
      await fetch(`${config.API_ENDPOINT}/api/wishlists/${uniqueId}`, {
        method: "DELETE",
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
