import { Service } from "../service"
import store from "../../store"

let cards = new Array

export default {
    async get() {
        if (cards.length == 0) {
            let response = await Service.post("/notes/get", {_id: store.credentials._id})
            cards = await response.data
        }
        return cards
    },

    async set(card) {
        card.owner = store.credentials._id
        let response = await Service.put("/notes", card)
        card._id = response.data
        cards.push(card)
    },

    async pop(_id) {
        await Service.post("/notes", { _id })
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