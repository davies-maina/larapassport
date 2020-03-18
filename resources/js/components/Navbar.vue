<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
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
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Nbitists</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="shrink p-5">
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
    }
};
</script>
