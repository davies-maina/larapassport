export function forgotpassword(email) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/password/create", email)
            .then(response => {
                resolve(response);
            })

        .catch(error => {
            reject(error);
        });
    });
}