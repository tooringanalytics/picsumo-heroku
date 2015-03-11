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

  $scope.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInBpY3N1bW8ifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInB1YmxpYy1yZWFkLXdyaXRlIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9';
  $scope.signature = 'Brc+3v1pnoho9EqgEMqZc1F9U2c=';
  
  $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/upload/index',
                    method: 'POST',
                    fields: {
                      key: file.name, // the key to store the file on S3, could be file name or customized
                      AWSAccessKeyId: 'AKIAJCA7CFBEBQQ6KUDA', 
                      acl: 'public-read-write', // sets the access to the uploaded file in the bucket: private or public 
                      policy: $scope.policy, // base64-encoded json policy (see article below)
                      signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
                      "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                      filename: file.name // this is needed for Flash polyfill IE8-9
                    },
                    file: file,
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
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
