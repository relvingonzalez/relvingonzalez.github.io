(function () {
    "use strict";

    angular.module('Turista')
        .factory('places', places);

    places.$inject = ['$http'];

    function places ($http) {
        var lat = 0;
        var long = 0;

        return {
          getWikipediaPlaces:getWikipediaPlaces
        };

        function getWikipediaPlaces(lt,ln) {

            lt = lt?lt:lat;
            ln = ln?ln:long;

            return $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&' +
                'list=geosearch&gsradius=5000&gscoord=' + lt + '%7C' + ln + '&gslimit=30&format=json&callback=JSON_CALLBACK')
                .then(function (data) {
                    return data;
                },function (err) {
                    return err;
                })
        }
    }
})();