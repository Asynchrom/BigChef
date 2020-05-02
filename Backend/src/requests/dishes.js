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
            let data = req.body
            data.name = data.name.trim()
            data.time = data.time.trim()
            data.ingredients = data.ingredients.trim()
            data.description = data.description.trim()
            data.img = data.img.trim()
            if (data.name == "" || data.type == "" || data.time == "" || data.ingredients == "" 
                || data.description == "" || data.img == "") return res.sendStatus(460)
            data.owner = mongo.ObjectId(req.body.owner)
            data.date = new Date
            let db = await connect()
            let result = await db.collection("dishes").insertOne(data)
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

    async getBkm(req, res) {
        try {
            let search = {  
                $or: []
            }
            req.body.forEach(id => {
                search.$or.push({_id: mongo.ObjectId(id)})
            })
            let db = await connect()
            let cursor = await db.collection("dishes").find(search).sort({date: -1})
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(460)
        }
        catch {
            res.sendStatus(400)
        }
    },
}
