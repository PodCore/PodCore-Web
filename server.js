// ---------------------------------------------------------------------------------------------------- \\
// ---------------------------------- Server.js (PodCore/PodCore-Web) --------------------------------- \\
// ---------------------------------------------------------------------------------------------------- \\
// CONTRIBUTORS: James Rezendes, Aakash Sudhakar


// ================================================================================
// ============== IMPORT STATEMENTS, REQUIREMENTS, AND DEPENDENCIES ===============
// ================================================================================


const app = require('express')();						// Requires Express
const server = require('http').Server(app); 			// Instantiate instance of server
const io = require('socket.io')(server);				// Instantiate web sockets
const mongoose = require('mongoose');					// Requires MongoDB
const bodyParser = require('body-parser');				// Requires Body-Parser

const port = process.env.PORT || '3000';				// Defines process-dependent port for web connection
const User = require('./models/User');					// Defines user model


// ================================================================================
// ====================== INITIALIZATIONS AND CONFIGURATIONS ======================
// ================================================================================


// Connects and configures instance of Mongoose
mongoose.connect(process.env.MONGO_URI || 'localhost:27017/podcore-db');

// Initializes and configures BodyParser in server
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// ================================================================================
// ==================================== ROUTES ====================================
// ================================================================================


io.on('connection', (socket) => {
	console.log(`\nNEW SOCKET CONNECTED.\n`);

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
    console.log("Test");
  })

	require('./sockets/stream');
});

app.get('/rooms', (req, res) => {
	const roomList = Object.keys(rooms).map((key) => { return rooms[key] })
	console.log(`ROOM LIST IS: ${roomList}`);
	res.send(roomList);
});

app.get('/', (req, res) => {
  	res.send('TEST GET ROUTE WORKING SUCCESSFULLY.');
});

app.post('/register', (req, res) => {
  	let newUser = new User({
    	username 	: 	req.body.username,
    	email 		: 	req.body.email,
  	});
  	newUser.password = newUser.hashPassword(req.body.password);
  	newUser.save();
  	res.send(newUser);
});

app.post('/login', (req, res) => {
  	User
  		.findOne({ username : req.body.username }, (err, user) => {
    		if (err) { console.log(err) }

			if (!user) { res.status(404).send(`NO USER WITH USERNAME: ${req.body.username}`) }
			else {
				if (user.validPassword(req.body.password)) { res.send(user) }
				else { res.status(404).send(`WRONG PASSWORD`) }
    		}
  		})
});

server.listen(port, () => {
	console.log(`\nSERVER LISTENING ON PORT ${port}.`)
});
