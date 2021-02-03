import { BACKEND_URL } from "../config";
import { dateFormatterToIso } from '../components/widgets/DatePicker/datePicker'
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
    const url = BACKEND_URL + "/stays/" + id
    return fetchWithAutorization("DELETE", url)
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
                response.json().then(err => {
                    console.log(err);
                })
            }
        }
    }
    // in case of server error
    if (stay.mainPhoto && stay.mainPhoto.slice(0, 4) !== 'http') {
        stay.mainPhoto = null
    }

    if (!stay.mainPhoto && images[0]) {
        stay.mainPhoto = images[0]
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
    if (stay.mainPhoto && stay.mainPhoto.slice(0, 4) !== 'http') {
        stay.mainPhoto = null
    }
    if (!stay.mainPhoto && images[0]) {
        stay.mainPhoto = images[0]
    }
    stay.photos = images
    const url = BACKEND_URL + "/stays/" + stay.id
    return fetchWithAutorization("PUT", url, stay)

}

export async function DeleteStayPhotoRepository(photo) {
    // const url = BACKEND_URL + "/photo?url=" + photo
    // console.log("DEL" + photo);
    // return fetchWithAutorization("DELETE", url)
}


export async function GetReviewsByStayIdRepository(stayId, pageNumber, pageSize) {
    return await fetch(BACKEND_URL + "/review?stayId=" + stayId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
}

export async function AddReviewRepository(review) {
    const url = BACKEND_URL + "/review?stayId=" + review.stayId
    return fetchWithAutorization("POST", url, review)
}

export async function GetAllStayCategories() {
    return await fetch(BACKEND_URL + "/stayCategories")
}

export async function GetAccommodationByIdRepository(id) {
    return await fetch(BACKEND_URL + "/accommodation-template/" + id)
}

export async function GetAccommodationsByStayIdRepository(stayId, dateRange = null, pageNumber = 0, pageSize = 50) {
    let newDate = {}
    if (dateRange) {
        newDate.to = dateFormatterToIso(dateRange.to)
        newDate.from = dateFormatterToIso(dateRange.from)
    }
    console.log(newDate);
    return await fetch(BACKEND_URL + "/accommodation-template?stayId=" + stayId + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize)
}

export async function AddAccommodationRepository(accommodation) {
    const url = BACKEND_URL + "/accommodation-template"
    return fetchWithAutorization("POST", url, accommodation)
}

export async function EditAccommodationRepository(accommodation) {
    const url = BACKEND_URL + "/accommodation-template/" + accommodation.id
    return fetchWithAutorization("PUT", url, accommodation)
}

export async function DeleteAccommodationRepository(accommodationId) {
    const url = BACKEND_URL + "/accommodation-template/" + accommodationId
    return fetchWithAutorization("DELETE", url)
}

export async function GetAllStayProperties() {
    return await fetch(BACKEND_URL + "/stayProperties")
}

export async function GetAllAccommodationProperties() {
    return await fetch(BACKEND_URL + "/accommodationProperties")
}

export async function MakeReservationRepository(reservation) {
    console.log(reservation);
    const url = BACKEND_URL + "/reservation?accommodationTemplateId=" + reservation.accommodationTemplateId
    return fetchWithAutorization("POST", url, reservation)
}

export async function GetReservationsByUsernameRepository(username, pageNumber = 0, pageSize = 50) {
    const url = BACKEND_URL + "/reservation?username=" + username + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    return await fetchWithAutorization("GET", url)
}

export async function GetReservationsByStayIdRepository(id, pageNumber = 0, pageSize = 50) {
    const url = BACKEND_URL + "/reservation?stayId=" + id + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize;
    return await fetchWithAutorization("GET", url)
}

export async function EditReservationRepository(reservation) {
    const url = BACKEND_URL + "/reservation/" + reservation.id;
    return await fetchWithAutorization("PUT", url, reservation)
}

export async function DeleteReservationRepository(reservation) {
    const url = BACKEND_URL + "/reservation/" + reservation.id;
    return await fetchWithAutorization("DELETE", url)
}