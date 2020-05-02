import { Service } from "../service"
import store from "../../store"

export default {
    async signup() {
        let response = await Service.put("/users", store.credentials)
        store.credentials._id = await response.data
        sessionStorage.setItem('_id', store.credentials._id)
        sessionStorage.setItem('username', store.credentials.username)
        sessionStorage.setItem('password', store.credentials.password)
        sessionStorage.setItem('gender', store.credentials.gender)
        sessionStorage.setItem('bookmarks', JSON.stringify([]))
        store.authenticated = true
    },

    async login() {
        let response = await Service.post("/users", store.credentials)
        store.credentials = await response.data
        sessionStorage.setItem('_id', store.credentials._id)
        sessionStorage.setItem('username', store.credentials.username)
        sessionStorage.setItem('password', store.credentials.password)
        sessionStorage.setItem('gender', store.credentials.gender)
        sessionStorage.setItem('bookmarks', JSON.stringify(store.credentials.bookmarks))
        store.authenticated = true
    },

    async change() {
        await Service.patch("/users", store.credentials)
        sessionStorage.setItem('password', store.credentials.password)
    },

    async bookmark(_id, remove) {
        let tmp = store.credentials.bookmarks
        if (remove) {
            let i = 0
            tmp.forEach(e => {
                if (_id == e) {
                    tmp.splice(i, 1)
                    return
                }
                i++
            })
            console.log('1', tmp)
        }
        else {
            if (store.credentials.bookmarks.includes(_id)) {
                return
            }
            else tmp.push(_id)
        }
        await Service.patch("/users/bkm", {_id: store.credentials._id, bookmarks: tmp })
        store.credentials.bookmarks = tmp
        sessionStorage.setItem('bookmarks', JSON.stringify(tmp))
    }
}