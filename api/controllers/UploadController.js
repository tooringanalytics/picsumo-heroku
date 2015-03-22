/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
    * `UploadController.index()`
    */
    index: function (req, res) {
        var skipperS3 = require('skipper-s3');
        req.file('file').upload({
            adapter: skipperS3,
            key: sails.config.s3.key,
            secret: sails.config.s3.secret,
            bucket: sails.config.s3.bucket,
            region: sails.config.s3.region
        }, function(err, uploadedFiles) {
            if(err) {
                   res.status(500);
                   res.jsonx({
                           "error": "E_UPLOAD",
                           "status": 500,
                           "summary": "There was a problem uploading the file."
                   });
            }
            return res.jsonx(uploadedFiles);
        });
    }
};

