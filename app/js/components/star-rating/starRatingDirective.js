

angular.module('musicBoxApp')
    .directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<div layout="row" > ' +
            '<md-button class="md-icon-button" aria-label="rating" ' +
            'ng-click="toggle($index)" style="margin:0px;padding:0px;width:22px;" ng-repeat="star in stars">' +
            '    <md-icon class="starFilled" md-svg-icon="images/icons/ic_star_black_48px.svg" ng-show="star.filled"></md-icon>' +
            '    <md-icon class="starFilled" md-svg-icon="images/icons/ic_star_border_black_48px.svg" ng-hide="star.filled"></md-icon>' +
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
    };
});






angular.module('musicBoxApp')
    .directive('starRatingNoClick', function() {
    return {
        restrict: 'A',
        template: '<div layout="row" > ' +
            '<md-button class="md-icon-button" aria-label="rating" ' +
            'style="margin:0px;padding:0px;width:16px;" ng-repeat="star in stars">' +
            '    <md-icon style="margin:0px;padding:0px;width:16px;" class="starFilled" md-svg-icon="images/icons/ic_star_black_48px.svg" ng-show="star.filled"></md-icon>' +
            '    <md-icon style="margin:0px;padding:0px;width:16px;" class="starFilled" md-svg-icon="images/icons/ic_star_border_black_48px.svg" ng-hide="star.filled"></md-icon>' +
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
    };
});



angular.module('musicBoxApp')
    .directive('starRatingReadOnly', function() {
    return {
        restrict: 'A',
        template: '<div ng-controller="starCtrl" layout="row" layout-align="end center">'+
                   ' <span ng-repeat="rating in ratings" layout="row" layout-align="end center">'+
                    '   <div star-rating-no-click rating-value="comment.rating" max="rating.max"></div>'+
                     '   </span>'+
                '</div>'
    };
});