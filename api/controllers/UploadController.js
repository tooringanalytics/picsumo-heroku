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
        // Disable S3 uploads for now
        //sails.log.debug(req.para);
        res.jsonx({
                "error": "E_UPLOAD",
                "status": 500,
                "summary": "There was a problem uploading the file."
            });
        sails.log.debug(req.file('file'));
        try {

            req.file('file')
            .upload({
                  adapter: skipperS3,
                  key: sails.config.s3.key,
                  secret: sails.config.s3.secret,
                  bucket: sails.config.s3.bucket,
                  region: sails.config.s3.region
            }, function(err, uploadedFiles) {
                sails.log.debug(err);
                sails.log.debug(uploadedFiles);
                if(err) {
                    sails.log.error(err);
                    res.status(500);
                    res.jsonx({
                        "error": "E_UPLOAD",
                        "status": 500,
                        "summary": "There was a problem uploading the file."
                    });
                }
                sails.log.debug(uploadedFiles);
                return res.jsonx(uploadedFiles);
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

    }
};



module.exports = UploadController;
