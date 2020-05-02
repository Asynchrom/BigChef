import { Service } from "../service"
import store from "../../store"

let myRecipes = new Array
let refresh = true

export default {
    async getAll() {
        let response = await Service.get("/dishes")
        let allRecipes = await response.data
        return allRecipes
    },

    async get() {
        if (refresh) {
            let response = await Service.post("/dishes/get", {_id: store.credentials._id})
            myRecipes = await response.data
            refresh = false
        }
        return myRecipes
    },

    async save(recipe) {
        recipe.owner = store.credentials._id
        recipe.by = store.credentials.username
        let response = await Service.put("/dishes", recipe)
        recipe._id = await response.data
        myRecipes.unshift(recipe)
    },

    async delete(_id) {
        await Service.patch("/dishes", { _id: _id, owner: store.credentials._id })
        let i = 0
        myRecipes.forEach(e => {
            if (_id == e._id) {
                myRecipes.splice(i, 1)
                return
            }
            i++
        })
    },
}