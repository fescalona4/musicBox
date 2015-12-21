/**/
angular.module('musicBoxApp')
    .controller('smallMusicCardController', ['$scope', function($scope) {


        var originatorEv;
        this.openMenu = function($mdOpenMenu, ev) {
            console.log('here');
            originatorEv = ev;
            $mdOpenMenu(ev);
        };


    }]);
