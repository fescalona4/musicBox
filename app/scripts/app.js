var app = angular.module('musicBoxApp', ['ngMaterial', 'ngRoute', 'angularSoundManager', 'ngMdIcons', 'ngAnimate'])
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
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/new', {
                templateUrl: 'partials/new-releases.html',
                controller: 'cardsController'
            })
            .when('/top', {
                templateUrl: 'partials/top-charts.html',
                controller: 'cardsController'
            })
            .when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'cardsController'
            })
            .when('/song-details/:songId', {
                templateUrl: 'partials/song-details.html',
                controller: 'sondDetailsController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);


app.controller('appController', ['$scope', '$route', '$location', '$mdSidenav', '$mdDialog', 'angularPlayer',
    function($scope, $route, $location, $mdSidenav, $mdDialog, angularPlayer) {

        $scope.$route = $route;
        $scope.$location = $location;


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




app.controller('cardsController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var json = this;
    json.music = [];

    $http.get("/myDataJson.json")
        .success(function(response) {
            json.music = response;
            //alert(JSON.stringify(json.music));
        });


}]);




app.controller('sondDetailsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    $scope.params = $routeParams;


    $http.get("/api/song/" + $routeParams.songId)
        .success(function(response) {
            $scope.song = response;
            console.log("api/song: "+ response);
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
