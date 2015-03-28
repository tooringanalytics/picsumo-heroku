module.exports = {
    run : function () {
        sails.log.debug('do something very cool here: ' + Date.now().toISOString());
    },

    sendReminderEmails : function () {
        sails.log.debug('Time to send reminder emails...' + Date.now().toISOString());
    }
};
