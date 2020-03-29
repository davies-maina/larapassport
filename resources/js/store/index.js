import { getLocalUser } from "../helpers/auth";

const userAuth = getLocalUser();

export default {
    state: {
        currentUser: userAuth,
        isLoggedIn: !!userAuth, //boolean
        loading: false,
        auth_error: null,
        snackbar: false,
        text: null
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
        },
        snackbar(state) {
            return state.snackbar;
        },
        text(state) {
            return state.text;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },

        login_success(state, payload) {
            state.loading = false;

            state.text = "Logged in!";
            state.auth_error = null;
            state.isLoggedIn = true;
            state.currentUser = Object.assign({}, payload.logged_in_user, {
                token: payload.access_token
            });

            localStorage.setItem("user", JSON.stringify(state.currentUser));
            state.snackbar = true;
        },

        login_error(state, payload) {
            state.loading = false;
            state.snackbar = true;
            state.auth_error = payload;
            state.text = payload;
            /* state.isLoggedIn = false; */
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
            state.snackbar = true;
            state.text = "Logged out!";
        },
        signup(state) {
            state.loading = true;
            state.auth_error = null;
            state.snackbar = true;
        },
        signup_success(state) {
            state.loading = false;
            state.auth_error = null;
            state.snackbar = true;
            state.text = "Signed up!";
        },

        signup_error(state, payload) {
            state.loading = false;
            state.snackbar = true;
            state.auth_error = payload;
            state.text = payload;
        },

        forgotpassword(state) {
            state.loading = true;

            state.snackbar = true;
        },
        forgotpassword_success(state, payload) {
            state.loading = false;

            state.text = "Email sent";
            state.snackbar = true;
        },
        forgotpassword_error(state, payload) {
            state.loading = false;

            state.text = "Email not found";
            state.snackbar = true;
        },

        resetpassword(state) {
            state.loading = true;
        },
        resetpassword_success(state, payload) {
            state.loading = false;
        },
        resetpassword_error(state, payload) {
            state.loading = false;
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        }
    },
    modules: {}
};