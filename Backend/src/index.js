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

app.post('/dishes/get', dishes.get)
app.post('/dishes/bkm', dishes.getBkm)
app.put('/dishes', dishes.put)
app.patch('/dishes', dishes.patch)
app.get('/dishes', dishes.getAll)

app.post('/notes/get', notes.get)
app.put('/notes', notes.put)
app.post('/notes', notes.post)
app.patch('/notes', notes.patch)

app.put('/users', users.put)
app.post('/users', users.post)
app.patch('/users', users.patch)
app.patch('/users/bkm', users.patchBkm)