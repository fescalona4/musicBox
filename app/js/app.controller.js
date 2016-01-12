angular.module('musicBoxApp')
    .controller('appController', ['deviceType', '$scope', '$http', '$location',
        '$mdSidenav', '$mdDialog', 'angularPlayer', '$animate', 'songService',

        function(deviceType, $scope, $http, $location,
            $mdSidenav, $mdDialog, angularPlayer, $animate, songService) {

            $scope.buffering = false;
            $scope.$location = $location;

            $scope.styleType = deviceType.getDeviceType();
            //console.log($scope.styleType);




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
                console.log("music:isPlaying: " + data);
                if (data === true) {
                    angularPlayer.adjustVolumeSlider($scope.volume);

                    //hide track seeker & show buffering
                    $scope.buffering = true;
                }

            });

            $scope.$on('track:loaded', function(event, data) {
                console.log("track:loaded: " + data);

                //show track seeker & hide buffering when track loaded
                $scope.buffering = false;
            });


            //Change page title based on route
            $scope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
                $scope.title = currentRoute.title;
            });

            appCtrl.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();

            };

            $scope.onSwipeLeft = function(menuId) {
                $mdSidenav(menuId).toggle();
                //console.log("onSwipeLeft");
            };

            $scope.go = function(path, title) {
                $location.path(path); //go to that route
            };


            $scope.showPlaylistQueue = function(ev) {

                if (!$scope.playlistShown) {

                    $scope.playlistShown = true;

                    $mdDialog.show({
                            controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
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


                                $scope.playSelectedSong = function(song) {
                                    console.log(song);
                                    angularPlayer.playTrack(song);
                                };
                            }],
                            //controller: DialogController,
                            //controllerAs: 'ctrl',
                            scope: $scope.$new(),
                            templateUrl: 'js/components/playlist/playlistView.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            disableParentScroll: false,
                            hasBackdrop: false,
                            focusOnOpen: false,
                            autoWrap: false
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
            };


            $scope.playCountPlusPlus = function(id) {
                $http.put("/api/song/play-count/" + id, null)
                    .success(function(response) {});
            };

            $scope.downloadCountPlusPlus = function(id) {
                $http.put("/api/song/download-count/" + id, null)
                    .success(function(response) {});
            };

        }
    ]);


/*function DialogController($scope, $mdDialog) {
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


    $scope.playSelectedSong = function(song) {
        angularPlayer.playTrack(song);
    };
}
*/

