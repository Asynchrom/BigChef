import { Service } from "../service"
import store from "../../store"

export default {
    async get(recipe) {
        let response = await Service.get(`/comments/${recipe._id}`)
        let comments = await response.data
        return comments
    },

    async set(comment, id) {
        comment.recipe = id
        comment.owner = store.credentials._id
        comment.by = store.credentials.username
        let response = await Service.put("/comments", comment)
        comment._id = await response.data
        return comment
    }
}