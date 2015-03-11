<<<<<<< HEAD
# picsumo

Why - Because people deserve to be recognized for transforming their bodies.

How - By using a free progress pics web app.

What - PicSumo is the easiest way to take and share your before and after photos.

PicSumo gives you access to a camera to take your own before and after pics. Works on all mobile devices, laptops, and desktops.

Start by taking your before photo and let PicSumo automatically add the date. Then PicSumo sends an email & text reminder when it's time to take your after photo.

When your photos are complete, PicSumo will frame them and date them for you.

Download your photos for yourself or share them on sites like Facebook, Twitter, and Instagram.

Link to my Trello: https://trello.com/b/QUUxjqFT/picsumo

#Models

photo
	id: {
		type:'integer',
		required: true,
		unique: true
		}
	date: {
		type: 'datetime',
		required: true,
		unique: false
		}
	url: {
		type: 'string'
		required: true,
		unique: true
		url: true
		} 
	type: {
		type: 'integer', (before, after, framed)
		required: true
		unique: false
		}
	matchID {
		type: 'integer',
		required: false,
		unique: false
		}
	private: {
		type: 'Boolean',
		required: true,
		unique: false
		}
	userID: {
		type: integer,
		required: true,
		unique: false
	}

}

user
	id: 'integer'
	email: 'string'
	username: 'string'
	password: 'string'
	registrationDate: 'datetime'
	loggedin: 'boolean'
	loginHistory: 'array'
	

notification
	to: 'string'
	from: 'string'
	sendAt: 'datetime'
	message: 'string'

#APIs
 - Facebook Share
 - Twitter Share
 - Instagram Share
 - URL Shortener
 - http://imgix.com/

 #Libraries
 - sails-template 
 - angular (auto added by sails-template)
 - angular-ui-router (auto added by sails-template)
 - angular-camera
 - ng-file-upload (https://github.com/danialfarid/ng-file-upload#install)
 - jQuery

Here are the 3 options I have for cameras:
- https://github.com/onemightyroar/angular-camera
- https://github.com/jhuckaby/webcamjs
- https://github.com/bcabanes/ng-camera

#Misc
Cool formatting of photo with box shadow
http://mdn-samples.mozilla.org/s/webrtc-capturestill/

I am going to need an Angular library for taking the photo and uploading the photo. Annoying.

Questions for Aaron

1 - How to speed up the sails loading process. It's too slow for design iteration.
2 - How to install fonts and libraries. They keep disappearing from layout.js and/or the order in the scripts are messed up and it doesn't allow for dependencies to work properly.
3 - Data models. One photo or multiple photo models.
4 - How do I find a simple file uploader that's for only one file at a time?
5 - It keeps putting angular-file-upload before angular in the scripts area.


=======
 - error: string - the error code that caused the failure.
 - status: integer - the HTTP status code.
 - summary: string - a message describing the error.

