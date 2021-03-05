import axios from "axios";

export const PostgreURL = "http://167.99.70.72:55022";

export default axios.create({
    baseURL: PostgreURL,
    headers: {
        "Content-type": "application/json"
    }
});