import api from '../../api';
import { Server } from '../../utils/config';

const state = {
    wishlistItems: [],
    wishlistItem: null,
};

const actions = {
    // @ts-ignore
    fetchWishlistItems: async ({ commit }, { filters, limit, offset, orderField, orderType, orderCast, search }) => {
        try {
            const data = await api.listDocuments(Server.collections.wishlistItems, {
                filters,
                limit,
                offset,
                orderField,
                orderType,
                orderCast,
                search,
            });
            commit('setWishlistItems', data.documents);
        } catch (e: any) {
            console.log('Could not fetch documents', e);
            commit(
                'setError',
                {
                    show: true,
                    message: 'Failed to fetch wishlists.',
                    color: 'red',
                },
                { root: true }
            );
        }
    },
    // @ts-ignore
    fetchWishlistItem: async ({ commit }, { documentId }) => {
        try {
            const data = await api.getDocument(Server.collections.wishlistItems, documentId);
            commit('setWishlistItem', data);
        } catch (e: any) {
            console.log('Could not fetch document', e);
            commit(
                'setError',
                {
                    show: true,
                    message: 'Failed to fetch wishlist.',
                    color: 'red',
                },
                { root: true }
            );
        }
    },
    // @ts-ignore
    addWishlistItem: async ({ commit }, { data, read, write }) => {
        try {
            const response = await api.createDocument(Server.collections.wishlistItems, data, read, write);
            commit('addWishlistItem', response);
        } catch (e: any) {
            console.log('Could not create document', e);
            commit(
                'setError',
                {
                    show: true,
                    message: 'Failed to add wishlist.',
                    color: 'red',
                },
                { root: true }
            );
        }
    },

    // @ts-ignore
    updateWishlistItem: async ({ commit }, { documentId, data, read, write }) => {
        try {
            const response = await api.updateDocument(Server.collections.wishlistItems, documentId, data, read, write);
            commit('updateWishlistItem', response);
        } catch (e: any) {
            console.log('Could not update document', e);
            commit(
                'setError',
                {
                    show: true,
                    message: 'Failed to update wishlist.',
                    color: 'red',
                },
                { root: true }
            );
        }
    },

    // @ts-ignore
    deleteWishlistItem: async ({ commit }, documentId) => {
        try {
            await api.deleteDocument(Server.collections.wishlistItems, documentId);
            commit('deleteWishlistItem', documentId);
        } catch (e: any) {
            console.log('Could not delete document', e);
            commit(
                'setError',
                {
                    show: true,
                    message: 'Failed to delete wishlist.',
                    color: 'red',
                },
                { root: true }
            );
        }
    },
};

const getters = {
    // @ts-ignore
    getWishlistItems: (state) => state.wishlistItems,

    // @ts-ignore
    getWishlistItem: (state) => state.wishlistItem,
};

const mutations = {
    // @ts-ignore
    setWishlistItems: (state, wishlistItems) => (state.wishlistItems = wishlistItems),

    // @ts-ignore
    setWishlistItem: (state, wishlistItem) => (state.wishlistItem = wishlistItem),

    // @ts-ignore
    addWishlistItem: (state, wishlistItem) => state.wishlistItems.unshift(wishlistItem),

    // @ts-ignore
    deleteWishlistItem: (state, id) =>
        // @ts-ignore
        (state.wishlistItems = state.wishlistItems.filter((wishlistItem) => wishlistItem['$id'] !== id)),

    // @ts-ignore
    updateWishlistItem: (state, updatedWishlistItem) => {
        const index = state.wishlistItems.findIndex(
            // @ts-ignore
            (wishlistItem) => wishlistItem['$id'] === updatedWishlistItem['$id']
        );
        if (index !== -1) {
            state.wishlistItems.splice(index, 1, updatedWishlistItem);
        }

        state.wishlistItem = updatedWishlistItem;
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
