import axios from "axios"

let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
});

let cards = new Array

let _cards = {
    async Get() {
        if (cards.length == 0) {
            let response = await Service.get("/cards")
            cards = response.data
        }
        return cards
    },

    async Set(card) {
        let response = await Service.put("/cards", card)
        card._id = response.data
        cards.push(card)
    },

    async Pop(id) {
        await Service.post("/cards", { id })
        let i = 0
        cards.forEach(e => {
            if (id == e._id) {
                cards.splice(i, 1)
                return
            }
            i++
        })
    },

    async Update(card) {
        await Service.patch("/cards", card)
        let i = 0
        cards.forEach(e => {
            if (card.id == e._id) {
                cards[i] = card
                return
            }
            i++
        })
    }
}

export { _cards }
