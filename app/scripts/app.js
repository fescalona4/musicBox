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
                controllerAs: 'cardsCtrl'
            })
            .when('/top', {
                templateUrl: 'partials/top-charts.html',
                controller: 'newReleasesController',
                controllerAs: 'cardsCtrl'
            })
            .when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homeController',
                controllerAs: 'cardsCtrl'
            })
            .when('/song-details/:songId', {
                templateUrl: 'view/' + deviceType + '/song-details.html',
                controller: 'soundDetailsController'
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



        //console.log('Current route name: ' + $location.path());
        if ($location.path() == "/home") {
            $scope.title = "Dashboard";
        } else if ($location.path() == "/new") {
            $scope.title = "New Releases";
        } else if ($location.path() == "/top") {
            $scope.title = "Top Charts";
        }

        appCtrl.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();

        };

        $scope.go = function(path, title) {
            $location.path(path); //go to that route
            $scope.title = title;
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



    this.newReleasesInHome = function() {

        var response = [];
        range = 3;
        //var width = angular.element(document.getElementById('newReleasesInHomePanel'))[0].offsetWidth;
        var width = $scope.windowWidth;
        console.log("width:"+width);
        range = width / 220;
        range = $filter('number')(range, 0);
        console.log("show:"+range)

        if (json.music[0] != undefined) {

          var filterResults = $filter('filter')(json.music, {filter: 'new'});
          //console.log(filterResults.length);

            for (var i = 0; i < range; i++) {
                response.push(filterResults[i]);
            }
            //console.log(response);
        }
        
        return response;
    };

    this.popularInHome = function() {

        var response = [];
        range = 3;

        if (json.music[0] != undefined) {

          var filterResults = $filter('filter')(json.music, {filter: 'top'});
          //console.log(filterResults.length);

            for (var i = 0; i < range; i++) {
                response.push(filterResults[i]);
            }
            //console.log(response);
        }
        
        return response;
    };

}]);
/*
function AppController($scope) {
   $scope.notifyServiceOnChage = function(){
     console.log("new:"+$scope.windowHeight);
  };
}


app.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': w.height, 
                'w': w.width
            };
        }, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return { 
                    'height': (newValue.h - offsetH) + 'px'                    
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});

*/
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
