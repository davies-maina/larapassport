<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Sign up</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            @submit.prevent="signUp"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="form.name"
                                :rules="nameRules"
                                label="Name"
                                required
                                prepend-icon="person_outline"
                            />
                            <!-- <span class="red--text" v-if="errors.name">{{
                                errors.name[0]
                            }}</span> -->
                            <v-text-field
                                v-model="form.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                prepend-icon="email"
                            />

                            <!-- <span class="red--text" v-if="errors.email">{{
                                errors.email[0]
                            }}</span> -->
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
                                v-model="password_confirmation"
                                :rules="confirm_passwordRule"
                                name="password_confirmation"
                                prepend-icon="lock"
                                type="password"
                                required
                            />
                            <div
                                style="color:red"
                                class="p-2"
                                v-if="password_confirmation"
                            >
                                {{ comparePasswords }}
                            </div>

                            <v-spacer />
                            <v-btn
                                color="primary"
                                :disabled="!valid"
                                @click="validate"
                                type="submit"
                                >Sign up</v-btn
                            >
                        </v-form>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                </v-card>
                <div class="text-center ma-2">
                    <!-- <v-btn dark @click="snackbar = true">Open Snackbar</v-btn> -->
                    <v-snackbar v-model="snackbar.show">
                        {{ snackbar.text }}
                        <v-btn color="pink" text @click="snackbar.show = false">
                            Close
                        </v-btn>
                    </v-snackbar>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Signup",
    data() {
        return {
            valid: true,
            form: {
                name: "",
                email: "",
                password: ""
            },
            password_confirmation: "",
            passwordRule: [
                v => !!v || "Password is required is required",
                v =>
                    (v && v.length >= 5) ||
                    "Password must be more than 5 characters"
            ],

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            nameRules: [v => !!v || "Name is required"],
            confirm_passwordRule: [v => !!v || "confirm pass is required"],
            errors: {},
            snackbar: {
                show: false,
                text: "success"
            }
        };
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                /*  this.snackbar = true; */
            }
        },
        signUp() {
            if (this.valid) {
                axios
                    .post("/api/register", this.form)
                    .then(res => {
                        if (res.data && res.status == 201) {
                            /* this.snackbar.show = true; */

                            this.snackbar = {
                                show: true,
                                text: "success"
                            };

                            this.$router.push("/login");
                        }
                    })
                    .catch(() => {
                        this.snackbar = {
                            show: true,
                            text: "failed"
                        };
                    });
            }
        }
    },

    created() {},
    computed: {
        comparePasswords() {
            if (this.form.password !== this.password_confirmation) {
                return "passwords do not match";
            }
        }
    }
};
</script>
