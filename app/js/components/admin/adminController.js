


angular.module('musicBoxApp.admin', ['ngFileUpload','md.data.table'])

    .controller('adminController', ['$scope', 'songService', '$mdDialog','Upload',
     function($scope, songService, $mdDialog, Upload) {

        //new song to be inserted
        $scope.song = {
            "filter": "new, top",
            "comments": [],
            "downloadCount": 0,
            "playCount": 0,
            "rating": 0,
            "dateAdded": new Date()
        };

        //Form submit
        $scope.addNewSong = function() {
            //console.log("submit");

            if($scope.picFile !== undefined){
                $scope.uploadPic($scope.picFile);
            }

            songService.insertNewSong($scope.song)
                .then(
                    function(response) {
                        console.log(response);
                    });
        };


        //Login dialog
        $scope.showLogin = function(ev) {
            $mdDialog.show({
                    controller: loginController,
                    scope: $scope.$new(),
                    templateUrl: 'js/components/admin/loginView.html',
                    //parent: angular.element(document.body),
                    //targetEvent: ev,
                    clickOutsideToClose: false,
                    disableParentScroll: false,
                    hasBackdrop: true,
                    focusOnOpen: false,
                    escapeToClose :false,
                    autoWrap :false
                })
                .then(function(answer) {

                }, function() {});
        };
        $scope.showLogin(); //show login on load





        //Function for uploading picture
        $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'api/photo',
          data: {file: file},
        });

        file.upload.then(function (response) {
            file.result = response.data;
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        };



        //getting all song to insert in table
        $scope.music = [];
        songService.getAllSongs().then(
            function(response) {
                $scope.music = response.data;
            });

        $scope.tableOrder = '-dateAdded'; 
        $scope.selected = [];
        $scope.myLimit = 10;
        $scope.myPage = 1;

        //Form submit
        $scope.updateSong = function() {
            console.log($scope.selected[0]);


            if($scope.picFile !== undefined){
                $scope.uploadPic($scope.picFile);
            }

            songService.updateSong($scope.selected[0])
                .then(
                    function(response) {
                        console.log(response.data);
                        $scope.updateResponse = response.data;
                    });
        };



    }]);



function loginController($scope, $mdDialog) {

    this.parent = $scope;

    $scope.cancelLogin = function() {
        $scope.go('/');
    };

    $scope.login = function() {
        if ($scope.user.pwd == 'cuba') {
            $mdDialog.hide();
        } else {
            console.log("wrong pwd");
        }
    };
}
