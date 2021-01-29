export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

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



