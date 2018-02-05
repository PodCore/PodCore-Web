module.exports = (io, socket) => {

  	socket.on('create_room', (room) => {
    	if (!room.key) { return };
		console.log(`ROOM CREATED: ${room}`);
    	const roomKey = room.key;
		rooms[roomKey] = room;
    	socket.roomKey = roomKey;
    	socket.join(roomKey);
    	console.log(rooms);
  	});

  	socket.on('close_room', (roomKey) => {
		console.log(`ROOM CLOSED: ${roomKey}`);
    	delete rooms[roomKey];
  	});

  	socket.on('disconnect', () => {
		console.log(`SOCKET DISCONNECTED: ${socket.roomKey}`);
    	if (socket.roomKey) { delete rooms[socket.roomKey] };
  	});

  	socket.on('join_room', (roomKey) => {
		console.log(`ROOM JOINED: ${roomKey}`);
    	socket.join(roomKey);
  	});

  	socket.on('upvote', (roomKey) => {
		console.log('upvote:', roomKey)
		console.log(`ROOM UPVOTED: ${roomKey}`);
		io
			.to(roomKey)
			.emit('upvote');
  	});

  	socket.on('gift', (data) => {
		console.log(`GIFT: ${data}`);
		io
			.to(data.roomKey)
			.emit('gift', data);
  	});

  	socket.on('comment', (data) => {
		console.log(`COMMENT: ${data}`)
		io
			.to(data.roomKey)
			.emit('comment', data);
	  });
	  
}
