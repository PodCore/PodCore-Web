let User = require('../models/User');
module.exports = (io, socket, rooms) => {

  socket.on('get_rooms', () => {
    // const roomList = Object.keys(rooms).map((key) => { return rooms[key].name })
  	console.log(rooms);
    socket.emit('get_rooms', rooms);
  });

  socket.on("create_room", (data) => {
    console.log('created room:', data.name)
    rooms[data.id] = {
      name : data.name,
      id : data.id,
      owner : data.owner,
      topic : data.topic
    }
    console.log(rooms);
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
    console.log('disconnect:', socket.roomId)
    if (socket.roomId) {
      delete rooms[socket.roomId]
    }
  })

  socket.on('join_room', function(data) {
    console.log(data.username + " has joined room " + data.roomName)
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
    console.log("Room " + data.roomName + "'s " + data.username + " says: " + data.comment)
    io.to(data.roomId).emit('comment', data)
  })

  socket.on('new_follower', function(data) {
    console.log(data.username + " is now following " + data.followingName);
    User.findOne({username : data.followingName}, (err, user) => {
      user.followers.push(data.username);
      user.save(function(err, user){
        //Maybe we'll do something, I dont know.
        console.log(user.followers);
      })
    });
    User.findOne({username : data.username}, (err, user) => {
      user.following.push(data.followingName);
      user.save(function(err, user){
        //Maybe we'll do something, I dont know.
        console.log(user.following);
      })
    })
  })

  socket.on('get_followers', (data) => {
    User.findOne({username : data.username}, (err, user) => {
      socket.emit('get_followers', (user.followers));
    })
  })

  socket.on('get_following', (data) => {
    User.findOne({username : data.username}, (err, user) => {
      socket.emit('get_following', (user.following));
    })
  })


}
