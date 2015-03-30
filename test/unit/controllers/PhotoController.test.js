var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('supertest');
var sinon = require('sinon');

var user1 = null;
var fakeUserLogin = {password: 'password1234', identifier: 'user1@email.com'}
var fakeUserID = 1;

var photo1 = { url: 'http://fake.com/1.jpg', type: 1, date: (new Date()).toISOString() };
var photo2 = { url: 'http://fake.com/2.jpg', type: 2, date: (new Date()).toISOString() };
var photo3 = { url: 'http://fake.com/3.jpg', type: 3, date: (new Date()).toISOString() };

function clearPhotos(done) {
    Photo.destroy({}, function (err, photos) {
        done();
    });
}

describe("PhotoController", function() {

    before(function(done) {
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

    describe('A user can store Before photo details', function () {

        it('in the database', function (done) {
            user1
                .post('/photos/save')
                .send(photo1)
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res).to.exist;
                    expect(res.body).to.exist;
                    expect(res.body.photo).to.exist;
                    sails.log.debug(res.body);
                    photo1 = res.body.photo;
                    sails.log.debug(photo1);
                    done();
                });
        });
    });

    describe('A user can store After photo details', function () {
        it('in the database & matched with Before Photo', function (done) {
            photo2.matchID = photo1.id;
            user1
                .post('/photos/save')
                .send(photo2)
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res).to.exist;
                    expect(res.body).to.exist;
                    expect(res.body.photo).to.exist;
                    photo2 = res.body.photo;
                    expect(photo2.matchID).to.equal(photo1.id);
                    photo1.matchID = photo2.id;
                    sails.log.debug(photo2);
                    sails.log.debug(photo1);
                    done();
                });
        });
    });

    describe('A user can store Framed photo details', function () {
        it('in the database', function (done) {
            user1
                .post('/photos/save')
                .send(photo3)
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res).to.exist;
                    expect(res.body).to.exist;
                    expect(res.body.photo).to.exist;
                    photo3 = res.body.photo;
                    sails.log.debug(photo3);
                    done();
                });
        });
    });

    describe('When a user asks for a before photo', function () {
        it('returns the latest before photo & its matched after photo', function (done) {
            user1
                .get('/photos/before')
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res).to.exist;
                    expect(res.body).to.exist;
                    expect(res.body.photo).to.exist;
                    sails.log.debug(res.body.photo);
                    expect(res.body.afterPhoto).to.exist;
                    photo1 = res.body.photo;
                    photo2 = res.body.afterPhoto;
                    sails.log.debug(photo1);
                    sails.log.debug(photo2);
                    expect(photo1).to.have.property('matchID');
                    expect(photo2).to.have.property('matchID');
                    expect(photo1.matchID).to.equal(photo2.id);
                    expect(photo2.matchID).to.equal(photo1.id);
                    done();
                });
        });
    });

    after(function (done) { clearPhotos(done); });
});
