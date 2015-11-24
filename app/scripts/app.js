

  var app = angular.module('musicBoxApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
  });



app.controller('appController', function($mdSidenav) {
	
		var appCtrl = this;

		appCtrl.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();

		};

});






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