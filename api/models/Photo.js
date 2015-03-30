/**
* Example.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        //the amazon s3 URL, pass this in.
        url: {
            type: 'string',
            required: true,
            unique: true,
            url: true
            },
        // Data photo was taken.
        date: {
            type: 'datetime',
            required: false,
            defaultsTo: null
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
            defaultsTo: null
        },
        // should the photo be publically viewable?
        privatePic: {
            type: 'Boolean',
            required: true,
            unique: false,
            defaultsTo: false
        },
        // what userID is associated with the photo, pass this in.
        userID: {
            type: 'integer',
            required: true,
            unique: false
        }
  }
};

