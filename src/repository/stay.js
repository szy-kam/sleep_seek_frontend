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

export async function AddStayRepository(stay, files) {
    var formData = new FormData();

    if(files){
        files.map((file) => {
            formData.append(`newPhotos`, file);
            return null;
        });
    }
    
    formData.append('stay', JSON.stringify(stay));

    const response = await fetch(BACKEND_URL + "/stays", {
        method: "POST",
        headers: {
            "Origin": "*",
        },
        credentials: "include",
        body: formData
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
export async function GetReviewsByStayIdRepository(stayId, pageNumber, pageSize) {
    if(stayId)
        await fetch(
            BACKEND_URL + "/review/" + stayId + "?pageNumber=" + pageNumber + "&pageSize" + pageSize,
            {
                method: "GET",
            }
        )
            .catch((err) => {
                console.log(err);
            })
            .then((response) => {
                return response;
            });
}
