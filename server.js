const express = require('express');

const http = require ("http")

const port = 4040

const io = require ("socket.io")

const app = express()

const server =http.createServer(app)

const socket = io(server)
const chatHistory = [];

app.set("view engine", "ejs")


app.get("/", (req,res)=>{
    res.render("Homepage", {chatHistory})

})
socket.on("connection", (socket)=>{
    socket.on("message", (data)=>{
    chatHistory.push(data)
    socket.broadcast.emit("message", data)

    })
    // console.log(socket.id)

})
server.listen(port, ()=>{
    console.log ("listenin on port" +port)
})