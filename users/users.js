angular.module('users', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('users').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.users', {
        url: '/users',
        views: {
            'content': {
                templateUrl: 'users/users.html',
                controller: 'usersController',
                controllerAs: 'users',
                resolve: {
                    users: function ($http) {
                        return $http.get('http://localhost:8000/api/v1/users').then(function (response) {
                            return response.data.data;
                        });
                    }
                }
            }
        }
    });

}).controller('usersController', function ($log, users, $http, $uibModal, modalService) {
    $log.info('User controller is now loaded');
    var vm = this;
    vm.title = 'Users';
    vm.users = users;

    function internalSearch () {
        $http.get('http://localhost:8000/api/v1/users').then(function (response) {
            vm.users = response.data.data;
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
            });
        });
    };

});

