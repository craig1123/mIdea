var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    name: {
      first: {type: String, required: true},
      last: {type: String}
    },
    email: { type: String, index: true, trim: true, unique: true, required: true},
    password: { type: String, required: true},
    admin: {type: Boolean, default: false},
    // img: {}
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);