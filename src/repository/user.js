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
            Origin: "*",
        },
        body: JSON.stringify(user),
    });
    return response;
}
