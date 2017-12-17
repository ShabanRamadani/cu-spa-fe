angular.module('events').controller('eventController', function (event, NgMap, $scope, $http, notificationService, speakers, locations) {
    var vm = this;
    vm.event = event;
    vm.isNew = !vm.event || !vm.event.id;
    vm.speakers = speakers;
    vm.locations = locations;

    function back () {
        history.back();
    }

    function save () {
        if (vm.isNew) {
            $http.post('http://localhost:8000/api/v1/events', vm.event).then(function () {
                notificationService.success('Event created with success');
                back();
            }, function (error) {
                notificationService.error(error);
            });
        } else {
            $http.put('http://localhost:8000/api/v1/events/' + vm.event.id, vm.event).then(function () {
                notificationService.success('Event updated with success');
                back();
            }, function (error) {
                notificationService.error(error);
            });
        }
    }

    function setForeignKey (column, value) {
        vm.event[column] = value;
    }

    if (!vm.isNew) {
        setForeignKey('speaker_id', vm.event.speaker.id);
        setForeignKey('location_id', vm.event.location.id);
    }

    vm.save = save;
    vm.back = back;
    vm.setForeignKey = setForeignKey;

});

