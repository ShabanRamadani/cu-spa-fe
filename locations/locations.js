angular.module('locations', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('locations').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.locations', {
        url: '/locations',
        views: {
            'content': {
                templateUrl: 'locations/locations.html',
                controller: 'locationsController',
                controllerAs: 'locations',
                resolve: {}
            }
        },
        pageTitle: 'Locations'
    }).state('cuSpaFe.locations.new', {
        url: '/new',
        views: {
            '@': {
                templateUrl: 'locations/locationDetails.html',
                controller: 'locationController',
                controllerAs: 'location',
                resolve: {
                    location: function () {
                        return {};
                    }
                }
            }
        },
        pageTitle: 'Location'
    }).state('cuSpaFe.locations.edit', {
        url: '/{locationId}',
        views: {
            '@': {
                templateUrl: 'locations/locationDetails.html',
                controller: 'locationController',
                controllerAs: 'location',
                resolve: {
                    location: function ($http, $stateParams) {
                        return $http.get('http://localhost:8000/api/v1/locations/' + $stateParams.locationId).then(function (response) {
                            return response.data;
                        });
                    }
                }
            }
        },
        pageTitle: 'Location'
    });

}).controller('locationsController', function ($log, $http, $uibModal, modalService, $location) {
    $log.info('Location controller is now loaded');
    var vm = this;
    vm.title = 'Locations';

    function internalSearch (pageNumber) {
        var endpoint = 'http://localhost:8000/api/v1/locations';
        if (!pageNumber || isNaN(parseInt(pageNumber))) {
            pageNumber = 1;
        }
        $location.search('page', pageNumber);
        $http.get(endpoint + '?page=' + pageNumber).then(function (response) {
            vm.locations = response.data.data;
            vm.paginationData = response.data.meta.pagination;
        });
    }

    vm.deleteLocation = function (id) {
        modalService.modalConfirmation().then(function () {
            $http.delete('http://localhost:8000/api/v1/locations/' + id).then(function () {
                internalSearch();
            });
        });
    };

    vm.search = function () {
        internalSearch(vm.paginationData.current_page);
    };

    internalSearch($location.search()['page']);

});

