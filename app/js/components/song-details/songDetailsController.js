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


    	 $scope.newComment = {
    	 	"name": "",
    	 	"comment":"",
    	 	"date": "",
    	 	"rating": 0
    	 };

		 $scope.setRating = function(newVal) {
		 	//console.log("setRating");
		    $scope.newComment.rating = newVal;
		 };



    	//Form submit
        $scope.addNewReview = function() {
            console.log("submit");
            $scope.newComment.date = new Date();

            console.log($scope.newComment);

          	$scope.writeReview = false;

          /*  songService.insertNewSong($scope.song)
                .then(
                    function(response) {
                        console.log(response);
                    });*/
        }

}]);