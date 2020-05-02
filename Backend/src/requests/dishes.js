import mongo from "mongodb"
import connect from "../db"

export default {
    async getAll(req, res) {
        try {
            let db = await connect()
            let cursor = await db.collection("dishes").find().project({ owner: 0 }).sort({date: -1})
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
            let cursor = await db.collection("dishes").find({ owner: mongo.ObjectId(req.body._id) }).sort({date: -1})
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
            if (req.body.name == "" || req.body.type == "" || req.body.time == "" || req.body.time == ""
                || req.body.ingredients == "" || req.body.description == "" || req.body.img == "") return res.sendStatus(460)
            req.body.owner = mongo.ObjectId(req.body.owner)
            req.body.date = new Date
            let db = await connect()
            let result = await db.collection("dishes").insertOne(req.body)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async patch(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("dishes").deleteOne({ _id: mongo.ObjectId(req.body._id), owner: mongo.ObjectId(req.body.owner) })
            if (result.deletedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },
}
