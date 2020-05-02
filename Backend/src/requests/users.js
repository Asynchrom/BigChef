import mongo from "mongodb"
import connect from "../db"

export default {
    async put(req, res) {
        try {
            if (req.body.password.length < 6) return res.sendStatus(460)
            if (req.body.username.length < 6) return res.sendStatus(461)
            let db = await connect()
            let cursor = await db.collection("users").find({ username: req.body.username })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) return res.sendStatus(409)
            delete req.body._id
            req.body.bookmarks = new Array
            result = await db.collection("users").insertOne(req.body)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async post(req, res) {
        try {
            if (typeof (req.body.username) != "string" || typeof (req.body.password) != "string") return res.sendStatus(400)
            let db = await connect()
            let result = await db.collection("users").findOne({username: req.body.username, password: req.body.password})
            if (result != null) res.json(result)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async patch(req, res) {
        try {
            if (req.body.password.length < 6) return res.sendStatus(460)
            let db = await connect()
            let result = await db.collection("users").updateOne({ _id: mongo.ObjectId(req.body._id) }, { $set: {password: req.body.password} })
            if (result.modifiedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async patchBkm(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("users").updateOne({ _id: mongo.ObjectId(req.body._id) }, { $set: {bookmarks: req.body.bookmarks} })
            if (result.modifiedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    }
}
