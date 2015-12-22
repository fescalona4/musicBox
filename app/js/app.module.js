

angular.module('musicBoxApp', 
    ['ngMaterial', 'ui.router', 'angularSoundManager',  'ngAnimate', 
        'musicBoxApp.deviceTypeProvider','musicBoxApp.admin', 'djds4rce.angular-socialshare'])



//set theme
.config(['$mdThemingProvider',function($mdThemingProvider) {
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
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .accentPalette('blue-grey')
      .dark();
}])
.service('songService', ['$http', function($http) {


        this.getAllSongs = function() {

            return $http.get("/api/get-all-songs");
        };


        this.getSong = function(id) {

            return $http.get("/api/song/" + id);
        };


        this.insertNewSong = function(song) {

            return $http.put("/api/insert-new-song", song);
        };


        this.updateSong = function(song) {
            
            return $http.post("/api/update-song", song);
        };


        this.getVisitCount = function() {

            return $http.get("/api/get-visit-count");
        };


        this.updateComments = function(id, comment) {
            
            return $http.post("/api/update-comments/" + id, comment);
        };

    }])
;






angular.module("musicBoxApp.deviceTypeProvider", []).provider('deviceType', ['$windowProvider', function($windowProvider) {
    var $window = $windowProvider.$get();
    this.$get = function() {
        return { /*Returns the device type desktop, mobile and tablet, default device type is desktop*/
            getDeviceType: function() { //Let, default device type 
                var deviceType = 'desktop';
                var userAgentString = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
                var width = $window.outerWidth;
                var isSmart = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgentString);
                if (isSmart && width >= 768) {
                    deviceType = "mobile";
                } else if (isSmart && width <= 767) {
                    deviceType = "mobile";
                }
                return deviceType;
            }
        };
    };
}]);
