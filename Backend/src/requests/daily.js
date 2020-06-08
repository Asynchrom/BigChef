import connect from "../db"

export default {
    async get(req, res) {
        try {
            let db = await connect()
            let cursor = await db.collection("daily").find().sort({ date: -1 }).limit(1)
            let daily = await cursor.toArray()
            
            let ok = true
            let date = new Date

            if (daily[0].date.getFullYear() < date.getFullYear()) ok = false
            else if (daily[0].date.getMonth() < date.getMonth()) ok = false
            else if (daily[0].date.getDate() < date.getDate()) ok = false

            if (ok) return res.json(daily[0].recipes)

            cursor = await db.collection("recipes").aggregate([
                { $match : { by : "BigChef" }},
                { $sample: { size: 2 }},
                { $project : { owner: 0 }}
            ])
            daily = await cursor.toArray()
            cursor.close()
    
            let result = await db.collection("daily").insertOne({ recipes: daily, date: date })
            if (result.insertedCount == 1) res.json(daily)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    }
}
