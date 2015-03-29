var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var sinon = require('sinon');

var user1 = null;
var fakeUserLogin = {password: 'password1234', identifier: 'user1@email.com'}
var fakeUserID = 1;

function clearReminders(done) {
    sails.log.debug("Deleting all reminders");
    Reminder.destroy({}).exec( function deleteReminders(err, reminders) {
        expect(err).to.not.exist;
        done();
    });
}

describe('ReminderController: ', function () {

    before(function (done) {
        user1 = request.agent(sails.hooks.http.app);
        user1
        .post("/auth/local")
        .send(fakeUserLogin)
        .expect(200)
        .end(function (err, res) {
            user1.saveCookies(res);
            done();
        });
    });

    describe('When a reminder is created', function creationTests() {
        it ('should be stored in the database', function testCreate(done) {
            var today = new Date();
            today.setHours(0,0,0,0);
            Reminder.create({userID:fakeUserID, dueDate:today}, function (err, reminder) {
                sails.log.debug(reminder);
                assert.strictEqual(reminder.userID, fakeUserID);
                assert.strictEqual(reminder.dueDate.toISOString(), today.toISOString());
                done();
            });
        });
    });

    describe('When a reminder is deleted', function deletionTests() {
        it ('should be deleted from the database', function testDelete(done) {
            var today = new Date();
            today.setHours(0,0,0,0);
            Reminder.destroy()
                    .where({userID:fakeUserID, dueDate:today})
                    .exec(function checkRemindersDeleted(err, reminders) {
                        sails.log.debug(reminders);
                        expect(err).to.not.exist;
                        expect(reminders).to.be.empty;
                        done();
            });
        });
    });

    describe('When a user sets a reminder', function () {
        it ('should create a reminder in the database', function (done) {
            function addDays(adate, days) {
                var newdate = new Date(adate);
                days_ms = days * 24 * 60 * 60 * 1000;
                newdate.setHours(8, 0, 0, 0);
                newdate.setTime(adate.getTime() + days_ms);
                newdate.setHours(8, 0, 0, 0);
                return newdate;
            }

            var today = new Date();
            var days = 7;

            var today_plus_days = addDays(today, days);
            sails.log.debug(today);
            sails.log.debug(today_plus_days);
            user1
                .post('/reminders/set')
                .send({delay: days})
                .expect(200)
                .end(function onRequestComplete(err, res) {
                    sails.log.debug(res.body);
                    expect(err).to.not.exist;
                    Reminder.findOne({ where: {userID: fakeUserID, dueDate: { "<=": today_plus_days, ">": today}}}, function checkReminderCreated(err, reminder) {
                        sails.log.debug(err);
                        sails.log.debug(reminder);
                        expect(err).to.not.exist;
                        expect(reminder).to.exist;
                        expect(reminder).to.have.property("dueDate");
                        expect(reminder.userID).to.equal(fakeUserID);
                        expect(reminder.dueDate.getTime()).to.equal(today_plus_days.getTime());
                        done();
                    });
                });
        });

        after(function onTestCompletion(done) {
            clearReminders(done);
        })
    });

});

after(function (done) {
    done();
});
