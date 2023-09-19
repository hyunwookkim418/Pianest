'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  User = mongoose.model('User');

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("B4c0/\/", salt);

exports.register = async function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  console.log("req.body",newUser)
  await newUser.save().then(savedDoc => {
    console.log("test",savedDoc === newUser) // true
    
  });
  return res.json()
};

exports.sign_in = function(req, res) {
const user= User.findOne({
    email: req.body.email
  });
  return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });

};
