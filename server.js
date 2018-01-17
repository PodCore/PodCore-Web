const app = require('express')();
var server = require('http').Server(app)
var io = require('socket.io')(server)

const port = process.env.PORT || '6969';


app.get('/rooms', function(req, res) {
  var roomList = Object.keys(rooms).map(function(key) {
    return rooms[key]
  })
  res.send(roomList)
})

var rooms = {}

io.on('connection', function(socket) {

  socket.on('create_room', function(room) {
    if (!room.key) {
      return
    }
    console.log('create room:', room)
    var roomKey = room.key
    rooms[roomKey] = room
    socket.roomKey = roomKey
    socket.join(roomKey)
  })

  socket.on('close_room', function(roomKey) {
    console.log('close room:', roomKey)
    delete rooms[roomKey]
  })

  socket.on('disconnect', function() {
    console.log('disconnect:', socket.roomKey)
    if (socket.roomKey) {
      delete rooms[socket.roomKey]
    }
  })

  socket.on('join_room', function(roomKey) {
    console.log('join room:', roomKey)
    socket.join(roomKey)
  })

  socket.on('upvote', function(roomKey) {
    console.log('upvote:', roomKey)
    io.to(roomKey).emit('upvote')
  })

  socket.on('gift', function(data) {
    console.log('gift:', data)
    io.to(data.roomKey).emit('gift', data)
  })

  socket.on('comment', function(data) {
    console.log('comment:', data)
    io.to(data.roomKey).emit('comment', data)
  })

})

app.get('/', (req, res) => {
  res.send('Kash eats Lemons.');
});

server.listen(port, () => {
  console.log("Tripping Out On Port 6969.");
});