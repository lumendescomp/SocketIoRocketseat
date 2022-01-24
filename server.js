const express = require('express')
const path = require('path')

const app = express();

//Criação tanto de um servidor http qnt de um webSocket
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')))
app.set("views", path.join(__dirname, 'public"'))
app.engine("html", require('ejs').renderFile)
app.set("view engine", 'html')

app.get("/", (req, res) => {
  res.render('index.html',)
})

var messages = []

io.on('connection', (socket) => {
  console.log(`Connected ${socket.id}`)

  socket.emit("previousMessages", messages)

socket.on("sendMessage", data => {
  messages.push(data)
  socket.broadcast.emit("receivedMessage", data)
})
})

server.listen(3000)
