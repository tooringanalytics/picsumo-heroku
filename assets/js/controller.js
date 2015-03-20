angular.module('app.controllers', ['app.services', 'angularFileUpload'])
  .controller('HomeCtrl', function($scope, $http, $state, Validate) {
    'use strict';
    $scope.error = {
      identifier: '',
      password: ''
    };
    $scope.credentials = {
      identifier: '',
      password: ''
    };

    $scope.register = function(credentials) {
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
          console.log('res');
          $state.go('before');
        })
        .error(function(err) {
          console.log('Error');
          console.log(err);
        });
        console.log(registerObj);
      }
    };
  })
  .controller('LoginCtrl', function($scope, $http, $state, Validate) {
    'use strict'; 
    $scope.error = {
      identifier: '',
      password: ''
    };
    $scope.credentials = {
      identifier: '',
      password: ''
    };

    $scope.login = function(credentials) {
      $scope.error = Validate.credentials(credentials);
      $scope.errorMessage = false;

      if(!Validate.hasError($scope.error)) {
        $http.post('auth/local/', credentials)
        .success(function(res) {
          console.log('Success');
          console.log('res');
          if(res.success) {
            console.log('supposed to go to before page');
            $state.go('before');
          }
          else {
            $scope.error.generic = res.errors;
          }
        })
        .error(function(err) {
          $scope.errorMessage = err;
          console.log('Error');
          console.log(err);
        });
      }
    };
  })
  .controller('BeforeCtrl', ['$scope', '$upload', '$http', 'BeforeURL', function($scope, $upload, $http, BeforeURL) {
    console.log(BeforeURL);

    $scope.date = new Date ();
    $scope.progressPercentage = 0;
    $scope.showPhotoOptions = true;
    $scope.showWebcam = false;
    $scope.showAcceptOptions = false;
    $scope.progressBar = false;
    $scope.imageDisplayed = false;
    $scope.photoURL = null;

    $scope.showProgressBar = function () {
      $scope.progressBar = true;
      $scope.showAcceptOptions = true;
      $scope.showPhotoOptions = false;
      $scope.imageDisplayed = true;
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'upload/index',
                    method: 'POST',
                    data: {}, // Any data needed to be submitted along with the files
                    file: file
                }).progress(function (evt) {
                    $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.photoURL = data[0].extra.Location;
                    BeforeURL.url = $scope.photoURL;
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };
    
    $scope.takePhoto = function () {
      $scope.showPhotoOptions = false;
      $scope.progressBar = false;
      $scope.showWebcam = true;
    }

    $scope.snapShutter = function () {
      $scope.showWebcam = false;
      $scope.showAcceptOptions = true;
      $scope.imageDisplayed = true;
    }

    $scope.retry = function () {
      $scope.showAcceptOptions = false;
      $scope.showPhotoOptions = true;
      $scope.imageDisplayed = false;
    }
    }])
  .controller('AfterCtrl', function($scope, BeforeURL) {
    $scope.beforeURL = BeforeURL.url;
    $scope.showAfterPhotoOptions = true;
    $scope.showAfterWebcam = false;
    
    $scope.takeAfterPhoto = function () {
      $scope.showAfterPhotoOptions = false;
      $scope.showAfterWebcam = true;
    }

    $scope.showAfterAcceptOptions = false;

    $scope.snapAfterShutter = function () {
      $scope.showAfterWebcam = false;
      $scope.showAfterAcceptOptions = true;
    }

    $scope.retryAfter = function () {
      $scope.showAfterAcceptOptions = false;
      $scope.showAfterWebcam = true;
    }
    })
  .controller('ShareCtrl', function() {
  })
  .controller('GalleryCtrl', function() {
  })
  .controller('LogoutCtrl', function($scope, $http, $state){
    $scope.logout = function () {
    $http.get('/logout');
    $state.go('/');
    };
  });
