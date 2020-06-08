import jwt from "jsonwebtoken"

export default (req, res, next) => {
    try {
        let authorization = req.headers['authorization'].split(' ')
        if (authorization[0] !== 'Bearer') res.sendStatus(401)
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET)
        next()
    } catch {
        console.log("shit")
        res.sendStatus(403)
    }
}