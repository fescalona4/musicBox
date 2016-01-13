

angular.module('musicBoxApp')
    .controller('allMusicController', ['$scope', 'songService', function($scope, songService) {

        $scope.isOpen = false;
        $scope.music = [];


        songService.getAllSongs().then(
            function(response) {
                $scope.music = response.data;
            });



        var originatorEv;
        this.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };


    }]);
