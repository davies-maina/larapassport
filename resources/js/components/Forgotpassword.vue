<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Forgot password</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            @submit.prevent="sendForgetPassword"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                prepend-icon="email"
                            />

                            <v-spacer />
                            <v-btn
                                color="primary"
                                :disabled="!valid"
                                type="submit"
                                >Send email</v-btn
                            >
                        </v-form>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <div class="text-center ma-2">
            <v-snackbar v-model="snackbar">
                hfhf
                <v-btn color="pink" text @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
        </div>
    </v-container>
</template>

<script>
import { forgotpassword } from "../helpers/forgotpassword";
export default {
    name: "Forgotpassword",
    data() {
        return {
            valid: true,

            snackbar: this.$store.state.snackbar,
            form: {
                email: ""
            },

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ]
        };
    },
    methods: {
        sendForgetPassword() {
            if (this.valid) {
                this.$store.dispatch("forgotpassword");

                forgotpassword(this.$data.form)
                    .then(res => {
                        this.$store.commit("forgotpassword_success");
                        console.log(this.$store.getters.snackbar);
                    })
                    .catch(error => {
                        this.$store.commit("forgotpassword_error", error);
                        /* console.log(this.$store.getters.success_message); */
                        console.log(this.$data.snackbar);
                    });
            }
        }
    }
};
</script>
