<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Reset password</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            @submit.prevent="sendResetCred"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                prepend-icon="email"
                            />
                            <v-text-field
                                id="password"
                                label="Password"
                                v-model="form.password"
                                :rules="passwordRule"
                                prepend-icon="lock"
                                type="password"
                                required
                            />

                            <!-- <span class="red--text" v-if="errors.password">{{
                                errors.password[0]
                            }}</span> -->

                            <v-text-field
                                id="confirm_password"
                                label="confirm password"
                                v-model="form.password_confirmation"
                                :rules="confirm_passwordRule"
                                name="password_confirmation"
                                prepend-icon="lock"
                                type="password"
                                required
                            />

                            <div
                                style="color:red"
                                class="p-2"
                                v-if="form.password_confirmation"
                            >
                                {{ comparePasswords }}
                            </div>

                            <v-spacer />
                            <v-btn
                                color="primary"
                                :disabled="!valid"
                                type="submit"
                                >Reset password</v-btn
                            >
                        </v-form>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { resetPassword } from "../helpers/resetpassword";
export default {
    name: "find",
    data() {
        return {
            valid: true,

            snackbar: this.$store.state.snackbar,
            form: {
                email: "",
                password: "",
                password_confirmation: "",
                token: ""
            },

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            passwordRule: [
                v => !!v || "Password is required is required",
                v =>
                    (v && v.length >= 5) ||
                    "Password must be more than 5 characters"
            ],
            confirm_passwordRule: [v => !!v || "confirm pass is required"]
        };
    },
    methods: {
        sendResetCred() {
            if (this.valid) {
                this.$store.commit("resetpassword");
                let tokenGet = this.$route.params.token;
                /* console.log(token); */
                this.form.token = tokenGet;
                resetPassword(this.$data.form)
                    .then(res => {
                        this.$store.commit("resetpassword_success");
                        /* console.log(this.$store.getters.snackbar); */
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        this.$store.commit("resetpassword_error", error);
                        /* console.log(this.$store.getters.success_message); */
                        /* console.log(this.$data.snackbar); */
                    });
            }
        }
    },
    computed: {
        comparePasswords() {
            if (this.form.password !== this.form.password_confirmation) {
                return "passwords do not match";
            }
        }
    }
};
</script>
