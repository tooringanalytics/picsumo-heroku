
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
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90,
            },
            displayElement: '#webcam_window'
        };


        $scope.progressPercentage = 0;
        $scope.showPhotoOptions = true;
        $scope.showWebcam = false;
        $scope.showAcceptOptions = false;
        $scope.progressBar = false;
        $scope.photoURL = '';
        $scope.date = new Date ();
        $scope.photo = {
            id: null,
            date: null,
            url: null,
            type: null,
            matchID: null,
            privatePic: null,
            userID: null,
        };

        // Controller & scope methods.
        $scope.showProgressBar = function () {
          $scope.progressBar = true;
          $scope.showAcceptOptions = true;
          $scope.showPhotoOptions = false;
        };

        $scope.upload = function (files) {

            PhotoService.uploadPhotos(files,
                                      PhotoService.setBeforePhotoDate,
                                      befctl.onLoadPhoto,
                                      befctl.updateUploadProgress,
                                      befctl.uploadSuccess);

        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            console.log(data);
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.photoURL = e.target.result;
            PhotoService.setBeforePhoto($scope.photoURL);
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.photoURL = data_uri;
            PhotoService.setBeforePhoto($scope.photoURL);
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
                       'PhotoService',
                       function($scope,
                                PhotoService) {

        var aftctl = this;

        this.webcamConfig = {
            webcam: {
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90,
            },
            displayElement: '#webcam_window'
        };

        $scope.showAfterAcceptOptions = false;
        $scope.showAfterPhotoOptions = true;
        $scope.showAfterWebcam = false;

        $scope.afterPhotoURL = '';
        $scope.beforePhotoURL = PhotoService.getBeforePhoto();

        $scope.progressPercentage = 0;
        $scope.progressBar = false;
        $scope.date = new Date ();
        $scope.afterPhoto = {
            id: null,
            date: null,
            url: null,
            type: null,
            matchID: null,
            privatePic: null,
            userID: null,
        };

        // Controller & scope methods.
        $scope.showProgressBar = function () {
          $scope.progressBar = true;
          $scope.showAfterAcceptOptions = true;
          $scope.showAfterPhotoOptions = false;
        };

        $scope.upload = function (files) {

            PhotoService.uploadPhotos(files,
                                      PhotoService.setAfterPhotoDate,
                                      aftctl.onLoadPhoto,
                                      aftctl.updateUploadProgress,
                                      aftctl.uploadSuccess);

        };

        this.updateUploadProgress = function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
        };

        this.uploadSuccess = function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            console.log(data);
        };

        this.onLoadPhoto = function (e) {
            // display the photo loaded from disk
            $scope.afterPhotoURL = e.target.result;
            PhotoService.setAfterPhoto($scope.afterPhotoURL);
        };

        this.onTakePhoto = function (data_uri) {
            // display photo from webcam
            $scope.afterPhotoURL = data_uri;
            PhotoService.setAfterPhoto($scope.afterPhotoURL);
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

        $scope.afterPhotoURL = PhotoService.getAfterPhoto();
        $scope.beforePhotoURL = PhotoService.getBeforePhoto();
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

    appctl.controller('S3TestCtrl', [ "$scope", function ($scope) {

        var s3ctl = this;
        //var input_element = document.getElementById("files");
        //input_element.onchange = s3_upload;

        $scope.s3_upload = function () {
            var status_elem = document.getElementById("status");
            var url_elem = document.getElementById("avatar_url");
            var preview_elem = document.getElementById("preview");

            var s3upload = new S3Upload({
                file_dom_selector: 'files',
                s3_sign_put_url: '/sign_s3',
                onProgress: function(percent, msessage) {
                    status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
                },
                onFinishS3Put: function(public_url) {
                    status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
                    url_elem.value = public_url;
                    preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
                },
                onError: function(status) {
                    status_elem.innerHTML = 'Upload error: ' + status;
                }
            });
        }

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
