


angular.module('musicBoxApp')
    .directive('smallMusicCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/components/small-music-card/smallMusicCardView.html',
        controller: 'smallMusicCardController',
        controllerAs: 'ctrl'
    };
});
