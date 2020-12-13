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

    let newPhotos = []

    async function UpdateStayImage(image) {
        let formData = new FormData();
        formData.append('image', image)
        return await fetch(BACKEND_URL + "/image",
            {
                method: "POST",
                body: formData
            })
    }

    if (files) {
        files.forEach(file => {
            UpdateStayImage(file)
                .then(resposne => {
                    if (resposne.status === 200)
                        newPhotos.push(" 2 ")
                })
                .catch(resposne => console.log(resposne))
        })
    }
    console.log(newPhotos);

    const response = await fetch(BACKEND_URL + "/stays", {
        method: "POST",
        headers: {
            "Origin": "*",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(stay)
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
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/review/" + stayId + "?pageNumber=" + pageNumber + "&pageSize" + pageSize,
    //         {
    //             method: "GET",
    //         }
    //     )
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .then((response) => {
    //             return response;
    //         });
    return [
        {
            id: "1",
            stayId: "1",
            userId: "13",
            message: "super duper",
            rating: "2"
        },
        {
            id: "2",
            stayId: "1",
            userId: "14",
            message: "super duper 22222",
            rating: "5"
        }
    ]
}

export async function AddReviewRepository(review) {
    await fetch(BACKEND_URL + "/review", {
        method: "PUT",
        headers: {
            "Origin": "*",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(review),
    })
        .catch((err) => {
            console.log(err);
        })
        .then((response) => {
            return response;
        });
}