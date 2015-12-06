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
