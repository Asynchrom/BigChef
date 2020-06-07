import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default (req, res, next) => {
    try {
        let authorization = req.headers['authorization'].split(' ')
        if (authorization[0] !== 'Bearer') res.sendStatus(401)
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET)
        next()
    } catch {
        res.sendStatus(403)
    }
}