

var app = angular.module('musicBoxApp', ['ngMaterial','ngRoute','angularSoundManager','ngMdIcons'])
//set theme
.config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    }) 
    .accentPalette('deep-orange');
    $mdThemingProvider.theme('input', 'default')
    .primaryPalette('blue-grey');
    $mdThemingProvider.theme('musicPlayer', 'default')
    .primaryPalette('grey', {
      'default': '50' // use shade 200 for default, and keep all other shades the same
    });
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


app.controller('appController', ['$scope', '$location','$mdSidenav',function($scope,$location,$mdSidenav) {
	
		var appCtrl = this;

		appCtrl.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();

		};

		$scope.go = function ( path ) {
		  $location.path( path );
		};


}]);






app.controller('cardsController', ['$scope','$http','$filter', function($scope,$http,$filter) {
	
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




app.directive('musicPlayer', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/music-player.html'
  };
});