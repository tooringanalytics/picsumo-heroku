
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
        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            console.log(data);
            $scope.photo.url = data.uploadedFiles[0].extra.Location;
            PhotoService.savePhoto($scope.photo)
            .then(function (photo) {
                console.log(photo);
            }, function (error) {
                console.log(error);
            });
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.photo.url = e.target.result;
            PhotoService.setBeforePhoto($scope.photo);
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.photo.url = data_uri;
            PhotoService.setBeforePhoto($scope.photo);
            PhotoService.setBeforePhotoDate(new Date());
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
            if (photos[1]) {
              $scope.afterPhoto = photos[1];
            }
            $scope.getAfterDays();
            console.log($scope.beforePhoto);
        }, function (err) {
            console.log(err);
            $scope.beforePhoto = null;
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
            PhotoService.savePhoto($scope.afterPhoto)
            .then(function (photo) {
                console.log(photo);
                $scope.beforePhoto = PhotoService.getBeforePhoto();
            }, function (error) {
                console.log(error);
            });
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.afterPhoto.url = e.target.result;
            PhotoService.setAfterPhoto($scope.afterPhoto);
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.afterPhoto.url = data_uri;
            PhotoService.setAfterPhoto($scope.afterPhoto);
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

        $scope.afterDays = '?';
        $scope.afterPhoto = PhotoService.getAfterPhoto();
        $scope.beforePhoto = null;

        PhotoService.getBeforePhoto()
        .then(function (photos) {
            $scope.beforePhoto = photos[0];
            if (photos[1]) {
              $scope.afterPhoto = photos[1];
            } else {
              $scope.afterPhoto = PhotoService.getAfterPhoto();
            }
            $scope.getAfterDays();
            console.log($scope.beforePhoto);
            console.log($scope.afterPhoto);
        }, function (err) {
            $scope.beforePhoto = {};
            $scope.afterPhoto = {};
        });


    }]);

    /**
     * FakeCtrl
     *
     *
     */
    appctl.controller('FakeCtrl',
                      ['$scope',
                       '$http',
                       '$timeout',
                       '$compile',
                       '$upload',
                       function($scope,
                                $http,
                                $timeout,
                                $compile,
                                $upload) {

        $scope.$watch('files', function(files) {

            $scope.formUpload = false;

            if (files != null) {
                for (var i = 0; i < files.length; i++) {
                    $scope.errorMsg = null;
                    (function(file) {
                        generateThumbAndUpload(file);
                    })(files[i]);
                }
            }
        });

        $scope.uploadPic = function(files) {
            $scope.formUpload = true;
            if (files != null) {
                generateThumbAndUpload(files[0])
            }
        };

        function generateThumbAndUpload(file) {
            $scope.errorMsg = null;
            $scope.generateThumb(file);
            if ($scope.howToSend === 1) {
                uploadUsing$upload(file);
            } else if ($scope.howToSend == 2) {
                uploadUsing$http(file);
            } else {
                uploadS3(file);
            }
        }

        $scope.generateThumb = function(file) {
            if (file != null) {
                if ($scope.fileReaderSupported &&
                    file.type.indexOf('image') > -1) {
                    $timeout(function() {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                file.dataUrl = e.target.result;
                            });
                        }
                    });
                }
            }
        };

        function uploadUsing$upload(file) {
            file.upload = $upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
                method: 'POST',
                headers: {
                    'my-header' : 'my-header-value'
                },
                fields: {username: $scope.username},
                file: file,
                fileFormDataName: 'myFile'
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            file.upload.xhr(function(xhr) {
                // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
            });
        }

        function uploadUsing$http(file) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                $timeout(function() {
                    file.upload = $upload.http({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload' + $scope.getReqParams(),
                        method: 'POST',
                        headers : {
                            'Content-Type': file.type
                        },
                        data: e.target.result
                    });

                    file.upload.then(function(response) {
                        file.result = response.data;
                    }, function(response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                        }
                    });

                    file.upload.progress(function(evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                }, 5000);
            };

            fileReader.readAsArrayBuffer(file);
        }

        function uploadS3(file) {

            file.upload = $upload.upload({
                url : $scope.s3url,
                method : 'POST',
                fields : {
                    key : file.name,
                    AWSAccessKeyId : $scope.AWSAccessKeyId,
                    acl : $scope.acl,
                    policy : $scope.policy,
                    signature : $scope.signature,
                    'Content-Type' : file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
                    filename : file.name
                },
                file : file
            });

            file.upload.then(function(response) {
                $timeout(function() {
                  file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            });

            file.upload.progress(function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            storeS3UploadConfigInLocalStore();
        }

        $scope.generateSignature = function() {
            $http.post('/s3sign?aws-secret-key=' + encodeURIComponent($scope.AWSSecretKey), $scope.jsonPolicy)
                .success(function(data) {
                    $scope.policy = data.policy;
                    $scope.signature = data.signature;
                });
        };

        if (localStorage) {
            $scope.s3url = localStorage.getItem('s3url');
            $scope.AWSAccessKeyId = localStorage.getItem('AWSAccessKeyId');
            $scope.acl = localStorage.getItem('acl');
            $scope.success_action_redirect = localStorage.getItem('success_action_redirect');
            $scope.policy = localStorage.getItem('policy');
            $scope.signature = localStorage.getItem('signature');
        }

        $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + '//' + window.location.host;
        $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
        $scope.acl = $scope.acl || 'private';

        function storeS3UploadConfigInLocalStore() {
            if ($scope.howToSend === 3 && localStorage) {
                localStorage.setItem('s3url', $scope.s3url);
                localStorage.setItem('AWSAccessKeyId', $scope.AWSAccessKeyId);
                localStorage.setItem('acl', $scope.acl);
                localStorage.setItem('success_action_redirect', $scope.success_action_redirect);
                localStorage.setItem('policy', $scope.policy);
                localStorage.setItem('signature', $scope.signature);
            }
        }

        (function handleDynamicEditingOfScriptsAndHtml($scope) {

            $scope.defaultHtml = document.getElementById('editArea').innerHTML.replace(/\t\t\t\t/g, '');

            $scope.editHtml = (localStorage && localStorage.getItem('editHtml' + version)) || $scope.defaultHtml;

            function htmlEdit() {
                document.getElementById('editArea').innerHTML = $scope.editHtml;
                $compile(document.getElementById('editArea'))($scope);
                $scope.editHtml && localStorage && localStorage.setItem('editHtml' + version, $scope.editHtml);
                if ($scope.editHtml != $scope.htmlEditor.getValue()) {
                    $scope.htmlEditor.setValue($scope.editHtml);
                }
            }

            $scope.$watch('editHtml', htmlEdit);

            $scope.htmlEditor = CodeMirror(document.getElementById('htmlEdit'), {
                lineNumbers: true, indentUnit: 4,
                mode:  'htmlmixed'
            });
            $scope.htmlEditor.on('change', function() {
                if ($scope.editHtml != $scope.htmlEditor.getValue()) {
                    $scope.editHtml = $scope.htmlEditor.getValue();
                    htmlEdit();
                }
            });
        })($scope, $http);

        $scope.confirm = function() {
            return confirm('Are you sure? Your local changes will be lost.');
        };

        $scope.getReqParams = function() {
            return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
              '&errorMessage=' + $scope.serverErrorMsg : '';
        };

        angular.element(window).bind('dragover', function(e) {
            e.preventDefault();
        });

        angular.element(window).bind('drop', function(e) {
            e.preventDefault();
        });

        $timeout(function() {
            $scope.capture = localStorage.getItem('capture'+ version) || 'camera';
            $scope.accept = localStorage.getItem('accept'+ version) || 'image/*';
            $scope.acceptSelect = localStorage.getItem('acceptSelect'+ version) || 'image/*';
            $scope.disabled = localStorage.getItem('disabled'+ version) == 'true' || false;
            $scope.multiple = localStorage.getItem('multiple'+ version) == 'true' || false;
            $scope.allowDir = localStorage.getItem('allowDir'+ version) == 'true' || true;
            $scope.$watch('capture+accept+acceptSelect+disabled+capture+multiple+allowDir',
                          function() {
                localStorage.setItem('capture'+ version, $scope.capture);
                localStorage.setItem('accept'+ version, $scope.accept);
                localStorage.setItem('acceptSelect'+ version, $scope.acceptSelect);
                localStorage.setItem('disabled'+ version, $scope.disabled);
                localStorage.setItem('multiple'+ version, $scope.multiple);
                localStorage.setItem('allowDir'+ version, $scope.allowDir);
            });
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
