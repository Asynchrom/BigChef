import mongo from "mongodb"
import connect from "../db"

export default {
    async get(req, res) {
        let db = await connect()
        let cursor = await db.collection("dishes").find()
        let result = await cursor.toArray()
        cursor.close()
        result.foreach(element => {
            if (element.owner != req.body._id) {
                delete element.owner
                delete element._id
            }
        })
        if (result.length > 0) res.json(result)
        else res.sendStatus(400)
    },

    async put(req, res) {
        let db = await connect()
        let result = await db.collection("dishes").insertOne(req.body)
        if (result.insertedCount == 1) res.json(result.insertedId)
        else res.sendStatus(400)
    },

    async post(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("dishes").deleteOne({ _id: mongo.ObjectId(req.body._id) })
            if (result.deletedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch{
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
        catch{
            res.sendStatus(400)
        }
    }

}
