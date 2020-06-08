import mongo from "mongodb"

let connection_string = process.env.CON_STRING
let client = new mongo.MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db

export default () => {
    return new Promise((resolve, reject) => {
        if (db && client.isConnected()) {
            resolve(db)
        } else {
            client.connect(error => {
                if (error) {
                    reject(error)
                } else {
                    db = client.db("bigchef")
                    resolve(db)
                }
            })
        }
    })
}
