let User = require('../models/User');
module.exports = (io, socket, rooms) => {

  socket.on('get_rooms', () => {
    let roomList = Object.keys(rooms).map((key) => { return rooms[key] });
    roomList.sort((a,b) => {
      return a.viewCount < b.viewCount;
    });
    //console.log(roomList);
    socket.emit('get_rooms', roomList);
  });

  socket.on("create_room", (data) => {
    console.log('created room:', data.name)
    rooms[data.owner] = {
      name : data.name,
      id : data.id,
      owner : data.owner,
      topic : data.topic,
      viewers : [],
      viewCount : 0,
      likes : 0,
      image : data.image
    }
    socket.roomId = data.id
    socket.join(data.id);
    io.emit('new_room', (rooms[data.owner]));
  })

  socket.on('close_room', function(data) {
    console.log('closed room:', data.name)
    delete rooms[data.id]
    io.emit('remove_room', data.id);
  })

  socket.on('new_host', function(url) {
    console.log(url);
  })

  socket.on('disconnect', function() {
    if (socket.roomId) {
      console.log('disconnect:', socket.roomId)
      delete rooms[socket.roomId]
      io.emit('remove_room', data.id);
    }
  })

  socket.on('join_room', function(data) {
    console.log(data.username + " has joined room " + rooms[data.owner].name)
    rooms[data.owner].viewers.push(data.username);
    rooms[data.owner].viewCount += 1;
    socket.join(rooms[data.owner].id);
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
    console.log(data.owner + "'s room: " + data.commenter + ": " + data.comment);
    commentData = {comment : data.comment, commenter : data.commenter};
    io.to(data.roomId).emit('comment', commentData);
  })

  socket.on('followers', (username) => {
  	User.findOne({username : username}, (err, user) => {
  		socket.emit('followers', user.followers);
  	})
  })

  socket.on('following', (username) => {
  	User.findOne({username : req.headers.username}, (err, user) => {
  		socket.emit('following', user.following);
  	})
  })

  socket.on('new_follower', function(data) {
    console.log(data.username + " is now following " + data.followingName);
    User.findOne({username : data.followingName}, (err, followingUser) => {
      followingUser.followers.push(data.username);
      followingUser.save(function(err, user){
        //Maybe we'll do something, I dont know.
      });
      User.findOne({username : data.username}, (err, thisUser) => {
        followingUserObj = {
          username : followingUser.username,
          imageUrl : followingUser.imageUrl,
          streamName : rooms[followingUser.username] ? rooms[followingUser.username].name : "",
          streamId : rooms[followingUser.username] ? rooms[followingUser.username].id : ""
        }
        thisUser.following.push(followingUserObj);
        thisUser.save(function(err, user){
          //Maybe we'll do something, I dont know.
        })
      })
    });
  })



}
