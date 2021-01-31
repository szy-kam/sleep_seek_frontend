require('dotenv').config()
// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
export const BACKEND_URL = "https://sleepseek-backend.herokuapp.com"

export let STAY = {
    id: null,
    name: "",
    address: {
        country: "",
        city: "",
        street: "",
        zipCode: "",
        latitude: null,
        longitude: null,
    },
    category: "",
    mainPhoto: "",
    description: "",
    minPrice: "",
    email: "",
    phoneNumber: "",
    avgRate: "",
    photos: [],
    properties: []
};



