angular.module('locations').controller('locationController', function (location, NgMap, $scope, $http, notificationService) {
    var vm = this;
    vm.location = location;
    vm.isNew = !vm.location || !vm.location.id;
    var map;

    function updateLocationData () {
        vm.location.latitude = vm.mapCenter[0];
        vm.location.longitude = vm.mapCenter[1];
    }

    var initMarker = function (lat, lng) {
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(lat, lng),
            draggable: true
        });
        google.maps.event.addListener(marker, 'dragend', function (markerEvent) {
            vm.mapCenter = [markerEvent.latLng.lat(), markerEvent.latLng.lng()];
            updateLocationData();
            $scope.$apply();
        });
    };

    function initMap () {
        NgMap.getMap({id: 'giMap'}).then(function (evtMap) {
            map = evtMap;
            initMarker(vm.mapCenter[0], vm.mapCenter[1])
        });
    }

    function getLocation () {
        var coordinates;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (response) {
                coordinates = response.coords;
                vm.mapCenter = [coordinates.latitude, coordinates.longitude];
                updateLocationData();
            });
        } else {
            vm.mapCenter = [41.3275, 19.8187];
            updateLocationData();
        }
    }

    function back () {
        history.back();
    }

    function save () {
        if (vm.isNew) {
            $http.post('http://localhost:8000/api/v1/locations', vm.location).then(function () {
                notificationService.success('Location created with success');
                back();
            }, function (error) {
                notificationService.error(error);
            });
        } else {
            $http.put   ('http://localhost:8000/api/v1/locations/' + vm.location.id, vm.location).then(function () {
                notificationService.success('Location updated with success');
                back();
            }, function (error) {
                notificationService.error(error);
            });
        }
    }

    if (vm.isNew) {
        getLocation();
    } else {
        vm.mapCenter = [vm.location.latitude, vm.location.longitude];
        updateLocationData();
    }

    initMap();

    vm.save = save;
    vm.back = back;

});

