var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var sinon = require('sinon');

var user1 = null;
var fakeUserLogin = {password: 'password1234', identifier: 'user1@email.com'}
var fakeUserID = 1;

describe("AuthController", function() {

    it('should allow an existing user to login', function(done) {
        user1 = request.agent(sails.hooks.http.app);
        user1
        .post("/auth/local")
        .send(fakeUserLogin)
        .expect(200)
        .end(function (err, res) {
            expect(err).to.not.exist;
            user1.saveCookies(res);
            done();
        });
    });
});
