


angular.module('musicBoxApp')
    .directive('musicCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/components/music-card/musicCardView.html',
        controller: 'musicCardController',
        controllerAs: 'ctrl'
    };
});

