# picsumo

Why - Because people deserve to be recognized for transforming their bodies.

How - By using a free progress pics web app.

What - PicSumo is the easiest way to take and share your before and after photos.

PicSumo gives you access to a camera to take your own before and after pics. Works on all mobile devices, laptops, and desktops.

Start by taking your before photo and let PicSumo automatically add the date. Then PicSumo sends an email & text reminder when it's time to take your after photo.

When your photos are complete, PicSumo will frame them and date them for you.

Download your photos for yourself or share them on sites like Facebook, Twitter, and Instagram.

Link to my Trello: https://trello.com/b/QUUxjqFT/picsumo

Models

beforePhoto
	id: 'string'
	date: 'datetime'
	url: 'string'
	shortUrl: 'string'

afterPhoto
	id: 'string'
	date: 'datetime'
	url: 'string'
	shortURl: 'string'

framedPhoto
	id: 'string'
	date: 'datetime'
	url: 'string'
	shortURl: 'string'

photo
	id: 'string'
	date: 'datetime'
	url: 'string'
	shortUrl: 'string'
	type: integer (1 - before, 2 - after, 3-framed)

user
	email: 'string'
	username: 'string'
	password: 'string'
	registrationDate: 'datetime'
	loginHistory: 'array'
	

notifications
	to: 'string' validation: email
	from: 'string'
	sendAt: 'datetime'
	message: 'string'

APIs
 - Facebook Share
 - Twitter Share
 - Instagram Share
 - URL Shortener

Cool formatting of photo with box shadow
http://mdn-samples.mozilla.org/s/webrtc-capturestill/


