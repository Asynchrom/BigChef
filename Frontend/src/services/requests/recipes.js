import { Service } from "../service"
import store from "../../store"

let myLocalRecipes = new Array
let refresh = true

export default {
    async get(search) {
        let data = {}
        if (search) data.params = { _any: search }
        let response = await Service.get("/recipes", data)
        return response.data
    },

    async getMy() {
        if (refresh) {
            let response = await Service.post("/recipes/user", { _id: store.credentials._id })
            myLocalRecipes = response.data
            refresh = false
        }
        return myLocalRecipes
    },

    async set(recipe) {
        recipe.owner = store.credentials._id
        recipe.by = store.credentials.username
        let response = await Service.put("/recipes", recipe)
        recipe._id = response.data
        myLocalRecipes.unshift(recipe)
    },

    async delete(id) {
        await Service.patch(`/recipes/${id}/delete`, { owner: store.credentials._id })
        let i = 0
        myLocalRecipes.forEach(e => {
            if (id == e._id) return myLocalRecipes.splice(i, 1)
            i++
        })
    }
}
