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
        store.authenticated = true
        localStorage.setItem("store", JSON.stringify(store))
    },

    async change() {
        await Service.patch("/users", store.credentials)
        localStorage.setItem("store", JSON.stringify(store))
    }
}
    