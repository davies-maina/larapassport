<template>
    <v-row justify="center">
        <v-dialog value="g" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ editUserRoles.name }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <p>{{ rolesArray }}</p>
                                <v-checkbox
                                    v-model="rolesArray"
                                    v-for="role in roles"
                                    :key="role.id"
                                    :label="role.name"
                                    :value="role.id"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-container>
                    <!--  <small>*indicates required field</small> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="$store.state.dialogue = false"
                        >Close</v-btn
                    >
                    <v-btn color="blue darken-1" @click="updateUserRole"
                        >Save</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            rolesArray: []
        };
    },

    created() {
        /* this.$vuetify.theme.dark = false; */
        /*  console.log(this.editUserRoles.role_id); */
        /* console.log(this.dialogue); */
        /* this.editUserRoles.forEach(role => {
            console.log(role);
        }); */
        /* console.log(this.editUserRoles.roles[0].role_id); */
        /* this.rolesArray = this.editUserRoles.roles[0].role_id; */
        /* console.log(this.editUserRoles.name); */
        /* this.rolesArray.push(this.editUserRoles[0].role_id);
        console.log(this.editUserRoles); */

        this.editUserRoles.forEach(role => {
            this.rolesArray.push(role.role_id);
        });
    },

    computed: {
        roles() {
            return this.$store.getters.roles;
        },

        editUserRoles() {
            return this.$store.getters.editUser;
        }

        /* dialogue() {
            return this.$store.getters.dialogue;
        } */
    },
    methods: {
        updateUserRole() {
            axios
                .put(
                    `/api/admin/users/${this.editUserRoles[0].user_id}`,
                    this.rolesArray
                )
                .then(res => {
                    this.$store.dispatch("getUser");
                    this.$store.commit("closeEditUser");
                });
            /* console.log(this.rolesArray); */
        }
    }
};
</script>
