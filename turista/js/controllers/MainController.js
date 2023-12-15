//Creator Relvin Gonzalez
//This controller receives the current user location and gets near places by JSON
//position promise made by myLocation service
(function () {
    "use strict";

    angular.module('Turista')
        .controller('MainController', MainController);

    MainController.$inject = ['myLocation', 'places'];

    function MainController( myLocation, places) {

        var vm = this;

        activate();

        function activate(){

            myLocation.getLocation().then(gotLocation);

            function gotLocation(position){
                vm.lat = position.lat;
                vm.lng = position.lng;

                vm.mapCenter = {
                    lat: vm.lat,
                    lng: vm.lng,
                    zoom: 30
                };

                places.getWikipediaPlaces(vm.lat,vm.lng).then(pointOfOrigin);

                function pointOfOrigin(geodata){
                    vm.geodata = geodata;
                    var pointOfOrigin = {
                        lat: position.lat,
                        lng: position.lng,
                        message: "You are here!",
                        icon: {
                            type: 'awesomeMarker',
                            icon: 'user',
                            markerColor: "red",
                            iconColor: 'white'
                        }
                    };
                    vm.mapMarkers = geodataToMarkers(vm.geodata);
                    vm.mapMarkers.push(pointOfOrigin);
                }
            }
        }
    }
})();