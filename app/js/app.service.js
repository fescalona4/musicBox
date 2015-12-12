'use strict';


angular.module('musicBoxApp')
    .service('songService', ['$http', function($http) {


        this.getAllSongs = function() {

            return $http.get("/api/get-all-songs");
        };



        this.getSong = function(id) {

            return $http.get("/api/song/" + id);
        };


        this.insertNewSong = function(song) {

            return $http.put("/api/insert-new-song", song);
        };


    }]);
