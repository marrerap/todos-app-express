const http = require('http');
const express = require("express")
const db = require("./model/db.js")
let id = 6

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const server = http.createServer(app)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api/v1/todos', (req, res) => {
    res.json(db.todos);
})

app.post('/api/v1/todos', (req, res) => {
    // console.log(req.body)
    const newTodo = {
        id: id++,
        text: req.body.text,
        completed: false,
    }
    if (!req.body || !req.body.text) {
        res.status(422).json({
            error: "Must include Text"
        })
        return
    }
    db.todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.patch('/api/v1/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id)
    const todoIndex = db.todos.findIndex((todo) => {
        return todo.id === todoId
    })
    if (todoIndex === -1) {
        res.status(404).json({ error: 'could not find todo with that id'})
    }
    if (req.body && req.body.text) {
        db.todos[todoIndex].text = req.body.text
    }
    if (req.body && req.body.completed !== undefined) {
        db.todos[todoIndex].completed = req.body.completed
    }
    res.json(db.todos[todoIndex])
});

app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const todoIndex = db.todos.findIndex((todo) => {
        return todo.id === id
    })
    if (todoIndex === -1) {
        res.status(404).json({ error: 'could not find todo with that id'})
    }
    db.todos.splice(todoIndex, 1)
    res.status(204).json()

    // db.todos = db.todos.filter((todo) => {
    //     return todo.id !== id
    // })
})



app.get('/*', (req, res) => {
    res.status(404)
    res.send('Not Found')
})
// needed to listen for req and res 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})