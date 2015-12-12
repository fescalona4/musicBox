'use strict';


angular.module('musicBoxApp.admin', ['ngFileUpload'])

    .controller('adminController', ['$scope', 'songService', '$mdDialog','Upload',
     function($scope, songService, $mdDialog, Upload) {


        $scope.song = {
            "filter": "new, top",
            "comments": [],
            "downloadCount": 0,
            "playCount": 0,
            "rating": 0,
        };


        $scope.addNewSong = function() {
            console.log("submit");
            console.log($scope.song);

            $scope.uploadPic($scope.picFile);

/*            songService.insertNewSong($scope.song)
                .then(
                    function(response) {
                        console.log(response);
                    });*/
        }



        $scope.showConfirm = function() {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Please enter pwd')
                .textContent('here')
                .ariaLabel('Lucky day')
                .ok('Login')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'You decided to get rid of your debt.';
                console.log("login");
            }, function() {
                $scope.status = 'You decided to keep your debt.';
                console.log("cancel");
                $scope.go('/');
            });
        };

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
        }

        $scope.showLogin();






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
        }














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
