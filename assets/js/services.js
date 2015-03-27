
(function() {

    var appsvc = angular.module('app.services', ['angularFileUpload']);

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



        photoService.getWebcamPhotoBlob = function (image_data_uri) {

            function b64ToUint6(nChr) {
                // convert base64 encoded character to 6-bit integer
                // from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
                return nChr > 64 && nChr < 91 ? nChr - 65
                    : nChr > 96 && nChr < 123 ? nChr - 71
                    : nChr > 47 && nChr < 58 ? nChr + 4
                    : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
            }

            function base64DecToArr(sBase64, nBlocksSize) {
                // convert base64 encoded string to Uintarray
                // from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
                var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
                    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
                    taBytes = new Uint8Array(nOutLen);

                for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                    nMod4 = nInIdx & 3;
                    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                    if (nMod4 === 3 || nInLen - nInIdx === 1) {
                        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                            taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                        }
                        nUint24 = 0;
                    }
                }
                return taBytes;
            }

            // Set the upload callbacks, and initiate upload
            // detect image format from within image_data_uri
            var image_fmt = '';
            if (image_data_uri.match(/^data\:image\/(\w+)/))
                image_fmt = RegExp.$1;
            else
                throw "Cannot locate image format in Data URI";

            // extract raw base64 data from Data URI
            var raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '');

            // create a blob and decode our base64 to binary
            var blob = new Blob( [ base64DecToArr(raw_image_data) ], {type: 'image/'+image_fmt} );
            blob.filename = "webcam." + image_fmt.replace(/e/, '');
            blob.name = blob.filename;
            console.log(blob);

            return blob;
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

        photoService.s3UploadPhotos = function (files, saveCreateDate, onLoadPhoto, updateUploadProgress, uploadSuccess, uploadError) {
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

                            var s3upload = new S3Upload({
                                file_dom_selector: 'files',
                                s3_sign_put_url: 'upload/sign_request',
                                s3_object_name: file.name,
                                onProgress: updateUploadProgress,
                                onFinishS3Put: uploadSuccess,
                                onError: uploadError
                            });

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

