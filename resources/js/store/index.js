import { getLocalUser } from "../helpers/auth";
import Axios from "axios";

const userAuth = getLocalUser();

export default {
    state: {
        currentUser: userAuth,
        isLoggedIn: !!userAuth, //boolean
        loading: false,
        auth_error: null,
        snackbar: false,
        text: null,
        users: [],
        editUser: [],
        roles: [],
        dialogue: false,

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
        },
        users(state) {
            return state.users;
        },
        editUser(state) {
            return state.editUser;
        },
        roles(state) {

            return state.roles;
        },
        dialogue(state) {

            return state.dialogue;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
            state.snackbar = true;
            state.text = "Logging you in...";
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
            /* state.snackbar = true; */
        },

        login_error(state, payload) {
            state.loading = false;
            state.snackbar = true;
            /* state.auth_error = payload; */
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
            state.text = "Sending email...";
        },
        forgotpassword_success(state, payload) {
            state.loading = false;

            state.text = "Email sent";
            state.snackbar = true;
        },
        forgotpassword_error(state, payload) {
            state.loading = false;

            state.text = payload;
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
        },
        updateUsers(state, payload) {

            state.users = payload.users;
            /* console.log('users', state.roles = payload.all_roles; state.users) */
            /*  */
            /* state.roles.push(payload.all_roles); */
            state.roles = payload.all_roles;
            /* console.log(state.roles) */


        },


        /*  getRoles(state) { */
        /* let roles = state.roles; */
        /* console.log(state.roles) */

        /*  roles.forEach(myFunction)

         function myFunction(item, index) {

             console.log(item.roles[0].name, item.roles[0].role_id);
             state.roles.push(item.roles[0]);

         } */
        /* console.log(roles) */

        /*   }, */

        clear(state) {
            state.snackbar = false;
            state.text = null;
        },
        deleteUser(state, payload) {
            let users = state.users.filter(u => u.id !== payload);
            state.users = users;
        },
        getEditUser(state, payload) {
            /* console.log(payload) */
            /* console.log(payload.roles[0].role_id) */
            state.editUser = payload.roles;
            state.dialogue = true;

        },
        closeDialogue(state) {

            /*  state.dialogue = false; */
            state.roles = [];
        },
        closeEditUser(state) {

            state.dialogue = false;
        }

    },
    actions: {
        login(context) {
            context.commit("login");
        },
        getUser({ commit }) {
            Axios.get("/api/admin/users").then(res => {
                commit("updateUsers", res.data);
                /*  console.log(res.data) */
            });
        },

        clear({ commit }) {
            commit("clear");
        },

        /* editUser({ commit }, payload) {
            Axios.put(`/api/admin/users/${payload}`).then(res => {
                console.log(res);
            });
        }, */
        getEditUser({ commit }, payload) {

            commit('getEditUser', payload);

        },
        deleteUser({ commit }, payload) {
            Axios.delete(`/api/admin/users/${payload}`)
                .then((res) => {

                    commit('deleteUser', payload)
                })

        },
        cDialogue({ commit }) {

            commit('closeDialogue');
        }
    },
    modules: {}
};