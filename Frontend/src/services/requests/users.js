import { Service } from "../service"
import store from "../../store"

export default {
    async signup() {
        let response = await Service.put("/users", store.credentials)
        store.credentials._id = response.data
        sessionStorage.setItem('credentials', JSON.stringify(store.credentials))
        store.authenticated = true
    },

    async login() {
        let response = await Service.post("/users", store.credentials)
        store.credentials = response.data
        sessionStorage.setItem('credentials', JSON.stringify(store.credentials))
        store.authenticated = true
    },

    async change() {
        await Service.patch("/users", store.credentials)
        sessionStorage.setItem('credentials', JSON.stringify(store.credentials))
    }
}
