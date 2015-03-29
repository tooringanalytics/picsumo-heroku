module.exports = {
    run : function () {
        var sails = require('sails');
        sails.log.debug('do something very cool here: ' + (new Date()).toISOString());

    },

    sendReminderEmails : function () {
        var sails = require('sails');
        sails.log.debug('Time to send reminder emails...' + (new Date()).toISOString());
        ReminderService.sendTodaysReminders();
    }
};
