angular.module('app', ['app.controllers', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);

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
  .state('after', {
    url: '/after',
    templateUrl: 'templates/after.html',
    controller: 'AfterCtrl'
  })
  .state('gallery', {
    url: '/gallery',
    templateUrl: 'templates/gallery.html',
    controller: 'GalleryCtrl'
  });

  $urlRouterProvider.otherwise('/');
});