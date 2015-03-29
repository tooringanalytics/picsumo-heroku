
var ReminderService = {

};

ReminderService.sendTodaysReminders  = function(done) {
    var tomorrow = new Date();
    var yesterday = new Date();

    yesterday.setHours(0,0,0,0);
    yesterday.setTime(yesterday.getTime() - 1);
    sails.log.debug("Yesterday: " + yesterday.toISOString());

    tomorrow.setHours(8,0,0,0);
    tomorrow.setTime(tomorrow.getTime() + (24 * 60 * 60 * 1000));
    tomorrow.setHours(8,0,0,0);
    sails.log.debug("Tomorrow: " + tomorrow.toISOString());

    Reminder.find()
            .where({dueDate: {'<': tomorrow, '>': yesterday}})
            .exec(function (err, reminders) {
                sails.log.debug(err);
                sails.log.debug(reminders);
                sails.log(reminders.length);
                /*
                * TODO: Should use associations & join queries instead.
                */
                reminders.forEach(function (reminder, i, reminders) {
                    sails.log.debug(reminder);
                    User.find({}, function (err, users) {
                        sails.log.debug(users);
                    });
                    User.findOne({id: reminder.userID}, function (err, user) {
                        if (!err && user != undefined) {
                            sails.log.debug(err);
                            sails.log.debug(user);
                            EmailService.sendAfterPhotoReminderEmail({username: user.username,
                                              to_email: user.username,
                                              to_name: user.username});
                            reminder.destroy(function (err, reminder) {
                                sails.log.debug(err);
                                if (done) {
                                    done(err);
                                }
                            });
                        }
                    });
                });
            });

}

module.exports = ReminderService;
