angular.module('login', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('login').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.login', {
        url: '/login',
        views: {
            'content': {
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'login',
                resolve: {
                    checkAuth: function ($auth, $state) {
                        if ($auth.isAuthenticated()) {
                            return $state.go('cuSpaFe.home');
                        }
                    }
                }
            }
        },
        pageTitle: 'Login'
    });

}).controller('loginController', function ($log, $auth, notificationService, $state) {
    $log.info('Login controller is now loaded');
    var vm = this;

    vm.credentials = {
        email: null,
        password: null
    };

    function login () {
        $auth.login(vm.credentials).then(function (response) {
            $auth.setToken(response.data.token);
            $state.go('cuSpaFe.home');
        }, function (error) {
            notificationService.error(error);
        });
    }

    vm.login = login;

});

