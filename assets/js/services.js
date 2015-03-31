
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
                                     '$http',
                                     function($upload, $http) {

        var photoService = {};

        photoService.beforePhoto = null,

        photoService.afterPhoto = null,

        photoService.framedPhoto = null,

        photoService.setBeforePhoto = function (beforePhoto) {
            if ('id' in photoService.afterPhoto) {
                photoService.afterPhoto.matchID = beforePhoto.id;
                beforePhoto.matchID = photoService.afterPhoto.id;
            }
            photoService.beforePhoto = beforePhoto;
        };

        photoService.setBeforePhotoDate = function (createDate) {
            photoService.beforePhoto.date = createDate.toISOString();
        };

        photoService.getBeforePhoto = function () {
            return new Promise(function (resolve, reject) {
                if (!photoService.beforePhoto) {
                    $http.get('/photos/before')
                    .success(function (res) {
                        photoService.beforePhoto = res.photo;
                        if ('afterPhoto' in res && res.afterPhoto) {
                            photoService.afterPhoto = res.afterPhoto;
                        }
                        if ('framedPhoto' in res && res.framedPhoto) {
                            photoService.framedPhoto = res.framedPhoto;
                        }
                        resolve([photoService.beforePhoto, photoService.afterPhoto, photoService.framedPhoto]);
                    })
                    .error(reject);
                } else {
                    resolve([photoService.beforePhoto, photoService.afterPhoto, photoService.framedPhoto]);
                }
            });
        };

        photoService.setAfterPhoto = function (afterPhoto) {
            if ('id' in photoService.beforePhoto) {
                photoService.beforePhoto.matchID = afterPhoto.id;
                afterPhoto.matchID = photoService.beforePhoto.id;
            }
            photoService.afterPhoto = afterPhoto;
        };

        photoService.setAfterPhotoDate = function (createDate) {
            photoService.afterPhoto.date = createDate.toISOString();
        };

        photoService.getAfterPhoto = function () {
            return photoService.afterPhoto;
        };

        photoService.setFramedPhoto = function (framedPhoto) {
            photoService.framedPhoto = framedPhoto;
            if ('id' in photoService.afterPhoto) {
                photoService.framedPhoto.matchID = photoService.afterPhoto.id;
            }
        };

        photoService.setFramedPhotoDate = function (createDate) {
            photoService.framedPhoto.date = createDate;
        };

        photoService.getFramedPhoto = function () {
            return photoService.framedPhoto;
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
                            createDate = (new Date()).toISOString();
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
                    console.log("Getting EXIF data & uploading pic.");
                    if (!file.isWebcam) {
                        exifOk = EXIF.getData(file, onGetEXIFData);
                        if (!exifOk) {
                            // Exif processing fail, so move on.
                            onGetEXIFData();
                        }
                    } else {
                        onGetEXIFData();
                    }
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
                            createDate = (new Date()).toISOString();
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
                    exifOk = EXIF.getData(file, onGetEXIFData);
                    if (!exifOk) {
                        // Exif processing fail, so move on.
                        onGetEXIFData();
                    }
                }
            }
        };

        photoService.savePhoto = function (photo) {
            if (photo.type == 1) {
                photoService.setBeforePhoto(photo);
            } else if (photo.type == 2) {
                photoService.setAfterPhoto(photo);
            } else if (photo.type == 3) {
                photoService.setFramedPhoto(photo);
            }
            return new Promise(function (resolve, reject) {
                $http.post('photos/save', photo)
                .success(function (res) {
                    console.log(res);
                    var savedPhoto = res.photo;
                    if (photo.type == 1) {
                        photoService.setBeforePhoto(savedPhoto);
                    } else if (photo.type == 2) {
                        photoService.setAfterPhoto(savedPhoto);
                    } else if (photo.type == 3) {
                        photoService.setFramedPhoto(savedPhoto);
                    }
                    resolve(savedPhoto);
                })
                .error(function (err) {
                    reject(err);
                });
             });
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

