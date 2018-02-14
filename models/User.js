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
		imageUrl : {type : String, default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh2AhPynQQxZquKJBe_chYKblZm3l4yx7DYDFRk_t1O7sMDKRZ"},
    following :  [{
			username : String,
			imageUrl : {type : String, default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh2AhPynQQxZquKJBe_chYKblZm3l4yx7DYDFRk_t1O7sMDKRZ"},
			streamName : {type : String, default : ""},
			streamId : {type : String, default : ""}
		}],
    followers :  [String]
});

userSchema.methods.hashPassword = (pass) => {
	return bcrypt.hashSync(pass, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = (password) => {
	return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
