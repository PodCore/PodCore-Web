module.exports = (io, socket) => {

  socket.on('create_room', function(room) {
    if (!room.key) {
      return
    }
    console.log('create room:', room)
    var roomKey = room.key
    rooms[roomKey] = room
    socket.roomKey = roomKey
    socket.join(roomKey)
    console.log(rooms);
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

}