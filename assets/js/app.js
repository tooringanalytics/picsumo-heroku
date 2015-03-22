/**
 * The main app module, wrapped in a closure.
 */
(function() {

    var app = angular.module('app',
                             ['app.controllers', 'ui.router']);

    /**
     * Use inline array annotation to annotate the dependencies.
     * This insures minification/obfuscation doesn't destroy
     * dependency annotations.
     */
    app.config(['$stateProvider',
                '$urlRouterProvider',
                '$locationProvider',
                function($stateProvider,
                         $urlRouterProvider,
                         $locationProvider) {

        // $locationProvider.html5Mode(true);

        // Angular-UI states, activated by
        // ui-sref tags in the templates.
        $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        })
        .state('before', {
          url: '/before',
          templateUrl: 'templates/before.html',
          controller: 'BeforeCtrl'
        })
        .state('fake', {
        url: '/fake',
        templateUrl: 'templates/fake.html',
        controller: 'FakeCtrl'
        })
        .state('after', {
          url: '/after',
          templateUrl: 'templates/after.html',
          controller: 'AfterCtrl'
        })
        .state('share', {
          url: '/share',
          templateUrl: 'templates/share.html',
          controller: 'ShareCtrl'
        })
        .state('gallery', {
          url: '/gallery',
          templateUrl: 'templates/gallery.html',
          controller: 'GalleryCtrl'
        });

        $urlRouterProvider.otherwise('/');

    }]);

})();
