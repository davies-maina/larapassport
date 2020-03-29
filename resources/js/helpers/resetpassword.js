export function resetPassword(credentials) {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/password/reset", credentials)
            .then(res => {
                resolve(res);
            })

        .catch(error => {
            reject(error);
        });
    });
}