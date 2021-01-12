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

    // async function UpdateStayImage(image) {
    //     let formData = new FormData();
    //     formData.append('image', image)
    //     return await fetch(BACKEND_URL + "/image",
    //         {
    //             method: "POST",
    //             body: formData
    //         })
    // }

    // if (files) {
    //     files.forEach(file => {
    //         await UpdateStayImage(file)
    //             .then(response => {
    //                 response.json()
    //                     .then(data => {
    //                         console.log(data);
    //                         newPhotos.push(data.url)
    //                     })
    //             })
    //             .catch(resposne => console.log(resposne))
    //     })
    // }

    let images = [];
    if (files) {
        for (let image of files) {
            let formData = new FormData();
            let isMainPhoto = false
            if (image.name === stay.mainPhoto)
                isMainPhoto = true
            formData.append("image", image);
            const response = await fetch(BACKEND_URL + "/image", {
                method: "POST",
                headers: {
                    "Origin": "*"
                },
                body: formData
            });
            if (response.ok) {
                const json = await response.json();
                images.push(json.url);
                if (isMainPhoto)
                    stay.mainPhoto = json.url
            }
            else {
                console.log("IMAGE ERROR");
                console.log(response);
            }
        }
    }
    stay.photos = images
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

export async function GetAccomodationByStayId(stayId, pageNumber, pageSize) {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + stayId + "?pageNumber=" + pageNumber + "&pageSize" + pageSize,
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
            sleepersCapacity: "1",
            quantity: "11",
            price: "111"
        },
        {
            id: "2",
            stayId: "1",
            sleepersCapacity: "22",
            quantity: "22",
            price: "222"
        },
    ]
}

export async function GetAccomodationById(Id) {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + Id,
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
    return {
            id: "1",
            stayId: "1",
            sleepersCapacity: "13",
            quantity: "2",
            price: "22"
        }
    
}

export async function GetStayPropertiesById(Id) {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + Id,
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
            name: "parking",
            ico: "parking",
        },
        {
            id: "2",
            name: "obiad",
            ico: "obiad",
        }
    ]
}


export async function GetAccomodationPropertiesById(Id) {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + Id,
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
            name: "parking",
            ico: "parking",
        },
        {
            id: "2",
            name: "obiad",
            ico: "obiad",
        },
        {
            id: "3",
            name: "kuchnia",
            ico: "kuchnia",
        }
    ]
}

export async function GetAllAccomodationProperties() {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + Id,
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
            name: "parking",
            ico: "parking",
        },
        {
            id: "2",
            name: "obiad",
            ico: "obiad",
        },
        {
            id: "3",
            name: "kuchnia",
            ico: "kuchnia",
        },
        {
            id: "4",
            name: "czajnik",
            ico: "czajnik",
        }
    ]
}

export async function GetAllStayProperties() {
    // if (stayId)
    //     await fetch(
    //         BACKEND_URL + "/accomodation/" + Id,
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
            name: "parking",
            ico: "parking",
        },
        {
            id: "2",
            name: "obiad",
            ico: "obiad",
        },
        {
            id: "3",
            name: "wifi",
            ico: "wifi",
        },
        {
            id: "4",
            name: "24/h",
            ico: "24/h",
        }
    ]
}