import { Service } from "../service"
import store from "../../store"

export default {
    async signup() {
        await Service.put("/users", store.credentials)
    },

    async login() {
        let response = await Service.post("/users", store.credentials)
        store.credentials = response.data.user
        store.token = response.data.token
        localStorage.setItem('store', JSON.stringify(store))
        store.authenticated = true
    },

    async change() {
        await Service.patch("/users", store.credentials)
        localStorage.setItem('store', JSON.stringify(store))
    }
}
