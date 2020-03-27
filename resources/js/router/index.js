import Login from "../components/Auth/Login.vue";
import Signup from "../components/Auth/Signup.vue";
import dash from "../components/Dashboard.vue";

export const routes = [{
        path: "/login",
        name: "Login",
        component: Login
    },

    {
        path: "/signup",
        name: "Signup",
        component: Signup
    },

    {
        path: "/dash",
        name: "Dash",
        component: dash,

        meta: {
            requiresAuth: true
        }
    }
];