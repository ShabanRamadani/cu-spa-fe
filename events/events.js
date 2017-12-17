angular.module('events', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('events').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.events', {
        url: '/events',
        views: {
            'content': {
                templateUrl: 'events/events.html',
                controller: 'eventsController',
                controllerAs: 'events',
                resolve: {}
            }
        },
        pageTitle: 'Events'
    }).state('cuSpaFe.events.new', {
        url: '/new',
        views: {
            '@': {
                templateUrl: 'events/eventDetails.html',
                controller: 'eventController',
                controllerAs: 'event',
                resolve: {
                    event: function () {
                        return {};
                    },
                    speakers: function ($http) {
                        return $http.get('http://localhost:8000/api/v1/users?limit=999999').then(function (response) {
                            return response.data.data;
                        });
                    },
                    locations: function ($http) {
                        return $http.get('http://localhost:8000/api/v1/locations?limit=999999').then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            }
        },
        pageTitle: 'Event'
    }).state('cuSpaFe.events.edit', {
        url: '/{eventId}',
        views: {
            '@': {
                templateUrl: 'events/eventDetails.html',
                controller: 'eventController',
                controllerAs: 'event',
                resolve: {
                    event: function ($http, $stateParams) {
                        return $http.get('http://localhost:8000/api/v1/events/' + $stateParams.eventId + '?include=speaker,location').then(function (response) {
                            return response.data;
                        });
                    },
                    speakers: function ($http) {
                        return $http.get('http://localhost:8000/api/v1/users?limit=999999').then(function (response) {
                            return response.data.data;
                        });
                    },
                    locations: function ($http) {
                        return $http.get('http://localhost:8000/api/v1/locations?limit=999999').then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            }
        },
        pageTitle: 'Event'
    });

}).controller('eventsController', function ($log, $http, $uibModal, modalService, $location, notificationService) {
    $log.info('Event controller is now loaded');
    var vm = this;
    vm.title = 'Events';

    function internalSearch (pageNumber) {
        var endpoint = 'http://localhost:8000/api/v1/events?include=speaker,location';
        if (!pageNumber || isNaN(parseInt(pageNumber))) {
            pageNumber = 1;
        }
        $location.search('page', pageNumber);
        $http.get(endpoint + '&page=' + pageNumber).then(function (response) {
            vm.events = response.data.data;
            vm.paginationData = response.data.meta.pagination;
        });
    }

    vm.deleteEvent = function (id) {
        modalService.modalConfirmation().then(function () {
            $http.delete('http://localhost:8000/api/v1/events/' + id).then(function () {
                internalSearch();
            }, function (error) {
                notificationService.error(error);
            });
        });
    };

    vm.search = function () {
        internalSearch(vm.paginationData.current_page);
    };

    internalSearch($location.search()['page']);

});

