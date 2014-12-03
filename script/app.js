var app = angular.module("app",['ngRoute']);

app.controller("projects",function($scope){
	$scope.title = "Projects";
});

app.controller("about",function($scope){
	$scope.title = "About";
});

app.config(['$routeProvider', '$locationProvider',
  	function($routeProvider, $locationProvider) {
	    $routeProvider
	    	.when('/', {
                templateUrl : 'pages/projects.html',
                controller  : 'projects'
            })
	    	.when('/about', {
	        	templateUrl: 'pages/about.html',
	        	controller: 'about',
	     	})
	      	.when('/projects', {
	        	templateUrl: 'pages/projects.html',
	        	controller: 'projects'
	      	})
	      	.otherwise({
	        	redirectTo: '/'
	      	});

	      	//$locationProvider.html5Mode(true);
 }]);