const mongoose = require('mongoose');

let userSchema = new mongoose.schema({
  username : String,
  password : String,
  email : String,
  following : [userSchema],
  followers : [userSchema]
})

let User = mongoose.model('User', userSchema);

module.exports = User;
