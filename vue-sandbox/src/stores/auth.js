export default {
    namespaced: true,
    state: {
        isLoggedIn: false,
        token: '',
        user: null,
        loggingIn: false,
        loggingOut: false,
    },
    mutations: {
        setLoggingIn(state, value) {
            state.loggingIn = value;
        },
        setLoggingOut(state, value) {
            state.loggingOut = value;
        },
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
    actions: {
        login({commit}, user) {
            commit('setLoggingIn', true);
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('setUser', user);
                    commit('setToken', "asgj%^dgas65127fy^$fyhjasg908q121");
                    commit('setLoggedIn', true);
                    commit('setLoggingIn', false);
                    resolve(user);
                }, 1000);
            });
        },
        logout({commit}) {
            commit('setLoggingOut', true);
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('setUser', '');
                    commit('setToken', '');
                    commit('setLoggedIn', '');
                    commit('setLoggingOut', false);
                    resolve("Logged out");
                }, 1000);
            });
        }
    }
};
