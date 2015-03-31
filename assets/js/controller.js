
(function() {

    var appctl = angular.module('app.controllers',
                                ['app.services',
                                'angularFileUpload',
                                'validation.match']);


    /**
     * NavCtrl
     *
     *
     */
    appctl.controller('NavCtrl', ['$scope',
                                  '$http',
                                  '$state',
                                  'NavUpdate',
                                  function ($scope,
                                            $http,
                                            $state,
                                            NavUpdate) {
        var navctl = this;

        navctl.user = '';
        navctl.loggedIn = false;

        $scope.logout = function () {
            $http.get('/logout')
            .success(function(res) {
                console.log('Success');
                console.log(res);
                if(res.success) {
                    console.log('supposed to go to home page');
                    $scope.getUser();
                    $state.go('home');
                } else {
                    $scope.error.generic = res.errors;
                }
            })
            .error(function(err) {
                $scope.errorMessage = err;
                console.log('Error');
                console.log(err);
            });
        };

        $scope.getUser = function () {
            $http.get('/user')
            .success(function(res) {
                console.log('Success');
                console.log(res);
                if(res.success) {
                    console.log('A user is currently logged in');
                    navctl.user = res.user;
                    navctl.loggedIn = true;
                } else {
                    $scope.errorMessage = res;
                    console.log('Error');
                    console.log(res);
                    navctl.user = '';
                    navctl.loggedIn = false;
                }
            })
            .error(function(err) {
                $scope.errorMessage = err;
                console.log('Error');
                console.log(err);
                navctl.user = '';
                navctl.loggedIn = false;
            });
        };

        $scope.$on('updateNavbar', function() {
            $scope.getUser();
        });

        $scope.getUser();

    }]);


    /**
     * HomeCtrl
     *
     *
     */
    appctl.controller('HomeCtrl',
                      ['$scope',
                       '$http',
                       '$state',
                       'Validate',
                       'NavUpdate',
                       function($scope,
                                $http,
                                $state,
                                Validate,
                                NavUpdate) {
        'use strict';

        var homectl = this;

        $scope.error = {
          identifier: '',
          password: ''
        };

        $scope.errorMessage = false;

        $scope.credentials = {
          identifier: '',
          password: ''
        };

        homectl.updateNavbar = function(msg) {
            NavUpdate.prepForBroadcast(msg);
        };

        $scope.register = function(credentials) {
            $scope.errorMessage = false;
            $scope.error = Validate.credentials(credentials);

            if(!Validate.hasError($scope.error)) {
                var registerObj = {
                    username: credentials.identifier,
                    email: credentials.identifier,
                    password: credentials.password
                };
                $http.post('auth/local/register', registerObj)
                .success(function(res) {
                    console.log('Success');
                    console.log(res);
                    if(res.success) {
                        $scope.errorMessage = res;
                        homectl.updateNavbar(res);
                        $state.go('before');
                    }
                    else {
                        $scope.error.generic = res.error;
                        $scope.errorMessage = res;
                    }
                })
                .error(function(err) {
                    console.log('Error');
                    console.log(err);
                    $scope.errorMessage = err;
                });
                console.log(registerObj);
            }
        };
    }]);


    /**
     * LoginCtrl
     *
     *
     */
    appctl.controller('LoginCtrl',
                      ['$scope',
                       '$http',
                       '$state',
                       'Validate',
                       'NavUpdate',
                       function($scope,
                                $http,
                                $state,
                                Validate,
                                NavUpdate) {

        'use strict';

        var loginctl = this;

        $scope.error = {
            identifier: '',
            password: ''
        };

        $scope.errorMessage = false;

        $scope.credentials = {
            identifier: '',
            password: ''
        };

        loginctl.updateNavbar = function(msg) {
            NavUpdate.prepForBroadcast(msg);
        };

        $scope.login = function(credentials) {
            $scope.errorMessage = false;
            $scope.error = Validate.credentials(credentials);

            if(!Validate.hasError($scope.error)) {
                $http.post('auth/local/', credentials)
                .success(function(res) {
                    console.log('Success');
                    console.log(res);
                    if(res.success) {
                        console.log('supposed to go to before page');
                        loginctl.updateNavbar(res);
                        $state.go('before');
                    } else {
                        $scope.error.generic = res.error;
                        $scope.errorMessage = res;
                    }
                })
                .error(function(err) {
                    $scope.errorMessage = err;
                    console.log('Error');
                    console.log(err);
                });
            }
        };
    }]);


    /**
     * ResetPasswordCtrl
     *
     *
     */
    appctl.controller('ResetPasswordCtrl',
                      ['$scope',
                       '$http',
                       '$state',
                       'Validate',
                       'NavUpdate',
                       function($scope,
                                $http,
                                $state,
                                Validate,
                                NavUpdate) {
        'use strict';

        var pwctl = this;

        $scope.error = {
          identifier: '',
          password: ''
        };

        $scope.errorMessage = false;

        $scope.credentials = {
          identifier: '',
          password: '',
          passwordConfirm: '',
        };

        pwctl.updateNavbar = function(msg) {
            NavUpdate.prepForBroadcast(msg);
        };

        $scope.resetPassword = function(credentials) {
            $scope.errorMessage = false;
            $scope.error = Validate.identifier(credentials);

            if(!Validate.hasError($scope.error)) {
                var identifierObj = {
                    email: credentials.identifier
                };
                $http.post('auth/password/reset', identifierObj)
                .success(function(res) {
                    console.log('Success');
                    console.log(res);
                    if(res.success) {
                        $scope.errorMessage = res;
                        pwctl.updateNavbar(res);
                        $state.go('login');
                    }
                    else {
                        $scope.error.generic = res.error;
                        $scope.errorMessage = res;
                    }
                })
                .error(function(err) {
                    console.log('Error');
                    console.log(err);
                    $scope.errorMessage = err;
                });
                console.log(identifierObj);
            }
        };

    }]);


    /**
     * ChangePasswordCtrl
     *
     *
     */
    appctl.controller('ChangePasswordCtrl',
                      ['$scope',
                       '$http',
                       '$state',
                       'Validate',
                       'NavUpdate',
                       function($scope,
                                $http,
                                $state,
                                Validate,
                                NavUpdate) {
        'use strict';

        var pwctl = this;

        $scope.error = {
          identifier: '',
          password: ''
        };

        $scope.errorMessage = false;

        $scope.credentials = {
          identifier: '',
          password: '',
          passwordConfirm: '',
        };

        pwctl.updateNavbar = function(msg) {
            NavUpdate.prepForBroadcast(msg);
        };

        $scope.changePassword = function(credentials) {
            $scope.errorMessage = false;
            $scope.error = Validate.password(credentials);

            if(!Validate.hasError($scope.error)) {
                var passwordObj = {
                    password: credentials.password
                };
                $http.post('auth/password/change', passwordObj)
                .success(function(res) {
                    console.log('Success');
                    console.log(res);
                    if(res.success) {
                        $scope.errorMessage = res;
                        pwctl.updateNavbar(res);
                        $state.go('before');
                    }
                    else {
                        $scope.error.generic = res.error;
                        $scope.errorMessage = res;
                    }
                })
                .error(function(err) {
                    console.log('Error');
                    console.log(err);
                    $scope.errorMessage = err;
                });
                console.log(passwordObj);
            }
        };
    }]);

    /**
     * BeforeCtrl
     *
     *
     */
    appctl.controller('BeforeCtrl',
                      ['$scope',
                       'PhotoService',
                       function($scope,
                                PhotoService) {

        // Controller variables
        befctl = this;

        this.webcamConfig = {
            webcam: {
                width: 237,
                height: 200,
                image_format: 'png',
                jpeg_quality: 100,
            },
            displayElement: '#webcam_window'
        };

        $scope.photoURL;

        $scope.progressPercentage = 0;
        $scope.showPhotoOptions = true;
        $scope.showWebcam = false;
        $scope.showAcceptOptions = false;
        $scope.progressBar = false;
        $scope.date = new Date ();

        $scope.photo = {
            url: '',
            type: 1,
            privatePic: false
        };

        PhotoService.getBeforePhoto()
        .then(function (photos) {
          console.log(photos);
            $scope.photo = photos[0];
            $scope.photoURL = $scope.photo.url;
            console.log($scope.photo);
        }, function (err) {
            console.log(err);
        });


        // Controller & scope methods.
        $scope.showProgressBar = function () {
          $scope.progressBar = true;
          $scope.showAcceptOptions = true;
          $scope.showPhotoOptions = false;
        };

        $scope.webcamUpload = function () {
            console.log("Uploading data uri: ");
            console.log($scope.photo.url);

            var blob = PhotoService.getWebcamPhotoBlob($scope.photo.url);
            blob.isWebcam = true;

            var files = [ blob ];

            $scope.upload(files);

        };

        $scope.upload = function (files) {

            PhotoService.uploadPhotos(files,
                                      befctl.onSetDate,
                                      befctl.onLoadPhoto,
                                      befctl.updateUploadProgress,
                                      befctl.uploadSuccess);

        };

        this.onSetDate = function (cdate) {
            $scope.photo.date = new Date(cdate);
            $scope.date = new Date(cdate);
        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            console.log(data);
            $scope.photo.url = data.uploadedFiles[0].extra.Location;
            $scope.photoURL = data.uploadedFiles[0].extra.Location;
            PhotoService.savePhoto($scope.photo)
            .then(function (photo) {
                console.log(photo);
                $scope.photo = photo;
                $scope.photoURL = photo.url;
                $scope.date = new Date(photo.date);
            }, function (error) {
                console.log(error);
            });
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.photo.url = e.target.result;
            $scope.photoURL = e.target.result;
            PhotoService.setBeforePhoto($scope.photo);
            PhotoService.setAfterPhoto({
                url: '',
                type: 2,
                privatePic: false
            });
            PhotoService.setFramedPhoto({
                url: '',
                type: 3,
                privatePic: false
            });
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.photo.url = data_uri;
            $scope.photoURL = data_uri;
            PhotoService.setBeforePhoto($scope.photo);
            PhotoService.setBeforePhotoDate(new Date());
            PhotoService.setAfterPhoto({
                url: '',
                type: 2,
                privatePic: false
            });
            PhotoService.setFramedPhoto({
                url: '',
                type: 3,
                privatePic: false
            });
            $scope.showProgressBar();
            $scope.webcamUpload();
        };

        $scope.takePhoto = function () {
            $scope.showPhotoOptions = false;
            $scope.progressBar = false;
            $scope.showWebcam = true;
            PhotoService.startWebcam(befctl.webcamConfig);
        };

        $scope.snapShutter = function () {
            $scope.showWebcam = false;
            $scope.showAcceptOptions = true;
            PhotoService.takeSnapshot(true, befctl.onTakePhoto);
        };

        $scope.retry = function () {
            $scope.showAcceptOptions = false;
            $scope.showPhotoOptions = true;
        };


    }]);


    /**
     * AfterCtrl
     *
     *
     */
    appctl.controller('AfterCtrl',
                      ['$scope',
                        '$http',
                        '$window',
                       'PhotoService',
                       function($scope,
                                $http,
                                $window,
                                PhotoService) {

        var aftctl = this;

        $scope.delayOptions = [{
              id: 1,
              label: '7 Days',
              value: 7
        }, {
              id: 2,
              label: '14 Days',
              value: 14
        }, {
              id: 3,
              label: '30 Days',
              value: 30
        }, {
              id: 4,
              label: '60 Days',
              value: 60
        }, {
              id: 5,
              label: '90 Days',
              value: 90
        }];

        $scope.delay_days = 7;

        this.webcamConfig = {
            webcam: {
                width: 237,
                height: 200,
                image_format: 'png',
                jpeg_quality: 100,
            },
            displayElement: '#webcam_window'
        };

        $scope.beforePhotoURL = '';
        $scope.beforePhotoDate = '';
        $scope.afterPhotoURL = '';
        $scope.afterPhotoDate = '';
        $scope.showSetReminder = false;
        $scope.showAfterAcceptOptions = false;
        $scope.showAfterPhotoOptions = true;
        $scope.showAfterWebcam = false;

        $scope.beforePhoto = {
            url: '',
            type: 1,
            privatePic: false
        };

        $scope.afterPhoto = {
            url: '',
            type: 2,
            privatePic: false
        };

        PhotoService.getBeforePhoto()
        .then(function (photos) {
          console.log(photos);
            $scope.beforePhoto = photos[0];
            $scope.beforePhotoURL = $scope.beforePhoto.url;
            $scope.beforePhotoDate = $scope.beforePhoto.date;
            if (photos[1]) {
              $scope.afterPhoto = photos[1];
              $scope.afterPhotoURL = $scope.afterPhoto.url;
              $scope.afterPhotoDate = $scope.afterPhoto.date;
            }
            $scope.getAfterDays();
            console.log($scope.beforePhoto);
            $scope.$apply();
        }, function (err) {
            console.log(err);
        });

        $scope.progressPercentage = 0;
        $scope.progressBar = false;
        $scope.afterDays = '?';



        // Controller & scope methods.
        $scope.showProgressBar = function () {
          $scope.progressBar = true;
          $scope.showAfterAcceptOptions = true;
          $scope.showAfterPhotoOptions = false;
        };

        $scope.webcamUpload = function () {
            console.log("Uplaoding data uri: ");
            console.log($scope.afterPhoto.url);

            var blob = PhotoService.getWebcamPhotoBlob($scope.afterPhoto.url);
            blob.isWebcam = true;

            var files = [ blob ];

            $scope.upload(files);

        };

        $scope.upload = function (files) {

            PhotoService.uploadPhotos(files,
                                      aftctl.onSetDate,
                                      aftctl.onLoadPhoto,
                                      aftctl.updateUploadProgress,
                                      aftctl.uploadSuccess);

        };

        $scope.getAfterDays = function () {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            if ($scope.beforePhoto && $scope.afterPhoto) {
              if ('date' in $scope.beforePhoto && 'date' in $scope.afterPhoto) {
                var firstDate = new Date($scope.beforePhoto.date);
                var secondDate = new Date($scope.afterPhoto.date);
                if (firstDate && secondDate) {
                  $scope.afterDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + 1;
                }
              }
            }
        };

        this.onSetDate = function (cdate) {
            $scope.afterPhoto.date = new Date(cdate);
            $scope.afterPhotoDate = $scope.afterPhoto.date;
            $scope.getAfterDays();
        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
            console.log(data);
            $scope.afterPhoto.url = data.uploadedFiles[0].extra.Location;
            $scope.afterPhotoURL = $scope.afterPhoto.url;
            PhotoService.savePhoto($scope.afterPhoto)
            .then(function (photo) {
                console.log(photo);
                PhotoService.getBeforePhoto()
                .then(function (photos) {
                  console.log(photos);
                    $scope.beforePhoto = photos[0];
                    $scope.beforePhotoURL = $scope.beforePhoto.url;
                    $scope.beforePhotoDate = $scope.beforePhoto.date;
                    if (photos[1]) {
                      $scope.afterPhoto = photos[1];
                      $scope.afterPhotoURL = $scope.afterPhoto.url;
                      $scope.afterPhotoDate = $scope.afterPhoto.date;
                    }
                    $scope.getAfterDays();
                    console.log($scope.beforePhoto);
                    $scope.$apply();
                }, function (err) {
                    console.log(err);
                });
            }, function (error) {
                console.log(error);
            });
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.afterPhoto.url = e.target.result;
            $scope.afterPhotoURL = e.target.result;
            $scope.$apply();
            PhotoService.setAfterPhoto($scope.afterPhoto);
            PhotoService.setFramedPhoto({
                url: '',
                type: 3,
                privatePic: false
            });
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.afterPhoto.url = data_uri;
            $scope.afterPhotoURL = data_uri;
            PhotoService.setAfterPhoto($scope.afterPhoto);
            PhotoService.setFramedPhoto({
                url: '',
                type: 3,
                privatePic: false
            });
            $scope.showProgressBar();
            $scope.webcamUpload();
        };

        $scope.takeAfterPhoto = function () {
            $scope.showAfterPhotoOptions = false;
            $scope.progressBar = false;
            $scope.showAfterWebcam = true;
            PhotoService.startWebcam(aftctl.webcamConfig);
        };

        $scope.snapAfterShutter = function () {
            $scope.showAfterWebcam = false;
            $scope.showAfterAcceptOptions = true;
            PhotoService.takeSnapshot(true, aftctl.onTakePhoto);
        };

        $scope.retryAfter = function () {
            $scope.showAfterAcceptOptions = false;
            $scope.progressBar = false;
            $scope.showAfterWebcam = true;
            PhotoService.startWebcam(aftctl.webcamConfig);
        };

        $scope.setReminder = function (delayDays) {
          console.log("Setting reminder for " + delayDays + " days");
            $http.post('reminders/set', {delay: delayDays})
            .success(function (res) {
                console.log(res);
                $window.alert("We will send you an email reminder in " + delayDays + " days.");
            })
            .error(function (err) {
                console.log(error);
            })
        }
    }]);


    /**
     * ShareCtrl
     *
     *
     */
    appctl.controller('ShareCtrl',
                      ['$scope',
                      'PhotoService',
                      function($scope,
                               PhotoService) {

        var sharectl = this;

        $scope.getAfterDays = function () {
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            if ($scope.beforePhoto && $scope.afterPhoto) {
              if ('date' in $scope.beforePhoto && 'date' in $scope.afterPhoto) {
                var firstDate = new Date($scope.beforePhoto.date);
                var secondDate = new Date($scope.afterPhoto.date);
                if (firstDate && secondDate) {
                  $scope.afterDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) + 1;
                }
              }
            }
        };

        $scope.beforePhotoURL;
        $scope.beforePhotoDate;
        $scope.afterPhotoURL;
        $scope.afterPhotoDate;
        $scope.afterDays = '?';

        $scope.framedPhotoURL;

        $scope.framedPhoto = {
            url: '',
            type: 3,
            matchID: null,
            date: ''
        };

        $scope.afterPhoto = null;
        $scope.beforePhoto = null;

        $scope.framedUpload = function () {
            console.log("Uploading data uri: ");
            console.log($scope.framedPhoto.url);

            var blob = PhotoService.getWebcamPhotoBlob($scope.framedPhoto.url);
            blob.isWebcam = true;

            var files = [ blob ];

            $scope.upload(files);

        };

        $scope.upload = function (files) {

            PhotoService.uploadPhotos(files,
                                      sharectl.onSetDate,
                                      sharectl.onLoadPhoto,
                                      sharectl.updateUploadProgress,
                                      sharectl.uploadSuccess);

        };

        this.onSetDate = function (cdate) {
            $scope.framedPhoto.date = new Date(cdate);
            $scope.framedPhotoDate = $scope.framedPhoto.date;
        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
            console.log(data);
            $scope.framedPhoto.url = data.uploadedFiles[0].extra.Location;
            $scope.framedPhotoURL = $scope.framedPhoto.url;
            PhotoService.savePhoto($scope.framedPhoto)
            .then(function (photo) {
                console.log(photo);
                $scope.framedPhoto = photo;
                $scope.$apply();
            }, function (error) {
                console.log(error);
            });
        };

        console.log("hello!");

        PhotoService.getBeforePhoto()
        .then(function (photos) {
            console.log(photos);
            $scope.beforePhoto = photos[0];
            $scope.beforePhotoURL = $scope.beforePhoto.url;
            $scope.beforePhotoDate = $scope.beforePhoto.date;
            if (photos[1]) {
              $scope.afterPhoto = photos[1];
              $scope.afterPhotoURL = $scope.afterPhoto.url;
              $scope.afterPhotoDate = $scope.afterPhoto.date;
            } else {
              $scope.afterPhoto = PhotoService.getAfterPhoto();
              if (!$scope.afterPhoto) {
                  return;
              } else {
                  $scope.afterPhotoURL = $scope.afterPhoto.url;
                  $scope.afterPhotoDate = $scope.afterPhoto.date;
              }
            }

            $scope.getAfterDays();
            console.log($scope.beforePhoto);
            console.log($scope.afterPhoto);
            if (photos[2]) {
              $scope.framedPhoto = photos[2];
              $scope.framedPhotoURL = $scope.framedPhoto.url;
              var target = document.getElementById('framedPhotoCanvas');
              var ctx = target.getContext("2d");
              var framedPhoto = new Image();
              framedPhoto.onload = function () {
                  ctx.drawImage(framedPhoto, 0, 0);
                  $scope.$apply();
              }
              framedPhoto.crossOrigin = "anonymous";
              framedPhoto.src = $scope.framedPhotoURL;

            } else {
                var target = document.getElementById('framedPhotoCanvas');
                var ctx = target.getContext("2d");
                var beforePhoto = new Image();
                var afterPhoto = new Image();
                var canvasWidth = 490;
                var canvasHeight = 610;


                beforePhoto.onload = function() {
                    console.log(beforePhoto);
                    ctx.drawImage(beforePhoto, 10, 10);
                    ctx.font="20px Roboto bold";
                    //var bw_gradient=ctx.createLinearGradient(0,0,0,170);
                    //bw_gradient.addColorStop(0,"black");
                    //bw_gradient.addColorStop(1,"white");
                    //ctx.fillStyle = bw_gradient;
                    var date = new Date($scope.beforePhotoDate).toLocaleString();
                    ctx.fillText("Before: Day 1",15, canvasHeight-50);
                    ctx.font="14px Roboto bold";
                    ctx.fillText("Date: " + date,15, canvasHeight-28);

                    // To ensure afterphoto.onload is executed after this.
                    afterPhoto.crossOrigin = "anonymous";
                    afterPhoto.src = $scope.afterPhotoURL;
                };

                afterPhoto.onload = function () {
                    console.log(afterPhoto);
                    ctx.drawImage(afterPhoto, 245, 10);
                    ctx.font="20px Roboto bold";
                    //var bw_gradient=ctx.createLinearGradient(0,0,0,170);
                    //bw_gradient.addColorStop(0,"black");
                    //bw_gradient.addColorStop(1,"white");
                    //ctx.fillStyle = bw_gradient;
                    var date = new Date($scope.afterPhotoDate).toLocaleString();
                    ctx.fillText("After: Day " + $scope.afterDays,250, canvasHeight-50);
                    ctx.font="14px Roboto bold";
                    ctx.fillText("Date: " + date, 250, canvasHeight-28);

                    // Now the canvas is painted, lets store the data url.
                    $scope.framedPhotoURL = target.toDataURL();
                    $scope.framedPhoto.url = $scope.framedPhotoURL;
                    $scope.framedPhoto.matchID = $scope.afterPhoto.id;
                    $scope.framedPhoto.date = new Date();

                    // Now let's start the upload;
                    $scope.framedUpload();
                }

                // If the page domain and image domain are different,
                // and we paint the image on a Canvas, the Canvas is
                // 'tainted', and it cannot be captured as a dataURL.
                // To get around this, we need two requirements:
                // 1. The image server must return a header:
                // Access-Control-Allow-Origin:*
                // On S3, we need to edit the CORS setting to allow
                // all origins and all headers.
                // 2. The browser must send an 'Origin:' header in the
                // request. This can be forced by setting the
                // crossOrigin: "anonymous"
                // attribute on the img element that will refer to the
                // image.
                beforePhoto.crossOrigin = "anonymous";
                beforePhoto.src = $scope.beforePhotoURL;
            }
        }, function (err) {
            console.log(err);
        });


    }]);


    /**
     * GalleryCtrl
     *
     *
     */
    appctl.controller('GalleryCtrl',
                      [function() {
    }]);

    appctl.controller('S3TestCtrl', ["$scope",
                                     "$upload",
                                     "PhotoService",
                                     function ($scope,
                                               $upload,
                                               PhotoService) {

        var s3ctl = this;
        //var input_element = document.getElementById("files");
        //input_element.onchange = s3_upload;
        $scope.progressPercentage = 0;
        $scope.showPhotoOptions = true;
        $scope.showAcceptOptions = false;
        $scope.progressBar = false;
        $scope.photoURL = null;
        $scope.uploadStatus = '';

        // Controller & scope methods.
        $scope.showProgressBar = function () {
          $scope.progressBar = true;
          $scope.showAfterAcceptOptions = true;
          $scope.showAfterPhotoOptions = false;
        };

        // Called to initiate file upload.
        $scope.upload = function (files) {

            PhotoService.s3UploadPhotos(files,
                                      PhotoService.setBeforePhotoDate,
                                      s3ctl.onLoadPhoto,
                                      s3ctl.updateUploadProgress,
                                      s3ctl.uploadSuccess,
                                      s3ctl.uploadError);

        };

        // Called when file is loaded from disk into browser memory
        // at a data URL.
        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.photoURL = e.target.result;
            PhotoService.setBeforePhoto($scope.photoURL);
        };

        // Called periodically for progress update, while file is being uploaded
        // to the server
        this.updateUploadProgress = function (percent, message) {
            $scope.uploadStatus = 'Upload progress: ' + percent + '% ' + message;
            console.log($scope.uploadStatus);
        };

        // Called when upload to the remote server completes.
        this.uploadSuccess = function (public_url) {
            $scope.uploadStatus = 'Upload completed. Uploaded to: '+ public_url;
            $scope.photoURL = public_url;
        };

        this.uploadError = function(status) {
            $scope.uploadStatus = 'Upload error: ' + status;
        };

    }]);


    /**
     * LogoutCtrl
     *
     *
     */
    appctl.controller('LogoutCtrl',
                      ['$scope',
                       '$http',
                       '$state',
                       function($scope,
                                $http,
                                $state) {

        $scope.logout = function () {
            $http.get('/logout');
            $state.go('/');
        };
    }]);

})();
