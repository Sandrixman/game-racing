const PORT = 3000
const DOCROOT = "./../dist/"

const http = require("http")
const path = require("path")
const express = require("express")
const sockets = require("./sockets")

const app = express()
const server = http.createServer(app)

const documentRoot = path.join(__dirname, DOCROOT)
app.use(express.static(documentRoot))

sockets.init(server)

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
