import mongo from "mongodb"
import connect from "../db"

export default {
    async getAll(req, res) {
        try {
            let db = await connect()
            let cursor = await db.collection("dishes").find({ owner: mongo.ObjectId(req.body._id) })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async get(req, res) {
        try {
            let db = await connect()
            let cursor = await db.collection("dishes").find({ owner: mongo.ObjectId(req.body._id) })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async put(req, res) {
        try {
            console.log(req.body, typeof (req.body.time))
            if (typeof (req.body.name) != "string" || typeof (req.body.type) != "string" || typeof (req.body.time) != "string" || req.body.time == ''
                || typeof (req.body.ingredients) != "string" || typeof (req.body.description) != "string") return res.sendStatus(460)
            req.body.owner = mongo.ObjectId(req.body.owner)
            let db = await connect()
            let result = await db.collection("dishes").insertOne(req.body)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async post(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("dishes").deleteOne({ _id: mongo.ObjectId(req.body._id) })
            if (result.deletedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },
}
