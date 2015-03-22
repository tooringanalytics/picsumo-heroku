(function() {

    var appsvc = angular.module('app.services', []);

    appsvc.factory('Validate',
                   function() {
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
        };
    });

    appsvc.factory('NavUpdate', ['$rootScope',
                                 function($rootScope) {
        var sharedService = {};

        sharedService.message = '';

        sharedService.prepForBroadcast = function(msg) {
            this.message = msg;
            this.broadcastItem();
        };

        sharedService.broadcastItem = function() {
            $rootScope.$broadcast('updateNavbar');
        };

        return sharedService;

    }]);


})();
