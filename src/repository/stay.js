import { BACKEND_URL } from "../config";

export async function GetStayByIdRepository(id) {
    const response = await fetch(BACKEND_URL + "/stays/" + id);
    if (response.status === 200) return response.json();
    else return [];
}

export async function DeleteStayByIdRepository(id) {
    await fetch(BACKEND_URL + "/stays/" + id, {
        method: "DELETE",
    });
}

export async function AddStayRepository(stay) {
    const response = await fetch(BACKEND_URL + "/stays", {
        method: "POST",
        headers: {
            Origin: "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stay),
    });
    return response;
}

export async function EditStayRepository(stay) {
    await fetch(BACKEND_URL + "/stays/" + stay.id, {
        method: "PUT",
        headers: {
            Origin: "*",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(stay),
    })
        .catch((err) => {
            console.log(err);
        })
        .then((response) => {
            return response;
        });
}
// TODO error catch
