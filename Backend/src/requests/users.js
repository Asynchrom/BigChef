import mongo from "mongodb"
import connect from "../db"

export default {
    async get(req, res) {
        if (typeof (req.body.username) != "string" || typeof (req.body.password) != "string") return res.sendStatus(400)
        let db = await connect()
        let cursor = await db.collection("users").find(req.body)
        let result = await cursor.toArray()
        cursor.close()
        if (result.retrievedCount == 1) res.json(result[0])
        else res.sendStatus(400)
    },

    async put(req, res) {
        if (typeof (req.body.username) != "string" || typeof (req.body.password) != "string") return res.sendStatus(400)
        let db = await connect()
        let cursor = await db.collection("users").find(req.body)
        let result = await cursor.toArray()
        cursor.close()
        if (result.retrievedCount == 1) {
            res.sendStatus(400)
            return
        }
        result = await db.collection("users").insertOne(req.body)
        if (result.insertedCount == 1) res.json(result.insertedId)
        else res.sendStatus(400)
    },

    async post(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("users").deleteOne({ _id: mongo.ObjectId(req.body._id) })
            if (result.deletedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async patch(req, res) {
        try {
            let data = req.body
            delete data._id
            let db = await connect()
            let result = await db.collection("dishes").updateOne({ _id: mongo.ObjectId(req.body._id) }, { $set: data })
            if (result.modifiedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    }
}
