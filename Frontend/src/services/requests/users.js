import Service from "../service"
import store from "../../store"

let cards = new Array

export default {
    async checkAvailability() {
        store.credentials.check = true
        await Service.get("/users", store.credentials)
    },
}