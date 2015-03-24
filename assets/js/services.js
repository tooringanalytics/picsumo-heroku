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

        photoService.afterPhoto = '',

        photoService.setBeforePhoto = function (beforePhoto) {
            photoService.beforePhoto = beforePhoto;
        };

        photoService.getBeforePhoto = function () {
            return photoService.beforePhoto;
        };

        photoService.setAfterPhoto = function (afterPhoto) {
            photoService.afterPhoto = afterPhoto;
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


        photoService.uploadPhotos = function (files, onLoadPhoto, updateUploadProgress, uploadSuccess) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

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
            }
        };

        return photoService;
    }]);


})();
