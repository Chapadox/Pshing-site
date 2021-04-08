const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join((__dirname, 'public')))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
  res.render('index.html')
})

// server-side
io.on("connection", socket => {
  socket.on('data', (arg, arg2, arg3) => {
    let args = arg + ' ' + arg2 + ' ' + arg3 + '\n'

    fs.appendFile('./salvo.txt', args, err => {
      if (err) {
        console.log(err)
      }
    })
  })
});

server.listen(3000)