const http = require('http');
const express = require("express")
const db = require("./model/db.js")

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const server = http.createServer(app)
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))







app.get('/*', (req, res) => {
    res.status(404)
    res.send('Not Found')
})
// needed to listen for req and res 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})