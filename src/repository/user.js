import { BACKEND_URL } from "../config";

export async function AddUserRepository(user) {
    const response = await fetch(BACKEND_URL + "/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Origin: "*",
        },
        body: JSON.stringify(user),
    });
    console.log(response);
    return response;
}

export async function SignInUserRepository(user) {
    const response = await fetch(BACKEND_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Origin": "*",
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    });
    return response;
}

export async function GetUsernameByTokenRepository(token) {
    const response = await fetch(BACKEND_URL + "/username", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Accept': 'application/json',
            'Authorization': token
        }
    });
    return response;
}

export function IsUserLogged() {
    let token = null
    try {
        const ls = JSON.parse(localStorage.getItem('persist:root'))
        const parseUser = JSON.parse(ls.user)
        token = parseUser.user.userToken;
    } catch (err) {
        return false
    }
    return token !== null
}