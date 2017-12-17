angular.module('users', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('users').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.users', {
        url: '/users',
        views: {
            'content': {
                templateUrl: 'users/users.html',
                controller: 'usersController',
                controllerAs: 'users',
                resolve: {}
            }
        },
        pageTitle: 'Users'
    });

}).controller('usersController', function ($log, $http, $uibModal, modalService, $location, notificationService) {
    $log.info('User controller is now loaded');
    var vm = this;
    vm.title = 'Users';

    function internalSearch (pageNumber) {
        var endpoint = 'http://localhost:8000/api/v1/users';
        if (!pageNumber || isNaN(parseInt(pageNumber))) {
            pageNumber = 1;
        }
        $location.search('page', pageNumber);
        $http.get(endpoint + '?page=' + pageNumber).then(function (response) {
            vm.users = response.data.data;
            vm.paginationData = response.data.meta.pagination;
        });
    }

    function openUserModal (user) {
        return $uibModal.open({
            templateUrl: 'modals/userModal/userModal.html',
            controller: 'userModalController',
            controllerAs: 'user',
            resolve: {
                user: function () {
                    return angular.copy(user);
                }
            }
        });
    }

    vm.createNewUser = function () {
        openUserModal().result.then(function () {
            internalSearch();
        });
    };

    vm.editUser = function (user) {
        openUserModal(user).result.then(function () {
            internalSearch();
        });
    };

    vm.deleteUser = function (id) {
        modalService.modalConfirmation().then(function () {
            $http.delete('http://localhost:8000/api/v1/users/' + id).then(function () {
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

