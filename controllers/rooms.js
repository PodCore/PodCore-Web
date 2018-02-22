module.exports = (app, rooms) => {

  app.get('/rooms', (req, res) => {
  	const roomList = Object.keys(rooms).map((key) => { return rooms[key] })
  	console.log(`ROOM LIST IS: ${roomList}`);
  	res.send(roomList);
  });

  app.get('/rooms/:owner', (req, res) => {
  	let owner = req.params.owner;
  	res.render('room', {room : rooms[owner]})
  })

}
