import {createStore} from 'vuex';
import account from './modules/account';
import wishlists from './modules/wishlist';
import wishlistItems from './modules/wishlistItems';

// Global store
const state = {
    error: {},
};

const getters = {
    // @ts-ignore
    getError: (state) => state.error,
};

const actions = {};

const mutations = {
    // @ts-ignore
    setError: (state, error) => (state.error = error),
};

const store = createStore({
    state,
    getters,
    actions,
    mutations,
    modules: {
        account,
        wishlists,
        wishlistItems,
    },
});

export default store;
