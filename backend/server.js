'use strict';

var cors=require('cors')
console.log("cors",cors)
var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,


  User = require('./api/models/userModel'),
  Admin = require('./api/models/adminModel'),
  Event = require('./api/models/eventModel'),


  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://Pianest:tlzmflt12!@pianest.5bgdcr6.mongodb.net/?retryWrites=true&w=majority', option).then(function(){
    //connected successfully
    console.log("connection successful")
}, function(err) {
    //err handle
    console.log("err",err)
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});



app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;