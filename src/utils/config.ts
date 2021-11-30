export const Server = {
    endpoint: import.meta.env.VITE_APP_ENDPOINT,
    project: import.meta.env.VITE_APP_PROJECT,
    collections: {
        wishlists: <string>import.meta.env.VITE_WISHLISTS_COLLECTION_ID,
        wishlistItems: <string>import.meta.env.VITE_WISHLISTS_ITEMS_COLLECTION_ID,
    },
};
