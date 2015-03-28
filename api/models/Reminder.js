/**
* Reminder.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        // what userID is associated with the Reminder, pass this in.
        userID: {
            type: 'integer',
            required: true,
            unique: false
        },
        // Date on which the reminder email is to be sent.
        dueDate: {
            type: 'date',
            required: true,
            unique: false,
            defaultsTo: Date.now()
        }
    }
};
