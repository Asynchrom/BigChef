import mongo from "mongodb"
import connect from "../db"

export default {
    async get(req, res) {
        try {
            let search = {}
            if (req.query._any) {
                let terms = req.query._any.split(' ');
                let fields = ['name', 'type', 'ingredients', 'time', 'by'];

                search = {
                    $and: [],
                };
        
                terms.forEach((term) => {
                    let or = {
                        $or: [],
                    };
        
                    fields.forEach((field) => {
                        or.$or.push({ [field]: new RegExp(term, "i") });
                    });
        
                    search.$and.push(or);
                });
            }

            let db = await connect()
            let cursor = await db.collection("recipes").find(search).project({ owner: 0 }).sort({ date: -1 })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },

    async set(req, res) {
        try {
            let data = req.body
            data.name = data.name.trim()
            data.ingredients = data.ingredients.trim()
            data.description = data.description.trim()
            data.img = data.img.trim()

            if (data.name == "" || data.type == "" || data.time == "" || data.ingredients == "" 
                || data.description == "" || data.img == "") return res.sendStatus(460)

            data.owner = mongo.ObjectId(req.body.owner)
            data.date = new Date

            let db = await connect()
            let result = await db.collection("recipes").insertOne(data)
            if (result.insertedCount == 1) res.json(result.insertedId)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },

    async delete(req, res) {
        try {
            let db = await connect()
            let result = await db.collection("recipes").deleteOne({ _id: mongo.ObjectId(req.params.id), owner: mongo.ObjectId(req.body.owner) })
            if (result.deletedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async personal(req, res) {
        try {
            let db = await connect()
            let cursor = await db.collection("recipes").find({ owner: mongo.ObjectId(req.body._id) }).sort({ date: -1 })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(400)
        }
        catch {
            res.sendStatus(400)
        }
    },

    async bookmarks(req, res) {
        try {
            if(req.body.length == 0) return res.sendStatus(460)

            let search = {  
                $or: []
            }
            req.body.forEach(id => {
                search.$or.push({_id: mongo.ObjectId(id)})
            })

            let db = await connect()
            let cursor = await db.collection("recipes").find(search).sort({ date: -1 })
            let result = await cursor.toArray()
            cursor.close()
            if (result.length > 0) res.json(result)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },
}
