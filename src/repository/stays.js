import { BACKEND_URL } from "../config";

export async function GetStaysRepository(pageNumber, pageSize) {
    let newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    if (response.status === 200) return response.json();
    else return [];
}

export async function GetStaysWithParamsRepository(pageNumber, pageSize, searchParams) {
    let newUrl
    if (searchParams) {
        newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&s=" + searchParams.name;
    }
    else {
        newUrl = BACKEND_URL + "/stays?pageNumber=" + pageNumber + "&pageSize=" + pageSize
    }
    const response = await fetch(newUrl, {
        headers: {
            Origin: "*",
        },
    });
    return response
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