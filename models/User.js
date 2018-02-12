// ---------------------------------------------------------------------------------------------------- \\
// ------------------------------- User.js (PodCore/PodCore-Web/models) ------------------------------- \\
// ---------------------------------------------------------------------------------------------------- \\

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Defines schema for users
let userSchema = new mongoose.Schema({
	username  :    String,
    password  :    String,
    email     :    String,
    following :   [String],
    followers :  [String]
}, {strict : false});

userSchema.methods.hashPassword = (pass) => {
	return bcrypt.hashSync(pass, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = (password) => {
	return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
