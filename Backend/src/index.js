import express from "express"
import cors from "cors"
import comments from "./requests/comments"
import dishes from "./requests/dishes"
import notes from "./requests/notes"
import users from "./requests/users"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.listen(port)

app.get('/comments', comments.get)
app.put('/comments', comments.put)
app.post('/comments', comments.post)
app.patch('/comments', comments.patch)

app.get('/dishes', dishes.get)
app.put('/dishes', dishes.put)
app.post('/dishes', dishes.post)
app.patch('/dishes', dishes.patch)

app.get('/notes', notes.get)
app.put('/notes', notes.put)
app.post('/notes', notes.post)
app.patch('/notes', notes.patch)

app.get('/users', users.get)
app.put('/users', users.put)
app.post('/users', users.post)
app.patch('/users', users.patch)
