

//set routes
angular.module('musicBoxApp')
    .config(['$stateProvider', 'deviceTypeProvider','$urlRouterProvider','$locationProvider',
    function($stateProvider, deviceTypeProvider, $urlRouterProvider,$locationProvider) {


        var deviceType = deviceTypeProvider.$get().getDeviceType();

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'js/components/home/homeView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'Dashboard'
            })
            .state('new', {
                url: '/new',
                templateUrl: 'js/components/new-releases/newReleasesView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'New Releases'
            })
            .state('top', {
                url: '/top',
                templateUrl: 'js/components/top-charts/topChartsView.html',
                controller: 'homeController',
                controllerAs: 'ctrl',
                title: 'Popular Songs'
            })
            .state('music', {
                url: '/music',
                templateUrl: 'js/components/all-music/allMusicView.html',
                controller: 'allMusicController',
                controllerAs: 'ctrl',
                title: 'Music'
            })
            .state('song-details', {
                url: '/song-details/:songId',
                templateUrl: 'js/components/song-details/view/' + deviceType + '/song-details.html',
                controller: 'songDetailsController',
                controllerAs: 'songs',
                title: 'Song Details'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'js/components/admin/adminView.html',
                controller: 'adminController',
                controllerAs: 'ctrl',
                title: 'Admin Page'
            });
            $urlRouterProvider.otherwise('/home');


        // use the HTML5 History API
        $locationProvider.html5Mode(true).hashPrefix('!');

    }
])

.run(['$rootScope','$location','$window', '$state', '$FB',
    function($rootScope,$location, $window, $state, $FB) {

        $FB.init('644748478997319');
        $window.ga('create', 'UA-71457119-1', 'auto');

        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());

            //set title
            $rootScope.title = $state.current.title;
        });

    }

]);