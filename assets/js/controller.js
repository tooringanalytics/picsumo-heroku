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

        if(res.success) {
          $state.go('before');
        }
        else {
          $scope.error.generic = res.errors;
        }

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
.controller('BeforeCtrl', ['$scope', '$upload', function($scope, $upload) {
  $scope.$watch('files', function() {
    $scope.upload($scope.files);
    });

  $scope.showPhotoOptions = true;
  $scope.showWebcam = false;
  
  $scope.takePhoto = function () {
    $scope.showPhotoOptions = false;
    $scope.showWebcam = true;
  }

  $scope.showAcceptOptions = false;

  $scope.snapShutter = function () {
    $scope.showWebcam = false;
    $scope.showAcceptOptions = true;
  }

  $scope.retry = function () {
    $scope.showAcceptOptions = false;
    $scope.showWebcam = true;
  }
  
  $scope.upload = function(files) {
      console.log(files);
      $upload.upload({
        url: '/upload/index',
        method: 'POST',
        data: {}, // Any data needed to be submitted along with the files
        file: files
      });
    };
  }])
.controller('AfterCtrl', function($scope) {
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
.controller('GalleryCtrl', function() {
  })
.controller('LogoutCtrl', function($scope, $http, $state){
  $scope.logout = function () {
  $http.get('/logout');
  $state.go('/');
  };
});
