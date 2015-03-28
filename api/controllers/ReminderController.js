/**
 * ReminderController
 *
 * @description :: Server-side logic for managing reminders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    reminders: function (req, res) {

        function getStatusCode(error) {
              switch(error) {
                case 'Error.Passport.Password.Invalid': return 400;
                case 'Error.Passport.Password.Wrong': return 401;
                case 'Error.Passport.Password.NotSet': return 400;
                case 'Error.Passport.Username.NotFound': return 404;
                case 'Error.Passport.User.Exists': return 400;
                case 'Error.Passport.Email.NotFound': return 404;
                case 'Error.Passport.Email.Missing': return 400;
                case 'Error.Passport.Email.Exists': return 400;
                case 'Error.Passport.Username.Missing': return 400;
                case 'Error.Passport.Password.Missing': return 400;
                case 'Error.Passport.Generic': return 500;
                default: return 200;
              }
        }

        function getErrorToReturn(err) {
            // Only certain error messages are returned via req.flash('error', someError)
            // because we shouldn't expose internal authorization errors to the user.
            // We do return a generic error and the original request body.
            var flashError = req.flash('error')[0];

            var errorToReturn = null;

            if (err && !flashError ) {
                //req.flash('error', 'Error.Passport.Generic');
                errorToReturn = 'Error.Passport.Generic';
            } else if (flashError) {
                //req.flash('error', flashError);
                errorToReturn = flashError;
            }
            //req.flash('form', req.body);
            if(!req.wantsJSON) {
                req.flash('error', errorToReturn);
                req.flash('form', req.body);
            }

            return errorToReturn;
        }

        function tryAgain(err) {
            var errorToReturn = getErrorToReturn(req, err);

            // If an error was thrown, redirect the user to the
            // login, register or disconnect action initiator view.
            // These views should take care of rendering the error messages.
            var action = req.param('action');

            switch (action) {
                case 'create':
                    if(req.wantsJSON) {
                        var status = getStatusCode(errorToReturn);
                        res.status(status);
                        res.jsonx({
                            "error": errorToReturn,
                            "status": status,
                            "summary": locale.get(errorToReturn, req.getLocale()),
                            "success": !errorToReturn
                        });
                    } else {
                      res.redirect('/');
                    }
                    break;
                case 'change':
                    if(req.wantsJSON) {
                        var status = getStatusCode(errorToReturn);
                        res.status(status);
                        res.jsonx({
                            "error": errorToReturn,
                            "status": status,
                            "summary": locale.get(errorToReturn, req.getLocale()),
                            "success": !errorToReturn
                        });
                    } else {
                        res.redirect('/');
                    }
                    break;
                                case 'delete':
                    if(req.wantsJSON) {
                        var status = getStatusCode(errorToReturn);
                        res.status(status);
                        res.jsonx({
                            "error": errorToReturn,
                            "status": status,
                            "summary": locale.get(errorToReturn, req.getLocale()),
                            "success": !errorToReturn
                        });
                    } else {
                        res.redirect('/');
                    }

            }
        }

        function createReminder() {
            var user = req.user;
            var delay_days = req.body.delay;

            var delay_ms =  (delay_days * 24 * 60 * 60 * 1000.0);
            var due_date = Date.now();
            sails.log.debug("Current Date: " + due_date);
            sails.log.debug("Delay Days: " + delay_days);
            due_date.setHours(8, 0, 0, 0);
            due_date.setTime(due_date.getTime() + delay_ms);
            due_date.setHours(8, 0, 0, 0);

            sails.log.debug("Due date: " + due_date);

            reminder = new Reminder({
                userID: user.id,
                dueDate: due_date
            });

            reminder.save();
        }

        var user = req.user;

        if (!user) {
            var err = 'Error.Passport.Generic';
            return tryAgain(err);
        }

        var action = req.param('action');

        switch (action) {
            case 'create':
                createReminder();
                break;
            case 'delete':
                deleteReminder();
            case 'change':
                changeReminder();
        }
    }
};

