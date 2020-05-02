import { Service } from "../service"
import store from "../../store"

let cards = new Array
let refresh = true

export default {
    async get() {
        if (refresh) {
            let response = await Service.post("/notes/get", {_id: store.credentials._id})
            cards = await response.data
            refresh = false
        }
        return cards
    },

    async set(card) {
        card.owner = store.credentials._id
        let response = await Service.put("/notes", card)
        card._id = response.data
        if(cards.length == 0) location.reload()
        cards.unshift(card)
    },

    async pop(_id) {
        await Service.post("/notes", { _id : _id })
        let i = 0
        cards.forEach(e => {
            if (_id == e._id) {
                cards.splice(i, 1)
                return
            }
            i++
        })
    },

    async update(card) {
        await Service.patch("/notes", card)
        let i = 0
        cards.forEach(e => {
            if (card._id == e._id) {
                cards[i] = card
                return
            }
            i++
        })
    }
}