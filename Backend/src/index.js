import express from "express"
import cors from "cors"
import comments from "./requests/comments"
import recipes from "./requests/recipes"
import notes from "./requests/notes"
import users from "./requests/users"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.listen(port)

app.get('/comments/:id', comments.get)
app.put('/comments', comments.set)

app.get('/recipes', recipes.get)
app.put('/recipes', recipes.set)
app.patch('/recipes/:id/delete', recipes.delete)
app.post('/recipes/user', recipes.personal)
app.post('/recipes/user/bookmarks', recipes.bookmarks)

app.post('/notes', notes.get)
app.put('/notes', notes.set)
app.get('/notes/:id', notes.delete)

app.post('/users', users.login)
app.put('/users', users.signup)
app.patch('/users', users.change)