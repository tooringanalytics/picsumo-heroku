/**
 * PhotoController
 *
 * @description :: Server-side logic for managing Photos

 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    callback: function (req, res) {
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
                case 'save':
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
                case 'before':
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
                case 'framed':
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

        function onSuccess(summary, arg1, arg2, arg3) {
            var action = req.param('action');
            sails.log.debug(action + ": " + summary);
            switch (action) {
                case 'save':
                    var status = 200;
                    res.status(status);
                    res.jsonx({
                        "error": null,
                        "status": status,
                        "summary": locale.get(summary, req.getLocale()),
                        "success": true,
                        "photo": arg1
                    });
                    break;
                case 'before':
                    var status = 200;
                    res.status(status);
                    res.jsonx({
                        "error": null,
                        "status": status,
                        "summary": locale.get(summary, req.getLocale()),
                        "success": true,
                        "photo": arg1,
                        "afterPhoto": arg2,
                        "framedPhoto": arg3
                    });
                    break;
                case 'framed':
                    var status = 200;
                    res.status(status);
                    res.jsonx({
                        "error": null,
                        "status": status,
                        "summary": locale.get(summary, req.getLocale()),
                        "success": true,
                        "framedPhotos": arg1,
                        "page": arg2,
                        "pages": arg3
                    });
                    break;
                case 'delete':
                    var status = 200;
                    res.status(status);
                    res.jsonx({
                        "error": null,
                        "status": status,
                        "summary": locale.get(summary, req.getLocale()),
                        "success": true,
                        "photo": photo
                    });
                    break;
            }
        }


        function deletePhoto() {
            photoSpec = req.body;
            if (url in photoSpec) {
                // If URL is specified, delete by URL
                Photo.destroy({url: photoSpec.url}, function onDestroyByUrl(err, photo) {
                    if (err) {
                        tryAgain(err);
                    } else {
                        onSuccess("Deleted Photo", null);
                    }
                });
            } else if (id in photoSpec) {
                // Else If ID is specified, delete by ID
                Photo.destroy({id: photoSpec.id}, function onDestroyByUrl(err, photo) {
                    if (err) {
                        tryAgain(err);
                    } else {
                        onSuccess("Deleted Photo");
                    }
                });
            }

        }

        function updateMatchPhoto(photo, photoSpec) {
            sails.log.debug('updateMatchPhoto');
            Photo.findOne({id: photo.matchID}, function (err, matchPhoto) {
                if (err || matchPhoto === undefined) {
                    tryAgain(err);
                } else {
                    matchPhoto.matchID = photo.id;
                    matchPhoto.save(function (err, matchPhoto) {
                        if (err || matchPhoto === undefined) {
                            tryAgain(err);
                        } else {
                            onSuccess('Updated Photo & its match', photo);
                        }
                    });
                }
            });
        }

        function createNewPhoto(photoSpec) {
            sails.log.debug('createNewPhoto');
            // New after photo
            if (photoSpec.matchID === undefined) {
                photoSpec.matchID = null;
            }
            Photo.create({url: photoSpec.url,
                          date: photoSpec.date,
                          matchID: photoSpec.matchID,
                          type: photoSpec.type,
                          userID: req.user.id},
                        function (err, photo) {
                            if (err || photo === undefined) {
                                tryAgain(err);
                            } else {
                                sails.log.debug('created photo');
                                if (photoSpec.matchID) {
                                    sails.log.debug('updating other');
                                    updateMatchPhoto(photo, photoSpec);
                                } else {
                                    onSuccess('Created Photo', photo);
                                }
                            }
                        });
        }

        function updateExistingPhoto(photo, photoSpec) {
            sails.log.debug('updateExistingPhoto');
            // Update existing photo (only matchID & privacy)
            if ('matchID' in photoSpec) {
                photo.matchID = photoSpec.matchID;
            }
            if ('privatePic' in photoSpec) {
                photo.privatePic = photoSpec.privatePic;
            }
            if ('date' in photoSpec) {
                photo.date = photoSpec.date;
            }
            photo.save(function onPhotoSave(err, photo) {
                if (err || photo === undefined) {
                    tryAgain(err);
                } else {
                    if (photoSpec.matchID) {
                        updateMatchPhoto(photo, photoSpec);
                    } else {
                        onSuccess('Updated Photo', photo);
                    };
                }
            });

        }

        function onPhotoFound(err, photo) {
            sails.log.debug('onPhotoFound');
            var photoSpec = req.body;
            if (err) {
                tryAgain(err);
            }
            if (photo === undefined) {
                createNewPhoto(photoSpec);
            } else {
                updateExistingPhoto(photo, photoSpec);
            }
        }

        function savePhoto() {
            sails.log.debug('savePhoto');
            // { url, [matchID], [privatePic], }
            if ('url' in photoSpec) {
                Photo.findOne({url: photoSpec.url}, onPhotoFound);
            } else if ('id' in photoSpec) {
                Photo.findOne({id: photoSpec.id}, onPhotoFound);
            } else {
                tryAgain('Error.Passport.Generic');
            }
        }

        function beforePhoto() {
            sails.log.debug('getting latest Before photo');
            Photo.find({where: {date: {"<=": new Date()},
                                type: 1,
                                userID: req.user.id},
                        sort: "date DESC",
                        limit:1}, function (err, photos) {
                if (err || !photos || photos.length == 0) {
                    tryAgain(err);
                } else {
                    var photo = photos[0];
                    sails.log.debug("Found photo: " + photo);
                    if ('matchID' in photo) {
                        sails.log.debug("Getting match");
                        Photo.find({where: {id: photo.matchID,
                                            type: 2,
                                            userID: req.user.id},
                                            sort: "date DESC",
                                            limit:1}, function (err, afterPhotos) {
                            if (err) {
                                tryAgain(err);
                            } else {
                                if (afterPhotos.length == 0) {
                                    onSuccess('Found Before Photos but no afters', photo);
                                } else {
                                    var afterPhoto = afterPhotos[0];
                                    sails.log.debug("Found after photo match");
                                    Photo.find({where: {id: afterPhoto.matchID,
                                                type: 3,
                                                userID: req.user.id},
                                                sort: "date DESC",
                                                limit:1}, function (err, framedPhotos) {
                                        if (err) {
                                            tryAgain(err);
                                        } else {
                                            if (framedPhotos.length == 0) {
                                                onSuccess('Found Before & after Photos but no framed', photo, afterPhoto);
                                            } else {
                                                var framedPhoto = framedPhotos[0];
                                                sails.log.debug("Found framed photo match");
                                                onSuccess('Found Before & after & framed Photos', photo, afterPhoto, framedPhoto);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        sails.log.debug("Found before, but no match");
                        onSuccess('Found Before Photo', photo);
                    }
                }
            });
        }

        function framedPhotos() {

        }

        var action = req.param('action');
        sails.log.debug(action);

        var photoSpec = req.body;

        switch (action) {
            case 'save':
                savePhoto();
                break;
            case 'before':
                beforePhoto();
                break;
            case 'framed':
                framedPhotos();
                break;
            case 'delete':
                deletePhoto();
                break;
        }
    }
};

