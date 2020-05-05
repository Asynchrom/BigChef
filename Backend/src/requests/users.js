import mongo from "mongodb"
import connect from "../db"

export default {
    async signup(req, res) {
        try {
            if (req.body.password.length < 6) return res.sendStatus(460)
            if (req.body.username.length < 4) return res.sendStatus(461)

            let db = await connect()
            let test = await db.collection("users").findOne({ username: new RegExp(req.body.username, "i") })
            if (test != null) return res.sendStatus(462)

            let result = await db.collection("users").insertOne(req.body)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },

    async login(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("users").findOne({ username: req.body.username, password: req.body.password })
            if (result != null) res.json(result)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },

    async change(req, res) {
        try {
            if (req.body.password.length < 6) return res.sendStatus(460)

            let db = await connect()
            let result = await db.collection("users").updateOne(
                { _id: mongo.ObjectId(req.body._id) },
                { $set: { password: req.body.password, bookmarks: req.body.bookmarks } }
            )
            if (result.modifiedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    }
}
