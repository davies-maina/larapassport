export function forgotpassword(email) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/password/create", email)
            .then(response => {
                resolve(response);
            })

        .catch(error => {
            if (error.message == "Request failed with status code 500") {
                reject("Check your network");
            } else if (
                error.message == "Request failed with status code 404"
            ) {
                reject("we cannot find a user with that email address");
            } else {
                reject("unknown error");
            }
        });
    });
}