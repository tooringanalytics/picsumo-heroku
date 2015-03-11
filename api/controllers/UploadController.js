/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var AWS = require('aws-sdk');

var s3  = new AWS.S3({
    accessKeyId: 'AKIAJCA7CFBEBQQ6KUDA',
    secretAccessKey: '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'
});

module.exports = {
	index: function (req, res) {
		console.log('test');
		console.log(req.files);
		console.log(req.file);
	}
};