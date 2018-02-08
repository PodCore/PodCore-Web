// ---------------------------------------------------------------------------------------------------- \\
// ------------------------------- room.js (PodCore/PodCore-Web/models) ------------------------------- \\
// ---------------------------------------------------------------------------------------------------- \\


const mongoose = require('mongoose');					// Requires MongoDB


// Defines schema for room
let roomSchema = new mongoose.schema({
  	title 	: String,
  	key 	: String
});
let Room = mongoose.model('Room', roomSchema);

module.exports = {Room : Room};
