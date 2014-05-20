var myapp = angular.module('myapp' , ['ngRoute']);

myapp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
	  when('/', {
        redirectTo: '/search'
      }).
	  when('/search', {
		templateUrl: 'app/partials/searchpage.html',
        controller: 'myController'
      }).
      when('/userlogin', {
        templateUrl: 'app/partials/userlogin.html',
        controller: 'myController'
      }).
	  when('/adduser', {
        templateUrl: 'app/partials/adduser.html',
        controller: 'myController'
      }).
	  when('/playgroundlogin', {
        templateUrl: 'app/partials/playgroundlogin.html',
        controller: 'myController'
      }).
	  when('/addplayground', {
        templateUrl: 'app/partials/createplayground.html',
        controller: 'myController'
      }).
	  when('/addvenue', {
        templateUrl: 'app/partials/addvenue.html',
        controller: 'myController'
      }).
	  when('/checkbooking', {
        templateUrl: 'app/partials/checkbooking.html',
        controller: 'myController'
      }).
	  when('/playground/' , {
		templateUrl : 'app/partials/playground.html',
		controller : 'PlaygroundHomePage_Ctrl'
	  }).
      otherwise({
        redirectTo: '/'
      });
	  
  }]);
