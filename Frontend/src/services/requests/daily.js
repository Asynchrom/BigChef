import { Service } from "../service"

export default {
    async get() {
        let response = await Service.get("/daily")
        return response.data
    },
}
