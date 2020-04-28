<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="12">
                <div class="dashboard">
                    <h1 class="subheading grey--text">Users List</h1>

                    <v-container fluid>
                        <!-- <v-layout row justify-start class="mb-3">
                            <v-tooltip top>
                                <v-btn
                                    small
                                    flat
                                    color="grey"
                                    @click="sortBy('title')"
                                    slot="activator"
                                >
                                    <v-icon small left>folder</v-icon>
                                    <span class="caption text-lowercase"
                                        >By project name</span
                                    >
                                </v-btn>
                                <span>Sort by project name</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <v-btn
                                    small
                                    flat
                                    color="grey"
                                    @click="sortBy('person')"
                                    slot="activator"
                                >
                                    <v-icon small left>person</v-icon>
                                    <span class="caption text-lowercase"
                                        >By Person</span
                                    >
                                </v-btn>
                                <span>Sort by project author</span>
                            </v-tooltip>
                        </v-layout> -->
                        <div>
                            <template v-if="!users.length">
                                <v-card flat>
                                    <h3 class="subheading white--text">
                                        No users found
                                    </h3>
                                </v-card>
                            </template>
                            <template v-else>
                                <v-card>
                                    <v-layout
                                        row
                                        v-for="user in users"
                                        :key="user.id"
                                    >
                                        <v-flex x2 md2>
                                            <div class="caption grey--text">
                                                Name
                                            </div>
                                            <div>{{ user.name }}</div>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2>
                                            <div class="caption grey--text">
                                                Email
                                            </div>
                                            <div>{{ user.email }}</div>
                                        </v-flex>
                                        <v-flex xs6 sm4 md2>
                                            <div class="caption grey--text">
                                                Joined
                                            </div>
                                            <div>{{ user.created_at }}</div>
                                        </v-flex>
                                        <v-flex xs6 sm4 md2>
                                            <div class="caption grey--text">
                                                last online at
                                            </div>
                                            <div>
                                                {{
                                                    user.last_online_at
                                                        | moment("calendar")
                                                }}
                                            </div>
                                        </v-flex>
                                        <v-flex xs6 sm4 md2>
                                            <div class="caption grey--text">
                                                Role
                                            </div>
                                            <div>
                                                {{
                                                    user.roles.map(role => {
                                                        return role.name;
                                                    })
                                                }}
                                            </div>
                                        </v-flex>
                                        <v-flex xs2 sm4 md2>
                                            <div class="right">
                                                <v-chip
                                                    small
                                                    class="
                                                white--text my-2 caption
                                            "
                                                    >Actions</v-chip
                                                >
                                            </div>
                                            <!-- <v-btn
                                            text
                                            small
                                            color="primary"
                                            @click="editUser(user)"
                                            >Edit</v-btn
                                        > -->

                                            <v-btn
                                                color="primary"
                                                dark
                                                @click.stop="editUser(user)"
                                                >Edit</v-btn
                                            >

                                            <v-btn
                                                text
                                                small
                                                color="red"
                                                @click="deleteUser(user.id)"
                                                >Delete</v-btn
                                            >
                                        </v-flex>
                                    </v-layout>
                                    <edituser
                                        v-if="$store.getters.dialogue"
                                    ></edituser>
                                    <v-divider></v-divider>
                                </v-card>
                            </template>
                        </div>
                    </v-container>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import edituser from "../Admin/EditUser";
export default {
    name: "AdminUsers",
    components: {
        edituser
    },

    mounted() {
        this.$store.dispatch("getUser");
        /* console.log(this.users); */
    },
    computed: {
        users() {
            return this.$store.getters.users;
        },
        dialogue() {
            this.$store.getters.dialogue;
        }
    },
    methods: {
        editUser(user) {
            /* this.$store.dispatch("cDialogue"); */

            this.$store.dispatch("getEditUser", user);
            /* this.$store.commit("getRoles"); */
            /* console.log(this.$store.getters.dialogue); */
        },
        deleteUser(userId) {
            this.$store.dispatch("deleteUser", userId);
        }
    }
};
</script>

<style scoped>
.project.complete {
    border-left: 4px solid #3cd1c2;
}
.project.ongoing {
    border-left: 4px solid #ffaa2c;
}
.project.overdue {
    border-left: 4px solid #f83e70;
}
.v-chip.complete {
    background: #3cd1c2;
}
.v-chip.ongoing {
    background: #ffaa2c;
}
.v-chip.overdue {
    background: #f83e70;
}
</style>
