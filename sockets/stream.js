let User = require('../models/User');
module.exports = (io, socket, rooms) => {

  socket.on('get_rooms', () => {
    let roomList = Object.keys(rooms).map((key) => { return rooms[key] });
    roomList.sort((a,b) => {
      return a.viewCount < b.viewCount;
    });
    console.log(roomList);
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
      likers : [],
      emojiGram : {},
      image : data.image,
      location : data.location
    }
    socket.owner = data.owner
    socket.join(data.owner);
    console.log('New Room:', rooms[data.owner])
    io.emit('new_room', (rooms[data.owner]));
  })

  socket.on('close_room', function(data) {
    delete rooms[data.owner];
    console.log("Closing Room: " + data.owner);
    io.emit('remove_room', {owner : data.owner});
  })

  socket.on('new_host', function(url) {
    console.log(url);
  })

  socket.on('disconnect', function() {
    if (socket.owner) {
      console.log('disconnect:', socket.owner)
      delete rooms[socket.owner]
      io.emit('remove_room', {owner : socket.owner});
    }
  })

  socket.on('join_room', function(data) {
    console.log(data.username + " has joined room " + rooms[data.owner].name)
    rooms[data.owner].viewers.push(data.username);
    rooms[data.owner].viewCount += 1;
    socket.join(data.owner);
  })

  socket.on('leave_room', function(data) {
    console.log(data.username + " has left room " + data.owner);
    userIndex = rooms[data.owner].viewers.indexOf(data.username);
    rooms[data.owner].viewers.pop(userIndex, 1);
    rooms[data.owner].viewCount -= 1;
    socket.leave(data.owner);
  })

  socket.on('upvote', function(data) {
    if(!rooms[data.owner].likers.includes(data.upvoter)){
      console.log('upvote:', data.owner + ": " + (rooms[data.owner].likes + 1))
      rooms[data.owner].likes += 1;
      rooms[data.owner].likers.push(data.upvoter);
      io.to(data.owner).emit('upvote', {likes : rooms[data.owner].likes})
    }
  })


  socket.on('emoji', function(data) {
    console.log(data.owner + ": " + data.emojier + ": " + data.emojiNum);
    if(data.emojiNum in rooms[data.owner].emojiGram){
      rooms[data.owner].emojiGram[data.emojiNum] += 1;
    }else{
      rooms[data.owner].emojiGram[data.emojiNum] = 1;
    }
    io.to(data.owner).emit('emoji', {
      emojier : data.emojier,
      emojiNum : data.emojiNum,
      emojiGram : rooms[data.owner].emojiGram
    });
  })

  socket.on('comment', function(data) {
    console.log(data.owner + "'s room: " + data.commenter + ": " + data.comment);
    commentData = {comment : data.comment, commenter : data.commenter};
    io.to(data.owner).emit('comment', {commenter : data.commenter, comment : data.comment});
  })

  socket.on('get_user', (username) => {
    User.findOne({username : username}, (err, user) => {
      console.log("Getting Info on " + user);
      socket.emit('get_user', user);
    })
  })

  socket.on('followers', (username) => {
    console.log("Followers Request for " + username)
  	User.findOne({username : username}, (err, user) => {
  		socket.emit('followers', user.followers);
  	})
  })

  socket.on('following', (username) => {
    console.log("Following Request for " + username)
  	User.findOne({username : username}, (err, user) => {
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
