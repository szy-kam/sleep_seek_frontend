import { BACKEND_URL } from "../config";

async function fetchWithAutorization(method, url, body = null) {
    const ls = JSON.parse(localStorage.getItem('persist:root'))
    const parseUser = JSON.parse(ls.user)
    const token = parseUser.user.userToken;
    if (!token) console.log("LS_ERROR" + parseUser);
    return await fetch(url,
        {
            method: method,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: body ? JSON.stringify(body) : null
        });
}

export async function GetStayByIdRepository(id) {
    const response = await fetch(BACKEND_URL + "/stays/" + id)
    return response;
}

export async function DeleteStayByIdRepository(id) {
    return await fetch(BACKEND_URL + "/stays/" + id, {
        method: "DELETE",
    });
}

export async function AddStayRepository(stay, files) {
    let images = [];
    if (files) {
        for (let image of files) {
            let formData = new FormData();
            let isMainPhoto = false
            if (image.name === stay.mainPhoto)
                isMainPhoto = true
            formData.append("image", image);

            const ls = JSON.parse(localStorage.getItem('persist:root'))
            const parseUser = JSON.parse(ls.user)
            const token = parseUser.user.userToken;

            const response = await fetch(BACKEND_URL + "/image", {
                method: "POST",
                headers: {
                    "Origin": "http://localhost:3000",
                    "Authorization": token
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
                response.json().then(data => {
                    console.log(data);
                })
            }
        }
    }
    stay.photos = images
    const url = BACKEND_URL + "/stays"
    return fetchWithAutorization("POST", url, stay)
}

export async function EditStayRepository(stay, files) {
    let images = stay.photos;
    if (files) {
        for (let image of files) {
            let formData = new FormData();
            let isMainPhoto = false
            if (image.name === stay.mainPhoto)
                isMainPhoto = true
            formData.append("image", image);

            const ls = JSON.parse(localStorage.getItem('persist:root'))
            const parseUser = JSON.parse(ls.user)
            const token = parseUser.user.userToken;

            const response = await fetch(BACKEND_URL + "/image", {
                method: "POST",
                headers: {
                    "Origin": "http://localhost:3000",
                    "Authorization": token
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
                response.json().then(data => {
                    console.log(data);
                })
            }
        }
    }
    stay.photos = images
    const url = BACKEND_URL + "/stays/" + stay.id
    return fetchWithAutorization("PUT", url, stay)

}

export async function DeleteStayPhotoRepository(photo) {
    // const url = BACKEND_URL + "/photo?url=" + photo
    console.log("DEL" + photo);
    // return fetchWithAutorization("DELETE", url)
}


export async function GetReviewsByStayIdRepository(stayId, pageNumber, pageSize) {
    return await fetch(BACKEND_URL + "/review?stayId=" + stayId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
}

export async function AddReviewRepository(review) {
    const url = BACKEND_URL + "/review?stayId=" + review.stayId
    return fetchWithAutorization("POST", url, review)
}

export function GetAllStayCategories() {
    return [
        "Hotel", "Pensjonat", "Hostel", "Domki", "Apartament", "Mieszkanie", "Kwatera prywatna"
    ]
}

export async function GetAccommodationsByStayIdRepository(stayId) {
    return await fetch(
        BACKEND_URL + "/accommodation?stayId=" + stayId,
        {
            method: "GET",
        }
    )
        .catch((err) => {
            console.log(err);
        })


    // return [
    //     {
    //         id: "1",
    //         stayId: "1",
    //         sleepersCapacity: "1",
    //         quantity: "11",
    //         price: "111"
    //     },
    //     {
    //         id: "2",
    //         stayId: "1",
    //         sleepersCapacity: "22",
    //         quantity: "22",
    //         price: "222"
    //     },
    // ]
}


export async function GetAccommodationByIdRepository(stayId) {
    return await fetch(
        BACKEND_URL + "/accommodation?stayId" + stayId,
        {
            method: "GET",
        }
    )
        .catch((err) => {
            console.log(err);
        })
}

export async function AddAccommodationRepository(accommodation) {
    const url = BACKEND_URL + "/accommodation?stayId=" + accommodation.stayId
    return fetchWithAutorization("POST", url, accommodation)
}

export async function DeleteAccommodationRepository(accommodationId) {
    console.log("Delete");
    const url = BACKEND_URL + "/accommodation?id=" + accommodationId
    return fetchWithAutorization("Delete", url)
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
            id: "PARKING",
            name: "Parking",
            ico: "parking",
        },
        {
            id: "RESTAURANT",
            name: "Restauracja",
            ico: "utensils",
        },
        {
            id: "WIFI",
            name: "Wifi",
            ico: "wifi",
        },
        {
            id: "24H",
            name: "Recepcja 24h",
            ico: "history",
        },
        {
            id: "PETS_ALLOWED",
            name: "Zwierzęta mile widziane",
            ico: "paw",
        },
        {
            id: "CARD_ACCEPTED",
            name: "Akceptują karty",
            ico: "money-check",
        },
        {
            id: "DISABLED_ACCESSIBLE",
            name: "Przyjazny dla niepełnosprawnych",
            ico: "wheelchair",
        },
        {
            id: "BAR",
            name: "Bar",
            ico: "cocktail",
        },
        {
            id: "GIM",
            name: "Siłownia",
            ico: "dumbbell",
        },
        {
            id: "POOL",
            name: "Basen",
            ico: "swimmer",
        },
    ]
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
            id: "PARKING",
            name: "Parking",
            ico: "parking",
        },
        {
            id: "RESTAURANT",
            name: "Restauracja",
            ico: "utensils",
        },
        {
            id: "WIFI",
            name: "Wifi",
            ico: "wifi",
        },
        {
            id: "24H",
            name: "Recepcja 24h",
            ico: "history",
        },
        {
            id: "PETS_ALLOWED",
            name: "Zwierzęta mile widziane",
            ico: "paw",
        },
        {
            id: "CARD_ACCEPTED",
            name: "Akceptują karty",
            ico: "money-check",
        },
        {
            id: "POOL",
            name: "Basen",
            ico: "swimmer",
        },
    ]
}

export async function GetAllAccommodationProperties() {
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
            name: "toaleta",
            ico: "toilet",
        },
        {
            id: "2",
            name: "mikrofalówka",
            ico: "microwave",
        },
        {
            id: "3",
            name: "wanna",
            ico: "bath",
        },
        {
            id: "4",
            name: "prysznic",
            ico: "shower",
        },
        {
            id: "5",
            name: "TV",
            ico: "tv",
        },
        {
            id: "6",
            name: "Lodówka",
            ico: "refrigerator",
        },
        {
            id: "7",
            name: "Możliwa dostawka",
            ico: "user-plus",
        },
        {
            id: "8",
            name: "Dla palących",
            ico: "smoking",
        },
    ]
}

export async function GetAccommodationPropertiesById(Id) {
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
            id: "2",
            name: "mikrofalówka",
            ico: "microwave",
        },
        {
            id: "4",
            name: "prysznic",
            ico: "shower",
        },
        {
            id: "5",
            name: "TV",
            ico: "tv",
        },
        {
            id: "7",
            name: "Możliwa dostawka",
            ico: "couch",
        },
        {
            id: "8",
            name: "Dla palących",
            ico: "smoking",
        },
    ]
}
