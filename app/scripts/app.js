

  var app = angular.module('musicBoxApp', ['ngMaterial'])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
  });


  app.controller('AppController', function($mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

  });




app.controller('cardsController', ['$http', function($http) {

    var music=this;
    
    $http.get("/app/myDataJson.json")
    	.success(function(response) {
    		music = response;
    	});
    
   

    
}]);