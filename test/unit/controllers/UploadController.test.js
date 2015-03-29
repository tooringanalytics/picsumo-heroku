var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');

var user1 = null;
var fakeUserLogin = {password: 'password1234', identifier: 'user1@email.com'}
var fakeUserID = 1;

describe('UploadController', function() {

  describe(' index', function() {

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

    it('Should upload a file and return details', function (done) {
        user1
        .post('/upload/index')
        .attach('file', 'test/fixtures/before.jpg')
        .expect(200)
        .end(function onRequestComplete(err, res) {
            expect(err).to.not.exist;
            expect(res).to.exist;
            expect(res.body).to.exist;
            expect(res.body).to.have.property("uploadedFiles");
            done();
        });
    });
  });

});
