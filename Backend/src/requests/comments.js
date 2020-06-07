import mongo from "mongodb"
import connect from "../db"

export default {
    async get(req, res) {
        try{
            let db = await connect()
            let cursor = await db.collection("comments").find({ recipe: mongo.ObjectId(req.params.id) }).project({ owner: 0 }).sort({date: -1})
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(463)
        } catch {
            res.sendStatus(400)
        }
    },

    async set(req, res) {
        try{
            let data = req.body
            data.header = data.header.trim()
            data.text = data.text.trim()
            if (typeof(data.rating) == "string" || data.rating < 1 || data.rating > 5) res.sendStatus(470)
            if (data.header.length < 4) res.status(400).send("Title is too short!")
            if (data.text.length < 12) res.status(400).send("Review is too short!")
            data.owner = mongo.ObjectId(data.owner)
            data.recipe = mongo.ObjectId(data.recipe)
            data.date = new Date
            let db = await connect()
            let test = await db.collection("comments").findOne({ recipe: data.recipe, owner: data.owner })
            if (test != null) res.sendStatus(460)
            let result = await db.collection("comments").insertOne(data)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    }
}
