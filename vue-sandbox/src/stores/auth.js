export default {
    namespaced: true,
    state: {
        isLoggedIn: false,
        token: '',
        user: null
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
            localStorage.setItem('isLoggedIn', value);
        },
        setToken(state, value) {
            state.token = value;
            localStorage.setItem('token', value);
        },
        setUser(state, value) {
            state.user = value;
            localStorage.setItem('user', JSON.stringify(value));
        },
    },
    getters: {
        isLoggedIn() {return localStorage.getItem('isLoggedIn')},
        token: () => localStorage.getItem('token'),
        user: () => JSON.parse(localStorage.getItem('user'))
    },
    actions: {
        login({commit}, user) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('setUser', user);
                    commit('setToken', "asgj%^dgas65127fy^$fyhjasg908q121");
                    commit('setLoggedIn', true);
                    resolve(user);
                }, 1000);
            });
        },
        logout({commit}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('setUser', null);
                    commit('setToken', '');
                    commit('setLoggedIn', false);
                    resolve("Logged out");
                }, 1000);
            });
        }
    }
};
