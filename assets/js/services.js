
(function() {

    var appsvc = angular.module('app.services', []);

    appsvc.factory('Validate',
                   function() {
        return {
            credentials: function(credentials) {
                var error = {
                    identifier: '',
                    password: ''
                };

                if(!credentials.identifier) {
                    error.identifier = 'Enter your email address.';
                }
                else if(!validator.isEmail(credentials.identifier)) {
                    error.identifier = 'The email address is not valid.';
                }

                if(!credentials.password) {
                    error.password = 'Enter a password';
                }

                return error;
            },
            identifier: function(credentials) {
                var error = {
                    identifier: '',
                    password: ''
                };

                if(!credentials.identifier) {
                    error.identifier = 'Enter your email address.';
                }
                else if(!validator.isEmail(credentials.identifier)) {
                    error.identifier = 'The email address is not valid.';
                }

                return error;
            },
            password: function(credentials) {
                var error = {
                    identifier: '',
                    password: ''
                };

                if(!credentials.password) {
                    error.password = 'Enter a password';
                }

                if(credentials.password != credentials.passwordConfirm) {
                    error.password = 'Password & Confirmation do not match';
                }

                return error;
            },
            hasError: function(error) {
                for(var i in error) {
                    if(error.hasOwnProperty(i) && error[i]) {
                        return true;
                    }
                }
                return false;
            }
        };
    });

    appsvc.factory('NavUpdate', ['$rootScope',
                                 function($rootScope) {
        var sharedService = {};

        sharedService.message = '';

        sharedService.prepForBroadcast = function(msg) {
            this.message = msg;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function() {
            $rootScope.$broadcast('updateNavbar');
        };

        return sharedService;

    }]);

    appsvc.factory('PhotoService',  ['$upload',
                                     function($upload) {

        var photoService = {};

        photoService.beforePhoto = '',
        photoService.beforePhotoDate = null;

        photoService.afterPhoto = '',
        photoService.afterPhotoDate = null;

        photoService.setBeforePhoto = function (beforePhoto) {
            photoService.beforePhoto = beforePhoto;
        };

        photoService.setBeforePhotoDate = function (createDate) {
            photoService.beforePhotoDate = createDate;
        };

        photoService.getBeforePhoto = function () {
            return photoService.beforePhoto;
        };

        photoService.setAfterPhoto = function (afterPhoto) {
            photoService.afterPhoto = afterPhoto;
        };

        photoService.setAfterPhotoDate = function (createDate) {
            photoService.afterPhotoDate = createDate;
        };

        photoService.getAfterPhoto = function () {
            return photoService.afterPhoto;
        };

        photoService.takeSnapshot = function(resetAfter, done) {
            // take snapshot and get image data
            Webcam.snap(function(data_uri) {
                if (resetAfter) {
                    Webcam.reset();
                }
                // display results in page
                done(data_uri);
            });
        };

        photoService.startWebcam = function (camConfig) {
            // Configure a few settings and attach camera
            Webcam.set(camConfig.webcam);
            Webcam.attach(camConfig.displayElement);
        };


        photoService.uploadPhotos = function (files, saveCreateDate, onLoadPhoto, updateUploadProgress, uploadSuccess) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    function onGetEXIFData () {
                        function completeUpload(file) {
                            // Load up image preview.
                            var reader = new FileReader();
                            reader.onload = onLoadPhoto;
                            reader.readAsDataURL(file);

                            console.log(file);

                            // Upload the file
                            $upload.upload({
                                url: 'upload/index',
                                method: 'POST',
                                data: {}, // Any data needed to be submitted along with the files
                                file: file
                            }).progress(updateUploadProgress)
                            .success(uploadSuccess);
                        }
                        var createDate = EXIF.getTag(this, "DateTimeOriginal");
                        console.log(createDate);
                        if (createDate === undefined) {
                            // $scope.enterDate = true;
                            //Temporary until date input finished.
                            // Add callback to ensure we get create date
                            // interactively from the user.
                            console.log('Did not get create date in EXIF data');
                        } else {
                            var createISODateFormat = createDate.slice(0, 10).replace(/:/g,'-');
                            console.log(createISODateFormat);
                            //$scope.date = createISODateFormat;
                            //photoService.beforePhotoDate = createISODateFormat;
                            createDate = createISODateFormat;
                        }
                        if (!(createDate === undefined)) {
                            console.log('Saving create date using callback');
                            saveCreateDate(createDate);
                        }
                        console.log('Completing File Upload');
                        completeUpload(file);
                    }
                    console.log("Getting EXIF data & uploading pic.")
                    EXIF.getData(file, onGetEXIFData);
                }
            }
        };

        photoService.ryanUpload = function (file) {

            var photo = {
                date: null,
                uploadPromise: null
            };

            EXIF.getData(file, function() {
                console.log(file);
                var createDate = EXIF.getTag(this, "DateTimeOriginal");
                if (createDate === undefined) {
                    console.log('date not defined');
                  } else {
                    var createISODate = createDate.slice(0, 10).replace(/:/g,'-');
                    console.log(createISODate);
                    photo.date = createISODate;
                    console.log(photo.date);
                    }
            });

            photo.uploadPromise = $upload.upload({
                    url: 'upload/index',
                    method: 'POST',
                    data: {}, // Any data needed to be submitted along with the files
                    file: file
                });

            return photo;
        };

        return photoService;
    }]);

})();

