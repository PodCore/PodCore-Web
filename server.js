// ---------------------------------------------------------------------------------------------------- \\
// ---------------------------------- Server.js (PodCore/PodCore-Web) --------------------------------- \\
// ---------------------------------------------------------------------------------------------------- \\
// CONTRIBUTORS: James Rezendes, Aakash Sudhakar


// ================================================================================
// ============== IMPORT STATEMENTS, REQUIREMENTS, AND DEPENDENCIES ===============
// ================================================================================

const express = require('express');
const app = express();
const server = require('http').Server(app); 			// Instantiate instance of server
const io = require('socket.io')(server);				// Instantiate web sockets
const mongoose = require('mongoose');					// Requires MongoDB
const bodyParser = require('body-parser');				// Requires Body-Parser

const port = process.env.PORT || '3000';				// Defines process-dependent port for web connection
const User = require('./models/User');					// Defines user model

const path = require('path');


// ================================================================================
// ====================== INITIALIZATIONS AND CONFIGURATIONS ======================
// ================================================================================


// Connects and configures instance of Mongoose
mongoose.connect(process.env.MONGO_URI || 'localhost:27017/podcore-db');

app.set("view engine", "pug");
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/scripts/components', express.static(__dirname + '/public/components'));




// Initializes and configures BodyParser in server
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// ================================================================================
// ==================================== ROUTES ====================================
// ================================================================================
var rooms = {
	// James3 : {
	// 	name : "testRoom3",
	// 	id : "4F394B5D-9F89-43A6-9B03-D1E9106EDA7A",
	// 	owner : "James3",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 4,
	// 	likes : 0,
	// 	image : ""
	// },
	// James1 : {
	// 	name : "testRoom1",
	// 	id : "testRoom1",
	// 	owner : "James1",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 20,
	// 	likes : 0,
	// 	image : ""
	// },
	// James2 : {
	// 	name : "testRoom2",
	// 	id : "testRoom2",
	// 	owner : "James2",
	// 	topic : "Testing",
	// 	viewers : [],
	// 	viewCount : 12,
	// 	likes : 0,
	// 	image : ""
	// }
};
io.on('connection', (socket) => {
	console.log(`\nNEW SOCKET CONNECTED.\n`);
	require('./sockets/stream')(io, socket, rooms);
});

app.get('/', (req, res) => {
  	res.render('main');
});
//Room Routes
require('./controllers/rooms')(app, rooms);

app.post('/register', (req, res) => {
		User.findOne({username : req.body.username}, (err, user) => {
			if(user){
				res.send("User Already Exists");
			}else{
		  	let newUser = new User({
		    	username 	: 	req.body.username,
		    	email 		: 	req.body.email,
					password : req.body.password
		  	});
		  	//newUser.password = newUser.hashPassword(req.body.password);
		  	newUser.save();
		  	res.send(newUser);
			}
		});
});

app.post('/login', (req, res) => {
  	User.findOne({ username : req.body.username, password : req.body.password }, (err, user) => {
    		if (err) { console.log(err) }
			if (!user) { res.status(404).send(`NO USER WITH USERNAME: ${req.body.username}`) }
			else {
				res.send(user)
  		};
		});
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
