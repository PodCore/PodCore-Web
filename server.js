const app = require('express')();
var server = require('http').Server(app)
var io = require('socket.io')(server)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || '6969';
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'localhost:27017/podcore-db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



var rooms = {}

app.get('/rooms', function(req, res) {
  var roomList = Object.keys(rooms).map(function(key) {
    return rooms[key]
  })
  console.log(roomList);
  res.send(roomList)
})


io.on('connection', function(socket) {
  require('./sockets/stream');
})

app.get('/', (req, res) => {
  res.send('Kash eats Lemons.');
});

app.post('/register', (req, res) => {
  let newUser = new User({
    username : req.body.username,
    email : req.body.email,
  });
  newUser.password = newUser.hashPassword(req.body.password);
  newUser.save();
  res.send(newUser);
});

app.post('/login', (req, res) => {
  User.findOne({username : req.body.username}, (err, user) => {
    if(err){console.log(err)}
    if (!user) {
      res.status(404).send("No User with Username: " + req.body.username);
    }else{
      if(user.validPassword(req.body.password)){
        res.send(user);
      }else{
        res.status(404).send("Wrong Password");
      }
    }
  })
})


server.listen(port, () => {
  console.log("Listening on Port " + port)
})
