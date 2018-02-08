module.exports = (io, socket) => {

  let rooms = {}

  socket.on('get_rooms', () => {
    const roomList = Object.keys(rooms).map((key) => { return rooms[key].name })
  	console.log("Rooms: " + roomList);
    socket.emit('get_rooms', {rooms : roomList});
  });

  socket.on("create_room", (data) => {
    console.log('created room:', data.name)
    rooms[data.id] = {
      name : data.name,
      id : data.id,
      owner : data.owner,
      topic : data.topic
    }
    socket.roomId = data.id
    socket.join(data.id)
  })

  socket.on('close_room', function(data) {
    console.log('closed room:', data.name)
    delete rooms[data.id]
  })

  socket.on('new_host', function(url) {
    console.log(url);
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
