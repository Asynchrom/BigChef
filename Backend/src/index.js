import express from "express"
import cors from "cors"
import comments from "./requests/comments"
import recipes from "./requests/recipes"
import notes from "./requests/notes"
import users from "./requests/users"
import daily from "./requests/daily"
import auth from "./auth"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.listen(port)

app.get('/comments/:id', [auth], comments.get)
app.put('/comments', [auth], comments.set)

app.get('/recipes', [auth], recipes.get)
app.put('/recipes', [auth], recipes.set)
app.patch('/recipes/:id/delete', [auth], recipes.delete)
app.post('/recipes/user', [auth], recipes.personal)
app.post('/recipes/user/bookmarks', [auth], recipes.bookmarks)

app.post('/notes', [auth], notes.get)
app.put('/notes', [auth], notes.set)
app.get('/notes/:id', [auth], notes.delete)

app.post('/users', users.login)
app.put('/users', users.signup)
app.patch('/users', [auth], users.change)

app.get('/daily', daily.get)
