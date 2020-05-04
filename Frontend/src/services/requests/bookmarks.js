import { Service } from "../service"
import store from "../../store"

let myLocalBookmarkedRecipes = new Array
let refresh = true

export default {
    async get() {
        if (refresh) {
            let response = await Service.post("/recipes/user/bookmarks", store.credentials.bookmarks)
            myLocalBookmarkedRecipes = response.data
            refresh = false
        }
        return myLocalBookmarkedRecipes
    },

    async set(recipe) {
        if (store.credentials.bookmarks.includes(recipe._id)) return
        let tmp = store.credentials
        tmp.bookmarks.push(recipe._id)
        await Service.patch("/users", tmp)
        store.credentials = tmp
        myLocalBookmarkedRecipes.unshift(recipe)
        sessionStorage.setItem('credentials', JSON.stringify(store.credentials))
    },

    async delete(recipe) {
        let tmp = store.credentials
        let i = 0
        tmp.bookmarks.forEach(e => {
            if (recipe._id == e) return tmp.bookmarks.splice(i, 1)
            i++
        })
        await Service.patch("/users", tmp)
        store.credentials = tmp
        i = 0
        myLocalBookmarkedRecipes.forEach(e => {
            if (recipe._id == e._id) return myLocalBookmarkedRecipes.splice(i, 1)
            i++
        })
        sessionStorage.setItem('credentials', JSON.stringify(store.credentials))
    }
}
