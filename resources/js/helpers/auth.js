export function login(credentials) {
    return new Promise((res, rej) => {
        axios
            .post("/api/login", credentials)
            .then(response => {
                res(response.data)
            })
            .catch(error => {
                rej('wrong email or pass')
            });
    });
}

export function getLocalUser() {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    }

    return null;
}

export function signup(credentials) {

    return new Promise((res, rej) => {

        axios
            .post("/api/register", credentials)
            .then(response => {
                if (response.data && response.status == 201) {
                    /* this.snackbar.show = true; */

                    res(response.data)
                }
            })
            .catch((error) => {
                rej(error)
            });
    })
}