

app.controller('songDetailsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    $scope.params = $routeParams;

    $http.get("/api/song/" + $routeParams.songId)
        .success(function(response) {
            $scope.song = response;
            //console.log(response);
        });

}]);