import axios from "axios";

export const http = axios.create({
    baseURL: "/api/cars",
    headers: {
        "Content-type": "application/json",
    }
});
