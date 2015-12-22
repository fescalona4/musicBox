


angular.module('musicBoxApp')
    .controller('songDetailsController', ['$scope', '$stateParams', 'songService', '$location', function($scope, $stateParams, songService, $location) {


        $scope.song = {};


        $scope.getSong = function() {
            songService.getSong(parseInt($stateParams.songId))
                .then(
                    function(response) {
                        //console.log("getSong");
                        $scope.song = response.data;
                    }
                );
        };
        $scope.getSong();



        $scope.totalRating = 4.5; 


        $scope.resetNewComment = function() {
            $scope.newComment = {
                "name": "",
                "comment": "",
                "date": "",
                "rating": 3
            };
        };
        $scope.resetNewComment();


        $scope.setRating = function(newVal) {
            //console.log("setRating");
            $scope.newComment.rating = newVal;
        };



        //Form submit
        $scope.addNewReview = function() {
            //console.log("submit");
            $scope.newComment.date = new Date();

            //console.log($scope.newComment);

            $scope.writeReview = false;

            songService.updateComments($scope.song.id, $scope.newComment)
                .then(
                    function(response) {
                        //console.log(response);
                        $scope.getSong();
                        $scope.resetNewComment();
                        $scope.reviewCompleted = true;
                    });

        };


        $scope.completeUrl = $location.absUrl();
        console.log($scope.completeUrl);

    }]);


angular.module('musicBoxApp').filter('index', function() {
    return function(array, index) {
        if (!index)
            index = 'index';
        for (var i = 0; i < array.length; ++i) {
            array[i][index] = i;
        }
        return array;
    };
});
