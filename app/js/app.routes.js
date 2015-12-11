//set routes
app.config(['$routeProvider', 'deviceTypeProvider',
    function($routeProvider, deviceTypeProvider) {

        var deviceTypeProvider = deviceTypeProvider.$get(),
            deviceType = deviceTypeProvider.getDeviceType();

        $routeProvider
            .when('/new', {
                templateUrl: 'js/components/new-releases/newReleasesView.html',
                controller: 'homeController',
                controllerAs: 'cardsCtrl',
                title: 'New Releases'
            })
            .when('/top', {
                templateUrl: 'js/components/top-charts/topChartsView.html',
                controller: 'homeController',
                controllerAs: 'cardsCtrl',
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
            .otherwise({
                redirectTo: '/home'
            });
    }
]);