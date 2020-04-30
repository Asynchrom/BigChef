import axios from "axios"

let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
});

export { Service }