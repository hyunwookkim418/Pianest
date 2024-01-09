'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const e = require('cors');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const Event = mongoose.model('Event');

exports.register = async function (req, res) {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

  try {
    const savedUser = await newUser.save();
    console.log("User registered successfully:", savedUser);
    return res.json(savedUser);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sign_in = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.hash_password)) {
      // User not found or password doesn't match
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({
      token: jwt.sign({
        email: user.email,
        fullName: user.fullName,
        _id: user._id
      }, 'RESTFULAPIs')
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.admin_sign_in = async function (req, res) {
  try {
    const user = await Admin.findOne({
      fullName: req.body.fullName
    });

    if (!user || req.body.password !== user.password) {
      // Admin not found or password doesn't match
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({
      token: jwt.sign({
        fullName: user.fullName,
        _id: user._id
      }, 'RESTFULAPIs')
    });
  } catch (error) {
    console.error('Error during admin sign-in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Save Event for All Users


exports.saveEventlist = async function (req, res) {
  try {

    const savedEvents = await Promise.all(req.body.map(async (eventData) => {
      console.log("heree", eventData);

      const newEvent = new Event(eventData);
      return await newEvent.save();
    }));

    console.log("Events saved successfully:", savedEvents);
    return res.json(savedEvents);
  } catch (error) {
    console.error('Error saving events:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};






// Get Events based on Assignedto property
exports.getEventsByAssignedto = async function (req, res) {
  console.log("called here",req.params)
  const assignedto = req.params.assignedTo;
  
  try {
    let events = await Event.find({
      Assignedto: assignedto
    });

    let eventsAll = await Event.find({
      Assignedto: "All"
    });

    console.log("eventsAll",eventsAll)

    events=events.concat(eventsAll)
    return res.json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllEvents = async function (req, res) {
  try {

    const events = await Event.find();
    
    return res.json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteEvent = async function (req, res) {
  const eventId = req.params.id;
  console.log("req.params.eventId",req.params.id)
  try {
    // Assuming you have an Event model with Mongoose
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      // If the event with the specified ID is not found
      return res.status(404).json({ error: 'Event not found' });
    }

    console.log("Event deleted successfully:", deletedEvent);
    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

