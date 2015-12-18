


angular.module('musicBoxApp')
    .controller('allMusicController', ['$scope', 'songService', function($scope, songService) {

	$scope.isOpen = false;
    $scope.music = [];


    songService.getAllSongs().then(
        function(response) {
            $scope.music = response.data;
        });


	

}]);
