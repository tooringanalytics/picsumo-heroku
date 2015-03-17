/**
* Example.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	//eg 1, 145, 8989, etc
  	id: {
		type:'integer',
		required: true,
		unique: true,
		autoincrement: true
		},
	//eg the date the file was uploaded
	date: {
		type: 'datetime',
		required: true,
		unique: false
		},
	//the amazon s3 URL
	url: {
		type: 'string',
		required: true,
		unique: true,
		url: true
		},
	//1 - before, 2 - after, 3 - framed
	type: {
		type: 'integer',
		required: true,
		unique: false,
		defaultsTo: 1
		},
	//the before or after photo it matches up with
	matchID: {
		type: 'integer',
		required: false,
		unique: false
		},
	// should the photo be publically viewable?
	privatePic: {
		type: 'Boolean',
		required: true,
		unique: false,
		defaultsTo: false
		},
	// what userID is associated with the photo?
	userID: {
		type: 'integer',
		required: true,
		unique: false
	}
  }
};

