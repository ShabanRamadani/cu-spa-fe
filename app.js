angular.module('cuSpaFe', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toaster', 'home', 'users']);

angular.module('cuSpaFe').config(function ($stateProvider, $urlRouterProvider) {

    /* Add New States Above */

    $stateProvider
        .state('cuSpaFe', {
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'header/header.html'
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
