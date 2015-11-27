

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


app.controller('appController', ['$scope', '$location','$mdSidenav','$mdDialog',
    function($scope,$location,$mdSidenav,$mdDialog) {
	
		var appCtrl = this;
    $scope.playlistShown = false;
    
    //console.log('Current route name: ' + $location.path());
    if($location.path()=="/home"){
      $scope.title = "Dashboard";
    }
    else if($location.path()=="/new"){
      $scope.title = "New Releases";
    }
    else if($location.path()=="/top"){
      $scope.title = "Top Charts";
    }

		appCtrl.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();

		};

		$scope.go = function ( path, title ) {
		  $location.path( path ); //go to that route
      $scope.title = title;
		};


    $scope.showPlaylistQueue = function(ev) {
    
        $scope.playlistShown = true;

        $mdDialog.show({
          //controller: DialogController,
          templateUrl: 'partials/playlistQueue.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          disableParentScroll:false,
          hasBackdrop:false
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
          $scope.playlistShown = false;
          
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    }
    

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