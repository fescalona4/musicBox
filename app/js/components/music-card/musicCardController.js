/**/
angular.module('musicBoxApp')
    .controller('musicCardController', ['$scope', function($scope) {


        var originatorEv;
        this.openMenu = function($mdOpenMenu, ev) {
            //console.log('here');
            originatorEv = ev;
            $mdOpenMenu(ev);
        };


    }]);