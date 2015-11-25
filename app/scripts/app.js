

var app = angular.module('musicBoxApp', ['ngMaterial','ngRoute','angularSoundManager'])
//set theme
.config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
.primaryPalette('red')
.accentPalette('blue');
});

//set routes
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/new', {
        templateUrl: 'partials/new-releases.html',
        controller: 'cardsController'
      })
     .when('/top', {
        templateUrl: 'partials/top-charts.html',
        controller: 'cardsController'
      })
     .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'cardsController'
      })
    .otherwise({
        redirectTo: '/home'
      });
  }]);


app.controller('appController', ['$scope', '$location',function($scope,$location,$mdSidenav) {
	
		var appCtrl = this;

		appCtrl.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();

		};

		$scope.go = function ( path ) {
		  $location.path( path );
		};

}]);






app.controller('cardsController', ['$http', function($http) {
	
	//this.music = [];
    var json=this;
    json.music = [];
    
    $http.get("/app/myDataJson.json")
    	.success(function(response) {
    		json.music = response;
    		//alert(JSON.stringify(json.music));
    	});

}]);



app.directive('musicCard', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/music-card.html'
  };
});
