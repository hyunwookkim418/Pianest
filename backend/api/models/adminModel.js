'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
  var AdminSchema = new Schema({
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String
    }
  });

  
  mongoose.model('Admin', AdminSchema);