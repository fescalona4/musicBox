var app = angular.module('musicBoxApp', ['ngMaterial', 'ngRoute', 'angularSoundManager', 'ngMdIcons', 'ngAnimate', 'musicBoxApp.deviceTypeProvider'])



//set theme
.config(function($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
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
app.config(['$routeProvider', 'deviceTypeProvider',
    function($routeProvider, deviceTypeProvider) {

        var deviceTypeProvider = deviceTypeProvider.$get(),
            deviceType = deviceTypeProvider.getDeviceType();

        $routeProvider
            .when('/new', {
                templateUrl: 'partials/new-releases.html',
                controller: 'newReleasesController',
                controllerAs: 'cardsCtrl',
                title: 'New Releases'
            })
            .when('/top', {
                templateUrl: 'partials/top-charts.html',
                controller: 'newReleasesController',
                controllerAs: 'cardsCtrl',
                title: 'Popular Songs'
            })
            .when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homeController',
                controllerAs: 'cardsCtrl',
                title: 'Dashboard'
            })
            .when('/song-details/:songId', {
                templateUrl: 'view/' + deviceType + '/song-details.html',
                controller: 'soundDetailsController',
                title: 'Song Details'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);


app.controller('appController', ['deviceType', '$scope', '$route', '$http', '$location', '$mdSidenav', '$mdDialog', 'angularPlayer',

    function(deviceType, $scope, $route, $http, $location, $mdSidenav, $mdDialog, angularPlayer) {

        $scope.$route = $route;
        $scope.$location = $location;

        $scope.styleType = deviceType.getDeviceType();
        console.log($scope.styleType);



        SC.initialize({
            client_id: "49acbcf970718a548c26aa85f8e6e653"
        });

        $scope.playSong = function(song) {
            console.log('playSong:'+song.id);
            $scope.currentPlaying = song;

            SC.stream(song.url).then(function(player){
              player.play();
              $scope.soundCloudPlayer = player;
              $scope.isPlaying = true;
            });
        }

        $scope.pauseSong = function() {
            console.log('pauseSong');

            if ($scope.isPlaying) {
                $scope.soundCloudPlayer.pause();
                $scope.isPlaying = false;
            } 
            else {
                $scope.soundCloudPlayer.play();
                $scope.isPlaying = true;
            }
        }












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
                        templateUrl: 'partials/playlistQueue.html',
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

        $scope.$on('player:playlist', function(event, data) {
            //do your stuff here
            //console.log("playlist: "+JSON.stringify(data));
        });


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
    //console.log("playlist:"+JSON.stringify($scope));
}




app.controller('homeController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var json = this;
    json.music = [];


    $http.get("/api/get-all-songs")
        .success(function(response) {
            json.music = response;
        });



}]);



app.controller('newReleasesController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var json = this;
    json.music = [];


    $http.get("/api/get-all-songs")
        .success(function(response) {
            json.music = response;
        });



}]);


app.controller('soundDetailsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    $scope.params = $routeParams;

    $http.get("/api/song/" + $routeParams.songId)
        .success(function(response) {
            $scope.song = response;
            //console.log(response);
        });

}]);



app.directive('musicCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/music-card.html'
    };
});




app.directive('musicPlayer', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/music-player.html'
    };
});





app.controller('starCtrl', ['$scope', function($scope) {
    $scope.rating = 0;
    $scope.ratings = [{
        current: 3,
        max: 5
    }];

    $scope.getSelectedRating = function(rating) {
        //console.log(rating);
    }
}]);

app.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<div layout="row" > ' +
            '<md-button class="md-icon-button grayIcon" aria-label="rating" ' +
            'ng-click="toggle($index)" style="margin:0px;padding:0px;width:22px;" ng-repeat="star in stars">' +
            '    <md-icon md-svg-icon="images/icons/ic_star_black_48px.svg" ng-show="star.filled"></md-icon>' +
            '    <md-icon md-svg-icon="images/icons/ic_star_border_black_48px.svg" ng-hide="star.filled"></md-icon>' +
            '</md-button> ' +
            '</div>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function(scope, elem, attrs) {

            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function(index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
