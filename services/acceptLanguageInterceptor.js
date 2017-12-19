angular.module('cuSpaFe').service('acceptLanguageInterceptor', function ($translate) {

    function isEndpoint (data) {
        return (data.url.indexOf('http://localhost:8000/api/') > -1);
    }

    return {
        request: function (request) {
            if (isEndpoint(request)) {
                if (!request.headers['Accept-Language']) {
                    request.headers['Accept-Language'] = $translate.use();
                }
            }
            return request;
        }
    };
});
