angular.module('cuSpaFe', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'toaster',
    'angular-loading-bar',
    'satellizer',
    'ngMap',
    'ngMessages',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'i18n',
    'home',
    'users',
    'login',
    'locations',
    'events'
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
                        };
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
    $httpProvider.interceptors.push('acceptLanguageInterceptor');

});

angular.module('cuSpaFe').config(function (tmhDynamicLocaleProvider, $translateProvider, i18nIt, i18nEn) {

    tmhDynamicLocaleProvider.localeLocationPattern('i18n/locale/angular-locale_{{locale}}.js');

    $translateProvider
        .translations('it', i18nIt)
        .translations('en', i18nEn)
        .preferredLanguage('en')
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('sanitizeParameters');

});

angular.module('cuSpaFe').run(function ($rootScope, $translate, tmhDynamicLocale) {

    var language = navigator.language.substring(0, 2);
    if (language !== 'it') {
        language = 'en';
    }

    $translate.use(language).then(function (data) {
        tmhDynamicLocale.set(data);
        moment.locale(data);
    });

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

}).run(['$templateCache', function ($templateCache) {
    $templateCache.put('error-messages',
        '<span class="help-block" ng-message="email">Value should be an valid email</span>\n' +
        '<span class="help-block" ng-message="required">This field is required</span>\n' +
        '');
}]);

