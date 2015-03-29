var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var sinon = require('sinon');

var user1 = null;
var emailRegStub = null;
var fakeUserLogin = {password: 'password1234', identifier: 'user1@email.com'}
var fakeUserID = 1;

function createReminder(done) {
    var today = new Date();
    today.setHours(8, 0, 0, 0);
    Reminder.create({userID: fakeUserID, dueDate: today}, function (err, reminder) {
        expect(err).to.not.exist;
        expect(reminder).to.exist;
        done();
    });
}

function clearReminders(done) {
    sails.log.debug("Deleting all reminders");
    Reminder.destroy({}).exec( function deleteReminders(err, reminders) {
        expect(err).to.not.exist;
        done();
    });
}

describe('ReminderService', function () {

    before (function beforeAll(done) {
        emailRegStub = sinon.stub(EmailService, "sendRegistrationEmail");
        user1 = request.agent(sails.hooks.http.app);
        user1
            .post("/auth/local")
            .send(fakeUserLogin)
            .expect(200)
            .end(function (err, res) {
                user1.saveCookies(res);
                createReminder(done);
            });
    });

    describe('When sending todays reminders', function () {
        it ('All reminders should be processed', function(done) {
            var tomorrow = new Date();
            var yesterday = new Date();

            yesterday.setHours(0,0,0,0);
            yesterday.setTime(yesterday.getTime() - 1);
            sails.log.debug("Yesterday: " + yesterday.toISOString());

            sails.log.debug("Today: " + tomorrow.toISOString());
            tomorrow.setHours(8,0,0,0);
            tomorrow.setTime(tomorrow.getTime() + (24 * 60 * 60 * 1000));
            sails.log.debug("Tomorrow: " + tomorrow.toISOString());
            tomorrow.setHours(8,0,0,0);
            sails.log.debug("Tomorrow morn: " + tomorrow.toISOString());

            // Don't actually send out emails.
            function onEmailSend(options) {
                sails.log.debug(options);
                expect(options.username).to.equal(fakeUserLogin.identifier);
            }
            var emailStub = sinon.stub(EmailService, "sendAfterPhotoReminderEmail", onEmailSend);

            ReminderService.sendTodaysReminders(function onRemind(err) {
                    Reminder.find()
                            .where({dueDate: {'<': tomorrow, '>': yesterday}})
                            .exec(function (err, reminders) {
                                expect(err).to.not.exist;
                                expect(reminders).to.be.empty;
                                done();
                            });
            });

        });
    });

    after (function afterAll(done) {
        clearReminders(done);
    });

});
