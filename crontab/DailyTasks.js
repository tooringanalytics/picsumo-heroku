module.exports = {
    run : function () {
        sails.debug.log('do something very cool here: ' + Date.now().toISOString());
    },

    sendReminderEmails : function () {
        sails.debug.log('Time to send reminder emails...' + Date.now().toISOString());
    }
};
