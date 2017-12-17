angular.module('cuSpaFe').service('requestInterceptor', function ($q, $injector) {
    var $state, $auth;
    return {
        'response': function (response) {
            //Will only be called for HTTP up to 300
            return response || $q.when(response);
        },
        'responseError': function (rejection) {
            if (!$state) {
                $state = $injector.get('$state');
            }
            if (rejection.status === 401) {
                if (!$auth) {
                    $auth = $injector.get('$auth');
                }
                $auth.logout();
                $state.go('cuSpaFe.login');
            }

            return $q.reject(rejection);
        }
    };
});
