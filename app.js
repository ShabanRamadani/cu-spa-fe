angular.module('cuSpaFe', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'toaster',
    'angular-loading-bar',
    'satellizer',
    'home',
    'users',
    'login'
]);

angular.module('cuSpaFe').config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

    /* Add New States Above */

    $stateProvider
        .state('cuSpaFe', {
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'header/header.html',
                    controller: function ($auth, $scope, $http, $state) {
                        $scope.isAuthenticated = $auth.isAuthenticated;
                        $scope.logout = function () {
                            $http.post('http://localhost:8000/api/v1/logout', {token: $auth.getToken()}).then(function () {
                                $auth.logout();
                                $state.go('cuSpaFe.login');
                            });
                        }
                    }
                },
                '@': {
                    template: '<div ui-view="content"></div>',
                    controller: function ($log) {
                        $log.info('App is now loaded');
                    }
                }
            },
            resolve: {}
        });

    $urlRouterProvider.otherwise('/home');

    $authProvider.loginUrl = 'http://localhost:8000/api/v1/login';
    $authProvider.tokenName = 'cuSpa';
    $authProvider.tokenPrefix = 'cuSpa';

    $httpProvider.interceptors.push('requestInterceptor');

});

angular.module('cuSpaFe').run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
