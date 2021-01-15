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
            "Origin": "*",
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    });
    return response;
}

// export async function GetUserIdByEmail(email) {
//     const response = await fetch(BACKEND_URL + "/user/" + email, {
//         method: "GET",
//     });
//     return response;
// }

export async function GetUsernameByTokenRepository(token) {
    const response = await fetch(BACKEND_URL + "/username", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Accept': 'application/json',
            'Authorization': token
        },
        // body: JSON.stringify(token),
    });
    return response;


    // const ls = JSON.parse(localStorage.getItem('persist:root'))
    // const parseUser = JSON.parse(ls.user)
    // const token = parseUser.user.userToken;
    // if (!token) console.log("LS_ERROR" + parseUser);
    // return await fetch(url,
    //     {
    //         method: method,
    //         headers: {
    //             "Access-Control-Allow-Origin": "http://localhost:3000",
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         },
    //         body: body ? JSON.stringify(body) : null
    //     });
}