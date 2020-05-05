import { Service } from "../service"

let localDailies = new Array
let refresh = true

export default {
    async get() {
        if (refresh) {
            let response = await Service.get("/daily")
            localDailies = response.data
            refresh = false
        }
        return localDailies
    }
}
