app.controller('appController', ['deviceType', '$scope', '$route', '$http', '$location', '$mdSidenav', '$mdDialog', 'angularPlayer',

    function(deviceType, $scope, $route, $http, $location, $mdSidenav, $mdDialog, angularPlayer) {

        $scope.$route = $route;
        $scope.$location = $location;

        $scope.styleType = deviceType.getDeviceType();
        console.log($scope.styleType);


/*
        SC.initialize({
            client_id: "49acbcf970718a548c26aa85f8e6e653"
        });

*/


        var appCtrl = this;
        $scope.playlistShown = false;

        //Adjust volume code
        $scope.volume = angularPlayer.getVolume();
        $scope.$watch(
            "volume",
            function handleVolumeChange(newValue, oldValue) {
                angularPlayer.adjustVolumeSlider(newValue);
                //console.log('angularPlayer: '+angularPlayer.getVolume());
            }
        );
        $scope.$on('music:isPlaying', function(event, data) {
            //console.log("music:isPlaying: "+data);
            if (data == true) {
                angularPlayer.adjustVolumeSlider($scope.volume);
            }
        });


        //Change page title based on route
        $scope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
            $scope.title = currentRoute.title;
        });

        appCtrl.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();

        };

        $scope.go = function(path, title) {
            $location.path(path); //go to that route
        };


        $scope.showPlaylistQueue = function(ev) {

            if (!$scope.playlistShown) {

                $scope.playlistShown = true;

                $mdDialog.show({
                        controller: DialogController,
                        //controllerAs: 'ctrl',
                        scope: $scope.$new(),
                        templateUrl: 'js/components/playlist/playlistView.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        disableParentScroll: false,
                        hasBackdrop: false
                    })
                    .then(function(answer) {
                        //$scope.status = 'You said the information was "' + answer + '".';
                        $scope.playlistShown = false;

                    }, function() {
                        //$scope.status = 'You cancelled the dialog.';
                        $scope.playlistShown = false;
                    });
            } else {
                $scope.closeDialog();
            }
        };

        $scope.closeDialog = function() {
            $mdDialog.hide();
        }

/*        $scope.$on('player:playlist', function(event, data) {
            //do your stuff here
            //console.log("playlist: "+JSON.stringify(data));
        });*/


        $scope.playCountPlusPlus = function(id) {
            //console.log("playCountPlusPlus");
            $http.put("/api/song/play-count/" + id, null)
                .success(function(response) {
                    //console.log(response);
                });
        }

        $scope.downloadCountPlusPlus = function(id) {
            //console.log("downloadCountPlusPlus");
            $http.put("/api/song/download-count/" + id, null)
                .success(function(response) {
                    //console.log(response);
                });
        }

    }
]);

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
    this.parent = $scope;
}
