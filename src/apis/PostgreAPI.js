import axios from "axios";

export const PostgreURL = "http://localhost:55022";

export default axios.create({
    baseURL: PostgreURL,
    headers: {
        "Content-type": "application/json"
    }
});