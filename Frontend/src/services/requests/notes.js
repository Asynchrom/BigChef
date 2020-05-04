import { Service } from "../service"
import store from "../../store"

let localNotes = new Array
let refresh = true

export default {
    async get() {
        if (refresh) {
            let response = await Service.post("/notes", { _id: store.credentials._id })
            localNotes = response.data
            refresh = false
        }
        return localNotes
    },

    async set(note) {
        note.owner = store.credentials._id
        let response = await Service.put("/notes", note)
        note._id = response.data
        if(localNotes.length == 0) location.reload()
        localNotes.unshift(note)
    },

    async delete(id) {
        await Service.get(`/notes/${id}`)
        let i = 0
        localNotes.forEach(e => {
            if (id == e._id) return localNotes.splice(i, 1)
            i++
        })
    }
}
