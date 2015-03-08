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

beforePhoto
	id: {
		type: 'string',
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
	shortUrl: {
		type: 'string'
		required: true,
		unique: true
		url: true
		} 
afterPhoto
	id: {
		type: 'string',
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
	shortUrl: {
		type: 'string'
		required: true,
		unique: true
		url: true
		} 

framedPhoto
	id: {
		type: 'string',
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
	shortUrl: {
		type: 'string'
		required: true,
		unique: true
		url: true
		} 

photo
	id: {
		type: 'string',
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
	shortUrl: {
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

user
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

 #Libraries 
 -angular
 -angular-ui-router
 -angular-camera
 -jQuery

#Misc
Cool formatting of photo with box shadow
http://mdn-samples.mozilla.org/s/webrtc-capturestill/


