import { getLocalUser } from "../helpers/auth";

const userAuth = getLocalUser();

export default {
    state: {
        currentUser: userAuth,
        isLoggedIn: !!userAuth, //boolean
        loading: false,
        auth_error: null
    },

    getters: {
        currentUser(state) {
            return state.currentUser;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        loading(state) {
            return state.loading;
        },
        auth_error(state) {
            return state.auth_error;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },

        login_success(state, payload) {
            state.loading = false;
            state.auth_error = null;
            state.isLoggedIn = true;
            state.currentUser = Object.assign({}, payload.logged_in_user, {
                token: payload.access_token
            });

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },

        login_error(state, payload) {
            state.loading = false;
            state.auth_error = payload;
            /* state.isLoggedIn = false; */
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        signup(state) {
            state.loading = true;
            state.auth_error = null;
        },
        signup_success(state) {

            state.loading = false;
            state.auth_error = null;
        },

        signup_error(state, payload) {
            state.loading = false;
            state.auth_error = payload
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        }
    },
    modules: {}
};