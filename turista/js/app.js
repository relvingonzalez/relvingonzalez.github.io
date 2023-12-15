
(function () {

    "use strict";

    angular.module('Turista',['leaflet-directive','ngRoute'])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider){
        $routeProvider
            .when('/',{
                controller: 'MainController',
                controllerAs: 'MainCtrl',
                templateUrl: 'views/main.html',
                resolve: {
                    position: function (myLocation) {
                        return myLocation;
                    }
                }
            })
            .when('/about',{
                controller: 'AboutController',
                controllerAs:'AboutCtrl',
                templateUrl: 'views/about.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    }
})();