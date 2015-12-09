
app.controller('homeController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    var json = this;
    json.music = [];


    $http.get("/api/get-all-songs")
        .success(function(response) {
            json.music = response;
        });



}]);