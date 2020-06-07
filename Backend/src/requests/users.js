import mongo from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import connect from "../db"

dotenv.config()

export default {
    async signup(req, res) {
        try {
            if (req.body.password.length < 6) res.status(400).send("Password is too short!")
            if (req.body.username.length < 4) res.status(400).send("Username is too short!")

            let db = await connect()
            let test = await db.collection("users").findOne({ username: new RegExp(req.body.username, "i") })
            if (test != null) res.status(400).send("Username is taken!")

            req.body.password = await bcrypt.hash(req.body.password, 8)
            
            let result = await db.collection("users").insertOne(req.body)
            if (result.insertedCount == 1) sendStatus(200)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    },

    async login(req, res) {
        try {
            let db = await connect()
            let user = await db.collection("users").findOne({ username: req.body.username })

            if (user == null || !(await bcrypt.compare(req.body.password, user.password))) res.sendStatus(400)

            delete user.password
            let token = jwt.sign(user, process.env.JWT_SECRET, {
                algorithm: 'HS512',
                expiresIn: '1 day',
            })
            res.json({token: token, user: user})
        } catch {
            res.sendStatus(400)
        }
    },

    async change(req, res) {
        try {
            if (req.body.password.length < 6) res.status(400).send("Password is too short!")

            let db = await connect()
            let result = await db.collection("users").updateOne(
                { _id: mongo.ObjectId(req.body._id) },
                { $set: { password: req.body.password, bookmarks: req.body.bookmarks } }
            )
            if (result.modifiedCount == 1) res.sendStatus(200)
            else res.sendStatus(400)
        } catch {
            res.sendStatus(400)
        }
    }
}
