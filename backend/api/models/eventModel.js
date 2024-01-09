'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
  var EventSchema = new Schema({
    Assignedto: {
      type: String,
      default:"All",
      trim: true,
      required: true
    },
    Event:{
        type:String,
        required: true
    },
    deadline:{
        type:Date,
        required: true
    }

    


  });

  
  mongoose.model('Event', EventSchema);