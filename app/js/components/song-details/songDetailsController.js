'use strict';


angular.module('musicBoxApp')
    .controller('songDetailsController', ['$scope', '$routeParams', 'songService', function($scope, $routeParams, songService) {


    $scope.song = {};
	

    songService.getSong( parseInt($routeParams.songId) )
    	.then(    
	        function(response) {
	            $scope.song = response.data;
	    	}
	    );




}]);