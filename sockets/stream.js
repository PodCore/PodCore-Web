let User = require('../models/User');
module.exports = (io, socket, rooms) => {

  socket.on('get_rooms', () => {
    let roomList = Object.keys(rooms).map((key) => { return rooms[key] });
    roomList.sort((a,b) => {
      return a.viewCount < b.viewCount;
    });
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(roomList);
=======
    //console.log(roomList);
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
    console.log(roomList);
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
    socket.emit('get_rooms', roomList);
  });

  socket.on("create_room", (data) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log('created room:', data.name)
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
    rooms[data.owner] = {
      name : data.name,
      id : data.id,
      owner : data.owner,
      topic : data.topic,
      viewers : [],
      viewCount : 0,
      likes : 0,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
      likers : [],
      emojiGram : {},
      image : data.image,
      location : data.location
<<<<<<< HEAD
    }
    socket.owner = data.owner
    socket.join(data.owner);
    console.log('New Room:', rooms[data.owner])
=======
      image : data.image
    }
    socket.owner = data.owner
    socket.join(data.owner);
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
    }
    socket.owner = data.owner
    socket.join(data.owner);
    console.log('New Room:', rooms[data.owner])
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
    io.emit('new_room', (rooms[data.owner]));
  })

  socket.on('close_room', function(data) {
    delete rooms[data.owner];
    console.log("Closing Room: " + data.name);
    io.emit('remove_room', data.owner);
  })

  socket.on('new_host', function(url) {
    console.log(url);
  })

  socket.on('disconnect', function() {
    if (socket.owner) {
      console.log('disconnect:', socket.owner)
<<<<<<< HEAD
<<<<<<< HEAD
      delete rooms[socket.owner]
=======
      //delete rooms[socket.owner]
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
      delete rooms[socket.owner]
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
      io.emit('remove_room', socket.owner);
    }
  })

  socket.on('join_room', function(data) {
    console.log(data.username + " has joined room " + rooms[data.owner].name)
    rooms[data.owner].viewers.push(data.username);
    rooms[data.owner].viewCount += 1;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
    socket.join(data.owner);
  })

  socket.on('leave_room', function(data) {
    console.log(data.username + " has left room " + data.owner);
    userIndex = rooms[data.owner].viewers.indexOf(data.username);
    rooms[data.owner].viewers.pop(userIndex, 1);
    rooms[data.owner].viewCount -= 1;
    socket.leave(data.owner);
<<<<<<< HEAD
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
=======
    socket.join(rooms[data.owner].id);
=======
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
  })

  socket.on('upvote', function(data) {
    if(!rooms[data.owner].likers.includes(data.upvoter)){
      console.log('upvote:', data.owner + ": " + (rooms[data.owner].likes + 1))
      rooms[data.owner].likes += 1;
      rooms[data.owner].likers.push(data.upvoter);
      io.to(data.owner).emit('upvote', {likes : rooms[data.owner].likes})
    }
  })

<<<<<<< HEAD
  socket.on('gift', function(data) {
    console.log('gift:', data)
    io.to(data.roomKey).emit('gift', data)
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
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
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
  })

  socket.on('comment', function(data) {
    console.log(data.owner + "'s room: " + data.commenter + ": " + data.comment);
    commentData = {comment : data.comment, commenter : data.commenter};
<<<<<<< HEAD
<<<<<<< HEAD
    io.to(data.owner).emit('comment', {commenter : data.commenter, comment : data.comment});
=======
    io.to(data.owner).emit('comment', commentData);
>>>>>>> 8492cbf6fb9e131d15bc2c72dbeb9a62a4444dca
=======
    io.to(data.owner).emit('comment', {commenter : data.commenter, comment : data.comment});
>>>>>>> b15054f31f33692e4e9430ba1a99a8154d9d49e9
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
