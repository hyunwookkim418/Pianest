// 'use strict';
module.exports = function(app) {
    var userHandlers = require('../controllers/userController.js');
    
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/auth/admin_sign_in')
        .post(userHandlers.admin_sign_in);
    app.route('/save_events')
        .post(userHandlers.saveEventlist);
    app.route('/get_events/:assignedTo')
        .get(userHandlers.getEventsByAssignedto);
    app.route('/get_all_events')
        .get(userHandlers.getAllEvents);
    app.route('/delete_event/:id')
        .get(userHandlers.deleteEvent);
};