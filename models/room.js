const mongoose = require('mongoose');

let roomSchema = new mongoose.schema({
  title : String.
  key : String,
});
let Room = mongoose.model('Room', roomSchema);

module.exports = {Room : Room};
