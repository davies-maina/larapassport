<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <template v-if="!currentUser">
                    <v-list-item :to="{ name: 'Login' }">
                        <v-list-item-action>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Login
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/signup">
                        <v-list-item-action>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Signup</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-else>
                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                        <v-list-item-action>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="title">{{
                                currentUser.name
                            }}</v-list-item-title>
                            <!-- <v-list-item-subtitle></v-list-item-subtitle> -->
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/dash">
                        <v-list-item-action>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Nbitists</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="shrink" cols="12" sm="12" md="12">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: null
        };
    },
    created() {
        this.$vuetify.theme.dark = true;
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/login");
        }
    },

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    }
};
</script>
