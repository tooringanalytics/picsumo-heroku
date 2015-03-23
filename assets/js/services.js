angular.module('app.services', [])
.factory('Validate', function() {
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

		hasError: function(error) {
			for(var i in error) {
				if(error.hasOwnProperty(i) && error[i]) {
					return true;
				}
			}
			return false;
		}
	}
}) // Will I need to change 'upload' to 'Upload' in the before.html?
.factory('Upload', function($upload) {
	
	return function (file) {

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
})
.factory('Before', function() {
	return {
		url: '',
		date: null,
	};
})
.factory('After', function() {
	return {
		url: '',
		date: null,
	};
});
