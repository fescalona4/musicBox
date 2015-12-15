'use strict';


//set routes
angular.module('musicBoxApp')
    .config(['$routeProvider', 'deviceTypeProvider','$locationProvider',
    function($routeProvider, deviceTypeProvider, $locationProvider) {

        var deviceTypeProvider = deviceTypeProvider.$get(),
            deviceType = deviceTypeProvider.getDeviceType();

        $routeProvider
            .when('/new', {
                templateUrl: 'js/components/new-releases/newReleasesView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'New Releases'
            })
            .when('/top', {
                templateUrl: 'js/components/top-charts/topChartsView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'Popular Songs'
            })
            .when('/home', {
                templateUrl: 'js/components/home/homeView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'Dashboard'
            })
            .when('/song-details/:songId', {
                templateUrl: 'js/components/song-details/view/' + deviceType + '/song-details.html',
                controller: 'songDetailsController',
                controllerAs: 'songs',
                title: 'Song Details'
            })
            .when('/admin', {
                templateUrl: 'js/components/admin/adminView.html',
                controller: 'adminController',
                controllerAs: 'ctrl',
                title: 'Admin Page'
            })
            .otherwise({
                redirectTo: '/home'
            });


        // use the HTML5 History API
        //$locationProvider.html5Mode(true);

    }
])

.run(['$rootScope','$location','$window',
    function($rootScope,$location, $window) {

        $window.ga('create', 'UA-71457119-1', 'auto');

        // track pageview on state change
        $rootScope.$on('$routeChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());
        });

    }

]);