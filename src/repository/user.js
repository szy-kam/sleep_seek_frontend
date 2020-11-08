import { DB_URL } from "../config";

export async function AddUserRepository(user) {
    const response = await fetch(DB_URL + "/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Origin: "*",
        },
        body: JSON.stringify(user),
    });
    return response;
}
