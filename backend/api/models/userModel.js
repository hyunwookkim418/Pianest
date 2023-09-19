'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

  /**
 * User Schema
 */
var UserSchema = new Schema({
    email: {
      type: String,
    },
    hash_password: {
      type: String
    }
  });
  
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
  mongoose.model('User', UserSchema);