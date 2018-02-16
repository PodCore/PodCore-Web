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
var rooms = {
	// testRoom3 : {
	// 	name : "testRoom3",
	// 	id : "testRoom3",
	// 	owner : "James3",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 4,
	// 	likes : 0
	// },
	// testRoom1 : {
	// 	name : "testRoom1",
	// 	id : "testRoom1",
	// 	owner : "James1",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 20,
	// 	likes : 0
	// },
	// testRoom2 : {
	// 	name : "testRoom2",
	// 	id : "testRoom2",
	// 	owner : "James2",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 12,
	// 	likes : 0,
	// }
};
io.on('connection', (socket) => {
	console.log(`\nNEW SOCKET CONNECTED.\n`);
	require('./sockets/stream')(io, socket, rooms);
});

app.get('/rooms', (req, res) => {
	const roomList = Object.keys(rooms).map((key) => { return rooms[key] })
	console.log(`ROOM LIST IS: ${roomList}`);
	res.send(roomList);
});

app.get('/rooms/:owner', (req, res) => {
	let owner = req.params.owner;
	res.json(rooms[owner]);
})

app.get('/', (req, res) => {
  	res.send('TEST GET ROUTE WORKING SUCCESSFULLY.');
});

app.post('/register', (req, res) => {
		User.findOne({username : req.body.username}, (err, user) => {
			if(user){
				res.send("User Already Exists");
			}else{
		  	let newUser = new User({
		    	username 	: 	req.body.username,
		    	email 		: 	req.body.email,
		  	});
		  	newUser.password = newUser.hashPassword(req.body.password);
		  	newUser.save();
		  	res.send(newUser);
			}
		});
});

app.post('/login', (req, res) => {
  	User.findOne({ username : req.body.username }, (err, user) => {
    		if (err) { console.log(err) }
			if (!user) { res.status(404).send(`NO USER WITH USERNAME: ${req.body.username}`) }
			else {
				if (user.validPassword(req.body.password)) { res.send(user) }
				else { res.status(404).send(`WRONG PASSWORD`) }
    		}
  		})
});

app.get('/followers', (req, res) => {
	console.log(req.headers.username);
	User.findOne({username : req.headers.username}, (err, user) => {
		res.json(user.followers);
	})
})

app.get('/following', (req, res) => {
	User.findOne({username : req.headers.username}, (err, user) => {
		res.json(user.following);
	})
})

server.listen(port, () => {
	console.log(`\nSERVER LISTENING ON PORT ${port}.`)
});
