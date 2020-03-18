import Login from '../components/Auth/Login.vue'
import Signup from '../components/Auth/Signup.vue'
export default {

    mode: 'history',
    routes: [

        {
            path: '/login',
            name: 'Login',
            component: Login,
        },

        {

            path: '/signup',
            name: 'Signup',
            component: Signup,

        }
    ]


}