import Login from "../components/Auth/Login.vue";
import Signup from "../components/Auth/Signup.vue";
import dash from "../components/Dashboard.vue";
import forgotpassword from "../components/Forgotpassword.vue";
import find from "../components/Resetpassword.vue";

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
        path: "/forgot-password",
        name: "Forgotpassword",
        component: forgotpassword
    },
    {
        path: "/password/find/:token",
        name: "find",
        component: find
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