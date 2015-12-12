'use strict';


angular.module('musicBoxApp')
    .controller('homeController', ['$scope', 'songService', function($scope, songService) {


    $scope.music = [];


    songService.getAllSongs().then(
        function(response) {
            $scope.music = response.data;
        });


}]);
