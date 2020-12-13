import { BACKEND_URL } from "../config";

export async function StaysCardRepository(pageNumber, pageSize) {
    let newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    if (response.status === 200) return response.json();
    else return [];
}

export async function GetStaysByUserId(userId, pageNumber, pageSize) {
    let newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&userId=" + userId;
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    if (response.status === 200) return response.json();
    else return [];
}