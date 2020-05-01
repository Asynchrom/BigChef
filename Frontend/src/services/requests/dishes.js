import { Service } from "../service"
import store from "../../store"

let recipes = new Array
let refresh = true

export default {
    async get() {
        if (refresh) {
            let response = await Service.post("/dishes/get", {_id: store.credentials._id})
            recipes = await response.data
            refresh = false
        }
        return recipes
    },

    async save(recipe) {
        recipe.owner = store.credentials._id
        recipe.by = store.credentials.username
        let response = await Service.put("/dishes", recipe)
        recipe._id = await response.data
        recipes.push(recipe)
    },

    async delete(_id) {
        await Service.patch("/dishes", { _id: _id, owner: store.credentials._id })
        let i = 0
        recipes.forEach(e => {
            if (_id == e._id) {
                recipes.splice(i, 1)
                return
            }
            i++
        })
    },
}