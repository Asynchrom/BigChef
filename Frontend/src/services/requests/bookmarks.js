import { Service } from "../service"
import store from "../../store"

let bookmarks = new Array
let refresh = true

export default {
    async getAll() {
        if (refresh) {
            let response = await Service.post("/dishes/bkm", store.credentials.bookmarks)
            bookmarks = await response.data
            refresh = false
        }
        return bookmarks
    },

    async bookmarkSet(recipe) {
        let _id = recipe._id
        let tmp = store.credentials.bookmarks
        if (store.credentials.bookmarks.includes(_id)) return
        tmp.push(_id)
        await Service.patch("/users/bkm", {_id: store.credentials._id, bookmarks: tmp })
        store.credentials.bookmarks = tmp
        bookmarks.unshift(recipe)
        sessionStorage.setItem('bookmarks', JSON.stringify(tmp))
    },

    async bookmarkPop(recipe) {
        let _id = recipe._id
        let tmp = store.credentials.bookmarks
        let i = 0
        tmp.forEach(e => {
            if (_id == e) {
                tmp.splice(i, 1)
                return
            }
            i++
        })
        await Service.patch("/users/bkm", {_id: store.credentials._id, bookmarks: tmp })
        store.credentials.bookmarks = tmp
        i = 0
        bookmarks.forEach(e => {
            if (_id == e._id) {
                bookmarks.splice(i, 1)
                return
            }
            i++
        })
        sessionStorage.setItem('bookmarks', JSON.stringify(tmp))
    }
}
