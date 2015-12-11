'use strict';


angular.module('musicBoxApp')
    .service('songService', ['$http', function($http) {


        this.getAllSongs = function() {

            return $http.get("/api/get-all-songs");
        };



        this.getSong = function(id) {

            return $http.get("/api/song/" + id);
        };



    }]);
