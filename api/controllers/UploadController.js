/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var UploadController = {


    /**
    * `UploadController.index()`
    */
    index: function (req, res) {
        sails.log.debug('uploading files to S3');
        var skipperS3 = require('skipper-s3');

        files = req.file('file');
        sails.log.debug(files);
        if (files.isNoop) {
            sails.log.debug('Noop found: Empty file upload op.');
            res.status(500);
                    res.jsonx({
                        "error": true,
                        "status": 500,
                        "summary": "Empty file list."
            });
            return;
        }
        sails.log.debug("Trying to upload to S3.");
        try {

            req.file('file')
            .upload({
                  adapter: skipperS3,
                  key: sails.config.s3.key,
                  secret: sails.config.s3.secret,
                  bucket: sails.config.s3.bucket,
                  region: sails.config.s3.region,
                  headers: {
                      'x-amz-acl': 'public-read'
                  }
            }, function(err, uploadedFiles) {
                sails.log.debug(err);
                sails.log.debug(uploadedFiles);
                if(err) {
                    sails.log.debug("Error uploading files");
                    sails.log.error(err);
                    res.status(500);
                    res.jsonx({
                        "error": err,
                        "status": 500,
                        "summary": "There was a problem uploading the file."
                    });
                } else {
                    sails.log.debug("Files Uploaded Successfully!");
                    res.jsonx({
                        "error": err,
                        "status": 200,
                        "summary": "Files uploaded successfully.",
                        "uploadedFiles" : uploadedFiles
                    });
                }
            });
        } catch (err) {
            sails.log.error(err);
            res.status(500);
            res.jsonx({
                "error": "E_UPLOAD",
                "status": 500,
                "summary": "There was a problem uploading the file."
            });
        }

    },

    sign_request: function(req, res) {
        var aws = require('aws-sdk');
        sails.log.debug("Signing request");
        sails.log.debug(sails.config.s3.key);
        sails.log.debug(sails.config.s3.secret);
        sails.log.debug(sails.config.s3.bucket);
        aws.config.update({accessKeyId: sails.config.s3.key,
                           secretAccessKey: sails.config.s3.secret});

        sails.log.debug("Read AWS Config");
        var s3 = new aws.S3();

        sails.log.debug("Creating Sign Request from req params");
        var s3_params = {
            Bucket: sails.config.s3.bucket,
            Key: req.query.s3_object_name,
            Expires: 60,
            ContentType: req.query.s3_object_type,
            ACL: 'public-read'
        };

        sails.log.debug(s3_params);

        s3.getSignedUrl('putObject', s3_params, function(err, data) {
            if(err){
                sails.log.debug(err);
                res.status(500);
                res.jsonx({
                    "error": "E_UPLOAD",
                    "status": 500,
                    "summary": "There was a problem uploading the file."
                });
            }
            else{
                sails.log.debug("Signing succeeded!");
                var return_data = {
                    signed_request: data,
                    url: 'https://' + sails.config.s3.bucket + '.s3.amazonaws.com/' + req.query.s3_object_name
                };
                sails.log.debug(return_data);
                res.jsonx(return_data);
                //res.write(JSON.stringify(return_data));
                //res.end();
            }
        });
    },

    upload_photo_url: function(req, res) {
        photo_url = req.body.photo_url;
        //update_account(username, full_name, avatar_url); // TODO: create this function
        // TODO: Return something useful or redirect
        sails.log.debug(photo_url);
        re.jsonx({ status: 'success' });
    }
};



module.exports = UploadController;
