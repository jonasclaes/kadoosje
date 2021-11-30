import api from '../../api';
import { Server } from '../../utils/config';

const state = {
    wishlists: [],
};

const actions = {
    // @ts-ignore
    fetchWishlists: async ({ commit }) => {
        try {
            const data = await api.listDocuments(Server.collections.wishlists);
            commit('setWishlists', data.documents);
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
    addWishlist: async ({ commit }, { data, read, write }) => {
        try {
            const response = await api.createDocument(Server.collections.wishlists, data, read, write);
            console.log(response);
            commit('addWishlist', response);
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
    updateWishlist: async ({ commit }, { documentId, data, read, write }) => {
        try {
            const response = await api.updateDocument(Server.collections.wishlists, documentId, data, read, write);
            commit('updateWishlist', response);
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
    deleteWishlist: async ({ commit }, documentId) => {
        try {
            await api.deleteDocument(Server.collections.wishlists, documentId);
            commit('deleteWishlist', documentId);
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
    getWishlists: (state) => state.wishlists,
};

const mutations = {
    // @ts-ignore
    setWishlists: (state, wishlists) => (state.wishlists = wishlists),

    // @ts-ignore
    addWishlist: (state, wishlist) => state.wishlists.unshift(wishlist),

    // @ts-ignore
    deleteWishlist: (state, id) => (state.wishlists = state.wishlists.filter((wishlist) => wishlist['$id'] !== id)),

    // @ts-ignore
    updateWishlist: (state, updatedWishlist) => {
        // @ts-ignore
        const index = state.wishlists.findIndex((wishlist) => wishlist['$id'] === updatedWishlist['$id']);
        if (index !== -1) {
            state.wishlists.splice(index, 1, updatedWishlist);
        }
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
