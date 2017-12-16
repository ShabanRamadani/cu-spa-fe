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

}).controller('usersController', function ($log, users) {
    $log.info('User controller is now loaded');
    var vm = this;
    vm.title = 'Users';
    vm.users = users;
});

