import api from '../../api';

const state = {
    account: null,
    session: null,
};

const actions = {
    // @ts-ignore
    signup: async ({ commit }, { email, password, name }) => {
        try {
            const account = await api.createAccount(email, password, name);
            await api.createSession(email, password);
            commit('setAccount', account);
        } catch (e: any) {
            console.log('Error creating account.');
            commit(
                'setError',
                {
                    show: true,
                    message: e.message,
                    color: 'red',
                },
                { root: true }
            );
        }
    },

    // @ts-ignore
    fetchAccount: async ({ commit }) => {
        try {
            const account = await api.getAccount();
            commit('setAccount', account);
        } catch (e: any) {
            console.log('Error getting account');
        }
    },

    // @ts-ignore
    login: async ({ commit }, { email, password }) => {
        try {
            console.log(email, password);
            await api.createSession(email, password);
            const account = await api.getAccount();
            commit('setAccount', account);
        } catch (e: any) {
            console.log('Error creating session', e);
            commit(
                'setError',
                {
                    show: true,
                    message: e.message,
                    color: 'red',
                },
                { root: true }
            );
        }
    },

    // @ts-ignore
    logout: async ({ commit }) => {
        try {
            await api.deleteCurrentSession();
            commit('setAccount', null);
        } catch (e: any) {
            console.log('Error deleting session');
            commit(
                'setError',
                {
                    show: true,
                    message: e.message,
                    color: 'red',
                },
                { root: true }
            );
        }
    },
};

const getters = {
    // @ts-ignore
    getAccount: (state) => state.account,
    // @ts-ignore
    getSession: (state) => state.session,
};

const mutations = {
    // @ts-ignore
    setAccount: (state, account) => (state.account = account),
};

export default {
    state,
    actions,
    getters,
    mutations,
};
