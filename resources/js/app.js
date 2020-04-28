/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
Vue.use(VueRouter);
Vue.use(Vuex);
import Vuetify from "vuetify";

Vue.use(Vuetify);

import VueMoment from "vue-moment";


Vue.use(require('vue-moment'));
// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("appfooter", require("./components/Appfooter.vue").default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import { routes } from "./router/index";
import storeAppData from "./store/index";
import Axios from "axios";

const store = new Vuex.Store(storeAppData);

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    /* const requiresAuth = to.matched.some(record => record.meta.requiresAuth); */
    const currentUser = store.state.currentUser;
    /* const publicPages = [
        "/login",
        "/signup",
        "/forgot-password",
       
      
    ]; */

    const authRequired = to.matched.some(record => record.meta.requiresAuth);

    if (authRequired && !currentUser) {
        next("/login");
    } else if (
        (to.path == "/login" && currentUser) ||
        (to.path == "/signup" && currentUser)
    ) {
        next("/dash");
    } else {
        next();
    }
});

Axios.interceptors.response.use(null, (error) => {

    if (error.response.status == 401) {

        store.commit('logout');
        router.push('/login')
    }

    return Promise.reject(error)
})

const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    router,

    store
});