const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  following : [String],
  followers : [String]
})

userSchema.methods.hashPassword = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(8));
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
