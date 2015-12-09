var app = angular.module('musicBoxApp', 
    ['ngMaterial', 'ngRoute', 'angularSoundManager', 'ngMdIcons', 'ngAnimate', 'musicBoxApp.deviceTypeProvider'])



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






angular.module("musicBoxApp.deviceTypeProvider", []).provider('deviceType', ['$windowProvider', function($windowProvider) {
    var $window = $windowProvider.$get();
    this.$get = function() {
        return { /*Returns the device type desktop, mobile and tablet, default device type is desktop*/
            getDeviceType: function() { //Let, default device type 
                var deviceType = 'desktop',
                    userAgentString = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'],
                    width = $window['outerWidth'],
                    isSmart = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgentString);
                if (isSmart && width >= 768) {
                    deviceType = "tablet";
                } else if (isSmart && width <= 767) {
                    deviceType = "mobile";
                }
                return deviceType;
            }
        }
    };
}]);
